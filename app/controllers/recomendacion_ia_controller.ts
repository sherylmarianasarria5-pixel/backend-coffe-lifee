import type { HttpContext } from '@adonisjs/core/http'
import RecomendacionIa from '#models/recomendacion_ia'


function serializar(r: RecomendacionIa) {
  return {
    idRecomendacion:    r.idRecomendacion,
    idAnalisis:         r.idAnalisis,
    idTipo:             r.idTipo,
    idPrioridad:        r.idPrioridad,
    descripcion:        r.descripcion,
    fechaLimite:        r.fechaLimite,
    fechaRegistro:      r.fechaRegistro,
    fechaActualizacion: r.fechaActualizacion,
    analisis:     r.$preloaded.analisis     ? r.analisis     : undefined,
    tratamientos: r.$preloaded.tratamientos ? r.tratamientos : undefined,
  }
}

export default class RecomendacionIaController {

  async index({ request, response }: HttpContext) {
    try {
      const page        = Number(request.input('page', 1))
      const limit       = Number(request.input('limit', 10))
      const search      = request.input('search', '')
      const idAnalisis  = request.input('id_analisis')
      const idPrioridad = request.input('id_prioridad')
      const idTipo      = request.input('id_tipo')
      const ALLOWED = ['id_recomendacion', 'descripcion', 'fecha_limite', 'fecha_registro', 'fecha_actualizacion', 'id_analisis', 'id_prioridad', 'id_tipo']
      const orderBy = request.input('order_by', 'id_recomendacion')
      const orderDir = request.input('order_dir', 'desc')
      const safeColumn = ALLOWED.includes(orderBy) ? orderBy : 'id_recomendacion'

      const query = RecomendacionIa.query()
        .preload('analisis')
        .preload('tratamientos')

      if (search) {
        query.where((q) => {
          q.whereILike('descripcion', `%${search}%`)
        })
      }
      if (idAnalisis)  query.where('id_analisis', idAnalisis)
      if (idPrioridad) query.where('id_prioridad', idPrioridad)
      if (idTipo) query.where('id_tipo', idTipo)

      query.orderBy(safeColumn, orderDir === 'asc' ? 'asc' : 'desc')

      const paginado = await query.paginate(page, limit)
      const json     = paginado.toJSON()
      json.data      = paginado.all().map(serializar)

      return response.ok(json)
    } catch (error: any) {
      return response.internalServerError({
        message: 'Error al obtener recomendaciones IA',
        error: error.message,
      })
    }
  }

  async store({ request, response }: HttpContext) {
    try {
      const data = request.only([
        'id_analisis', 'id_tipo', 'id_prioridad', 'descripcion', 'fecha_limite',
      ])

      if (!data.id_analisis) return response.badRequest({ message: 'El id_analisis es obligatorio' })
      if (!data.descripcion) return response.badRequest({ message: 'La descripcion es obligatoria' })

      const recomendacion = await RecomendacionIa.create({
        idAnalisis:  data.id_analisis,
        idTipo:      data.id_tipo      ?? null,
        idPrioridad: data.id_prioridad ?? null,
        descripcion: data.descripcion,
        fechaLimite: data.fecha_limite ?? null,
      })

      await recomendacion.load('analisis')

      return response.created({
        message: 'Recomendación IA creada correctamente',
        data: serializar(recomendacion),
      })
    } catch (error: any) {
      return response.internalServerError({
        message: 'Error al crear recomendación IA',
        error: error.message,
      })
    }
  }

  async show({ params, response }: HttpContext) {
    try {
      const r = await RecomendacionIa.query()
        .where('id_recomendacion', params.id)
        .preload('analisis')
        .preload('tratamientos')
        .firstOrFail()

      return response.ok(serializar(r))
    } catch {
      return response.notFound({ message: 'Recomendación IA no encontrada' })
    }
  }

  async update({ params, request, response }: HttpContext) {
    try {
      const r    = await RecomendacionIa.findOrFail(params.id)
      const data = request.only([
        'id_analisis', 'id_tipo', 'id_prioridad', 'descripcion', 'fecha_limite',
      ])

      const payload: Record<string, any> = {}
      if (data.id_analisis  !== undefined) payload.idAnalisis  = data.id_analisis
      if (data.id_tipo      !== undefined) payload.idTipo      = data.id_tipo
      if (data.id_prioridad !== undefined) payload.idPrioridad = data.id_prioridad
      if (data.descripcion  !== undefined) payload.descripcion = data.descripcion
      if (data.fecha_limite !== undefined) payload.fechaLimite = data.fecha_limite

      r.merge(payload)
      await r.save()

      return response.ok({
        message: 'Recomendación IA actualizada correctamente',
        data: serializar(r),
      })
    } catch (error: any) {
      return response.internalServerError({
        message: 'Error al actualizar recomendación IA',
        error: error.message,
      })
    }
  }

  async destroy({ params, response }: HttpContext) {
    try {
      const r = await RecomendacionIa.findOrFail(params.id)
      await r.delete()
      return response.ok({ message: 'Recomendación IA eliminada correctamente' })
    } catch (error: any) {
      return response.internalServerError({
        message: 'Error al eliminar recomendación IA',
        error: error.message,
      })
    }
  }
}
