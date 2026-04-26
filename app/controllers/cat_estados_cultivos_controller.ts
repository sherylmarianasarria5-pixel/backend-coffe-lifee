import type { HttpContext } from '@adonisjs/core/http'
import CatEstadoCultivo from '#models/cat_estado_cultivo'

export default class CatEstadosCultivosController {
  async index({ response }: HttpContext) {
    const estados = await CatEstadoCultivo.all()
    return response.ok(estados)
  }

  async store({ request, response }: HttpContext) {
    const data = request.only(['nombreEstado', 'descripcion'])
    const estado = await CatEstadoCultivo.create(data)
    return response.created({
      message: 'Estado de cultivo creado correctamente',
      data: estado,
    })
  }

  async show({ params, response }: HttpContext) {
    const estado = await CatEstadoCultivo.findOrFail(params.id)
    return response.ok(estado)
  }

  async update({ params, request, response }: HttpContext) {
    const estado = await CatEstadoCultivo.findOrFail(params.id)
    const data = request.only(['nombreEstado', 'descripcion'])
    estado.merge(data)
    await estado.save()
    return response.ok({
      message: 'Estado de cultivo actualizado correctamente',
      data: estado,
    })
  }

  async destroy({ params, response }: HttpContext) {
    const estado = await CatEstadoCultivo.findOrFail(params.id)
    await estado.delete()
    return response.ok({
      message: 'Estado de cultivo eliminado correctamente',
    })
  }
}