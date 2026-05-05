import type { HttpContext } from '@adonisjs/core/http'
import CatNivelRoya from '#models/cat_nivel_roya'

export default class CatNivelesRoyasController {

  async index({ response }: HttpContext) {
    try {

      const niveles = await CatNivelRoya.all()

      return response.ok(niveles)

    } catch (error: any) {

      return response.internalServerError({
        message: 'Error al obtener niveles de roya',
        error: error.message,
      })
    }
  }

  async store({ request, response }: HttpContext) {
    try {

      const data = request.only(['nombre_nivel', 'descripcion'])

      if (!data.nombre_nivel) {
        return response.badRequest({ message: 'El nombre_nivel es obligatorio' })
      }

      const existe = await CatNivelRoya.findBy('nombre_nivel', data.nombre_nivel)

      if (existe) {
        return response.badRequest({ message: 'El nivel de roya ya existe' })
      }

      const nivel = await CatNivelRoya.create({
        nombreNivel: data.nombre_nivel,
        descripcion: data.descripcion,
      })

      return response.created({
        message: 'Nivel de roya creado correctamente',
        data: nivel,
      })

    } catch (error: any) {

      return response.internalServerError({
        message: 'Error al crear nivel de roya',
        error: error.message,
      })
    }
  }

  async show({ params, response }: HttpContext) {
    try {

      const nivel = await CatNivelRoya.findOrFail(params.id)

      return response.ok(nivel)

    } catch (error: any) {

      return response.notFound({ message: 'Nivel de roya no encontrado' })
    }
  }

  async update({ params, request, response }: HttpContext) {
    try {

      const nivel = await CatNivelRoya.findOrFail(params.id)

      const data = request.only(['nombre_nivel', 'descripcion'])

      const payload: Record<string, any> = {}
      if (data.nombre_nivel !== undefined) payload.nombreNivel = data.nombre_nivel
      if (data.descripcion !== undefined)  payload.descripcion = data.descripcion

      nivel.merge(payload)
      await nivel.save()

      return response.ok({
        message: 'Nivel de roya actualizado correctamente',
        data: nivel,
      })

    } catch (error: any) {

      return response.internalServerError({
        message: 'Error al actualizar nivel de roya',
        error: error.message,
      })
    }
  }

  async destroy({ params, response }: HttpContext) {
    try {

      const nivel = await CatNivelRoya.findOrFail(params.id)

      await nivel.delete()

      return response.ok({ message: 'Nivel de roya eliminado correctamente' })

    } catch (error: any) {

      return response.internalServerError({
        message: 'Error al eliminar nivel de roya',
        error: error.message,
      })
    }
  }
}