import type { HttpContext } from '@adonisjs/core/http'
import CatPrioridad from '#models/cat_prioridad'

export default class CatPrioridadesController {
  async index({ response }: HttpContext) {
    try {
      const prioridades = await CatPrioridad.query().orderBy('nivel_orden', 'asc')
      return response.ok(prioridades)
    } catch (error: any) {
      return response.internalServerError({ message: 'Error al obtener prioridades', error: error.message })
    }
  }

  async store({ request, response }: HttpContext) {
    try {
      const { nombre, nivel_orden } = request.only(['nombre', 'nivel_orden'])

      if (!nombre) return response.badRequest({ message: 'El nombre es obligatorio' })
      if (!nivel_orden) return response.badRequest({ message: 'El nivel es obligatorio' })

      const prioridad = await CatPrioridad.create({
        nombre,
        nivelOrden: Number(nivel_orden),
      })

      return response.created({ message: 'Prioridad creada correctamente', data: prioridad })
    } catch (error: any) {
      return response.internalServerError({ message: 'Error al crear prioridad', error: error.message })
    }
  }

  async show({ params, response }: HttpContext) {
    try {
      const prioridad = await CatPrioridad.findOrFail(params.id)
      return response.ok(prioridad)
    } catch {
      return response.notFound({ message: 'Prioridad no encontrada' })
    }
  }

  async update({ params, request, response }: HttpContext) {
    try {
      const prioridad = await CatPrioridad.findOrFail(params.id)
      const { nombre, nivel_orden } = request.only(['nombre', 'nivel_orden'])

      if (nombre !== undefined) prioridad.nombre = nombre
      if (nivel_orden !== undefined) prioridad.nivelOrden = Number(nivel_orden)

      await prioridad.save()

      return response.ok({ message: 'Prioridad actualizada correctamente', data: prioridad })
    } catch (error: any) {
      return response.internalServerError({ message: 'Error al actualizar prioridad', error: error.message })
    }
  }

  async destroy({ params, response }: HttpContext) {
    try {
      const prioridad = await CatPrioridad.findOrFail(params.id)
      await prioridad.delete()
      return response.ok({ message: 'Prioridad eliminada correctamente' })
    } catch (error: any) {
      return response.internalServerError({ message: 'Error al eliminar prioridad', error: error.message })
    }
  }
}