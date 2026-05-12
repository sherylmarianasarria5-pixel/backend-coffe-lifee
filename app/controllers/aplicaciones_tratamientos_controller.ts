import type { HttpContext } from '@adonisjs/core/http'
import AplicacionesTratamiento from '#models/aplicaciones_tratamiento'

export default class AplicacionesTratamientosController {

  // GET /aplicaciones_tratamientos
  async index({ response }: HttpContext) {
    try {
      const aplicaciones = await AplicacionesTratamiento.query()
        .preload('tratamiento')
        .preload('usuario')
        .orderBy('fecha_registro', 'desc')
      return response.ok({ data: aplicaciones })
    } catch (error: any) {
      return response.internalServerError({
        message: 'Error al obtener aplicaciones de tratamiento',
        error: error.message,
      })
    }
  }

  // GET /aplicaciones_tratamientos/:id
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

  // POST /aplicaciones_tratamientos
  async store({ request, response }: HttpContext) {
    try {
      const data = request.only([
        'id_tratamiento',
        'id_usuario',
        'dosis',
        'frecuencia',
        'observaciones',
      ])

      if (!data.dosis) {
        return response.badRequest({ message: 'La dosis es obligatoria' })
      }

      const aplicacion = await AplicacionesTratamiento.create({
        idTratamiento: data.id_tratamiento ?? null,
        idUsuario:     data.id_usuario     ?? null,
        dosis:         data.dosis,
        frecuencia:    data.frecuencia     ?? null,
        observaciones: data.observaciones  ?? null,
      })

      await aplicacion.load('tratamiento')
      await aplicacion.load('usuario')

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

  // PUT /aplicaciones_tratamientos/:id
  async update({ params, request, response }: HttpContext) {
    try {
      const aplicacion = await AplicacionesTratamiento.findOrFail(params.id)
      const data = request.only([
        'id_tratamiento',
        'id_usuario',
        'dosis',
        'frecuencia',
        'observaciones',
      ])

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

      return response.ok({
        message: 'Aplicación actualizada correctamente',
        data: aplicacion,
      })
    } catch (error: any) {
      return response.internalServerError({
        message: 'Error al actualizar aplicación de tratamiento',
        error: error.message,
      })
    }
  }

  // DELETE /aplicaciones_tratamientos/:id
  async destroy({ params, response }: HttpContext) {
    try {
      const aplicacion = await AplicacionesTratamiento.findOrFail(params.id)
      await aplicacion.delete()
      return response.ok({ message: 'Aplicación eliminada correctamente' })
    } catch (error: any) {
      return response.internalServerError({
        message: 'Error al eliminar aplicación de tratamiento',
        error: error.message,
      })
    }
  }
}
