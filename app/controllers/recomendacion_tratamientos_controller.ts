import type { HttpContext } from '@adonisjs/core/http'
import Recomendacione from '#models/recomendacione'
import { recomendacionStoreValidator, recomendacionUpdateValidator } from '#validators/validators'

export default class RecomendacionesController {
  // GET /recomendaciones?page=1&limit=10&id_analisis_ia=5&id_prioridad=1
  async index({ request, response }: HttpContext) {
    try {
      const page = Number(request.input('page', 1))
      const limit = Number(request.input('limit', 10))
      const idAnalisisIa = request.input('id_analisis_ia')
      const idPrioridad = request.input('id_prioridad')
      const search = request.input('search', '')

      const query = Recomendacione.query()
        .preload('tipoRecomendacion')
        .preload('prioridad')
        .orderBy('fecha_recomendacion', 'desc')

      if (idAnalisisIa) query.where('id_analisis_ia', idAnalisisIa)
      if (idPrioridad) query.where('id_prioridad', idPrioridad)
      if (search) {
        query.whereILike('descripcion', `%${search}%`)
      }

      const recomendaciones = await query.paginate(page, limit)
      return response.ok(recomendaciones)
    } catch (error: any) {
      return response.internalServerError({
        message: 'Error al obtener recomendaciones',
        error: error.message,
      })
    }
  }

  // POST /recomendaciones
  async store({ request, response }: HttpContext) {
    try {
      const data = await request.validateUsing(recomendacionStoreValidator)

      const recomendacion = await Recomendacione.create({
        idAnalisisIa: data.id_analisis_ia,
        idTipoRecomendacion: data.id_tipo_recomendacion ?? null,
        idPrioridad: data.id_prioridad ?? null,
        descripcion: data.descripcion,
        accionesSugeridas: data.acciones_sugeridas ?? null,
        fechaRecomendacion: data.fecha_recomendacion ?? null,
      })

      await recomendacion.load('tipoRecomendacion')
      await recomendacion.load('prioridad')

      return response.created({
        message: 'Recomendación creada correctamente',
        data: recomendacion,
      })
    } catch (error: any) {
      if (error.code === 'E_VALIDATION_ERROR') {
        return response.unprocessableEntity({
          message: 'Error de validación',
          errors: error.messages,
        })
      }
      return response.internalServerError({
        message: 'Error al crear recomendación',
        error: error.message,
      })
    }
  }

  // GET /recomendaciones/:id
  async show({ params, response }: HttpContext) {
    try {
      const recomendacion = await Recomendacione.query()
        .where('id_recomendacion', params.id)
        .preload('tipoRecomendacion')
        .preload('prioridad')
        .preload('tratamientos')
        .firstOrFail()

      return response.ok(recomendacion)
    } catch {
      return response.notFound({ message: 'Recomendación no encontrada' })
    }
  }

  // PUT /recomendaciones/:id
  async update({ params, request, response }: HttpContext) {
    try {
      const recomendacion = await Recomendacione.findOrFail(params.id)
      const data = await request.validateUsing(recomendacionUpdateValidator)

      const payload: Record<string, any> = {}
      if (data.id_tipo_recomendacion !== undefined) payload.idTipoRecomendacion = data.id_tipo_recomendacion
      if (data.id_prioridad !== undefined) payload.idPrioridad = data.id_prioridad
      if (data.descripcion !== undefined) payload.descripcion = data.descripcion
      if (data.acciones_sugeridas !== undefined) payload.accionesSugeridas = data.acciones_sugeridas

      recomendacion.merge(payload)
      await recomendacion.save()
      await recomendacion.load('tipoRecomendacion')
      await recomendacion.load('prioridad')

      return response.ok({
        message: 'Recomendación actualizada correctamente',
        data: recomendacion,
      })
    } catch (error: any) {
      if (error.code === 'E_VALIDATION_ERROR') {
        return response.unprocessableEntity({
          message: 'Error de validación',
          errors: error.messages,
        })
      }
      return response.internalServerError({
        message: 'Error al actualizar recomendación',
        error: error.message,
      })
    }
  }

  // DELETE /recomendaciones/:id
  async destroy({ params, response }: HttpContext) {
    try {
      const recomendacion = await Recomendacione.findOrFail(params.id)
      await recomendacion.delete()
      return response.ok({ message: 'Recomendación eliminada correctamente' })
    } catch (error: any) {
      return response.internalServerError({
        message: 'Error al eliminar recomendación',
        error: error.message,
      })
    }
  }
}
