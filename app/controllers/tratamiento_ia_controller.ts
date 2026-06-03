import type { HttpContext } from '@adonisjs/core/http'
import TratamientoIa from '#models/tratamiento_ia'

function serializar(t: TratamientoIa) {
  return {
    idTratamiento:      t.idTratamiento,
    idRecomendacion:    t.idRecomendacion,
    idTipoTratamiento:  t.idTipoTratamiento,
    nombre:             t.nombre,
    descripcion:        t.descripcion,
    fechaRegistro:      t.fechaRegistro,
    fechaActualizacion: t.fechaActualizacion,
    recomendacion: t.$preloaded.recomendacion ? t.recomendacion : undefined,
  }
}

export default class TratamientoIaController {

  async index({ request, response }: HttpContext) {
    try {
      const page            = Number(request.input('page', 1))
      const limit           = Number(request.input('limit', 10))
      const idRecomendacion = request.input('id_recomendacion')

      const query = TratamientoIa.query()
        .preload('recomendacion')
        .orderBy('fecha_registro', 'desc')

      if (idRecomendacion) query.where('id_recomendacion', idRecomendacion)

      const paginado = await query.paginate(page, limit)
      const json     = paginado.toJSON()
      json.data      = paginado.all().map(serializar)

      return response.ok(json)
    } catch (error: any) {
      return response.internalServerError({
        message: 'Error al obtener tratamientos IA',
        error: error.message,
      })
    }
  }

  async store({ request, response }: HttpContext) {
    try {
      const data = request.only([
        'id_recomendacion', 'id_tipo_tratamiento', 'nombre', 'descripcion',
      ])

      if (!data.id_recomendacion) return response.badRequest({
        message: 'El id_recomendacion es obligatorio',
      })

      const tratamiento = await TratamientoIa.create({
        idRecomendacion:   data.id_recomendacion,
        idTipoTratamiento: data.id_tipo_tratamiento ?? null,
        nombre:            data.nombre              ?? null,
        descripcion:       data.descripcion         ?? null,
      })

      await tratamiento.load('recomendacion')

      return response.created({
        message: 'Tratamiento IA creado correctamente',
        data: serializar(tratamiento),
      })
    } catch (error: any) {
      return response.internalServerError({
        message: 'Error al crear tratamiento IA',
        error: error.message,
      })
    }
  }

  async show({ params, response }: HttpContext) {
    try {
      const t = await TratamientoIa.query()
        .where('id_tratamiento', params.id)
        .preload('recomendacion')
        .firstOrFail()

      return response.ok(serializar(t))
    } catch {
      return response.notFound({ message: 'Tratamiento IA no encontrado' })
    }
  }

  async update({ params, request, response }: HttpContext) {
    try {
      const t    = await TratamientoIa.findOrFail(params.id)
      const data = request.only([
        'id_recomendacion', 'id_tipo_tratamiento', 'nombre', 'descripcion',
      ])

      const payload: Record<string, any> = {}
      if (data.id_recomendacion    !== undefined) payload.idRecomendacion   = data.id_recomendacion
      if (data.id_tipo_tratamiento !== undefined) payload.idTipoTratamiento = data.id_tipo_tratamiento
      if (data.nombre              !== undefined) payload.nombre            = data.nombre
      if (data.descripcion         !== undefined) payload.descripcion       = data.descripcion

      t.merge(payload)
      await t.save()

      return response.ok({
        message: 'Tratamiento IA actualizado correctamente',
        data: serializar(t),
      })
    } catch (error: any) {
      return response.internalServerError({
        message: 'Error al actualizar tratamiento IA',
        error: error.message,
      })
    }
  }

  async destroy({ params, response }: HttpContext) {
    try {
      const t = await TratamientoIa.findOrFail(params.id)
      await t.delete()
      return response.ok({ message: 'Tratamiento IA eliminado correctamente' })
    } catch (error: any) {
      return response.internalServerError({
        message: 'Error al eliminar tratamiento IA',
        error: error.message,
      })
    }
  }
}
