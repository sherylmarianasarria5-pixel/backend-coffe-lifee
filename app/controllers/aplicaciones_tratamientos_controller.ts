import type { HttpContext } from '@adonisjs/core/http'
import AplicacionesTratamiento from '#models/aplicaciones_tratamiento'

export default class AplicacionesTratamientosController {

  async index({ request, response }: HttpContext) {
    try {
      const page          = Number(request.input('page', 1))
      const limit         = Number(request.input('limit', 10))
      const search        = request.input('search', '')
      const idTratamiento = request.input('id_tratamiento')
      const idUsuario     = request.input('id_usuario')

      const ALLOWED = ['id_aplicacion', 'observacion', 'fecha_aplicacion', 'fecha_registro', 'fecha_actualizacion', 'id_tratamiento', 'id_usuario']
      const orderBy = request.input('order_by', 'id_aplicacion')
      const orderDir = request.input('order_dir', 'desc')
      const safeColumn = ALLOWED.includes(orderBy) ? orderBy : 'id_aplicacion'

      const query = AplicacionesTratamiento.query()
        .preload('tratamiento')
        .preload('usuario')

      if (search) {
        query.where((q) => {
          q.whereILike('observacion', `%${search}%`)
        })
      }
      if (idTratamiento) query.where('id_tratamiento', idTratamiento)
      if (idUsuario)     query.where('id_usuario', idUsuario)

      query.orderBy(safeColumn, orderDir === 'asc' ? 'asc' : 'desc')

      const aplicaciones = await query.paginate(page, limit)
      return response.ok(aplicaciones.toJSON())
    } catch (error: any) {
      return response.internalServerError({ message: 'Error al obtener aplicaciones de tratamiento', error: error.message })
    }
  }

  async show({ params, response }: HttpContext) {
    try {
      const aplicacion = await AplicacionesTratamiento.query()
        .where('id_aplicacion', params.id)
        .preload('tratamiento')
        .preload('usuario')
        .firstOrFail()
      return response.ok({ data: aplicacion })
    } catch {
      return response.notFound({ message: 'Aplicación de tratamiento no encontrada' })
    }
  }

  async store({ request, response }: HttpContext) {
    try {
      const data = request.only(['id_tratamiento', 'id_usuario', 'fecha_aplicacion', 'observacion'])

      if (!data.id_tratamiento) return response.badRequest({ message: 'El id_tratamiento es obligatorio' })

      const aplicacion = await AplicacionesTratamiento.create({
        idTratamiento:  data.id_tratamiento,
        idUsuario:      data.id_usuario       ?? null,
        fechaAplicacion: data.fecha_aplicacion ?? null,
        observacion:    data.observacion       ?? null,
      })

      await aplicacion.load('tratamiento')
      await aplicacion.load('usuario')

      return response.created({ message: 'Aplicación de tratamiento creada correctamente', data: aplicacion })
    } catch (error: any) {
      return response.internalServerError({ message: 'Error al crear aplicación de tratamiento', error: error.message })
    }
  }

  async update({ params, request, response }: HttpContext) {
    try {
      const aplicacion = await AplicacionesTratamiento.findOrFail(params.id)
      const data = request.only(['id_tratamiento', 'id_usuario', 'fecha_aplicacion', 'observacion'])

      const payload: Record<string, any> = {}
      if (data.id_tratamiento   !== undefined) payload.idTratamiento  = data.id_tratamiento
      if (data.id_usuario       !== undefined) payload.idUsuario      = data.id_usuario
      if (data.fecha_aplicacion !== undefined) payload.fechaAplicacion = data.fecha_aplicacion
      if (data.observacion      !== undefined) payload.observacion    = data.observacion

      aplicacion.merge(payload)
      await aplicacion.save()
      await aplicacion.load('tratamiento')
      await aplicacion.load('usuario')

      return response.ok({ message: 'Aplicación actualizada correctamente', data: aplicacion })
    } catch (error: any) {
      return response.internalServerError({ message: 'Error al actualizar aplicación de tratamiento', error: error.message })
    }
  }

  async destroy({ params, response }: HttpContext) {
    try {
      const aplicacion = await AplicacionesTratamiento.findOrFail(params.id)
      await aplicacion.delete()
      return response.ok({ message: 'Aplicación eliminada correctamente' })
    } catch (error: any) {
      return response.internalServerError({ message: 'Error al eliminar aplicación de tratamiento', error: error.message })
    }
  }
}
