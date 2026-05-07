import type { HttpContext } from '@adonisjs/core/http'
import Usuario from '#models/usuario'
import CatRol from '#models/cat_rol'

export default class ExpertosController {

  async index({ response }: HttpContext) {
    try {
      const usuarios = await Usuario.query()
        .whereHas('rol', (query: any) => {
          query.whereRaw('LOWER(TRIM(nombre_rol)) = ?', ['experto'])
        })
        .preload('rol')
      return response.ok(usuarios)
    } catch (error: any) {
      return response.internalServerError({ message: 'Error al obtener expertos', error: error.message })
    }
  }

  async store({ request, response }: HttpContext) {
    try {
      const data = request.only(['nombre', 'apellido', 'correo', 'telefono', 'password', 'observaciones', 'activo'])

      if (!data.nombre)   return response.badRequest({ message: 'El nombre es obligatorio' })
      if (!data.correo)   return response.badRequest({ message: 'El correo es obligatorio' })
      if (!data.password) return response.badRequest({ message: 'La contraseña es obligatoria' })

      const existe = await Usuario.findBy('correo', data.correo)
      if (existe) return response.badRequest({ message: 'El correo ya existe' })

      const rolExperto = await CatRol.query()
        .whereRaw('LOWER(TRIM(nombre_rol)) = ?', ['experto'])
        .firstOrFail()

      const usuario = await Usuario.create({
        nombre:        data.nombre,
        apellido:      data.apellido,
        correo:        data.correo,
        telefono:      data.telefono,
        passwordHash:  data.password,
        observaciones: data.observaciones,
        activo:        data.activo ?? true,
        idRol:         rolExperto.idRol,
      })
      return response.created({ message: 'Experto creado correctamente', data: usuario })
    } catch (error: any) {
      return response.internalServerError({ message: 'Error al crear experto', error: error.message })
    }
  }

  async show({ params, response }: HttpContext) {
    try {
      const usuario = await Usuario.query()
        .where('id_usuario', params.id)
        .whereHas('rol', (query: any) => {
          query.whereRaw('LOWER(TRIM(nombre_rol)) = ?', ['experto'])
        })
        .preload('rol')
        .firstOrFail()
      return response.ok(usuario)
    } catch {
      return response.notFound({ message: 'Experto no encontrado' })
    }
  }

  async update({ params, request, response }: HttpContext) {
    try {
      const usuario = await Usuario.query()
        .where('id_usuario', params.id)
        .whereHas('rol', (query: any) => {
          query.whereRaw('LOWER(TRIM(nombre_rol)) = ?', ['experto'])
        })
        .firstOrFail()

      const data = request.only(['nombre', 'apellido', 'correo', 'telefono', 'password', 'observaciones', 'activo'])

      if (data.correo && data.correo !== usuario.correo) {
        const existe = await Usuario.findBy('correo', data.correo)
        if (existe) return response.badRequest({ message: 'El correo ya está en uso' })
      }

      const payload: Record<string, any> = {}
      if (data.nombre        !== undefined) payload.nombre        = data.nombre
      if (data.apellido      !== undefined) payload.apellido      = data.apellido
      if (data.correo        !== undefined) payload.correo        = data.correo
      if (data.telefono      !== undefined) payload.telefono      = data.telefono
      if (data.observaciones !== undefined) payload.observaciones = data.observaciones
      if (data.activo        !== undefined) payload.activo        = data.activo
      if (data.password)                    payload.passwordHash  = data.password

      usuario.merge(payload)
      await usuario.save()
      return response.ok({ message: 'Experto actualizado correctamente', data: usuario })
    } catch (error: any) {
      return response.internalServerError({ message: 'Error al actualizar experto', error: error.message })
    }
  }

  async destroy({ params, response }: HttpContext) {
    try {
      const usuario = await Usuario.query()
        .where('id_usuario', params.id)
        .whereHas('rol', (query: any) => {
          query.whereRaw('LOWER(TRIM(nombre_rol)) = ?', ['experto'])
        })
        .firstOrFail()
      await usuario.delete()
      return response.ok({ message: 'Experto eliminado correctamente' })
    } catch (error: any) {
      return response.internalServerError({ message: 'Error al eliminar experto', error: error.message })
    }
  }
}