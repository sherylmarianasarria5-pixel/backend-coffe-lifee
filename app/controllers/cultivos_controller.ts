import Cultivo from '#models/cultivo'
import type { HttpContext } from '@adonisjs/core/http'

export default class CultivosController {

  async index({ response }: HttpContext) {
    const cultivos = await Cultivo.all()
    return response.json(cultivos)
  }

  async store({ request, response }: HttpContext) {
    const data = request.only(['nombreCultivo', 'tipoCultivo'])

    const cultivo = await Cultivo.create(data)

    return response.json({
      message: 'Cultivo creado correctamente',
      data: cultivo,
    })
  }

  async show({ params, response }: HttpContext) {
    const cultivo = await Cultivo.findOrFail(params.id)
    return response.json(cultivo)
  }

  async update({ params, request, response }: HttpContext) {
    const cultivo = await Cultivo.findOrFail(params.id)

    const data = request.only(['nombreCultivo', 'tipoCultivo'])

    cultivo.merge(data)
    await cultivo.save()

    return response.json({
      message: 'Cultivo actualizado correctamente',
      data: cultivo,
    })
  }

  async destroy({ params, response }: HttpContext) {
    const cultivo = await Cultivo.findOrFail(params.id)

    await cultivo.delete()

    return response.json({
      message: 'Cultivo eliminado correctamente',
    })
  }
}