import type { HttpContext } from '@adonisjs/core/http'
import CatEstadoAnalisis from '#models/cat_estado_analisis'

export default class CatEstadosAnalisisController {

  async index({ response }: HttpContext) {
    try {

      const estados = await CatEstadoAnalisis.all()

      return response.ok(estados)

    } catch (error: any) {

      return response.internalServerError({
        message: 'Error al obtener estados de análisis',
        error: error.message,
      })
    }
  }

  async store({ request, response }: HttpContext) {
    try {

      const data = request.only(['nombre_estado', 'descripcion'])

      if (!data.nombre_estado) {
        return response.badRequest({ message: 'El nombre_estado es obligatorio' })
      }

      const existe = await CatEstadoAnalisis.findBy('nombre_estado', data.nombre_estado)

      if (existe) {
        return response.badRequest({ message: 'El estado ya existe' })
      }

      const estado = await CatEstadoAnalisis.create({
        nombreEstado: data.nombre_estado,
        descripcion: data.descripcion,
      })

      return response.created({
        message: 'Estado de análisis creado correctamente',
        data: estado,
      })

    } catch (error: any) {

      return response.internalServerError({
        message: 'Error al crear estado de análisis',
        error: error.message,
      })
    }
  }

  async show({ params, response }: HttpContext) {
    try {

      const estado = await CatEstadoAnalisis.findOrFail(params.id)

      return response.ok(estado)

    } catch (error: any) {

      return response.notFound({ message: 'Estado de análisis no encontrado' })
    }
  }

  async update({ params, request, response }: HttpContext) {
    try {

      const estado = await CatEstadoAnalisis.findOrFail(params.id)

      const data = request.only(['nombre_estado', 'descripcion'])

      const payload: Record<string, any> = {}
      if (data.nombre_estado !== undefined) payload.nombreEstado = data.nombre_estado
      if (data.descripcion !== undefined)   payload.descripcion = data.descripcion

      estado.merge(payload)
      await estado.save()

      return response.ok({
        message: 'Estado de análisis actualizado correctamente',
        data: estado,
      })

    } catch (error: any) {

      return response.internalServerError({
        message: 'Error al actualizar estado de análisis',
        error: error.message,
      })
    }
  }

  async destroy({ params, response }: HttpContext) {
    try {

      const estado = await CatEstadoAnalisis.findOrFail(params.id)

      await estado.delete()

      return response.ok({ message: 'Estado de análisis eliminado correctamente' })

    } catch (error: any) {

      return response.internalServerError({
        message: 'Error al eliminar estado de análisis',
        error: error.message,
      })
    }
  }
}