import type { HttpContext } from '@adonisjs/core/http'
import CatNivelRoya from '#models/cat_nivel_roya'

export default class CatNivelesRoyasController {
  async index({ response }: HttpContext) {
    const niveles = await CatNivelRoya.all()
    return response.ok(niveles)
  }

  async store({ request, response }: HttpContext) {
    const data = request.only(['nombreNivel', 'descripcion'])
    const nivel = await CatNivelRoya.create(data)
    return response.created({
      message: 'Nivel de roya creado correctamente',
      data: nivel,
    })
  }

  async show({ params, response }: HttpContext) {
    const nivel = await CatNivelRoya.findOrFail(params.id)
    return response.ok(nivel)
  }

  async update({ params, request, response }: HttpContext) {
    const nivel = await CatNivelRoya.findOrFail(params.id)
    const data = request.only(['nombreNivel', 'descripcion'])
    nivel.merge(data)
    await nivel.save()
    return response.ok({
      message: 'Nivel de roya actualizado correctamente',
      data: nivel,
    })
  }

  async destroy({ params, response }: HttpContext) {
    const nivel = await CatNivelRoya.findOrFail(params.id)
    await nivel.delete()
    return response.ok({
      message: 'Nivel de roya eliminado correctamente',
    })
  }
}