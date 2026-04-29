import type { HttpContext } from '@adonisjs/core/http'
import RecomendacionTratamiento from '#models/recomendacion_tratamiento'

export default class RecomendacionTratamientosController {
  async index({ response }: HttpContext) {
    const items = await RecomendacionTratamiento.all()
    return response.ok({
      message: 'Lista de recomendacion tratamientos',
      data: items,
    })
  }

  async store({ request, response }: HttpContext) {
    const data = request.only([
      'idRecomendacion',
      'idAplicacion',
      'dosisAjustada',
      'notas',
    ])
    const item = await RecomendacionTratamiento.create(data)
    return response.created({
      message: 'Recomendacion tratamiento creado correctamente',
      data: item,
    })
  }

  async show({ params, response }: HttpContext) {
    const item = await RecomendacionTratamiento.findOrFail(params.id)
    return response.ok({
      message: 'Recomendacion tratamiento encontrado',
      data: item,
    })
  }

  async update({ params, request, response }: HttpContext) {
    const item = await RecomendacionTratamiento.findOrFail(params.id)
    const data = request.only([
      'idRecomendacion',
      'idAplicacion',
      'dosisAjustada',
      'notas',
    ])
    item.merge(data)
    await item.save()
    return response.ok({
      message: 'Recomendacion tratamiento actualizado correctamente',
      data: item,
    })
  }

  async destroy({ params, response }: HttpContext) {
    const item = await RecomendacionTratamiento.findOrFail(params.id)
    await item.delete()
    return response.ok({
      message: 'Recomendacion tratamiento eliminado correctamente',
    })
  }
}