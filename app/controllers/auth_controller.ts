import type { HttpContext } from '@adonisjs/core/http'
import Usuario from '#models/usuario'
import hash from '@adonisjs/core/services/hash'
import jwt from 'jsonwebtoken'
import env from '#start/env'

export default class AuthController {
  // ─── LOGIN ───────────────────────────────────────────────
  async login({ request, response }: HttpContext) {
    try {
      const data = request.only(['correo', 'password'])

      if (!data.correo) return response.badRequest({ message: 'El correo es obligatorio' })
      if (!data.password) return response.badRequest({ message: 'La contraseña es obligatoria' })

      const usuario = await Usuario.query()
        .where('correo', data.correo)
        .where('activo', true)
        .preload('rol')
        .first()

      if (!usuario) {
        return response.unauthorized({ message: 'Credenciales incorrectas' })
      }

      const passwordValido = await hash.verify(usuario.passwordHash, data.password)

      if (!passwordValido) {
        return response.unauthorized({ message: 'Credenciales incorrectas' })
      }

      const token = jwt.sign(
        { id: usuario.idUsuario, correo: usuario.correo, rol: usuario.rol },
        env.get('JWT_SECRET'),
        { expiresIn: '8h' }
      )

      return response.ok({
        message: 'Login exitoso',
        token: token,
        data: {
          idUsuario: usuario.idUsuario,
          nombre: usuario.nombre,
          apellido: usuario.apellido,
          correo: usuario.correo,
          rol: usuario.rol,
        },
      })
    } catch (error: any) {
      return response.internalServerError({
        message: 'Error al iniciar sesión',
        error: error.message,
      })
    }
  }

  // ─── REGISTER ────────────────────────────────────────────
  async register({ request, response }: HttpContext) {
    try {
      const data = request.only(['nombre', 'apellido', 'correo', 'password', 'telefono', 'idRol'])

      if (!data.nombre) return response.badRequest({ message: 'El nombre es obligatorio' })
      if (!data.apellido) return response.badRequest({ message: 'El apellido es obligatorio' })
      if (!data.correo) return response.badRequest({ message: 'El correo es obligatorio' })
      if (!data.password) return response.badRequest({ message: 'La contraseña es obligatoria' })

      const existe = await Usuario.query().where('correo', data.correo).first()
      if (existe) {
        return response.conflict({ message: 'Ya existe un usuario con ese correo' })
      }

      const usuario = await Usuario.create({
        nombre: data.nombre,
        apellido: data.apellido,
        correo: data.correo,
        passwordHash: data.password,
        telefono: data.telefono ?? null,
        idRol: data.idRol ?? null,
        activo: true,
      })

      return response.created({
        message: 'Usuario registrado correctamente',
        data: {
          idUsuario: usuario.idUsuario,
          nombre: usuario.nombre,
          apellido: usuario.apellido,
          correo: usuario.correo,
        },
      })
    } catch (error: any) {
      return response.internalServerError({
        message: 'Error al registrar usuario',
        error: error.message,
      })
    }
  }
  //recuperar contraseña//
  async recuperarPassword({ request, response }: HttpContext) {
    try {
      const { correo } = request.only(['correo'])

      if (!correo) return response.badRequest({ message: 'El correo es obligatorio' })

      const usuario = await Usuario.query().where('correo', correo).first()

      if (!usuario) {
        return response.notFound({ message: 'No existe un usuario con ese correo' })
      }

      const token = jwt.sign(
        { id: usuario.idUsuario, correo: usuario.correo },
        env.get('JWT_SECRET'),
        { expiresIn: '15m' }
      )

      // Aquí normalmente se enviaría un correo con el token
      // Por ahora lo retornamos directamente para pruebas
      return response.ok({
        message: 'Token de recuperación generado. Úsalo en /restablecer-password',
        token: token,
      })
    } catch (error: any) {
      return response.internalServerError({
        message: 'Error al recuperar contraseña',
        error: error.message,
      })
    }
  }

  async restablecerPassword({ request, response }: HttpContext) {
    try {
      const { token, nuevaPassword } = request.only(['token', 'nuevaPassword'])

      if (!token) return response.badRequest({ message: 'El token es obligatorio' })
      if (!nuevaPassword) return response.badRequest({ message: 'La nueva contraseña es obligatoria' })

      let payload: any

      try {
        payload = jwt.verify(token, env.get('JWT_SECRET'))
      } catch {
        return response.unauthorized({ message: 'Token inválido o expirado' })
      }

      const usuario = await Usuario.find(payload.id)

      if (!usuario) {
        return response.notFound({ message: 'Usuario no encontrado' })
      }

      usuario.passwordHash = nuevaPassword
      await usuario.save()

      return response.ok({
        message: 'Contraseña restablecida correctamente',
      })
    } catch (error: any) {
      return response.internalServerError({
        message: 'Error al restablecer contraseña',
        error: error.message,
      })
    }
  }
}
