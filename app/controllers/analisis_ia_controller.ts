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
        'id_imagen',
        'id_estado',
        'resultado',
        'porcentaje_confianza',
        'id_nivel_roya',
      ])

      if (!data.id_imagen) {
        return response.badRequest({ message: 'El id_imagen es obligatorio' })
      }

      if (!data.id_estado) {
        return response.badRequest({ message: 'El id_estado es obligatorio' })
      }

      const analisis = await AnalisisIa.create({
        idImagen:            data.id_imagen,
        idEstadoAnalisis:    data.id_estado,
        resultado:           data.resultado,
        porcentajeConfianza: data.porcentaje_confianza,
        idNivelRoya:         data.id_nivel_roya,
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
        .where('idAnalisis', params.id)
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
        'id_estado',
        'resultado',
        'porcentaje_confianza',
        'id_nivel_roya',
      ])

      const payload: Record<string, any> = {}
      if (data.id_estado            !== undefined) payload.idEstadoAnalisis    = data.id_estado
      if (data.resultado            !== undefined) payload.resultado           = data.resultado
      if (data.porcentaje_confianza !== undefined) payload.porcentajeConfianza = data.porcentaje_confianza
      if (data.id_nivel_roya        !== undefined) payload.idNivelRoya         = data.id_nivel_roya

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
