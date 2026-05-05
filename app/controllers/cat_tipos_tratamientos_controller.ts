import type { HttpContext } from '@adonisjs/core/http'
import CatTipoTratamiento from '#models/cat_tipo_tratamiento'

export default class CatTiposTratamientosController {

  async index({ response }: HttpContext) {
    try {

      const tipos = await CatTipoTratamiento.all()

      return response.ok(tipos)

    } catch (error: any) {

      return response.internalServerError({
        message: 'Error al obtener tipos de tratamiento',
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

      const existe = await CatTipoTratamiento.findBy('nombre_tipo', data.nombre_tipo)

      if (existe) {
        return response.badRequest({ message: 'El tipo de tratamiento ya existe' })
      }

      const tipo = await CatTipoTratamiento.create({
        nombreTipo: data.nombre_tipo,
        descripcion: data.descripcion,
      })

      return response.created({
        message: 'Tipo de tratamiento creado correctamente',
        data: tipo,
      })

    } catch (error: any) {

      return response.internalServerError({
        message: 'Error al crear tipo de tratamiento',
        error: error.message,
      })
    }
  }

  async show({ params, response }: HttpContext) {
    try {

      const tipo = await CatTipoTratamiento.findOrFail(params.id)

      return response.ok(tipo)

    } catch (error: any) {

      return response.notFound({ message: 'Tipo de tratamiento no encontrado' })
    }
  }

  async update({ params, request, response }: HttpContext) {
    try {

      const tipo = await CatTipoTratamiento.findOrFail(params.id)

      const data = request.only(['nombre_tipo', 'descripcion'])

      const payload: Record<string, any> = {}
      if (data.nombre_tipo !== undefined) payload.nombreTipo = data.nombre_tipo
      if (data.descripcion !== undefined) payload.descripcion = data.descripcion

      tipo.merge(payload)
      await tipo.save()

      return response.ok({
        message: 'Tipo de tratamiento actualizado correctamente',
        data: tipo,
      })

    } catch (error: any) {

      return response.internalServerError({
        message: 'Error al actualizar tipo de tratamiento',
        error: error.message,
      })
    }
  }

  async destroy({ params, response }: HttpContext) {
    try {

      const tipo = await CatTipoTratamiento.findOrFail(params.id)

      await tipo.delete()

      return response.ok({ message: 'Tipo de tratamiento eliminado correctamente' })

    } catch (error: any) {

      return response.internalServerError({
        message: 'Error al eliminar tipo de tratamiento',
        error: error.message,
      })
    }
  }
}
