import type { HttpContext } from '@adonisjs/core/http'
import Usuario from '#models/usuario'
import jwt from 'jsonwebtoken'
import env from '#start/env'
import hash from '@adonisjs/core/services/hash'
import app from '@adonisjs/core/services/app'
import { subirImagen } from '#services/cloudinary_service'

export default class MiPerfilController {

  private getIdFromToken(request: any): number | null {
    const token = (request.header('Authorization') ?? '').replace('Bearer ', '')
    try {
      const payload: any = jwt.verify(token, env.get('JWT_SECRET'))
      return payload?.id ?? null
    } catch { return null }
  }

  // GET /mi-perfil
  async show({ request, response }: HttpContext) {
    try {
      const id = this.getIdFromToken(request)
      if (!id) return response.unauthorized({ message: 'Token inválido' })

      const usuario = await Usuario.query()
        .where('id_usuario', id)
        .preload('rol')
        .firstOrFail()

      return response.ok({ data: usuario })
    } catch {
      return response.notFound({ message: 'Usuario no encontrado' })
    }
  }

  // PUT /mi-perfil
  async update({ request, response }: HttpContext) {
    try {
      const id = this.getIdFromToken(request)
      if (!id) return response.unauthorized({ message: 'Token inválido' })

      const usuario = await Usuario.findOrFail(id)
      const data: any = request.only(['nombre', 'apellido', 'telefono', 'observaciones'])

      const foto = request.file('foto_perfil', {
        extnames: ['jpg', 'jpeg', 'png', 'webp'],
        size: '5mb',
      })

      if (foto) {
        if (!foto.isValid) {
          return response.badRequest({ message: 'Archivo inválido', errors: foto.errors })
        }
        await foto.move(app.tmpPath('uploads'))
        const url = await subirImagen(foto.filePath!)
        data.fotoPerfil = url
      }

      usuario.merge(data)
      await usuario.save()
      await usuario.load('rol')

      return response.ok({ message: 'Perfil actualizado', data: usuario })
    } catch (error: any) {
      return response.internalServerError({ message: 'Error al actualizar perfil', error: error.message })
    }
  }

  // POST /mi-perfil/cambiar-password
  async cambiarPassword({ request, response }: HttpContext) {
    try {
      const id = this.getIdFromToken(request)
      if (!id) return response.unauthorized({ message: 'Token inválido' })

      const { passwordActual, nuevaPassword } = request.only(['passwordActual', 'nuevaPassword'])

      if (!passwordActual) return response.badRequest({ message: 'La contraseña actual es obligatoria' })
      if (!nuevaPassword)  return response.badRequest({ message: 'La nueva contraseña es obligatoria' })
      if (nuevaPassword.length < 6) return response.badRequest({ message: 'Mínimo 6 caracteres' })

      const usuario = await Usuario.findOrFail(id)
      const esValida = await hash.verify(usuario.passwordHash, passwordActual)

      if (!esValida) return response.unauthorized({ message: 'La contraseña actual es incorrecta' })

      usuario.passwordHash = nuevaPassword
      await usuario.save()

      return response.ok({ message: 'Contraseña cambiada correctamente' })
    } catch (error: any) {
      return response.internalServerError({ message: 'Error al cambiar contraseña', error: error.message })
    }
  }
}
