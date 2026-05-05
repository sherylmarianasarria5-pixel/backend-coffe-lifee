import type { HttpContext } from '@adonisjs/core/http'
import Cultivo from '#models/cultivo'

export default class CultivosController {

  async index({ response }: HttpContext) {
    try {
      const cultivos = await Cultivo.query().preload('finca')
      return response.ok(cultivos)
    } catch (error: any) {
      return response.internalServerError({ message: 'Error al obtener cultivos', error: error.message })
    }
  }

  async store({ request, response }: HttpContext) {
    try {
      const data = request.only(['id_finca', 'nombre_cultivo', 'tipo_cultivo'])

      if (!data.id_finca)       return response.badRequest({ message: 'El id_finca es obligatorio' })
      if (!data.nombre_cultivo) return response.badRequest({ message: 'El nombre_cultivo es obligatorio' })
      if (!data.tipo_cultivo)   return response.badRequest({ message: 'El tipo_cultivo es obligatorio' })

      const cultivo = await Cultivo.create({
        idFinca: data.id_finca,
        nombreCultivo: data.nombre_cultivo,
        tipoCultivo: data.tipo_cultivo,
      })
      return response.created({ message: 'Cultivo creado correctamente', data: cultivo })
    } catch (error: any) {
      return response.internalServerError({ message: 'Error al crear cultivo', error: error.message })
    }
  }

  async show({ params, response }: HttpContext) {
    try {
      const cultivo = await Cultivo.query()
        .where('id_cultivo', params.id)
        .preload('finca')
        .firstOrFail()
      return response.ok(cultivo)
    } catch {
      return response.notFound({ message: 'Cultivo no encontrado' })
    }
  }

  async update({ params, request, response }: HttpContext) {
    try {
      const cultivo = await Cultivo.findOrFail(params.id)
      const data = request.only(['nombre_cultivo', 'tipo_cultivo', 'id_finca'])

      const payload: Record<string, any> = {}
      if (data.nombre_cultivo !== undefined) payload.nombreCultivo = data.nombre_cultivo
      if (data.tipo_cultivo !== undefined)   payload.tipoCultivo = data.tipo_cultivo
      if (data.id_finca !== undefined)       payload.idFinca = data.id_finca

      cultivo.merge(payload)
      await cultivo.save()
      return response.ok({ message: 'Cultivo actualizado correctamente', data: cultivo })
    } catch (error: any) {
      return response.internalServerError({ message: 'Error al actualizar cultivo', error: error.message })
    }
  }

  async destroy({ params, response }: HttpContext) {
    try {
      const cultivo = await Cultivo.findOrFail(params.id)
      await cultivo.delete()
      return response.ok({ message: 'Cultivo eliminado correctamente' })
    } catch (error: any) {
      return response.internalServerError({ message: 'Error al eliminar cultivo', error: error.message })
    }
  }
}