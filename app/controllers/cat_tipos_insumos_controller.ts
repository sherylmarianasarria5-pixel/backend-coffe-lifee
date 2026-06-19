import type { HttpContext } from '@adonisjs/core/http'
import CatTipoInsumo from '#models/cat_tipo_insumo'
import { catalogoStoreValidator, catalogoUpdateValidator } from '#validators/validators'

export default class CatTiposInsumosController {

  async index({ request, response }: HttpContext) {
    try {
      const page     = Number(request.input('page', 1))
      const limit    = Number(request.input('limit', 20))
      const search   = request.input('search', '')
      const query = CatTipoInsumo.query()
      if (search) {
        query.whereILike('nombre', `%${search}%`)
      }
      const ALLOWED = ['id_tipo_insumo', 'nombre', 'fecha_registro', 'fecha_actualizacion']
      const orderBy = request.input('order_by', 'id_tipo_insumo')
      const orderDir = request.input('order_dir', 'desc')
      const safeColumn = ALLOWED.includes(orderBy) ? orderBy : 'id_tipo_insumo'
      query.orderBy(safeColumn, orderDir === 'asc' ? 'asc' : 'desc')

      const tipos = await query.paginate(page, limit)
      return response.ok(tipos)
    } catch (error: any) {
      return response.internalServerError({ message: 'Error al obtener tipos de insumo', error: error.message })
    }
  }

  async store({ request, response }: HttpContext) {
    try {
      const data = await request.validateUsing(catalogoStoreValidator)
      const tipo = await CatTipoInsumo.create({ nombre: data.nombre })
      return response.created({ message: 'Tipo de insumo creado correctamente', data: tipo })
    } catch (error: any) {
      if (error.code === 'E_VALIDATION_ERROR') {
        return response.unprocessableEntity({ message: 'Error de validación', errors: error.messages })
      }
      return response.internalServerError({ message: 'Error al crear tipo de insumo', error: error.message })
    }
  }

  async show({ params, response }: HttpContext) {
    try {
      const tipo = await CatTipoInsumo.findOrFail(params.id)
      return response.ok(tipo)
    } catch {
      return response.notFound({ message: 'Tipo de insumo no encontrado' })
    }
  }

  async update({ params, request, response }: HttpContext) {
    try {
      const tipo = await CatTipoInsumo.findOrFail(params.id)
      const data = await request.validateUsing(catalogoUpdateValidator)
      if (data.nombre !== undefined) tipo.nombre = data.nombre
      await tipo.save()
      return response.ok({ message: 'Tipo de insumo actualizado correctamente', data: tipo })
    } catch (error: any) {
      if (error.code === 'E_VALIDATION_ERROR') {
        return response.unprocessableEntity({ message: 'Error de validación', errors: error.messages })
      }
      return response.internalServerError({ message: 'Error al actualizar tipo de insumo', error: error.message })
    }
  }

  async destroy({ params, response }: HttpContext) {
    try {
      const tipo = await CatTipoInsumo.findOrFail(params.id)
      await tipo.delete()
      return response.ok({ message: 'Tipo de insumo eliminado correctamente' })
    } catch (error: any) {
      return response.internalServerError({ message: 'Error al eliminar tipo de insumo', error: error.message })
    }
  }
}
