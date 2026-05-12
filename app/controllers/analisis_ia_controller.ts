import type { HttpContext } from '@adonisjs/core/http'
import AnalisisIa from '#models/analisis_ia'
import { analisisIaStoreValidator, analisisIaUpdateValidator } from '#validators/validators'

export default class AnalisisIaController {
  // GET /analisis_ia?page=1&limit=10&id_monitoreo=3&id_estado=1
  async index({ request, response }: HttpContext) {
    try {
      const page = Number(request.input('page', 1))
      const limit = Number(request.input('limit', 10))
      const idMonitoreo = request.input('id_monitoreo')
      const idEstado = request.input('id_estado')

      const query = AnalisisIa.query()
        .preload('monitoreo')
        .preload('estadoAnalisis')
        .orderBy('created_at', 'desc')

      if (idMonitoreo) query.where('id_monitoreo', idMonitoreo)
      if (idEstado) query.where('id_estado_analisis', idEstado)

      const analisis = await query.paginate(page, limit)
      return response.ok(analisis)
    } catch (error: any) {
      return response.internalServerError({
        message: 'Error al obtener análisis IA',
        error: error.message,
      })
    }
  }

  // POST /analisis_ia
  async store({ request, response }: HttpContext) {
    try {
      const data = await request.validateUsing(analisisIaStoreValidator)

      const analisis = await AnalisisIa.create({
        idMonitoreo: data.id_monitoreo,
        idEstadoAnalisis: data.id_estado_analisis ?? null,
        resultado: data.resultado ?? null,
        confianza: data.confianza ?? null,
        observaciones: data.observaciones ?? null,
      })

      await analisis.load('monitoreo')
      await analisis.load('estadoAnalisis')

      return response.created({
        message: 'Análisis IA creado correctamente',
        data: analisis,
      })
    } catch (error: any) {
      if (error.code === 'E_VALIDATION_ERROR') {
        return response.unprocessableEntity({
          message: 'Error de validación',
          errors: error.messages,
        })
      }
      return response.internalServerError({
        message: 'Error al crear análisis IA',
        error: error.message,
      })
    }
  }

  // GET /analisis_ia/:id
  async show({ params, response }: HttpContext) {
    try {
      const analisis = await AnalisisIa.query()
        .where('id_analisis_ia', params.id)
        .preload('monitoreo', (q) => q.preload('cultivo'))
        .preload('estadoAnalisis')
        .preload('recomendaciones')
        .firstOrFail()

      return response.ok(analisis)
    } catch {
      return response.notFound({ message: 'Análisis IA no encontrado' })
    }
  }

  // PUT /analisis_ia/:id
  async update({ params, request, response }: HttpContext) {
    try {
      const analisis = await AnalisisIa.findOrFail(params.id)
      const data     = await request.validateUsing(analisisIaUpdateValidator)

      const payload: Record<string, any> = {}
      if (data.id_estado_analisis !== undefined) payload.idEstadoAnalisis = data.id_estado_analisis
      if (data.resultado !== undefined) payload.resultado = data.resultado
      if (data.confianza !== undefined) payload.confia = data.confianza
      if (data.observaciones !== undefined) payload.observaciones = data.observaciones

      analisis.merge(payload)
      await analisis.save()
      await analisis.load('estadoAnalisis')

      return response.ok({
        message: 'Análisis IA actualizado correctamente',
        data: analisis,
      })
    } catch (error: any) {
      if (error.code === 'E_VALIDATION_ERROR') {
        return response.unprocessableEntity({
          message: 'Error de validación',
          errors: error.messages,
        })
      }
      return response.internalServerError({
        message: 'Error al actualizar análisis IA',
        error: error.message,
      })
    }
  }

  // DELETE /analisis_ia/:id
  async destroy({ params, response }: HttpContext) {
    try {
      const analisis = await AnalisisIa.findOrFail(params.id)
      await analisis.delete()
      return response.ok({ message: 'Análisis IA eliminado correctamente' })
    } catch (error: any) {
      return response.internalServerError({
        message: 'Error al eliminar análisis IA',
        error: error.message,
      })
    }
  }
}
