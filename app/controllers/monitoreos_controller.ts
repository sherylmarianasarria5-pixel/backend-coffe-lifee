import type { HttpContext } from '@adonisjs/core/http'
import Monitoreo from '#models/monitoreo'

export default class MonitoreosController {
  async index({ response }: HttpContext) {
    const monitoreos = await Monitoreo.query()
      .preload('cultivo')
      .preload('imagenes')
      .preload('recomendaciones')
      .preload('analisis')

    return response.ok({
      message: 'Lista de monitoreos',
      data: monitoreos,
    })
  }

  async store({ request, response }: HttpContext) {
    const data = request.only([
      'idCultivo',
      'fechaMonitoreo',
      'temperatura',
      'humedad',
      'observaciones',
    ])

    const monitoreo = await Monitoreo.create(data)

    return response.created({
      message: 'Monitoreo creado correctamente',
      data: monitoreo,
    })
  }

  async show({ params, response }: HttpContext) {
    const monitoreo = await Monitoreo.query()
      .where('id_monitoreo', params.id)
      .preload('cultivo')
      .preload('imagenes')
      .preload('recomendaciones')
      .preload('analisis')
      .firstOrFail()

    return response.ok({
      message: 'Monitoreo encontrado',
      data: monitoreo,
    })
  }

  async update({ params, request, response }: HttpContext) {
    const monitoreo = await Monitoreo.findOrFail(params.id)

    const data = request.only([
      'idCultivo',
      'fechaMonitoreo',
      'temperatura',
      'humedad',
      'observaciones',
    ])

    monitoreo.merge(data)
    await monitoreo.save()

    return response.ok({
      message: 'Monitoreo actualizado correctamente',
      data: monitoreo,
    })
  }

  async destroy({ params, response }: HttpContext) {
    const monitoreo = await Monitoreo.findOrFail(params.id)

    await monitoreo.delete()

    return response.ok({
      message: 'Monitoreo eliminado correctamente',
    })
  }
}