import type { HttpContext } from '@adonisjs/core/http'
import CatTiposRecomendacion from '#models/cat_tipos_recomendacion'
import { catalogoStoreValidator, catalogoUpdateValidator } from '#validators/validators'

export default class CatTiposRecomendacionsController {

  async index({ request, response }: HttpContext) {
    try {
      const page  = Number(request.input('page', 1))
      const limit = Number(request.input('limit', 20))
      const tipos = await CatTiposRecomendacion.query().paginate(page, limit)
      return response.ok(tipos)
    } catch (error: any) {
      return response.internalServerError({ message: 'Error al obtener tipos de recomendación', error: error.message })
    }
  }

  async store({ request, response }: HttpContext) {
    try {
      const data = await request.validateUsing(catalogoStoreValidator)
      const tipo = await CatTiposRecomendacion.create({ nombreTipo: data.nombre, descripcion: data.descripcion ?? null })
      return response.created({ message: 'Tipo de recomendación creado correctamente', data: tipo })
    } catch (error: any) {
      if (error.code === 'E_VALIDATION_ERROR') {
        return response.unprocessableEntity({ message: 'Error de validación', errors: error.messages })
      }
      return response.internalServerError({ message: 'Error al crear tipo de recomendación', error: error.message })
    }
  }

  async show({ params, response }: HttpContext) {
    try {
      const tipo = await CatTiposRecomendacion.findOrFail(params.id)
      return response.ok(tipo)
    } catch {
      return response.notFound({ message: 'Tipo de recomendación no encontrado' })
    }
  }

  async update({ params, request, response }: HttpContext) {
    try {
      const tipo = await CatTiposRecomendacion.findOrFail(params.id)
      const data = await request.validateUsing(catalogoUpdateValidator)
      if (data.nombre      !== undefined) tipo.nombreTipo  = data.nombre
      if (data.descripcion !== undefined) tipo.descripcion = data.descripcion ?? null
      await tipo.save()
      return response.ok({ message: 'Tipo de recomendación actualizado correctamente', data: tipo })
    } catch (error: any) {
      if (error.code === 'E_VALIDATION_ERROR') {
        return response.unprocessableEntity({ message: 'Error de validación', errors: error.messages })
      }
      return response.internalServerError({ message: 'Error al actualizar tipo de recomendación', error: error.message })
    }
  }

  async destroy({ params, response }: HttpContext) {
    try {
      const tipo = await CatTiposRecomendacion.findOrFail(params.id)
      await tipo.delete()
      return response.ok({ message: 'Tipo de recomendación eliminado correctamente' })
    } catch (error: any) {
      return response.internalServerError({ message: 'Error al eliminar tipo de recomendación', error: error.message })
    }
  }
}