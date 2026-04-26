import type { HttpContext } from '@adonisjs/core/http'
import CatTipoRecomendacion from '#models/cat_tipo_recomendacion'

export default class CatTiposRecomendacionsController {
  async index({ response }: HttpContext) {
    const tipos = await CatTipoRecomendacion.all()
    return response.ok(tipos)
  }

  async store({ request, response }: HttpContext) {
    const data = request.only(['nombreTipo', 'descripcion'])
    const tipo = await CatTipoRecomendacion.create(data)
    return response.created({
      message: 'Tipo de recomendación creado correctamente',
      data: tipo,
    })
  }

  async show({ params, response }: HttpContext) {
    const tipo = await CatTipoRecomendacion.findOrFail(params.id)
    return response.ok(tipo)
  }

  async update({ params, request, response }: HttpContext) {
    const tipo = await CatTipoRecomendacion.findOrFail(params.id)
    const data = request.only(['nombreTipo', 'descripcion'])
    tipo.merge(data)
    await tipo.save()
    return response.ok({
      message: 'Tipo de recomendación actualizado correctamente',
      data: tipo,
    })
  }

  async destroy({ params, response }: HttpContext) {
    const tipo = await CatTipoRecomendacion.findOrFail(params.id)
    await tipo.delete()
    return response.ok({
      message: 'Tipo de recomendación eliminado correctamente',
    })
  }
}