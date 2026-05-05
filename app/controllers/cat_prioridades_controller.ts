import type { HttpContext } from '@adonisjs/core/http'
import CatPrioridad from '#models/cat_prioridad'

export default class CatPrioridadesController {

  async index({ response }: HttpContext) {
    try {

      const prioridades = await CatPrioridad.all()

      return response.ok(prioridades)

    } catch (error: any) {

      return response.internalServerError({
        message: 'Error al obtener prioridades',
        error: error.message,
      })
    }
  }

  async store({ request, response }: HttpContext) {
    try {

      const data = request.only(['nombre', 'nivel_orden'])

      if (!data.nombre) {
        return response.badRequest({ message: 'El nombre es obligatorio' })
      }

      const existe = await CatPrioridad.findBy('nombre', data.nombre)

      if (existe) {
        return response.badRequest({ message: 'La prioridad ya existe' })
      }

      const prioridad = await CatPrioridad.create({
        nombre: data.nombre,
        nivelOrden: data.nivel_orden,
      })

      return response.created({
        message: 'Prioridad creada correctamente',
        data: prioridad,
      })

    } catch (error: any) {

      return response.internalServerError({
        message: 'Error al crear prioridad',
        error: error.message,
      })
    }
  }

  async show({ params, response }: HttpContext) {
    try {

      const prioridad = await CatPrioridad.findOrFail(params.id)

      return response.ok(prioridad)

    } catch (error: any) {

      return response.notFound({ message: 'Prioridad no encontrada' })
    }
  }

  async update({ params, request, response }: HttpContext) {
    try {

      const prioridad = await CatPrioridad.findOrFail(params.id)

      const data = request.only(['nombre', 'nivel_orden'])

      const payload: Record<string, any> = {}
      if (data.nombre !== undefined)      payload.nombre = data.nombre
      if (data.nivel_orden !== undefined) payload.nivelOrden = data.nivel_orden

      prioridad.merge(payload)
      await prioridad.save()

      return response.ok({
        message: 'Prioridad actualizada correctamente',
        data: prioridad,
      })

    } catch (error: any) {

      return response.internalServerError({
        message: 'Error al actualizar prioridad',
        error: error.message,
      })
    }
  }

  async destroy({ params, response }: HttpContext) {
    try {

      const prioridad = await CatPrioridad.findOrFail(params.id)

      await prioridad.delete()

      return response.ok({ message: 'Prioridad eliminada correctamente' })

    } catch (error: any) {

      return response.internalServerError({
        message: 'Error al eliminar prioridad',
        error: error.message,
      })
    }
  }
}