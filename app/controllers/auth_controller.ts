import type { HttpContext } from '@adonisjs/core/http'
import Usuario from '#models/usuario'
import jwt from 'jsonwebtoken'
import env from '#start/env'
import hash from '@adonisjs/core/services/hash'
import app from '@adonisjs/core/services/app'
import { subirImagen } from '#services/cloudinary_service'
import { loginValidator, recuperarPasswordValidator, restablecerPasswordValidator } from '#validators/validators'

export default class AuthController {

  // POST /login
  async login({ request, response }: HttpContext) {
    try {
      const data = await request.validateUsing(loginValidator)

      const usuario = await Usuario.query().where('correo', data.correo).preload('rol').first()

      if (!usuario) {
        return response.unauthorized({ message: 'Correo o contraseña incorrectos' })
      }

      if (!usuario.activo) {
        return response.unauthorized({ message: 'Tu cuenta está desactivada. Contacta al administrador.' })
      }

      const esValida = await hash.verify(usuario.passwordHash, data.password)
      if (!esValida) {
        return response.unauthorized({ message: 'Correo o contraseña incorrectos' })
      }

      const token = jwt.sign(
        {
          id:       usuario.idUsuario,
          correo:   usuario.correo,
          nombre:   usuario.nombre,
          apellido: usuario.apellido,
          rol: {
            idRol:     usuario.rol.idRol,
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
          id:         usuario.idUsuario,
          nombre:     usuario.nombre,
          apellido:   usuario.apellido,
          correo:     usuario.correo,
          fotoPerfil: usuario.fotoPerfil,
          rol:        usuario.rol.nombreRol,
        },
      })
    } catch (error: any) {
      if (error.code === 'E_VALIDATION_ERROR') {
        return response.unprocessableEntity({ message: 'Error de validación', errors: error.messages })
      }
      return response.internalServerError({ message: 'Error al iniciar sesión', error: error.message })
    }
  }

  // POST /register
  async register({ request, response }: HttpContext) {
    try {
      const { nombre, apellido, correo, password, telefono, idRol } = request.only([
        'nombre', 'apellido', 'correo', 'password', 'telefono', 'idRol',
      ])

      // LOG TEMPORAL
      console.log('ARCHIVO RECIBIDO:', request.file('foto_perfil'))
      console.log('TODOS LOS ARCHIVOS:', request.allFiles())

      if (!nombre)   return response.badRequest({ message: 'El nombre es obligatorio' })
      if (!apellido) return response.badRequest({ message: 'El apellido es obligatorio' })
      if (!correo)   return response.badRequest({ message: 'El correo es obligatorio' })
      if (!password) return response.badRequest({ message: 'La contraseña es obligatoria' })

      const existe = await Usuario.findBy('correo', correo)
      if (existe) return response.conflict({ message: 'El correo ya está registrado' })

      let fotoPerfil: string | null = null
      const foto = request.file('foto_perfil', {
        extnames: ['jpg', 'jpeg', 'png', 'webp'],
        size: '5mb',
      })
      if (foto) {
        if (!foto.isValid) {
          return response.badRequest({ message: 'Archivo inválido', errors: foto.errors })
        }
        await foto.move(app.tmpPath('uploads'))
        fotoPerfil = await subirImagen(foto.filePath!)
      }

      const usuario = await Usuario.create({
        idRol:        idRol ?? 3,
        nombre,
        apellido,
        correo,
        telefono:     telefono ?? null,
        passwordHash: password,
        fotoPerfil,
        activo:       true,
      })

      await usuario.load('rol')

      try {
        const mail = await import('@adonisjs/mail/services/main')
        await mail.default.send((message) => {
          message
            .to(usuario.correo)
            .subject('Bienvenido a Coffee Life')
            .html(`
              <div style="font-family:sans-serif;max-width:500px;margin:auto">
                <h2 style="color:#6B4226">☕ Bienvenido a Coffee Life</h2>
                <p>Hola <strong>${usuario.nombre}</strong>, tu cuenta fue creada exitosamente.</p>
                <table style="width:100%;border-collapse:collapse;margin:16px 0">
                  <tr><td style="padding:8px;color:#666">Correo</td><td style="padding:8px">${usuario.correo}</td></tr>
                  <tr><td style="padding:8px;color:#666">Rol</td><td style="padding:8px">${usuario.rol.nombreRol}</td></tr>
                </table>
                <p style="color:#999;font-size:12px">Si no solicitaste esta cuenta, ignora este correo.</p>
              </div>
            `)
        })
      } catch {
        // Si el correo falla, igual se crea la cuenta
      }

      return response.created({
        message: 'Usuario registrado correctamente',
        data: {
          id:         usuario.idUsuario,
          nombre:     usuario.nombre,
          correo:     usuario.correo,
          fotoPerfil: usuario.fotoPerfil,
          rol:        usuario.rol.nombreRol,
        },
      })
    } catch (error: any) {
      return response.internalServerError({ message: 'Error al registrar usuario', error: error.message })
    }
  }

  // POST /recuperar-password
  async recuperarPassword({ request, response }: HttpContext) {
    try {
      const data = await request.validateUsing(recuperarPasswordValidator)

      const usuario = await Usuario.findBy('correo', data.correo)

      if (!usuario) {
        return response.ok({ message: 'Si el correo existe, recibirás un mensaje con instrucciones.' })
      }

      const token = Math.floor(100000 + Math.random() * 900000).toString()
      const expiracion = new Date(Date.now() + 15 * 60 * 1000)

      usuario.resetToken        = token
      usuario.resetTokenExpires = expiracion
      await usuario.save()

      try {
        const mail = await import('@adonisjs/mail/services/main')
        await mail.default.send((message) => {
          message
            .to(usuario.correo)
            .subject('Recuperar contraseña - Coffee Life')
            .html(`
              <div style="font-family:sans-serif;max-width:500px;margin:auto">
                <h2 style="color:#6B4226">☕ Recuperar contraseña</h2>
                <p>Hola <strong>${usuario.nombre}</strong>, recibimos una solicitud para restablecer tu contraseña.</p>
                <div style="text-align:center;margin:24px 0">
                  <span style="font-size:36px;font-weight:bold;letter-spacing:8px;color:#6B4226">${token}</span>
                </div>
                <p>Este código expira en <strong>15 minutos</strong>.</p>
                <p style="color:#999;font-size:12px">Si no solicitaste esto, ignora este correo.</p>
              </div>
            `)
        })
      } catch (mailError: any) {
        if (env.get('NODE_ENV') === 'development') {
          return response.ok({ message: 'Correo no configurado. Token (solo desarrollo):', token })
        }
      }

      return response.ok({ message: 'Si el correo existe, recibirás un mensaje con instrucciones.' })
    } catch (error: any) {
      if (error.code === 'E_VALIDATION_ERROR') {
        return response.unprocessableEntity({ message: 'Error de validación', errors: error.messages })
      }
      return response.internalServerError({ message: 'Error al procesar solicitud', error: error.message })
    }
  }

  // POST /restablecer-password
  async restablecerPassword({ request, response }: HttpContext) {
    try {
      const data = await request.validateUsing(restablecerPasswordValidator)

      const usuario = await Usuario.query()
        .where('reset_token', data.token)
        .first()

      if (!usuario) {
        return response.badRequest({ message: 'Token inválido o ya fue usado' })
      }

      if (!usuario.resetTokenExpires || usuario.resetTokenExpires < new Date()) {
        return response.badRequest({ message: 'El token ha expirado. Solicita uno nuevo.' })
      }

      usuario.passwordHash       = data.nuevaPassword
      usuario.resetToken         = null
      usuario.resetTokenExpires  = null
      await usuario.save()

      try {
        const mail = await import('@adonisjs/mail/services/main')
        await mail.default.send((message) => {
          message
            .to(usuario.correo)
            .subject('Contraseña restablecida - Coffee Life')
            .html(`
              <div style="font-family:sans-serif;max-width:500px;margin:auto">
                <h2 style="color:#6B4226">☕ Contraseña restablecida</h2>
                <p>Hola <strong>${usuario.nombre}</strong>, tu contraseña fue cambiada exitosamente.</p>
                <p>Si no realizaste este cambio, contacta al administrador inmediatamente.</p>
              </div>
            `)
        })
      } catch {
        // No bloquear si el correo falla
      }

      return response.ok({ message: 'Contraseña restablecida correctamente. Ya puedes iniciar sesión.' })
    } catch (error: any) {
      if (error.code === 'E_VALIDATION_ERROR') {
        return response.unprocessableEntity({ message: 'Error de validación', errors: error.messages })
      }
      return response.internalServerError({ message: 'Error al restablecer contraseña', error: error.message })
    }
  }
}
