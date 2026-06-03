import type { HttpContext } from '@adonisjs/core/http'
import AplicacionesTratamiento from '#models/aplicaciones_tratamiento'

export default class AplicacionesTratamientosController {
  /**
   * @index
   * @summary Listar aplicaciones de tratamiento
   * @responseBody 200 - {"data": [{"idAplicacion": 1, "dosis": "500ml", "frecuencia": "Cada 15 días"}]}
   */
  async index({ request, response }: HttpContext) {
    try {
      const page = Number(request.input('page', 1))
      const limit = Number(request.input('limit', 10))
      const aplicaciones = await AplicacionesTratamiento.query()
        .preload('tratamiento')
        .preload('usuario')
        .orderBy('fecha_registro', 'desc')
        .paginate(page, limit)
      return response.ok(aplicaciones.toJSON())
    } catch (error: any) {
      return response.internalServerError({ message: 'Error al obtener aplicaciones de tratamiento', error: error.message })
    }
  }

  /**
   * @show
   * @summary Ver aplicación de tratamiento por ID
   * @responseBody 200 - {"data": {"idAplicacion": 1, "dosis": "500ml"}}
   * @responseBody 404 - {"message": "Aplicación de tratamiento no encontrada"}
   */
  async show({ params, response }: HttpContext) {
    try {
      const aplicacion = await AplicacionesTratamiento.query()
        .where('id_aplicacion', params.id)
        .preload('tratamiento')
        .preload('usuario')
        .firstOrFail()
      return response.ok({ data: aplicacion })
    } catch {
      return response.notFound({ message: 'Aplicación de tratamiento no encontrada' })
    }
  }

  /**
   * @store
   * @summary Crear aplicación de tratamiento
   * @requestBody {"id_tratamiento": 1, "id_usuario": 3, "dosis": "500ml por hectárea", "frecuencia": "Cada 15 días", "observaciones": "Aplicar en la mañana"}
   * @responseBody 201 - {"message": "Aplicación de tratamiento creada correctamente", "data": {"idAplicacion": 1}}
   * @responseBody 400 - {"message": "La dosis es obligatoria"}
   */
  async store({ request, response }: HttpContext) {
    try {
      const data = request.only(['id_tratamiento', 'id_usuario', 'dosis', 'frecuencia', 'observaciones'])

      if (!data.dosis) return response.badRequest({ message: 'La dosis es obligatoria' })

      const aplicacion = await AplicacionesTratamiento.create({
        idTratamiento: data.id_tratamiento ?? null,
        idUsuario:     data.id_usuario     ?? null,
        dosis:         data.dosis,
        frecuencia:    data.frecuencia     ?? null,
        observaciones: data.observaciones  ?? null,
      })

      await aplicacion.load('tratamiento')
      await aplicacion.load('usuario')

      return response.created({ message: 'Aplicación de tratamiento creada correctamente', data: aplicacion })
    } catch (error: any) {
      return response.internalServerError({ message: 'Error al crear aplicación de tratamiento', error: error.message })
    }
  }

  /**
   * @update
   * @summary Actualizar aplicación de tratamiento
   * @requestBody {"id_tratamiento": 1, "id_usuario": 3, "dosis": "600ml", "frecuencia": "Cada 20 días", "observaciones": "Actualizado"}
   * @responseBody 200 - {"message": "Aplicación actualizada correctamente"}
   * @responseBody 404 - {"message": "Aplicación no encontrada"}
   */
  async update({ params, request, response }: HttpContext) {
    try {
      const aplicacion = await AplicacionesTratamiento.findOrFail(params.id)
      const data = request.only(['id_tratamiento', 'id_usuario', 'dosis', 'frecuencia', 'observaciones'])

      const payload: Record<string, any> = {}
      if (data.id_tratamiento !== undefined) payload.idTratamiento = data.id_tratamiento
      if (data.id_usuario     !== undefined) payload.idUsuario     = data.id_usuario
      if (data.dosis          !== undefined) payload.dosis         = data.dosis
      if (data.frecuencia     !== undefined) payload.frecuencia    = data.frecuencia
      if (data.observaciones  !== undefined) payload.observaciones = data.observaciones

      aplicacion.merge(payload)
      await aplicacion.save()
      await aplicacion.load('tratamiento')
      await aplicacion.load('usuario')

      return response.ok({ message: 'Aplicación actualizada correctamente', data: aplicacion })
    } catch (error: any) {
      return response.internalServerError({ message: 'Error al actualizar aplicación de tratamiento', error: error.message })
    }
  }

  /**
   * @destroy
   * @summary Eliminar aplicación de tratamiento
   * @responseBody 200 - {"message": "Aplicación eliminada correctamente"}
   * @responseBody 404 - {"message": "Aplicación no encontrada"}
   */
  async destroy({ params, response }: HttpContext) {
    try {
      const aplicacion = await AplicacionesTratamiento.findOrFail(params.id)
      await aplicacion.delete()
      return response.ok({ message: 'Aplicación eliminada correctamente' })
    } catch (error: any) {
      return response.internalServerError({ message: 'Error al eliminar aplicación de tratamiento', error: error.message })
    }
  }
}
