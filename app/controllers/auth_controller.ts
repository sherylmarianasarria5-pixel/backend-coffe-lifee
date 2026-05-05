import type { HttpContext } from '@adonisjs/core/http'
import Usuario from '#models/usuario'
import hash from '@adonisjs/core/services/hash'
import Jwt from 'jsonwebtoken'
import env from '#start/env'
import mail from '@adonisjs/mail/services/main'

export default class AuthController {

  async register({ request, response }: HttpContext) {
    try {
      const datos = request.only([
        'nombre',
        'apellido',
        'correo',
        'telefono',
        'passwordHash',
        'idRol',
        'observaciones',
      ])

      // Verificar si el correo ya existe
      const existe = await Usuario.query().where('correo', datos.correo).first()
      if (existe) {
        return response.conflict({
          message: 'El correo ya está registrado',
        })
      }

      // Crear el usuario (el beforeSave del modelo hashea la contraseña automáticamente)
      const usuario = await Usuario.create({
        nombre: datos.nombre,
        apellido: datos.apellido,
        correo: datos.correo,
        telefono: datos.telefono ?? null,
        passwordHash: datos.passwordHash,
        idRol: datos.idRol ?? null,
        observaciones: datos.observaciones ?? null,
        activo: true,
      })

      return response.created({
        message: 'Usuario registrado correctamente',
        data: {
          id: usuario.idUsuario,
          nombre: usuario.nombre,
          apellido: usuario.apellido,
          correo: usuario.correo,
          idRol: usuario.idRol,
          passwordHash: usuario.passwordHash,
        },
      })
    } catch (error: any) {
      return response.internalServerError({
        message: 'Error al registrar usuario',
        error: error.message,
      })
    }
  }

  async login({ request, response }: HttpContext) {
    try {
      const { correo, password } = request.only(['correo', 'password'])

      // Buscar el usuario
      const usuario = await Usuario.query().where('correo', correo).first()
      if (!usuario) {
        return response.unauthorized({
          message: 'Usuario no encontrado',
        })
      }

      // Verificar contraseña contra el campo password_hash
      const passwordValido = await hash.verify(usuario.passwordHash, password)
      if (!passwordValido) {
        return response.unauthorized({
          message: 'Contraseña incorrecta',
        })
      }

      // Generar token JWT
      const token = Jwt.sign(
        { id: usuario.idUsuario, correo: usuario.correo },
        env.get('JWT_SECRET'),
        { expiresIn: '1h' }
      )

      return response.ok({
        message: 'Login exitoso',
        token,
        data: {
          id: usuario.idUsuario,
          nombre: usuario.nombre,
          apellido: usuario.apellido,
          correo: usuario.correo,
        },
      })
    } catch (error: any) {
      return response.internalServerError({
        message: 'Error al iniciar sesión',
        error: error.message,
      })
    }
  }

  async recuperarPassword({ request, response }: HttpContext) {
    try {
      const { correo } = request.only(['correo'])

      // Verificar si el usuario existe
      const usuario = await Usuario.query().where('correo', correo).first()
      if (!usuario) {
        return response.notFound({
          message: 'No existe una cuenta con ese correo',
        })
      }

      // Generar token temporal de 15 minutos
      const token = Jwt.sign(
        { id: usuario.idUsuario, correo: usuario.correo },
        env.get('JWT_SECRET'),
        { expiresIn: '15m' }
      )

      // Enviar correo
      await mail.send((message) => {
        message
          .to(correo)
          .from(env.get('MAIL_FROM_ADDRESS'))
          .subject('Recuperación de contraseña - Coffee Life')
          .html(`
            <h2>Recuperación de contraseña</h2>
            <p>Hola <b>${usuario.nombre}</b>,</p>
            <p>Recibimos una solicitud para restablecer tu contraseña.</p>
            <p>Tu token de recuperación es:</p>
            <h3>${token}</h3>
            <p>Este token expira en <b>15 minutos</b>.</p>
            <p>Si no solicitaste esto, ignora este correo.</p>
          `)
      })

      return response.ok({
        message: 'Correo de recuperación enviado correctamente',
      })
    } catch (error: any) {
      return response.internalServerError({
        message: 'Error al enviar el correo',
        error: error.message,
      })
    }
  }

  async resetPassword({ request, response }: HttpContext) {
    try {
      const { token, password } = request.only(['token', 'password'])

      // Verificar el token
      const payload = Jwt.verify(token, env.get('JWT_SECRET')) as { id: number, correo: string }

      // Buscar el usuario
      const usuario = await Usuario.findOrFail(payload.id)

      // Actualizar la contraseña (el beforeSave la hashea automáticamente)
      usuario.passwordHash = password
      await usuario.save()

      return response.ok({
        message: 'Contraseña actualizada correctamente',
      })
    } catch (error: any) {
      return response.internalServerError({
        message: 'Token inválido o expirado',
        error: error.message,
      })
    }
  }
}