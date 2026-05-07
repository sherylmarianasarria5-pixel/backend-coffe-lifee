import type { HttpContext } from '@adonisjs/core/http'
import AnalisisIa from '#models/analisis_ia'

export default class AnalisisIaController {

  async index({ response }: HttpContext) {
    try {
      const analisis = await AnalisisIa.query()
        .preload('imagen')
        .preload('estadoAnalisis')
        .preload('nivelRoya')
      return response.ok(analisis)
    } catch (error: any) {
      return response.internalServerError({
        message: 'Error al obtener análisis IA',
        error: error.message,
      })
    }
  }

  async store({ request, response }: HttpContext) {
    try {
      const data = request.only([
        'idImagen',
        'idEstado',
        'resultado',
        'porcentajeConfianza',
        'idNivelRoya',
      ])

      if (!data.idImagen) {
        return response.badRequest({ message: 'El idImagen es obligatorio' })
      }

      if (!data.idEstado) {
        return response.badRequest({ message: 'El idEstado es obligatorio' })
      }

      const analisis = await AnalisisIa.create({
        idImagen:            data.idImagen,
        idEstado:            data.idEstado,
        resultado:           data.resultado ?? null,
        porcentajeConfianza: data.porcentajeConfianza ?? null,
        idNivelRoya:         data.idNivelRoya ?? null,
      })

      return response.created({
        message: 'Análisis IA creado correctamente',
        data: analisis,
      })
    } catch (error: any) {
      return response.internalServerError({
        message: 'Error al crear análisis IA',
        error: error.message,
      })
    }
  }

  async show({ params, response }: HttpContext) {
    try {
      const analisis = await AnalisisIa.query()
        .where('id_analisis', params.id)
        .preload('imagen')
        .preload('estadoAnalisis')
        .preload('nivelRoya')
        .firstOrFail()
      return response.ok(analisis)
    } catch {
      return response.notFound({ message: 'Análisis IA no encontrado' })
    }
  }

  async update({ params, request, response }: HttpContext) {
    try {
      const analisis = await AnalisisIa.findOrFail(params.id)
      const data = request.only([
        'idEstado',
        'resultado',
        'porcentajeConfianza',
        'idNivelRoya',
      ])

      const payload: Record<string, any> = {}
      if (data.idEstado            !== undefined) payload.idEstado            = data.idEstado
      if (data.resultado           !== undefined) payload.resultado           = data.resultado
      if (data.porcentajeConfianza !== undefined) payload.porcentajeConfianza = data.porcentajeConfianza
      if (data.idNivelRoya         !== undefined) payload.idNivelRoya         = data.idNivelRoya

      analisis.merge(payload)
      await analisis.save()

      return response.ok({
        message: 'Análisis IA actualizado correctamente',
        data: analisis,
      })
    } catch (error: any) {
      return response.internalServerError({
        message: 'Error al actualizar análisis IA',
        error: error.message,
      })
    }
  }

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