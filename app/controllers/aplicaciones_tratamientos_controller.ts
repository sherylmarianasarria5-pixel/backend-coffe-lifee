import type { HttpContext } from '@adonisjs/core/http'
import AplicacionesTratamiento from '#models/aplicaciones_tratamiento'

export default class AplicacionesTratamientosController {

  async index({ response }: HttpContext) {
    try {
      const aplicaciones = await AplicacionesTratamiento.query()
        .preload('tratamiento')
      return response.ok(aplicaciones)
    } catch (error: any) {
      return response.internalServerError({
        message: 'Error al obtener aplicaciones de tratamiento',
        error: error.message,
      })
    }
  }

  async store({ request, response }: HttpContext) {
    try {
      const data = request.only([
        'id_tratamiento',
        'dosis',
        'frecuencia',
        'observaciones',
        'id_usuario',
      ])

      if (!data.id_tratamiento) {
        return response.badRequest({ message: 'El id_tratamiento es obligatorio' })
      }

      if (!data.dosis) {
        return response.badRequest({ message: 'La dosis es obligatoria' })
      }

      const aplicacion = await AplicacionesTratamiento.create({
        idTratamiento: data.id_tratamiento,
        dosis:         data.dosis,
        frecuencia:    data.frecuencia,
        observaciones: data.observaciones,
        idUsuario:     data.id_usuario,
      })

      return response.created({
        message: 'Aplicación de tratamiento creada correctamente',
        data: aplicacion,
      })
    } catch (error: any) {
      return response.internalServerError({
        message: 'Error al crear aplicación de tratamiento',
        error: error.message,
      })
    }
  }

  async show({ params, response }: HttpContext) {
    try {
      const aplicacion = await AplicacionesTratamiento.query()
        .where('id_aplicacion', params.id)
        .preload('tratamiento')
        .firstOrFail()
      return response.ok(aplicacion)
    } catch {
      return response.notFound({ message: 'Aplicación de tratamiento no encontrada' })
    }
  }

  async update({ params, request, response }: HttpContext) {
    try {
      const aplicacion = await AplicacionesTratamiento.findOrFail(params.id)
      const data = request.only([
        'id_tratamiento',
        'dosis',
        'frecuencia',
        'observaciones',
        'id_usuario',
      ])

      const payload: Record<string, any> = {}
      if (data.id_tratamiento !== undefined) payload.idTratamiento = data.id_tratamiento
      if (data.dosis          !== undefined) payload.dosis         = data.dosis
      if (data.frecuencia     !== undefined) payload.frecuencia    = data.frecuencia
      if (data.observaciones  !== undefined) payload.observaciones = data.observaciones
      if (data.id_usuario     !== undefined) payload.idUsuario     = data.id_usuario

      aplicacion.merge(payload)
      await aplicacion.save()

      return response.ok({
        message: 'Aplicación de tratamiento actualizada correctamente',
        data: aplicacion,
      })
    } catch (error: any) {
      return response.internalServerError({
        message: 'Error al actualizar aplicación de tratamiento',
        error: error.message,
      })
    }
  }

  async destroy({ params, response }: HttpContext) {
    try {
      const aplicacion = await AplicacionesTratamiento.findOrFail(params.id)
      await aplicacion.delete()
      return response.ok({ message: 'Aplicación de tratamiento eliminada correctamente' })
    } catch (error: any) {
      return response.internalServerError({
        message: 'Error al eliminar aplicación de tratamiento',
        error: error.message,
      })
    }
  }
}
