import type { HttpContext } from '@adonisjs/core/http'
import Usuario from '#models/usuario'

export default class UsuariosController {
  async index({ response }: HttpContext) {
    try {
      const usuarios = await Usuario.query().preload('rol')
      return response.ok(usuarios)
    } catch (error: any) {
      return response.internalServerError({ message: 'Error al obtener usuarios', error: error.message })
    }
  }

  async store({ request, response }: HttpContext) {
    try {
      const data = request.only(['id_rol', 'nombre', 'apellido', 'correo', 'telefono', 'password', 'observaciones', 'activo'])

      if (!data.nombre) return response.badRequest({ message: 'El nombre es obligatorio' })
      if (!data.correo) return response.badRequest({ message: 'El correo es obligatorio' })
      if (!data.password) return response.badRequest({ message: 'La contraseña es obligatoria' })
      if (!data.id_rol) return response.badRequest({ message: 'El id_rol es obligatorio' })

      const existe = await Usuario.findBy('correo', data.correo)
      if (existe) return response.badRequest({ message: 'El correo ya existe' })

      const usuario = await Usuario.create({
        idRol: data.id_rol,
        nombre: data.nombre,
        apellido: data.apellido,
        correo: data.correo,
        telefono: data.telefono,
        passwordHash: data.password,
        observaciones: data.observaciones,
        activo: data.activo ?? true,
      })
      return response.created({ message: 'Usuario creado correctamente', data: usuario })
    } catch (error: any) {
      return response.internalServerError({ message: 'Error al crear usuario', error: error.message })
    }
  }

  async show({ params, response }: HttpContext) {
    try {
      const usuario = await Usuario.query()
        .where('id_usuario', params.id)
        .preload('rol')
        .firstOrFail()
      return response.ok(usuario)
    } catch {
      return response.notFound({ message: 'Usuario no encontrado' })
    }
  }

  async update({ params, request, response }: HttpContext) {
    try {
      const usuario = await Usuario.findOrFail(params.id)
      const data = request.only(['id_rol', 'nombre', 'apellido', 'correo', 'telefono', 'password', 'observaciones', 'activo'])

      if (data.correo && data.correo !== usuario.correo) {
        const existe = await Usuario.findBy('correo', data.correo)
        if (existe) return response.badRequest({ message: 'El correo ya está en uso' })
      }

      const payload: Record<string, any> = {}
      if (data.id_rol !== undefined) payload.idRol = data.id_rol
      if (data.nombre !== undefined) payload.nombre = data.nombre
      if (data.apellido !== undefined) payload.apellido = data.apellido
      if (data.correo !== undefined) payload.correo = data.correo
      if (data.telefono !== undefined) payload.telefono = data.telefono
      if (data.observaciones !== undefined) payload.observaciones = data.observaciones
      if (data.activo !== undefined) payload.activo = data.activo
      if (data.password) payload.passwordHash = data.password

      usuario.merge(payload)
      await usuario.save()
      return response.ok({ message: 'Usuario actualizado correctamente', data: usuario })
    } catch (error: any) {
      return response.internalServerError({ message: 'Error al actualizar usuario', error: error.message })
    }
  }

  async destroy({ params, response }: HttpContext) {
    try {
      const usuario = await Usuario.findOrFail(params.id)
      await usuario.delete()
      return response.ok({ message: 'Usuario eliminado correctamente' })
    } catch (error: any) {
      return response.internalServerError({ message: 'Error al eliminar usuario', error: error.message })
    }
  }
}
