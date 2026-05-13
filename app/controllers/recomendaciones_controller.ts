import type { HttpContext } from '@adonisjs/core/http'
import Recomendacione from '#models/recomendacione'

export default class RecomendacionesController {

  /**
   * @index
   * @summary Listar recomendaciones
   * @responseBody 200 - [{"idRecomendacion": 1, "descripcion": "Aplicar fungicida", "idMonitoreo": 1, "idPrioridad": 2}]
   */
  async index({ request, response }: HttpContext) {
    try {
      const page        = Number(request.input('page', 1))
      const limit       = Number(request.input('limit', 10))
      const idMonitoreo = request.input('id_monitoreo')
      const idExperto   = request.input('id_experto_emisor')
      const idPrioridad = request.input('id_prioridad')

      const query = Recomendacione.query()
        .preload('monitoreo')
        .preload('experto')
        .preload('tipo')
        .preload('tratamientos')
        .orderBy('fecha_registro', 'desc')

      if (idMonitoreo) query.where('id_monitoreo', idMonitoreo)
      if (idExperto)   query.where('id_experto_emisor', idExperto)
      if (idPrioridad) query.where('id_prioridad', idPrioridad)

      const recomendaciones = await query.paginate(page, limit)
      return response.ok(recomendaciones)
    } catch (error: any) {
      return response.internalServerError({ message: 'Error al obtener recomendaciones', error: error.message })
    }
  }

  /**
   * @store
   * @summary Crear recomendación
   * @requestBody {"id_monitoreo": 1, "id_experto_emisor": 2, "id_tipo": 1, "id_prioridad": 2, "descripcion": "Aplicar fungicida cobre", "fecha_limite": "2026-06-01"}
   * @responseBody 201 - {"message": "Recomendación creada correctamente", "data": {"idRecomendacion": 1}}
   * @responseBody 400 - {"message": "El id_monitoreo es obligatorio"}
   */
  async store({ request, response }: HttpContext) {
    try {
      const data = request.only([
        'id_monitoreo',
        'id_experto_emisor',
        'id_tipo',
        'id_prioridad',
        'descripcion',
        'fecha_limite',
      ])

      if (!data.id_monitoreo) return response.badRequest({ message: 'El id_monitoreo es obligatorio' })
      if (!data.descripcion)  return response.badRequest({ message: 'La descripcion es obligatoria' })

      const recomendacion = await Recomendacione.create({
        idMonitoreo:     data.id_monitoreo,
        idExpertoEmisor: data.id_experto_emisor ?? null,
        idTipo:          data.id_tipo           ?? null,
        idPrioridad:     data.id_prioridad      ?? null,
        descripcion:     data.descripcion,
        fechaLimite:     data.fecha_limite       ?? null,
      })

      await recomendacion.load('monitoreo')
      await recomendacion.load('experto')
      await recomendacion.load('tipo')

      return response.created({ message: 'Recomendación creada correctamente', data: recomendacion })
    } catch (error: any) {
      return response.internalServerError({ message: 'Error al crear recomendación', error: error.message })
    }
  }

  /**
   * @show
   * @summary Ver recomendación por ID
   * @responseBody 200 - {"idRecomendacion": 1, "descripcion": "Aplicar fungicida", "idPrioridad": 2}
   * @responseBody 404 - {"message": "Recomendación no encontrada"}
   */
  async show({ params, response }: HttpContext) {
    try {
      const recomendacion = await Recomendacione.query()
        .where('id_recomendacion', params.id)
        .preload('monitoreo')
        .preload('experto')
        .preload('tipo')
        .preload('tratamientos')
        .firstOrFail()
      return response.ok(recomendacion)
    } catch {
      return response.notFound({ message: 'Recomendación no encontrada' })
    }
  }

  /**
   * @update
   * @summary Actualizar recomendación
   * @requestBody {"id_tipo": 2, "id_prioridad": 1, "descripcion": "Actualizada", "fecha_limite": "2026-07-01"}
   * @responseBody 200 - {"message": "Recomendación actualizada correctamente"}
   * @responseBody 404 - {"message": "Recomendación no encontrada"}
   */
  async update({ params, request, response }: HttpContext) {
    try {
      const recomendacion = await Recomendacione.findOrFail(params.id)
      const data = request.only([
        'id_monitoreo',
        'id_experto_emisor',
        'id_tipo',
        'id_prioridad',
        'descripcion',
        'fecha_limite',
      ])

      const payload: Record<string, any> = {}
      if (data.id_monitoreo      !== undefined) payload.idMonitoreo     = data.id_monitoreo
      if (data.id_experto_emisor !== undefined) payload.idExpertoEmisor = data.id_experto_emisor
      if (data.id_tipo           !== undefined) payload.idTipo          = data.id_tipo
      if (data.id_prioridad      !== undefined) payload.idPrioridad     = data.id_prioridad
      if (data.descripcion       !== undefined) payload.descripcion     = data.descripcion
      if (data.fecha_limite      !== undefined) payload.fechaLimite     = data.fecha_limite

      recomendacion.merge(payload)
      await recomendacion.save()
      await recomendacion.load('monitoreo')
      await recomendacion.load('experto')
      await recomendacion.load('tipo')

      return response.ok({ message: 'Recomendación actualizada correctamente', data: recomendacion })
    } catch (error: any) {
      return response.internalServerError({ message: 'Error al actualizar recomendación', error: error.message })
    }
  }

  /**
   * @destroy
   * @summary Eliminar recomendación
   * @responseBody 200 - {"message": "Recomendación eliminada correctamente"}
   * @responseBody 404 - {"message": "Recomendación no encontrada"}
   */
  async destroy({ params, response }: HttpContext) {
    try {
      const recomendacion = await Recomendacione.findOrFail(params.id)
      await recomendacion.delete()
      return response.ok({ message: 'Recomendación eliminada correctamente' })
    } catch (error: any) {
      return response.internalServerError({ message: 'Error al eliminar recomendación', error: error.message })
    }
  }
}
