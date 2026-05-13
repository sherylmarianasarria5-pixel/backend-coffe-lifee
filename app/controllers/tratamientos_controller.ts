import type { HttpContext } from '@adonisjs/core/http'
import Tratamiento from '#models/tratamiento'

export default class TratamientosController {

  /**
   * @index
   * @summary Listar tratamientos
   * @responseBody 200 - {"data": [{"idTratamiento": 1, "nombre": "Fungicida cobre", "dosis": "500ml", "frecuencia": "Cada 15 días", "tipoTratamiento": {}}]}
   */
  async index({ request, response }: HttpContext) {
    try {
      const page   = Number(request.input('page', 1))
      const limit  = Number(request.input('limit', 10))
      const search = request.input('search', '')
      const idTipo = request.input('id_tipo')

      const query = Tratamiento.query().preload('tipoTratamiento')

      if (search) {
        query.where((q) => {
          q.whereILike('nombre', `%${search}%`).orWhereILike('descripcion', `%${search}%`)
        })
      }
      if (idTipo) query.where('id_tipo_tratamiento', idTipo)

      const tratamientos = await query.paginate(page, limit)
      return response.ok(tratamientos)
    } catch (error: any) {
      return response.internalServerError({
        message: 'Error al obtener tratamientos',
        error: error.message,
      })
    }
  }

  /**
   * @show
   * @summary Ver tratamiento por ID
   * @responseBody 200 - {"idTratamiento": 1, "nombre": "Fungicida cobre", "dosis": "500ml"}
   * @responseBody 404 - {"message": "Tratamiento no encontrado"}
   */
  async show({ params, response }: HttpContext) {
    try {
      const tratamiento = await Tratamiento.query()
        .where('id_tratamiento', params.id)
        .preload('tipoTratamiento')
        .firstOrFail()
      return response.ok(tratamiento)
    } catch {
      return response.notFound({ message: 'Tratamiento no encontrado' })
    }
  }

  /**
   * @store
   * @summary Crear tratamiento
   * @requestBody {"id_tipo_tratamiento": 1, "nombre": "Fungicida cobre", "descripcion": "Aplicación preventiva", "dosis": "500ml", "frecuencia": "Cada 15 días"}
   * @responseBody 201 - {"message": "Tratamiento creado correctamente", "data": {"idTratamiento": 1}}
   * @responseBody 400 - {"message": "El nombre es obligatorio"}
   */
  async store({ request, response }: HttpContext) {
    try {
      const data = request.only([
        'id_tipo_tratamiento',
        'nombre',
        'descripcion',
        'dosis',
        'frecuencia',
      ])

      if (!data.nombre) return response.badRequest({ message: 'El nombre es obligatorio' })

      const tratamiento = await Tratamiento.create({
        idTipoTratamiento: data.id_tipo_tratamiento ?? null,
        nombre:            data.nombre,
        descripcion:       data.descripcion         ?? null,
        dosis:             data.dosis               ?? null,
        frecuencia:        data.frecuencia          ?? null,
      })

      await tratamiento.load('tipoTratamiento')

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

  /**
   * @update
   * @summary Actualizar tratamiento
   * @requestBody {"id_tipo_tratamiento": 2, "nombre": "Fungicida actualizado", "descripcion": "Nueva descripción", "dosis": "600ml", "frecuencia": "Cada 20 días"}
   * @responseBody 200 - {"message": "Tratamiento actualizado correctamente"}
   * @responseBody 404 - {"message": "Tratamiento no encontrado"}
   */
  async update({ params, request, response }: HttpContext) {
    try {
      const tratamiento = await Tratamiento.findOrFail(params.id)
      const data = request.only([
        'id_tipo_tratamiento',
        'nombre',
        'descripcion',
        'dosis',
        'frecuencia',
      ])

      const payload: Record<string, any> = {}
      if (data.id_tipo_tratamiento !== undefined) payload.idTipoTratamiento = data.id_tipo_tratamiento
      if (data.nombre              !== undefined) payload.nombre            = data.nombre
      if (data.descripcion         !== undefined) payload.descripcion       = data.descripcion
      if (data.dosis               !== undefined) payload.dosis             = data.dosis
      if (data.frecuencia          !== undefined) payload.frecuencia        = data.frecuencia

      tratamiento.merge(payload)
      await tratamiento.save()
      await tratamiento.load('tipoTratamiento')

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

  /**
   * @destroy
   * @summary Eliminar tratamiento
   * @responseBody 200 - {"message": "Tratamiento eliminado correctamente"}
   * @responseBody 404 - {"message": "Tratamiento no encontrado"}
   */
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
