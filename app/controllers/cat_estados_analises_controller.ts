import type { HttpContext } from '@adonisjs/core/http'
import CatEstadoAnalisis from '#models/cat_estado_analisis'

export default class CatEstadosAnalisisController {
  async index({ response }: HttpContext) {
    const estados = await CatEstadoAnalisis.all()
    return response.ok(estados)
  }

  async store({ request, response }: HttpContext) {
    const data = request.only(['nombreEstado', 'descripcion'])
    const estado = await CatEstadoAnalisis.create(data)
    return response.created({
      message: 'Estado de análisis creado correctamente',
      data: estado,
    })
  }

  async show({ params, response }: HttpContext) {
    const estado = await CatEstadoAnalisis.findOrFail(params.id)
    return response.ok(estado)
  }

  async update({ params, request, response }: HttpContext) {
    const estado = await CatEstadoAnalisis.findOrFail(params.id)
    const data = request.only(['nombreEstado', 'descripcion'])
    estado.merge(data)
    await estado.save()
    return response.ok({
      message: 'Estado de análisis actualizado correctamente',
      data: estado,
    })
  }

  async destroy({ params, response }: HttpContext) {
    const estado = await CatEstadoAnalisis.findOrFail(params.id)
    await estado.delete()
    return response.ok({
      message: 'Estado de análisis eliminado correctamente',
    })
  }
}