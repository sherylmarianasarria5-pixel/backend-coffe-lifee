import type { HttpContext } from '@adonisjs/core/http'
import Tratamiento from '#models/tratamiento'

export default class TratamientosController {

  async index({ request, response }: HttpContext) {
    try {
      const page        = Number(request.input('page', 1))
      const limit       = Number(request.input('limit', 10))
      const search      = request.input('search', '')
      const idTipo      = request.input('id_tipo')
      const query = Tratamiento.query().preload('tipoTratamiento').preload('insumo')
      if (search) {
        query.where((q) => {
          q.whereILike('nombre', `%${search}%`)
           .orWhereILike('descripcion', `%${search}%`)
        })
      }
      if (idTipo) {
        query.where('id_tipo_tratamiento', idTipo)
      }
      const ALLOWED = ['id_tratamiento', 'nombre', 'fecha_registro', 'fecha_actualizacion']
      const orderBy = request.input('order_by', 'id_tratamiento')
      const orderDir = request.input('order_dir', 'desc')
      const safeColumn = ALLOWED.includes(orderBy) ? orderBy : 'id_tratamiento'
      query.orderBy(safeColumn, orderDir === 'asc' ? 'asc' : 'desc')

      const tratamientos = await query.paginate(page, limit)
      return response.ok(tratamientos)
    } catch (error: any) {
      return response.internalServerError({
        message: 'Error al obtener tratamientos',
        error: error.message,
      })
    }
  }

  async show({ params, response }: HttpContext) {
    try {
      const tratamiento = await Tratamiento.query()
        .where('id_tratamiento', params.id)
        .preload('tipoTratamiento')
        .preload('insumo')
        .firstOrFail()
      return response.ok(tratamiento)
    } catch {
      return response.notFound({ message: 'Tratamiento no encontrado' })
    }
  }

  async store({ request, response }: HttpContext) {
    try {
      const data = request.only([
        'id_tipo_tratamiento',
        'id_insumo',
        'nombre',
        'descripcion',
        'dosis',
        'frecuencia',
        'observaciones',
      ])

      if (!data.nombre) {
        return response.badRequest({ message: 'El nombre es obligatorio' })
      }

      const tratamiento = await Tratamiento.create({
        idTipoTratamiento: data.id_tipo_tratamiento ?? null,
        idInsumo:          data.id_insumo          ?? null,
        nombre:            data.nombre,
        descripcion:       data.descripcion        ?? null,
        dosis:             data.dosis              ?? null,
        frecuencia:        data.frecuencia          ?? null,
        observaciones:     data.observaciones       ?? null,
      })

      await tratamiento.load('tipoTratamiento')
      await tratamiento.load('insumo')

      return response.created({
        message: 'Tratamiento creado correctamente',
        data: tratamiento,
      })
    } catch (error: any) {
      return response.internalServerError({
        message: 'Error al crear tratamiento',
        error: error.message,
      })
    }
  }

  async update({ params, request, response }: HttpContext) {
    try {
      const tratamiento = await Tratamiento.findOrFail(params.id)

      const data = request.only([
        'id_tipo_tratamiento',
        'id_insumo',
        'nombre',
        'descripcion',
        'dosis',
        'frecuencia',
        'observaciones',
      ])

      const payload: Record<string, any> = {}
      if (data.id_tipo_tratamiento !== undefined) payload.idTipoTratamiento = data.id_tipo_tratamiento
      if (data.id_insumo          !== undefined) payload.idInsumo          = data.id_insumo
      if (data.nombre             !== undefined) payload.nombre            = data.nombre
      if (data.descripcion        !== undefined) payload.descripcion       = data.descripcion
      if (data.dosis              !== undefined) payload.dosis             = data.dosis
      if (data.frecuencia         !== undefined) payload.frecuencia        = data.frecuencia
      if (data.observaciones      !== undefined) payload.observaciones     = data.observaciones

      tratamiento.merge(payload)
      await tratamiento.save()
      await tratamiento.load('tipoTratamiento')
      await tratamiento.load('insumo')

      return response.ok({
        message: 'Tratamiento actualizado correctamente',
        data: tratamiento,
      })
    } catch (error: any) {
      return response.internalServerError({
        message: 'Error al actualizar tratamiento',
        error: error.message,
      })
    }
  }

  async destroy({ params, response }: HttpContext) {
    try {
      const tratamiento = await Tratamiento.findOrFail(params.id)
      await tratamiento.delete()
      return response.ok({ message: 'Tratamiento eliminado correctamente' })
    } catch (error: any) {
      return response.internalServerError({
        message: 'Error al eliminar tratamiento',
        error: error.message,
      })
    }
  }
}
