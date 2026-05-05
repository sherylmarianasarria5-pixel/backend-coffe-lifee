import type { HttpContext } from '@adonisjs/core/http'
import RecomendacionTratamiento from '#models/recomendacion_tratamiento'

export default class RecomendacionTratamientosController {

  // =========================================
  // GET /recomendacion-tratamientos
  // =========================================
  async index({ response }: HttpContext) {
    try {

      const items = await RecomendacionTratamiento.query()
        .preload('recomendacion')
        .preload('tratamiento')

      return response.ok(items)

    } catch (error: any) {

      return response.internalServerError({
        message: 'Error al obtener recomendacion tratamientos',
        error: error.message,
      })
    }
  }

  // =========================================
  // POST /recomendacion-tratamientos
  // =========================================
  async store({ request, response }: HttpContext) {
    try {

      const data = request.only([
        'id_recomendacion',
        'id_tratamiento',
        'dosis_ajustada',
        'notas',
      ])

      if (!data.id_recomendacion) {
        return response.badRequest({ message: 'El id_recomendacion es obligatorio' })
      }

      if (!data.id_tratamiento) {
        return response.badRequest({ message: 'El id_tratamiento es obligatorio' })
      }

      const item = await RecomendacionTratamiento.create({
        idRecomendacion: data.id_recomendacion,
        idTratamiento: data.id_tratamiento,
        dosisAjustada: data.dosis_ajustada,
        notas: data.notas,
      })

      return response.created({
        message: 'Recomendacion tratamiento creado correctamente',
        data: item,
      })

    } catch (error: any) {

      return response.internalServerError({
        message: 'Error al crear recomendacion tratamiento',
        error: error.message,
      })
    }
  }

  // =========================================
  // GET /recomendacion-tratamientos/:id
  // =========================================
  async show({ params, response }: HttpContext) {
    try {

      const item = await RecomendacionTratamiento.query()
        .where('id_rec_tratamiento', params.id)
        .preload('recomendacion')
        .preload('tratamiento')
        .firstOrFail()

      return response.ok(item)

    } catch (error: any) {

      return response.notFound({
        message: 'Recomendacion tratamiento no encontrado',
      })
    }
  }

  // =========================================
  // PUT /recomendacion-tratamientos/:id
  // =========================================
  async update({ params, request, response }: HttpContext) {
    try {

      const item = await RecomendacionTratamiento.findOrFail(params.id)

      const data = request.only([
        'dosis_ajustada',
        'notas',
      ])

      const payload: Record<string, any> = {}
      if (data.dosis_ajustada !== undefined) payload.dosisAjustada = data.dosis_ajustada
      if (data.notas !== undefined)          payload.notas = data.notas

      item.merge(payload)
      await item.save()

      return response.ok({
        message: 'Recomendacion tratamiento actualizado correctamente',
        data: item,
      })

    } catch (error: any) {

      return response.internalServerError({
        message: 'Error al actualizar recomendacion tratamiento',
        error: error.message,
      })
    }
  }

  // =========================================
  // DELETE /recomendacion-tratamientos/:id
  // =========================================
  async destroy({ params, response }: HttpContext) {
    try {

      const item = await RecomendacionTratamiento.findOrFail(params.id)

      await item.delete()

      return response.ok({
        message: 'Recomendacion tratamiento eliminado correctamente',
      })

    } catch (error: any) {

      return response.internalServerError({
        message: 'Error al eliminar recomendacion tratamiento',
        error: error.message,
      })
    }
  }
}