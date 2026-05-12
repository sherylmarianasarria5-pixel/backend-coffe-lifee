import type { HttpContext } from '@adonisjs/core/http'
import Monitoreo from '#models/monitoreo'
import { monitoreoStoreValidator, monitoreoUpdateValidator } from '#validators/validators'

export default class MonitoreosController {

  async index({ request, response }: HttpContext) {
    try {
      const page      = Number(request.input('page', 1))
      const limit     = Number(request.input('limit', 10))
      const idCultivo = request.input('id_cultivo')
      const idExperto = request.input('id_experto')

      const query = Monitoreo.query()
        .preload('cultivo')
        .preload('experto')
        .preload('imagenes')
        .orderBy('fecha_monitoreo', 'desc')

      if (idCultivo) query.where('id_cultivo', idCultivo)
      if (idExperto) query.where('id_experto', idExperto)

      const monitoreos = await query.paginate(page, limit)
      return response.ok(monitoreos)
    } catch (error: any) {
      return response.internalServerError({ message: 'Error al obtener monitoreos', error: error.message })
    }
  }

  async store({ request, response }: HttpContext) {
    try {
      const data = await request.validateUsing(monitoreoStoreValidator)
      const monitoreo = await Monitoreo.create({
        idCultivo:      data.id_cultivo,
        idExperto:      data.id_experto ?? null,
        fechaMonitoreo: data.fecha_monitoreo,
        observaciones:  data.observaciones ?? null,
      })
      return response.created({ message: 'Monitoreo creado correctamente', data: monitoreo })
    } catch (error: any) {
      if (error.code === 'E_VALIDATION_ERROR') {
        return response.unprocessableEntity({ message: 'Error de validación', errors: error.messages })
      }
      return response.internalServerError({ message: 'Error al crear monitoreo', error: error.message })
    }
  }

  async show({ params, response }: HttpContext) {
    try {
      const monitoreo = await Monitoreo.query()
        .where('id_monitoreo', params.id)
        .preload('cultivo')
        .preload('experto')
        .preload('imagenes')
        .preload('analisisIas')
        .firstOrFail()
      return response.ok(monitoreo)
    } catch {
      return response.notFound({ message: 'Monitoreo no encontrado' })
    }
  }

  async update({ params, request, response }: HttpContext) {
    try {
      const monitoreo = await Monitoreo.findOrFail(params.id)
      const data      = await request.validateUsing(monitoreoUpdateValidator)

      const payload: Record<string, any> = {}
      if (data.observaciones   !== undefined) payload.observaciones  = data.observaciones
      if (data.fecha_monitoreo !== undefined) payload.fechaMonitoreo = data.fecha_monitoreo

      monitoreo.merge(payload)
      await monitoreo.save()
      return response.ok({ message: 'Monitoreo actualizado correctamente', data: monitoreo })
    } catch (error: any) {
      if (error.code === 'E_VALIDATION_ERROR') {
        return response.unprocessableEntity({ message: 'Error de validación', errors: error.messages })
      }
      return response.internalServerError({ message: 'Error al actualizar monitoreo', error: error.message })
    }
  }

  async destroy({ params, response }: HttpContext) {
    try {
      const monitoreo = await Monitoreo.findOrFail(params.id)
      await monitoreo.delete()
      return response.ok({ message: 'Monitoreo eliminado correctamente' })
    } catch (error: any) {
      return response.internalServerError({ message: 'Error al eliminar monitoreo', error: error.message })
    }
  }
}