import type { HttpContext } from '@adonisjs/core/http'
import AsignacionExperto from '#models/asignacion_experto'

export default class AsignacionesExpertosController {
  // GET /asignaciones_expertos
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

  // GET /asignaciones_expertos/:id
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

  // POST /asignaciones_expertos
  async store({ request, response }: HttpContext) {
    try {
      const { idExperto, idFinca, fechaAsignada } = request.only([
        'idExperto', 'idFinca', 'fechaAsignada'
      ])

      if (!idExperto) return response.badRequest({ message: 'El campo idExperto es obligatorio' })
      if (!idFinca) return response.badRequest({ message: 'El campo idFinca es obligatorio' })
      if (!fechaAsignada) return response.badRequest({ message: 'El campo fechaAsignada es obligatorio' })

      const asignacion = await AsignacionExperto.create({ idExperto, idFinca, fechaAsignada })
      await asignacion.load('experto')
      await asignacion.load('finca')

      return response.created({ message: 'Asignación creada correctamente', data: asignacion })
    } catch (error: any) {
      return response.internalServerError({ message: 'Error al crear asignación', error: error.message })
    }
  }

  // PUT /asignaciones_expertos/:id
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

  // DELETE /asignaciones_expertos/:id
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
