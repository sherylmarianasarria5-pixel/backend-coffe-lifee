import type { HttpContext } from '@adonisjs/core/http'
import CatRol from '#models/cat_rol'
import { catalogoStoreValidator, catalogoUpdateValidator } from '#validators/validators'

export default class CatRolesController {

  async index({ request, response }: HttpContext) {
    try {
      const page  = Number(request.input('page', 1))
      const limit = Number(request.input('limit', 20))
      const roles = await CatRol.query().paginate(page, limit)
      return response.ok(roles)
    } catch (error: any) {
      return response.internalServerError({ message: 'Error al obtener roles', error: error.message })
    }
  }

  async store({ request, response }: HttpContext) {
    try {
      const data = await request.validateUsing(catalogoStoreValidator)
      const rol  = await CatRol.create({ nombreRol: data.nombre, descripcion: data.descripcion ?? null })
      return response.created({ message: 'Rol creado correctamente', data: rol })
    } catch (error: any) {
      if (error.code === 'E_VALIDATION_ERROR') {
        return response.unprocessableEntity({ message: 'Error de validación', errors: error.messages })
      }
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
      const rol  = await CatRol.findOrFail(params.id)
      const data = await request.validateUsing(catalogoUpdateValidator)
      if (data.nombre      !== undefined) rol.nombreRol   = data.nombre
      if (data.descripcion !== undefined) rol.descripcion = data.descripcion ?? null
      await rol.save()
      return response.ok({ message: 'Rol actualizado correctamente', data: rol })
    } catch (error: any) {
      if (error.code === 'E_VALIDATION_ERROR') {
        return response.unprocessableEntity({ message: 'Error de validación', errors: error.messages })
      }
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