import type { HttpContext } from '@adonisjs/core/http'
import Monitoreo from '#models/monitoreo'

export default class MonitoreosController {

  async index({ response }: HttpContext) {
    try {
      const monitoreos = await Monitoreo.query()
        .preload('cultivo')
        .preload('experto')
        .preload('imagenes')
      return response.ok(monitoreos)
    } catch (error: any) {
      return response.internalServerError({ message: 'Error al obtener monitoreos', error: error.message })
    }
  }

  async store({ request, response }: HttpContext) {
    try {
      const data = request.only(['id_cultivo', 'id_experto', 'fecha_monitoreo', 'observaciones'])

      if (!data.id_cultivo)      return response.badRequest({ message: 'El id_cultivo es obligatorio' })
      if (!data.fecha_monitoreo) return response.badRequest({ message: 'La fecha_monitoreo es obligatoria' })

      const monitoreo = await Monitoreo.create({
        idCultivo: data.id_cultivo,
        idExperto: data.id_experto,
        fechaMonitoreo: data.fecha_monitoreo,
        observaciones: data.observaciones,
      })
      return response.created({ message: 'Monitoreo creado correctamente', data: monitoreo })
    } catch (error: any) {
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
        .firstOrFail()
      return response.ok(monitoreo)
    } catch {
      return response.notFound({ message: 'Monitoreo no encontrado' })
    }
  }

  async update({ params, request, response }: HttpContext) {
    try {
      const monitoreo = await Monitoreo.findOrFail(params.id)
      const data = request.only(['observaciones', 'fecha_monitoreo'])

      const payload: Record<string, any> = {}
      if (data.observaciones !== undefined)   payload.observaciones = data.observaciones
      if (data.fecha_monitoreo !== undefined) payload.fechaMonitoreo = data.fecha_monitoreo

      monitoreo.merge(payload)
      await monitoreo.save()
      return response.ok({ message: 'Monitoreo actualizado correctamente', data: monitoreo })
    } catch (error: any) {
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