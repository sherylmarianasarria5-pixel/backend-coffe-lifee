import type { HttpContext } from '@adonisjs/core/http'
import Cultivo from '#models/cultivo'
import { cultivoStoreValidator, cultivoUpdateValidator } from '#validators/validators'

export default class CultivosController {

  /**
   * @index
   * @summary Listar cultivos
   * @responseBody 200 - {"data": [{"idCultivo": 1, "nombreCultivo": "Cultivo Principal", "tipoCultivo": "Cafe", "finca": {"nombreFinca": "Finca El Paraíso"}}]}
   */
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
      if (idEstadoCultivo) query.where('id_estado', idEstadoCultivo)
      if (search)          query.whereILike('nombre_cultivo', `%${search}%`)

      const cultivos = await query.paginate(page, limit)
      return response.ok(cultivos)
    } catch (error: any) {
      return response.internalServerError({ message: 'Error al obtener cultivos', error: error.message })
    }
  }

  /**
   * @store
   * @summary Crear cultivo
   * @requestBody {"id_finca": 1, "nombre_cultivo": "Cultivo Principal", "tipo_cultivo": "Cafe", "id_estado_cultivo": 1}
   * @responseBody 201 - {"message": "Cultivo creado correctamente", "data": {"idCultivo": 1}}
   * @responseBody 422 - {"message": "Error de validación"}
   */
  async store({ request, response }: HttpContext) {
    try {
      const data = await request.validateUsing(cultivoStoreValidator)

      const cultivo = await Cultivo.create({
        idFinca:         data.id_finca,
        nombreCultivo:   data.nombre_cultivo,
        tipoCultivo:     data.tipo_cultivo,
        idEstadoCultivo: data.id_estado_cultivo ?? null,
      })

      await cultivo.load('finca')
      await cultivo.load('estadoCultivo')

      return response.created({ message: 'Cultivo creado correctamente', data: cultivo })
    } catch (error: any) {
      if (error.code === 'E_VALIDATION_ERROR') {
        return response.unprocessableEntity({ message: 'Error de validación', errors: error.messages })
      }
      return response.internalServerError({ message: 'Error al crear cultivo', error: error.message })
    }
  }

  /**
   * @show
   * @summary Ver cultivo por ID
   * @responseBody 200 - {"idCultivo": 1, "nombreCultivo": "Cultivo Principal", "tipoCultivo": "Cafe"}
   * @responseBody 404 - {"message": "Cultivo no encontrado"}
   */
  async show({ params, response }: HttpContext) {
    try {
      const cultivo = await Cultivo.query()
        .where('id_cultivo', params.id)
        .preload('finca')
        .preload('estadoCultivo')
        .firstOrFail()
      return response.ok(cultivo)
    } catch {
      return response.notFound({ message: 'Cultivo no encontrado' })
    }
  }

  /**
   * @update
   * @summary Actualizar cultivo
   * @requestBody {"nombre_cultivo": "Cultivo Actualizado", "tipo_cultivo": "Cafe", "id_estado_cultivo": 2}
   * @responseBody 200 - {"message": "Cultivo actualizado correctamente"}
   * @responseBody 422 - {"message": "Error de validación"}
   */
  async update({ params, request, response }: HttpContext) {
    try {
      const cultivo = await Cultivo.findOrFail(params.id)
      const data    = await request.validateUsing(cultivoUpdateValidator)

      const payload: Record<string, any> = {}
      if (data.nombre_cultivo    !== undefined) payload.nombreCultivo   = data.nombre_cultivo
      if (data.tipo_cultivo      !== undefined) payload.tipoCultivo     = data.tipo_cultivo
      if (data.id_estado_cultivo !== undefined) payload.idEstadoCultivo = data.id_estado_cultivo

      cultivo.merge(payload)
      await cultivo.save()
      await cultivo.load('finca')
      await cultivo.load('estadoCultivo')

      return response.ok({ message: 'Cultivo actualizado correctamente', data: cultivo })
    } catch (error: any) {
      if (error.code === 'E_VALIDATION_ERROR') {
        return response.unprocessableEntity({ message: 'Error de validación', errors: error.messages })
      }
      return response.internalServerError({ message: 'Error al actualizar cultivo', error: error.message })
    }
  }

  /**
   * @destroy
   * @summary Eliminar cultivo
   * @responseBody 200 - {"message": "Cultivo eliminado correctamente"}
   * @responseBody 404 - {"message": "Cultivo no encontrado"}
   */
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
