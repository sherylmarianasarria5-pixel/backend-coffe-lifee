import type { HttpContext } from '@adonisjs/core/http'
import CatPrioridad from '#models/cat_prioridad'

export default class CatPrioridadesController {
  async index({ response }: HttpContext) {
    const prioridades = await CatPrioridad.all()
    return response.ok(prioridades)
  }

  async store({ request, response }: HttpContext) {
    const data = request.only(['nombre', 'nivelOrden'])
    const prioridad = await CatPrioridad.create(data)
    return response.created({
      message: 'Prioridad creada correctamente',
      data: prioridad,
    })
  }

  async show({ params, response }: HttpContext) {
    const prioridad = await CatPrioridad.findOrFail(params.id)
    return response.ok(prioridad)
  }

  async update({ params, request, response }: HttpContext) {
    const prioridad = await CatPrioridad.findOrFail(params.id)
    const data = request.only(['nombre', 'nivelOrden'])
    prioridad.merge(data)
    await prioridad.save()
    return response.ok({
      message: 'Prioridad actualizada correctamente',
      data: prioridad,
    })
  }

  async destroy({ params, response }: HttpContext) {
    const prioridad = await CatPrioridad.findOrFail(params.id)
    await prioridad.delete()
    return response.ok({
      message: 'Prioridad eliminada correctamente',
    })
  }
}