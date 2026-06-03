import type { HttpContext } from '@adonisjs/core/http'
import RecomendacionTratamiento from '#models/recomendacion_tratamiento'

export default class RecomendacionTratamientosController {

  /**
   * @index
   * @summary Listar recomendación tratamientos
   * @responseBody 200 - [{"idRecTratamiento": 1, "idRecomendacion": 1, "idAplicacion": 2, "dosisAjustada": "500ml", "notas": "Aplicar en la mañana"}]
   */
  async index({ request, response }: HttpContext) {
    try {
      const page = Number(request.input('page', 1))
      const limit = Number(request.input('limit', 10))
      const items = await RecomendacionTratamiento.query()
        .preload('recomendacion')
        .preload('aplicacion')
        .paginate(page, limit)
      return response.ok(items.toJSON())
    } catch (error: any) {
      return response.internalServerError({ message: 'Error al obtener recomendación tratamientos', error: error.message })
    }
  }

  /**
   * @store
   * @summary Crear recomendación tratamiento
   * @requestBody {"id_recomendacion": 1, "id_aplicacion": 2, "dosis_ajustada": "500ml", "notas": "Aplicar en la mañana"}
   * @responseBody 201 - {"message": "Recomendación tratamiento creado correctamente", "data": {"idRecTratamiento": 1}}
   * @responseBody 400 - {"message": "El id_recomendacion es obligatorio"}
   */
  async store({ request, response }: HttpContext) {
    try {
      const data = request.only(['id_recomendacion', 'id_aplicacion', 'dosis_ajustada', 'notas'])

      if (!data.id_recomendacion) return response.badRequest({ message: 'El id_recomendacion es obligatorio' })
      if (!data.id_aplicacion)    return response.badRequest({ message: 'El id_aplicacion es obligatorio' })

      const item = await RecomendacionTratamiento.create({
        idRecomendacion: data.id_recomendacion,
        idAplicacion:    data.id_aplicacion,
        dosisAjustada:   data.dosis_ajustada ?? null,
        notas:           data.notas          ?? null,
      })

      await item.load('recomendacion')
      await item.load('aplicacion')

      return response.created({ message: 'Recomendación tratamiento creado correctamente', data: item })
    } catch (error: any) {
      return response.internalServerError({ message: 'Error al crear recomendación tratamiento', error: error.message })
    }
  }

  /**
   * @show
   * @summary Ver recomendación tratamiento por ID
   * @responseBody 200 - {"idRecTratamiento": 1, "dosisAjustada": "500ml", "notas": "texto"}
   * @responseBody 404 - {"message": "Recomendación tratamiento no encontrado"}
   */
  async show({ params, response }: HttpContext) {
    try {
      const item = await RecomendacionTratamiento.query()
        .where('id_rec_tratamiento', params.id)
        .preload('recomendacion')
        .preload('aplicacion')
        .firstOrFail()
      return response.ok(item)
    } catch {
      return response.notFound({ message: 'Recomendación tratamiento no encontrado' })
    }
  }

  /**
   * @update
   * @summary Actualizar recomendación tratamiento
   * @requestBody {"id_recomendacion": 1, "id_aplicacion": 2, "dosis_ajustada": "600ml", "notas": "Actualizado"}
   * @responseBody 200 - {"message": "Recomendación tratamiento actualizado correctamente"}
   * @responseBody 404 - {"message": "Recomendación tratamiento no encontrado"}
   */
  async update({ params, request, response }: HttpContext) {
    try {
      const item = await RecomendacionTratamiento.findOrFail(params.id)
      const data = request.only(['id_recomendacion', 'id_aplicacion', 'dosis_ajustada', 'notas'])

      const payload: Record<string, any> = {}
      if (data.id_recomendacion !== undefined) payload.idRecomendacion = data.id_recomendacion
      if (data.id_aplicacion    !== undefined) payload.idAplicacion    = data.id_aplicacion
      if (data.dosis_ajustada   !== undefined) payload.dosisAjustada   = data.dosis_ajustada
      if (data.notas            !== undefined) payload.notas           = data.notas

      item.merge(payload)
      await item.save()
      await item.load('recomendacion')
      await item.load('aplicacion')

      return response.ok({ message: 'Recomendación tratamiento actualizado correctamente', data: item })
    } catch (error: any) {
      return response.internalServerError({ message: 'Error al actualizar recomendación tratamiento', error: error.message })
    }
  }

  /**
   * @destroy
   * @summary Eliminar recomendación tratamiento
   * @responseBody 200 - {"message": "Recomendación tratamiento eliminado correctamente"}
   * @responseBody 404 - {"message": "Recomendación tratamiento no encontrado"}
   */
  async destroy({ params, response }: HttpContext) {
    try {
      const item = await RecomendacionTratamiento.findOrFail(params.id)
      await item.delete()
      return response.ok({ message: 'Recomendación tratamiento eliminado correctamente' })
    } catch (error: any) {
      return response.internalServerError({ message: 'Error al eliminar recomendación tratamiento', error: error.message })
    }
  }
}