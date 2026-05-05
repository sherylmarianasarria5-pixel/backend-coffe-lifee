import type { HttpContext } from '@adonisjs/core/http'
import CatTipoRecomendacion from '#models/cat_tipo_recomendacion'

export default class CatTiposRecomendacionController {

  async index({ response }: HttpContext) {
    try {

      const tipos = await CatTipoRecomendacion.all()

      return response.ok(tipos)

    } catch (error: any) {

      return response.internalServerError({
        message: 'Error al obtener tipos de recomendación',
        error: error.message,
      })
    }
  }

  async store({ request, response }: HttpContext) {
    try {

      const data = request.only(['nombre_tipo', 'descripcion'])

      if (!data.nombre_tipo) {
        return response.badRequest({ message: 'El nombre_tipo es obligatorio' })
      }

      const existe = await CatTipoRecomendacion.findBy('nombre_tipo', data.nombre_tipo)

      if (existe) {
        return response.badRequest({ message: 'El tipo de recomendación ya existe' })
      }

      const tipo = await CatTipoRecomendacion.create({
        nombreTipo: data.nombre_tipo,
        descripcion: data.descripcion,
      })

      return response.created({
        message: 'Tipo de recomendación creado correctamente',
        data: tipo,
      })

    } catch (error: any) {

      return response.internalServerError({
        message: 'Error al crear tipo de recomendación',
        error: error.message,
      })
    }
  }

  async show({ params, response }: HttpContext) {
    try {

      const tipo = await CatTipoRecomendacion.findOrFail(params.id)

      return response.ok(tipo)

    } catch (error: any) {

      return response.notFound({ message: 'Tipo de recomendación no encontrado' })
    }
  }

  async update({ params, request, response }: HttpContext) {
    try {

      const tipo = await CatTipoRecomendacion.findOrFail(params.id)

      const data = request.only(['nombre_tipo', 'descripcion'])

      const payload: Record<string, any> = {}
      if (data.nombre_tipo !== undefined) payload.nombreTipo = data.nombre_tipo
      if (data.descripcion !== undefined) payload.descripcion = data.descripcion

      tipo.merge(payload)
      await tipo.save()

      return response.ok({
        message: 'Tipo de recomendación actualizado correctamente',
        data: tipo,
      })

    } catch (error: any) {

      return response.internalServerError({
        message: 'Error al actualizar tipo de recomendación',
        error: error.message,
      })
    }
  }

  async destroy({ params, response }: HttpContext) {
    try {

      const tipo = await CatTipoRecomendacion.findOrFail(params.id)

      await tipo.delete()

      return response.ok({ message: 'Tipo de recomendación eliminado correctamente' })

    } catch (error: any) {

      return response.internalServerError({
        message: 'Error al eliminar tipo de recomendación',
        error: error.message,
      })
    }
  }
}