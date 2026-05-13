import type { HttpContext } from '@adonisjs/core/http'
import CatEstadosAnalisi from '#models/cat_estado_analisis'
import { catalogoStoreValidator, catalogoUpdateValidator } from '#validators/validators'

export default class CatEstadosAnalisisController {

  /**
   * @index
   * @summary Listar estados de análisis
   * @responseBody 200 - {"data": [{"idEstado": 1, "nombreEstado": "Pendiente", "descripcion": "En espera"}]}
   */
  async index({ request, response }: HttpContext) {
    try {
      const page    = Number(request.input('page', 1))
      const limit   = Number(request.input('limit', 20))
      const estados = await CatEstadosAnalisi.query().paginate(page, limit)
      return response.ok(estados)
    } catch (error: any) {
      return response.internalServerError({ message: 'Error al obtener estados de análisis', error: error.message })
    }
  }

  /**
   * @store
   * @summary Crear estado de análisis
   * @requestBody {"nombre": "Pendiente", "descripcion": "En espera de revisión"}
   * @responseBody 201 - {"message": "Estado de análisis creado correctamente", "data": {"idEstado": 1}}
   * @responseBody 422 - {"message": "Error de validación"}
   */
  async store({ request, response }: HttpContext) {
    try {
      const data   = await request.validateUsing(catalogoStoreValidator)
      const estado = await CatEstadosAnalisi.create({ nombreEstado: data.nombre, descripcion: data.descripcion ?? null })
      return response.created({ message: 'Estado de análisis creado correctamente', data: estado })
    } catch (error: any) {
      if (error.code === 'E_VALIDATION_ERROR') {
        return response.unprocessableEntity({ message: 'Error de validación', errors: error.messages })
      }
      return response.internalServerError({ message: 'Error al crear estado de análisis', error: error.message })
    }
  }

  /**
   * @show
   * @summary Ver estado de análisis por ID
   * @responseBody 200 - {"idEstado": 1, "nombreEstado": "Pendiente"}
   * @responseBody 404 - {"message": "Estado de análisis no encontrado"}
   */
  async show({ params, response }: HttpContext) {
    try {
      const estado = await CatEstadosAnalisi.findOrFail(params.id)
      return response.ok(estado)
    } catch {
      return response.notFound({ message: 'Estado de análisis no encontrado' })
    }
  }

  /**
   * @update
   * @summary Actualizar estado de análisis
   * @requestBody {"nombre": "Completado", "descripcion": "Análisis finalizado"}
   * @responseBody 200 - {"message": "Estado de análisis actualizado correctamente"}
   * @responseBody 422 - {"message": "Error de validación"}
   */
  async update({ params, request, response }: HttpContext) {
    try {
      const estado = await CatEstadosAnalisi.findOrFail(params.id)
      const data   = await request.validateUsing(catalogoUpdateValidator)
      if (data.nombre      !== undefined) estado.nombreEstado = data.nombre
      if (data.descripcion !== undefined) estado.descripcion  = data.descripcion ?? null
      await estado.save()
      return response.ok({ message: 'Estado de análisis actualizado correctamente', data: estado })
    } catch (error: any) {
      if (error.code === 'E_VALIDATION_ERROR') {
        return response.unprocessableEntity({ message: 'Error de validación', errors: error.messages })
      }
      return response.internalServerError({ message: 'Error al actualizar estado de análisis', error: error.message })
    }
  }

  /**
   * @destroy
   * @summary Eliminar estado de análisis
   * @responseBody 200 - {"message": "Estado de análisis eliminado correctamente"}
   * @responseBody 404 - {"message": "Estado de análisis no encontrado"}
   */
  async destroy({ params, response }: HttpContext) {
    try {
      const estado = await CatEstadosAnalisi.findOrFail(params.id)
      await estado.delete()
      return response.ok({ message: 'Estado de análisis eliminado correctamente' })
    } catch (error: any) {
      return response.internalServerError({ message: 'Error al eliminar estado de análisis', error: error.message })
    }
  }
}
