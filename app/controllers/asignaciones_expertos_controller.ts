import type { HttpContext } from '@adonisjs/core/http'
import AsignacionExperto from '#models/asignacion_experto'

export default class AsignacionesExpertosController {
  /**
   * @index
   * @summary Listar asignaciones de expertos
   * @responseBody 200 - {"data": [{"idAsignacion": 1, "fechaAsignada": "2026-05-11", "experto": {"nombre": "Juan"}, "finca": {"nombreFinca": "Finca El Paraíso"}}]}
   */

  async index({ response }: HttpContext) {
    try {
      const asignaciones = await AsignacionExperto.query()
        .preload('experto', (q) => q.preload('rol'))
        .preload('finca')
        .orderBy('fecha_asignada', 'desc')
      return response.ok({ data: asignaciones })
    } catch (error: any) {
      return response.internalServerError({ message: 'Error al obtener asignaciones', error: error.message })
    }
  }

  async show({ params, response }: HttpContext) {
    try {
      const asignacion = await AsignacionExperto.query()
        .where('id_asignacion', params.id)
        .preload('experto', (q) => q.preload('rol'))
        .preload('finca')
        .firstOrFail()
      return response.ok({ data: asignacion })
    } catch {
      return response.notFound({ message: 'Asignación no encontrada' })
    }
  }

  /**
   * UPSERT: si ya existe asignación para esa finca, la actualiza.
   * Si no existe, la crea. Así el botón siempre muestra el experto correcto.
   */
  async store({ request, response }: HttpContext) {
    try {
      const { idExperto, idFinca, fechaAsignada } = request.only(['idExperto', 'idFinca', 'fechaAsignada'])

      if (!idExperto) return response.badRequest({ message: 'El campo idExperto es obligatorio' })
      if (!idFinca) return response.badRequest({ message: 'El campo idFinca es obligatorio' })
      if (!fechaAsignada)  return response.badRequest({ message: 'El campo fechaAsignada es obligatorio' })

      // Buscar si ya existe una asignación para esta finca
      let asignacion = await AsignacionExperto.query().where('id_finca', idFinca).first()

      if (asignacion) {
        // Ya existe → actualizar el experto
        asignacion.idExperto     = idExperto
        asignacion.fechaAsignada = fechaAsignada
        await asignacion.save()
      } else {
        // No existe → crear nueva
        asignacion = await AsignacionExperto.create({ idExperto, idFinca, fechaAsignada })
      }

      await asignacion.load('experto')
      await asignacion.load('finca')

      return response.created({ message: 'Asignación guardada correctamente', data: asignacion })
    } catch (error: any) {
      return response.internalServerError({ message: 'Error al guardar asignación', error: error.message })
    }
  }

  async update({ params, request, response }: HttpContext) {
    try {
      const asignacion = await AsignacionExperto.findOrFail(params.id)
      const data = request.only(['idExperto', 'idFinca', 'fechaAsignada'])

      asignacion.merge(data)
      await asignacion.save()
      await asignacion.load('experto')
      await asignacion.load('finca')

      return response.ok({ message: 'Asignación actualizada', data: asignacion })
    } catch (error: any) {
      return response.internalServerError({ message: 'Error al actualizar asignación', error: error.message })
    }
  }

  /**
   * @destroy
   * @summary Eliminar asignación de experto
   * @responseBody 200 - {"message": "Asignación eliminada correctamente"}
   * @responseBody 404 - {"message": "Asignación no encontrada"}
   */

  async destroy({ params, response }: HttpContext) {
    try {
      const asignacion = await AsignacionExperto.findOrFail(params.id)
      await asignacion.delete()
      return response.ok({ message: 'Asignación eliminada correctamente' })
    } catch {
      return response.notFound({ message: 'Asignación no encontrada' })
    }
  }
}
