import type { HttpContext } from '@adonisjs/core/http'
import Usuario from '#models/usuario'
import jwt from 'jsonwebtoken'
import env from '#start/env'
import hash from '@adonisjs/core/services/hash'
import { DateTime } from 'luxon'
import EmailService from '#services/email_service'
import {
  loginValidator,
  recuperarPasswordValidator,
  restablecerPasswordValidator,
} from '#validators/validators'

export default class AuthController {
  /**
   * @login
   * @summary Iniciar sesión
   * @requestBody {"correo": "admin@gmail.com", "password": "123456"}
   * @responseBody 200 - {"message": "Inicio de sesión exitoso", "token": "eyJ...", "usuario": {"id": 1, "nombre": "Juan", "rol": "admin"}}
   * @responseBody 401 - {"message": "Correo o contraseña incorrectos"}
   */
  async login({ request, response }: HttpContext) {
    try {
      const data = await request.validateUsing(loginValidator)

      const usuario = await Usuario.query().where('correo', data.correo).preload('rol').first()

      if (!usuario) return response.unauthorized({ message: 'Correo o contraseña incorrectos' })
      if (!usuario.activo)
        return response.unauthorized({
          message: 'Tu cuenta está desactivada. Contacta al administrador.',
        })

      const esValida = await hash.verify(usuario.passwordHash, data.password)
      if (!esValida) return response.unauthorized({ message: 'Correo o contraseña incorrectos' })

      const token = jwt.sign(
        {
          id: usuario.idUsuario,
          correo: usuario.correo,
          nombre: usuario.nombre,
          apellido: usuario.apellido,
          rol: {
            idRol: usuario.rol.idRol,
            nombreRol: usuario.rol.nombreRol,
          },
        },
        env.get('JWT_SECRET'),
        { expiresIn: '8h' }
      )

      return response.ok({
        message: 'Inicio de sesión exitoso',
        token,
        usuario: {
          id: usuario.idUsuario,
          nombre: usuario.nombre,
          apellido: usuario.apellido,
          correo: usuario.correo,
          fotoPerfil: usuario.fotoPerfil,
          genero: usuario.genero,
          rol: usuario.rol.nombreRol,
        },
      })
    } catch (error: any) {
      if (error.code === 'E_VALIDATION_ERROR') {
        return response.unprocessableEntity({
          message: 'Error de validación',
          errors: error.messages,
        })
      }
      return response.internalServerError({
        message: 'Error al iniciar sesión',
        error: error.message,
      })
    }
  }

  /**
   * @register
   * @summary Registrar usuario
   * @requestBody {"nombre": "Juan", "apellido": "Pérez", "correo": "juan@gmail.com", "password": "123456", "telefono": "3001234567", "idRol": 3}
   * @responseBody 201 - {"message": "Usuario registrado correctamente", "data": {"id": 1, "nombre": "Juan", "correo": "juan@gmail.com"}}
   * @responseBody 400 - {"message": "El nombre es obligatorio"}
   * @responseBody 409 - {"message": "El correo ya está registrado"}
   */
  async register({ request, response }: HttpContext) {
    try {
      const { nombre, apellido, correo, password, telefono, idRol, genero } = request.only([
        'nombre',
        'apellido',
        'correo',
        'password',
        'telefono',
        'idRol',
        'genero',
      ])

      if (!nombre) return response.badRequest({ message: 'El nombre es obligatorio' })
      if (!apellido) return response.badRequest({ message: 'El apellido es obligatorio' })
      if (!correo) return response.badRequest({ message: 'El correo es obligatorio' })
      if (!password) return response.badRequest({ message: 'La contraseña es obligatoria' })

      const existe = await Usuario.findBy('correo', correo)
      if (existe) return response.conflict({ message: 'El correo ya está registrado' })

      // Se pasa la contraseña en texto plano — el hook @beforeSave del modelo la hashea automáticamente
      const usuario = await Usuario.create({
        idRol: idRol ?? 3,
        nombre,
        apellido,
        correo,
        telefono: telefono ?? null,
        genero: genero ?? null,
        passwordHash: password,
        activo: true,
      })

      await usuario.load('rol')

      try {
        await EmailService.enviarBienvenida(usuario.correo, usuario.nombre, usuario.rol.nombreRol, usuario.correo)
      } catch {
        // Si el correo falla, igual se crea la cuenta
      }

      return response.created({
        message: 'Usuario registrado correctamente',
        data: {
          id: usuario.idUsuario,
          nombre: usuario.nombre,
          correo: usuario.correo,
          rol: usuario.rol.nombreRol,
        },
      })
    } catch (error: any) {
      return response.internalServerError({
        message: 'Error al registrar usuario',
        error: error.message,
      })
    }
  }

  /**
   * @recuperarPassword
   * @summary Recuperar contraseña por correo
   * @requestBody {"correo": "juan@gmail.com"}
   * @responseBody 200 - {"message": "Si el correo existe, recibirás un mensaje con instrucciones."}
   * @responseBody 422 - {"message": "Error de validación"}
   */
  async recuperarPassword({ request, response }: HttpContext) {
    try {
      const data = await request.validateUsing(recuperarPasswordValidator)
      const usuario = await Usuario.findBy('correo', data.correo)

      if (!usuario)
        return response.ok({
          message: 'Si el correo existe, recibirás un mensaje con instrucciones.',
        })

      const token = Math.floor(100000 + Math.random() * 900000).toString()
      const expiracion = DateTime.now().plus({ minutes: 15 })

      usuario.resetToken = token
      usuario.resetTokenExpires = expiracion
      await usuario.save()

      try {
        await EmailService.enviarCodigoRecuperacion(usuario.correo, usuario.nombre, token)
      } catch (e) {
        console.error('ERROR MAIL:', e)
        if (env.get('NODE_ENV') === 'development') {
          return response.ok({ message: 'Correo no configurado. Token (solo desarrollo):', token })
        }
      }

      return response.ok({
        message: 'Si el correo existe, recibirás un mensaje con instrucciones.',
      })
    } catch (error: any) {
      console.error('ERROR RECUPERAR:', error.message, error.stack)
      if (error.code === 'E_VALIDATION_ERROR') {
        return response.unprocessableEntity({
          message: 'Error de validación',
          errors: error.messages,
        })
      }
      return response.internalServerError({
        message: 'Error al procesar solicitud',
        error: error.message,
      })
    }
  }

  /**
   * @verificarToken
   * @summary Verificar si un token de recuperación es válido
   * @requestBody {"token": "123456"}
   * @responseBody 200 - {"message": "Token válido"}
   * @responseBody 400 - {"message": "Código inválido"}
   */
  async verificarToken({ request, response }: HttpContext) {
    try {
      const { token } = request.only(['token'])

      if (!token) return response.badRequest({ message: 'Token requerido' })

      const usuario = await Usuario.query().where('reset_token', token).first()

      if (!usuario) return response.badRequest({ message: 'Código inválido' })
      if (!usuario.resetTokenExpires || usuario.resetTokenExpires < DateTime.now()) {
        return response.badRequest({ message: 'El código ha expirado. Solicita uno nuevo.' })
      }

      return response.ok({ message: 'Token válido' })
    } catch (error: any) {
      return response.internalServerError({
        message: 'Error al verificar token',
        error: error.message,
      })
    }
  }

  /**
   * @restablecerPassword
   * @summary Restablecer contraseña con token
   * @requestBody {"token": "123456", "nuevaPassword": "nuevaclave123"}
   * @responseBody 200 - {"message": "Contraseña restablecida correctamente. Ya puedes iniciar sesión."}
   * @responseBody 400 - {"message": "Token inválido o ya fue usado"}
   */
  async restablecerPassword({ request, response }: HttpContext) {
    try {
      const data = await request.validateUsing(restablecerPasswordValidator)

      const usuario = await Usuario.query().where('reset_token', data.token).first()

      if (!usuario) return response.badRequest({ message: 'Token inválido o ya fue usado' })
      if (!usuario.resetTokenExpires || usuario.resetTokenExpires < DateTime.now()) {
        return response.badRequest({ message: 'El token ha expirado. Solicita uno nuevo.' })
      }

      // Se pasa en texto plano — el hook @beforeSave del modelo hashea automáticamente
      usuario.passwordHash = data.nuevaPassword
      usuario.resetToken = null
      usuario.resetTokenExpires = null
      await usuario.save()

      try {
        await EmailService.enviarConfirmacionCambio(usuario.correo, usuario.nombre)
      } catch {
        // No bloquear si el correo falla
      }

      return response.ok({
        message: 'Contraseña restablecida correctamente. Ya puedes iniciar sesión.',
      })
    } catch (error: any) {
      if (error.code === 'E_VALIDATION_ERROR') {
        return response.unprocessableEntity({
          message: 'Error de validación',
          errors: error.messages,
        })
      }
      return response.internalServerError({
        message: 'Error al restablecer contraseña',
        error: error.message,
      })
    }
  }
}
