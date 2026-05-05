import type { HttpContext } from '@adonisjs/core/http'
import Tratamiento from '#models/tratamiento'

export default class TratamientosController {

  async index({ response }: HttpContext) {
    try {
      const tratamientos = await Tratamiento.query()
        .preload('tipoTratamiento')
      return response.ok(tratamientos)
    } catch (error: any) {
      return response.internalServerError({
        message: 'Error al obtener tratamientos',
        error: error.message,
      })
    }
  }

  async store({ request, response }: HttpContext) {
    try {
      const data = request.only(['id_tipo_tratamiento', 'nombre', 'descripcion'])

      if (!data.nombre) {
        return response.badRequest({ message: 'El nombre es obligatorio' })
      }

      if (!data.id_tipo_tratamiento) {
        return response.badRequest({ message: 'El id_tipo_tratamiento es obligatorio' })
      }

      const tratamiento = await Tratamiento.create({
        idTipoTratamiento: data.id_tipo_tratamiento,
        nombre:            data.nombre,
        descripcion:       data.descripcion,
      })

      return response.created({
        message: 'Tratamiento creado correctamente',
        data: tratamiento,
      })
    } catch (error: any) {
      return response.internalServerError({
        message: 'Error al crear tratamiento',
        error: error.message,
      })
    }
  }

  async show({ params, response }: HttpContext) {
    try {
      const tratamiento = await Tratamiento.query()
        .where('id_tratamiento', params.id)
        .preload('tipoTratamiento')
        .firstOrFail()
      return response.ok(tratamiento)
    } catch {
      return response.notFound({ message: 'Tratamiento no encontrado' })
    }
  }

  async update({ params, request, response }: HttpContext) {
    try {
      const tratamiento = await Tratamiento.findOrFail(params.id)
      const data = request.only(['id_tipo_tratamiento', 'nombre', 'descripcion'])

      const payload: Record<string, any> = {}
      if (data.id_tipo_tratamiento !== undefined) payload.idTipoTratamiento = data.id_tipo_tratamiento
      if (data.nombre              !== undefined) payload.nombre            = data.nombre
      if (data.descripcion         !== undefined) payload.descripcion       = data.descripcion

      tratamiento.merge(payload)
      await tratamiento.save()

      return response.ok({
        message: 'Tratamiento actualizado correctamente',
        data: tratamiento,
      })
    } catch (error: any) {
      return response.internalServerError({
        message: 'Error al actualizar tratamiento',
        error: error.message,
      })
    }
  }

  async destroy({ params, response }: HttpContext) {
    try {
      const tratamiento = await Tratamiento.findOrFail(params.id)
      await tratamiento.delete()
      return response.ok({ message: 'Tratamiento eliminado correctamente' })
    } catch (error: any) {
      return response.internalServerError({
        message: 'Error al eliminar tratamiento',
        error: error.message,
      })
    }
  }
}