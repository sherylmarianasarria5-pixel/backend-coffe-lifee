import type { HttpContext } from '@adonisjs/core/http'
import CatEstadoCultivo from '#models/cat_estado_cultivo'

export default class CatEstadosCultivosController {

  async index({ response }: HttpContext) {
    try {

      const estados = await CatEstadoCultivo.all()

      return response.ok(estados)

    } catch (error: any) {

      return response.internalServerError({
        message: 'Error al obtener estados de cultivo',
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

      const existe = await CatEstadoCultivo.findBy('nombre_estado', data.nombre_estado)

      if (existe) {
        return response.badRequest({ message: 'El estado ya existe' })
      }

      const estado = await CatEstadoCultivo.create({
        nombreEstado: data.nombre_estado,
        descripcion: data.descripcion,
      })

      return response.created({
        message: 'Estado de cultivo creado correctamente',
        data: estado,
      })

    } catch (error: any) {

      return response.internalServerError({
        message: 'Error al crear estado de cultivo',
        error: error.message,
      })
    }
  }

  async show({ params, response }: HttpContext) {
    try {

      const estado = await CatEstadoCultivo.findOrFail(params.id)

      return response.ok(estado)

    } catch (error: any) {

      return response.notFound({ message: 'Estado de cultivo no encontrado' })
    }
  }

  async update({ params, request, response }: HttpContext) {
    try {

      const estado = await CatEstadoCultivo.findOrFail(params.id)

      const data = request.only(['nombre_estado', 'descripcion'])

      const payload: Record<string, any> = {}
      if (data.nombre_estado !== undefined) payload.nombreEstado = data.nombre_estado
      if (data.descripcion !== undefined)   payload.descripcion = data.descripcion

      estado.merge(payload)
      await estado.save()

      return response.ok({
        message: 'Estado de cultivo actualizado correctamente',
        data: estado,
      })

    } catch (error: any) {

      return response.internalServerError({
        message: 'Error al actualizar estado de cultivo',
        error: error.message,
      })
    }
  }

  async destroy({ params, response }: HttpContext) {
    try {

      const estado = await CatEstadoCultivo.findOrFail(params.id)

      await estado.delete()

      return response.ok({ message: 'Estado de cultivo eliminado correctamente' })

    } catch (error: any) {

      return response.internalServerError({
        message: 'Error al eliminar estado de cultivo',
        error: error.message,
      })
    }
  }
}
