import type { HttpContext } from '@adonisjs/core/http'
import CatTipoTratamiento from '#models/cat_tipo_tratamiento'

export default class CatTiposTratamientosController {
  async index({ response }: HttpContext) {
    const tipos = await CatTipoTratamiento.all()
    return response.ok(tipos)
  }

  async store({ request, response }: HttpContext) {
    const data = request.only(['nombreTipo', 'descripcion'])
    const tipo = await CatTipoTratamiento.create(data)
    return response.created({
      message: 'Tipo de tratamiento creado correctamente',
      data: tipo,
    })
  }

  async show({ params, response }: HttpContext) {
    const tipo = await CatTipoTratamiento.findOrFail(params.id)
    return response.ok(tipo)
  }

  async update({ params, request, response }: HttpContext) {
    const tipo = await CatTipoTratamiento.findOrFail(params.id)
    const data = request.only(['nombreTipo', 'descripcion'])
    tipo.merge(data)
    await tipo.save()
    return response.ok({
      message: 'Tipo de tratamiento actualizado correctamente',
      data: tipo,
    })
  }

  async destroy({ params, response }: HttpContext) {
    const tipo = await CatTipoTratamiento.findOrFail(params.id)
    await tipo.delete()
    return response.ok({
      message: 'Tipo de tratamiento eliminado correctamente',
    })
  }
}