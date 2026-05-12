import type { HttpContext } from '@adonisjs/core/http'
import Cultivo from '#models/cultivo'
import { cultivoStoreValidator, cultivoUpdateValidator } from '#validators/validators'

export default class CultivosController {

  // GET /cultivos?page=1&limit=10&id_finca=2&id_estado_cultivo=1
  async index({ request, response }: HttpContext) {
    try {
      const page            = Number(request.input('page', 1))
      const limit           = Number(request.input('limit', 10))
      const idFinca         = request.input('id_finca')
      const idEstadoCultivo = request.input('id_estado_cultivo')
      const search          = request.input('search', '')

      const query = Cultivo.query()
        .preload('finca')
        .preload('estadoCultivo')

      if (idFinca)         query.where('id_finca', idFinca)
      if (idEstadoCultivo) query.where('id_estado_cultivo', idEstadoCultivo)
      if (search) {
        query.whereILike('variedad', `%${search}%`)
      }

      const cultivos = await query.paginate(page, limit)
      return response.ok(cultivos)
    } catch (error: any) {
      return response.internalServerError({
        message: 'Error al obtener cultivos',
        error: error.message,
      })
    }
  }

  // POST /cultivos
  async store({ request, response }: HttpContext) {
    try {
      const data = await request.validateUsing(cultivoStoreValidator)

      const cultivo = await Cultivo.create({
        idFinca:          data.id_finca,
        idEstadoCultivo:  data.id_estado_cultivo ?? null,
        variedad:         data.variedad ?? null,
        fechaSiembra:     data.fecha_siembra ?? null,
        areaCultivada:    data.area_cultivada ?? null,
        observaciones:    data.observaciones ?? null,
      })

      await cultivo.load('finca')
      await cultivo.load('estadoCultivo')

      return response.created({
        message: 'Cultivo creado correctamente',
        data: cultivo,
      })
    } catch (error: any) {
      if (error.code === 'E_VALIDATION_ERROR') {
        return response.unprocessableEntity({
          message: 'Error de validación',
          errors: error.messages,
        })
      }
      return response.internalServerError({
        message: 'Error al crear cultivo',
        error: error.message,
      })
    }
  }

  // GET /cultivos/:id
  async show({ params, response }: HttpContext) {
    try {
      const cultivo = await Cultivo.query()
        .where('id_cultivo', params.id)
        .preload('finca')
        .preload('estadoCultivo')
        .preload('monitoreos')
        .firstOrFail()

      return response.ok(cultivo)
    } catch {
      return response.notFound({ message: 'Cultivo no encontrado' })
    }
  }

  // PUT /cultivos/:id
  async update({ params, request, response }: HttpContext) {
    try {
      const cultivo = await Cultivo.findOrFail(params.id)
      const data    = await request.validateUsing(cultivoUpdateValidator)

      const payload: Record<string, any> = {}
      if (data.id_estado_cultivo !== undefined) payload.idEstadoCultivo = data.id_estado_cultivo
      if (data.variedad          !== undefined) payload.variedad        = data.variedad
      if (data.fecha_siembra     !== undefined) payload.fechaSiembra    = data.fecha_siembra
      if (data.area_cultivada    !== undefined) payload.areaCultivada   = data.area_cultivada
      if (data.observaciones     !== undefined) payload.observaciones   = data.observaciones

      cultivo.merge(payload)
      await cultivo.save()
      await cultivo.load('finca')
      await cultivo.load('estadoCultivo')

      return response.ok({
        message: 'Cultivo actualizado correctamente',
        data: cultivo,
      })
    } catch (error: any) {
      if (error.code === 'E_VALIDATION_ERROR') {
        return response.unprocessableEntity({
          message: 'Error de validación',
          errors: error.messages,
        })
      }
      return response.internalServerError({
        message: 'Error al actualizar cultivo',
        error: error.message,
      })
    }
  }

  // DELETE /cultivos/:id
  async destroy({ params, response }: HttpContext) {
    try {
      const cultivo = await Cultivo.findOrFail(params.id)
      await cultivo.delete()
      return response.ok({ message: 'Cultivo eliminado correctamente' })
    } catch (error: any) {
      return response.internalServerError({
        message: 'Error al eliminar cultivo',
        error: error.message,
      })
    }
  }
}