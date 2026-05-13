import type { HttpContext } from '@adonisjs/core/http'
import AnalisisIa from '#models/analisis_ia'
import { analisisIaStoreValidator, analisisIaUpdateValidator } from '#validators/validators'

export default class AnalisisIaController {

  /**
   * @index
   * @summary Listar análisis IA
   * @responseBody 200 - [{"idAnalisis": 1, "resultado": "Roya detectada", "porcentajeConfianza": "0.95"}]
   */
  async index({ request, response }: HttpContext) {
    try {
      const page     = Number(request.input('page', 1))
      const limit    = Number(request.input('limit', 10))
      const idImagen = request.input('id_imagen')
      const idEstado = request.input('id_estado')

      const query = AnalisisIa.query()
        .preload('imagen')
        .preload('estadoAnalisis')
        .preload('nivelRoya')
        .orderBy('fechaRegistro', 'desc')

      if (idImagen) query.where('idImagen', idImagen)
      if (idEstado) query.where('idEstado', idEstado)

      const analisis = await query.paginate(page, limit)
      return response.ok(analisis)
    } catch (error: any) {
      return response.internalServerError({ message: 'Error al obtener análisis IA', error: error.message })
    }
  }

  /**
   * @store
   * @summary Crear análisis IA
   * @requestBody {"id_imagen": 1, "id_estado_analisis": 1, "resultado": "Roya detectada", "confianza": "0.95"}
   * @responseBody 201 - {"message": "Análisis IA creado correctamente"}
   * @responseBody 422 - {"message": "Error de validación"}
   */
  async store({ request, response }: HttpContext) {
    try {
      const data = await request.validateUsing(analisisIaStoreValidator)

      const analisis = await AnalisisIa.create({
        idImagen:            data.id_imagen          ?? null,
        idEstado:            data.id_estado_analisis ?? null,
        resultado:           data.resultado          ?? null,
        porcentajeConfianza: data.confianza          ?? null,
        idNivelRoya:         null,
      })

      await analisis.load('estadoAnalisis')
      await analisis.load('nivelRoya')

      return response.created({ message: 'Análisis IA creado correctamente', data: analisis })
    } catch (error: any) {
      if (error.code === 'E_VALIDATION_ERROR') {
        return response.unprocessableEntity({ message: 'Error de validación', errors: error.messages })
      }
      return response.internalServerError({ message: 'Error al crear análisis IA', error: error.message })
    }
  }

  /**
   * @show
   * @summary Ver análisis IA por ID
   * @responseBody 200 - {"idAnalisis": 1, "resultado": "Roya detectada"}
   * @responseBody 404 - {"message": "Análisis IA no encontrado"}
   */
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

  /**
   * @update
   * @summary Actualizar análisis IA
   * @requestBody {"id_estado_analisis": 2, "resultado": "Sin roya", "confianza": "0.99"}
   * @responseBody 200 - {"message": "Análisis IA actualizado correctamente"}
   * @responseBody 422 - {"message": "Error de validación"}
   */
  async update({ params, request, response }: HttpContext) {
    try {
      const analisis = await AnalisisIa.findOrFail(params.id)
      const data     = await request.validateUsing(analisisIaUpdateValidator)

      const payload: Record<string, any> = {}
      if (data.id_estado_analisis !== undefined) payload.idEstado            = data.id_estado_analisis
      if (data.resultado          !== undefined) payload.resultado           = data.resultado
      if (data.confianza          !== undefined) payload.porcentajeConfianza = data.confianza
      if (data.observaciones      !== undefined) payload.observaciones       = data.observaciones

      analisis.merge(payload)
      await analisis.save()
      await analisis.load('estadoAnalisis')

      return response.ok({ message: 'Análisis IA actualizado correctamente', data: analisis })
    } catch (error: any) {
      if (error.code === 'E_VALIDATION_ERROR') {
        return response.unprocessableEntity({ message: 'Error de validación', errors: error.messages })
      }
      return response.internalServerError({ message: 'Error al actualizar análisis IA', error: error.message })
    }
  }

  /**
   * @destroy
   * @summary Eliminar análisis IA
   * @responseBody 200 - {"message": "Análisis IA eliminado correctamente"}
   * @responseBody 404 - {"message": "Análisis IA no encontrado"}
   */
  async destroy({ params, response }: HttpContext) {
    try {
      const analisis = await AnalisisIa.findOrFail(params.id)
      await analisis.delete()
      return response.ok({ message: 'Análisis IA eliminado correctamente' })
    } catch (error: any) {
      return response.internalServerError({ message: 'Error al eliminar análisis IA', error: error.message })
    }
  }
}
