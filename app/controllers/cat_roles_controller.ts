import type { HttpContext } from '@adonisjs/core/http'
import CatRol from '#models/cat_rol'

export default class CatRolesController {

  async index({ response }: HttpContext) {
    try {
      const roles = await CatRol.all()
      return response.ok(roles)
    } catch (error: any) {
      return response.internalServerError({ message: 'Error al obtener roles', error: error.message })
    }
  }

  async store({ request, response }: HttpContext) {
    try {
      const data = request.only(['nombre_rol', 'descripcion'])

      if (!data.nombre_rol)
        return response.badRequest({ message: 'El nombre_rol es obligatorio' })

      const existe = await CatRol.query()
        .whereRaw('LOWER(TRIM(nombre_rol)) = ?', [data.nombre_rol.toLowerCase().trim()])
        .first()

      if (existe)
        return response.badRequest({ message: 'El rol ya existe' })

      const rol = await CatRol.create({
        nombreRol: data.nombre_rol,
        descripcion: data.descripcion,
      })
      return response.created({ message: 'Rol creado correctamente', data: rol })
    } catch (error: any) {
      return response.internalServerError({ message: 'Error al crear rol', error: error.message })
    }
  }

  async show({ params, response }: HttpContext) {
    try {
      const rol = await CatRol.findOrFail(params.id)
      return response.ok(rol)
    } catch {
      return response.notFound({ message: 'Rol no encontrado' })
    }
  }

  async update({ params, request, response }: HttpContext) {
    try {
      const rol = await CatRol.findOrFail(params.id)
      const data = request.only(['nombre_rol', 'descripcion'])

      if (data.nombre_rol && data.nombre_rol.toLowerCase().trim() !== rol.nombreRol.toLowerCase().trim()) {
        const existe = await CatRol.query()
          .whereRaw('LOWER(TRIM(nombre_rol)) = ?', [data.nombre_rol.toLowerCase().trim()])
          .first()
        if (existe)
          return response.badRequest({ message: 'Ya existe un rol con ese nombre' })
      }

      const payload: Record<string, any> = {}
      if (data.nombre_rol !== undefined)  payload.nombreRol = data.nombre_rol
      if (data.descripcion !== undefined) payload.descripcion = data.descripcion

      rol.merge(payload)
      await rol.save()
      return response.ok({ message: 'Rol actualizado correctamente', data: rol })
    } catch (error: any) {
      return response.internalServerError({ message: 'Error al actualizar rol', error: error.message })
    }
  }

  async destroy({ params, response }: HttpContext) {
    try {
      const rol = await CatRol.findOrFail(params.id)
      await rol.delete()
      return response.ok({ message: 'Rol eliminado correctamente' })
    } catch (error: any) {
      return response.internalServerError({ message: 'Error al eliminar rol', error: error.message })
    }
  }
}