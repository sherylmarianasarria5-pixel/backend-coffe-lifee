import type { HttpContext } from '@adonisjs/core/http'
import CatTiposRecomendacion from '#models/cat_tipo_recomendacion'
import { catalogoStoreValidator, catalogoUpdateValidator } from '#validators/validators'

export default class CatTiposRecomendacionsController {

  /**
   * @index
   * @summary Listar tipos de recomendación
   * @responseBody 200 - {"data": [{"idTipo": 1, "nombreTipo": "Preventiva", "descripcion": "Acción preventiva"}]}
   */
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

  /**
   * @store
   * @summary Crear tipo de recomendación
   * @requestBody {"nombre": "Preventiva", "descripcion": "Acción preventiva"}
   * @responseBody 201 - {"message": "Tipo de recomendación creado correctamente", "data": {"idTipo": 1}}
   * @responseBody 422 - {"message": "Error de validación"}
   */
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

  /**
   * @show
   * @summary Ver tipo de recomendación por ID
   * @responseBody 200 - {"idTipo": 1, "nombreTipo": "Preventiva"}
   * @responseBody 404 - {"message": "Tipo de recomendación no encontrado"}
   */
  async show({ params, response }: HttpContext) {
    try {
      const tipo = await CatTiposRecomendacion.findOrFail(params.id)
      return response.ok(tipo)
    } catch {
      return response.notFound({ message: 'Tipo de recomendación no encontrado' })
    }
  }

  /**
   * @update
   * @summary Actualizar tipo de recomendación
   * @requestBody {"nombre": "Correctiva", "descripcion": "Acción correctiva"}
   * @responseBody 200 - {"message": "Tipo de recomendación actualizado correctamente"}
   * @responseBody 422 - {"message": "Error de validación"}
   */
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

  /**
   * @destroy
   * @summary Eliminar tipo de recomendación
   * @responseBody 200 - {"message": "Tipo de recomendación eliminado correctamente"}
   * @responseBody 404 - {"message": "Tipo de recomendación no encontrado"}
   */
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
