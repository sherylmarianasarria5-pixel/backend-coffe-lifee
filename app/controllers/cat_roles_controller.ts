import type { HttpContext } from '@adonisjs/core/http'
import CatRol from '#models/cat_rol'
import { catalogoStoreValidator, catalogoUpdateValidator } from '#validators/validators'

export default class CatRolesController {
  /**
   * @index
   * @summary Listar roles
   * @responseBody 200 - {"data": [{"idRol": 1, "nombreRol": "admin", "descripcion": "Administrador del sistema"}]}
   */
  async index({ request, response }: HttpContext) {
    try {
      const page = Number(request.input('page', 1))
      const limit = Number(request.input('limit', 20))
      const search = request.input('search', '')
      const query = CatRol.query()
      if (search) {
        query.whereILike('nombre_rol', `%${search}%`)
      }
      const ALLOWED = ['id_rol', 'nombre_rol', 'descripcion', 'created_at', 'updated_at']
      const orderBy = request.input('order_by', 'id_rol')
      const orderDir = request.input('order_dir', 'desc')
      const safeColumn = ALLOWED.includes(orderBy) ? orderBy : 'id_rol'
      query.orderBy(safeColumn, orderDir === 'asc' ? 'asc' : 'desc')

      const roles = await query.paginate(page, limit)
      return response.ok(roles)
    } catch (error: any) {
      return response.internalServerError({
        message: 'Error al obtener roles',
        error: error.message,
      })
    }
  }

  /**
   * @store
   * @summary Crear rol
   * @requestBody {"nombre": "admin", "descripcion": "Administrador del sistema"}
   * @responseBody 201 - {"message": "Rol creado correctamente", "data": {"idRol": 1}}
   * @responseBody 422 - {"message": "Error de validación"}
   */
  async store({ request, response }: HttpContext) {
    try {
      const data = await request.validateUsing(catalogoStoreValidator)
      const rol = await CatRol.create({
        nombreRol: data.nombre,
        descripcion: data.descripcion ?? null,
      })
      return response.created({ message: 'Rol creado correctamente', data: rol })
    } catch (error: any) {
      if (error.code === 'E_VALIDATION_ERROR') {
        return response.unprocessableEntity({
          message: 'Error de validación',
          errors: error.messages,
        })
      }
      return response.internalServerError({ message: 'Error al crear rol', error: error.message })
    }
  }

  /**
   * @show
   * @summary Ver rol por ID
   * @responseBody 200 - {"idRol": 1, "nombreRol": "admin"}
   * @responseBody 404 - {"message": "Rol no encontrado"}
   */
  async show({ params, response }: HttpContext) {
    try {
      const rol = await CatRol.findOrFail(params.id)
      return response.ok(rol)
    } catch {
      return response.notFound({ message: 'Rol no encontrado' })
    }
  }

  /**
   * @update
   * @summary Actualizar rol
   * @requestBody {"nombre": "experto", "descripcion": "Experto en cultivos"}
   * @responseBody 200 - {"message": "Rol actualizado correctamente"}
   * @responseBody 422 - {"message": "Error de validación"}
   */
  async update({ params, request, response }: HttpContext) {
    try {
      const rol = await CatRol.findOrFail(params.id)
      const data = await request.validateUsing(catalogoUpdateValidator)
      if (data.nombre !== undefined) rol.nombreRol = data.nombre
      if (data.descripcion !== undefined) rol.descripcion = data.descripcion ?? null
      await rol.save()
      return response.ok({ message: 'Rol actualizado correctamente', data: rol })
    } catch (error: any) {
      if (error.code === 'E_VALIDATION_ERROR') {
        return response.unprocessableEntity({
          message: 'Error de validación',
          errors: error.messages,
        })
      }
      return response.internalServerError({
        message: 'Error al actualizar rol',
        error: error.message,
      })
    }
  }

  /**
   * @destroy
   * @summary Eliminar rol
   * @responseBody 200 - {"message": "Rol eliminado correctamente"}
   * @responseBody 404 - {"message": "Rol no encontrado"}
   */
  async destroy({ params, response }: HttpContext) {
    try {
      const rol = await CatRol.findOrFail(params.id)
      await rol.delete()
      return response.ok({ message: 'Rol eliminado correctamente' })
    } catch (error: any) {
      return response.internalServerError({
        message: 'Error al eliminar rol',
        error: error.message,
      })
    }
  }
}
