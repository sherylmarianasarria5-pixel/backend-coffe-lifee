import type { HttpContext } from '@adonisjs/core/http'
import Recomendacione from '#models/recomendacione'


function serializar(r: Recomendacione) {
  const exp = r.experto
  return {
    idRecomendacion: r.idRecomendacion,
    idMonitoreo:     r.idMonitoreo,
    descripcion:     r.descripcion,
    fechaLimite:     r.fechaLimite,
    idPrioridad:     r.idPrioridad,
    fechaRegistro:   r.fechaRegistro,
    experto: exp ? {
      idUsuario: exp.idUsuario,
      nombre:    exp.nombre,
      apellido:  exp.apellido,
      correo:    exp.correo,
      telefono:  exp.telefono,
    } : null,
    monitoreo:    r.$preloaded.monitoreo    ? r.monitoreo    : undefined,
    tipo:         r.$preloaded.tipo         ? r.tipo         : undefined,
    tratamientos: r.$preloaded.tratamientos ? r.tratamientos : undefined,
  }
}

export default class RecomendacionesController {

  /**
   * @index
   * @summary Listar todas las recomendaciones
   * @description Retorna lista paginada de recomendaciones con datos completos del experto emisor
   * @paramQuery page - Número de página - @type(number)
   * @paramQuery limit - Cantidad por página - @type(number)
   * @paramQuery id_monitoreo - Filtrar por monitoreo - @type(number)
   * @paramQuery id_experto_emisor - Filtrar por experto - @type(number)
   * @paramQuery id_prioridad - Filtrar por prioridad - @type(number)
   * @responseBody 200 - {
   *   "data": [{
   *     "idRecomendacion": 1,
   *     "idMonitoreo": 2,
   *     "descripcion": "Aplicar fungicida",
   *     "fechaLimite": "2026-06-01",
   *     "idPrioridad": 1,
   *     "fechaRegistro": "2026-05-26T00:00:00.000Z",
   *     "experto": {
   *       "idUsuario": 5,
   *       "nombre": "Juan",
   *       "apellido": "Pérez",
   *       "correo": "juan@gmail.com",
   *       "telefono": "3001234567"
   *     }
   *   }]
   * }
   * @responseBody 500 - {"message": "Error al obtener recomendaciones", "error": "string"}
   */
  async index({ request, response }: HttpContext) {
    try {
      const page        = Number(request.input('page', 1))
      const limit       = Number(request.input('limit', 10))
      const search      = request.input('search', '')
      const idMonitoreo = request.input('id_monitoreo')
      const idExperto   = request.input('id_experto_emisor')
      const idPrioridad = request.input('id_prioridad')
      const idTipo      = request.input('id_tipo')
      const ALLOWED = ['id_recomendacion', 'descripcion', 'fecha_limite', 'fecha_registro', 'fecha_actualizacion', 'id_monitoreo', 'id_experto_emisor', 'id_prioridad', 'id_tipo']
      const orderBy = request.input('order_by', 'id_recomendacion')
      const orderDir = request.input('order_dir', 'desc')
      const safeColumn = ALLOWED.includes(orderBy) ? orderBy : 'id_recomendacion'

      const query = Recomendacione.query()
        .preload('monitoreo')
        .preload('experto')
        .preload('tipo')
        .preload('tratamientos')

      if (search) {
        query.where((q) => {
          q.whereILike('descripcion', `%${search}%`)
        })
      }
      if (idMonitoreo) query.where('id_monitoreo', idMonitoreo)
      if (idExperto)   query.where('id_experto_emisor', idExperto)
      if (idPrioridad) query.where('id_prioridad', idPrioridad)
      if (idTipo)      query.where('id_tipo', idTipo)

      query.orderBy(safeColumn, orderDir === 'asc' ? 'asc' : 'desc')

      const paginado = await query.paginate(page, limit)
      const json = paginado.toJSON()
      json.data  = paginado.all().map(serializar)

      return response.ok(json)
    } catch (error: any) {
      return response.internalServerError({ 
        message: 'Error al obtener recomendaciones', 
        error: error.message 
      })
    }
  }

  /**
   * @store
   * @summary Crear una nueva recomendación
   * @description El experto emisor se toma automáticamente del token JWT
   * @requestBody {
   *   "id_monitoreo": 2,
   *   "id_tipo": 1,
   *   "id_prioridad": 1,
   *   "descripcion": "Aplicar fungicida en el lote norte",
   *   "fecha_limite": "2026-06-01"
   * }
   * @responseBody 201 - {
   *   "message": "Recomendación creada correctamente",
   *   "data": {
   *     "idRecomendacion": 1,
   *     "idMonitoreo": 2,
   *     "descripcion": "Aplicar fungicida en el lote norte",
   *     "fechaLimite": "2026-06-01",
   *     "experto": {
   *       "idUsuario": 5,
   *       "nombre": "Juan",
   *       "apellido": "Pérez",
   *       "correo": "juan@gmail.com",
   *       "telefono": "3001234567"
   *     }
   *   }
   * }
   * @responseBody 400 - {"message": "El id_monitoreo es obligatorio"}
   * @responseBody 400 - {"message": "La descripcion es obligatoria"}
   * @responseBody 500 - {"message": "Error al crear recomendación", "error": "string"}
   */
  async store({ request, response }: HttpContext) {
    try {
      const jwt          = (request as any).usuarioJwt
      const idExpertoJwt = jwt?.id as number | undefined

      const data = request.only([
        'id_monitoreo', 
        'id_tipo', 
        'id_prioridad', 
        'descripcion', 
        'fecha_limite'
      ])

      if (!data.id_monitoreo) return response.badRequest({ 
        message: 'El id_monitoreo es obligatorio' 
      })
      if (!data.descripcion) return response.badRequest({ 
        message: 'La descripcion es obligatoria' 
      })

      const recomendacion = await Recomendacione.create({
        idMonitoreo:     data.id_monitoreo,
        idExpertoEmisor: idExpertoJwt      ?? null,
        idTipo:          data.id_tipo      ?? null,
        idPrioridad:     data.id_prioridad ?? null,
        descripcion:     data.descripcion,
        fechaLimite:     data.fecha_limite ?? null,
      })

      await recomendacion.load('monitoreo')
      await recomendacion.load('experto')
      await recomendacion.load('tipo')

      return response.created({
        message: 'Recomendación creada correctamente',
        data: serializar(recomendacion),
      })
    } catch (error: any) {
      return response.internalServerError({ 
        message: 'Error al crear recomendación', 
        error: error.message 
      })
    }
  }

  /**
   * @show
   * @summary Obtener una recomendación por ID
   * @description Retorna los datos completos de una recomendación incluyendo experto, monitoreo y tratamientos
   * @paramPath id - ID de la recomendación - @type(number) @required
   * @responseBody 200 - {
   *   "idRecomendacion": 1,
   *   "idMonitoreo": 2,
   *   "descripcion": "Aplicar fungicida",
   *   "fechaLimite": "2026-06-01",
   *   "experto": {
   *     "idUsuario": 5,
   *     "nombre": "Juan",
   *     "apellido": "Pérez",
   *     "correo": "juan@gmail.com",
   *     "telefono": "3001234567"
   *   }
   * }
   * @responseBody 404 - {"message": "Recomendación no encontrada"}
   * @responseBody 500 - {"message": "Error al obtener recomendación", "error": "string"}
   */
  async show({ params, response }: HttpContext) {
    try {
      const r = await Recomendacione.query()
        .where('id_recomendacion', params.id)
        .preload('monitoreo')
        .preload('experto')
        .preload('tipo')
        .preload('tratamientos')
        .firstOrFail()

      return response.ok(serializar(r))
    } catch {
      return response.notFound({ message: 'Recomendación no encontrada' })
    }
  }

  /**
   * @update
   * @summary Actualizar una recomendación
   * @description Actualiza los datos de una recomendación existente
   * @paramPath id - ID de la recomendación - @type(number) @required
   * @requestBody {
   *   "descripcion": "Aplicar fungicida actualizado",
   *   "id_prioridad": 2,
   *   "fecha_limite": "2026-06-15"
   * }
   * @responseBody 200 - {
   *   "message": "Recomendación actualizada correctamente",
   *   "data": {
   *     "idRecomendacion": 1,
   *     "descripcion": "Aplicar fungicida actualizado",
   *     "experto": {
   *       "idUsuario": 5,
   *       "nombre": "Juan",
   *       "apellido": "Pérez"
   *     }
   *   }
   * }
   * @responseBody 404 - {"message": "Recomendación no encontrada"}
   * @responseBody 500 - {"message": "Error al actualizar recomendación", "error": "string"}
   */
  async update({ params, request, response }: HttpContext) {
    try {
      const r    = await Recomendacione.findOrFail(params.id)
      const data = request.only([
        'id_monitoreo', 
        'id_experto_emisor', 
        'id_tipo', 
        'id_prioridad', 
        'descripcion', 
        'fecha_limite'
      ])

      const payload: Record<string, any> = {}
      if (data.id_monitoreo      !== undefined) payload.idMonitoreo     = data.id_monitoreo
      if (data.id_experto_emisor !== undefined) payload.idExpertoEmisor = data.id_experto_emisor
      if (data.id_tipo           !== undefined) payload.idTipo          = data.id_tipo
      if (data.id_prioridad      !== undefined) payload.idPrioridad     = data.id_prioridad
      if (data.descripcion       !== undefined) payload.descripcion     = data.descripcion
      if (data.fecha_limite      !== undefined) payload.fechaLimite     = data.fecha_limite

      r.merge(payload)
      await r.save()
      await r.load('experto')

      return response.ok({ 
        message: 'Recomendación actualizada correctamente', 
        data: serializar(r) 
      })
    } catch (error: any) {
      return response.internalServerError({ 
        message: 'Error al actualizar recomendación', 
        error: error.message 
      })
    }
  }

  /**
   * @destroy
   * @summary Eliminar una recomendación
   * @description Elimina permanentemente una recomendación
   * @paramPath id - ID de la recomendación - @type(number) @required
   * @responseBody 200 - {"message": "Recomendación eliminada correctamente"}
   * @responseBody 404 - {"message": "Recomendación no encontrada"}
   * @responseBody 500 - {"message": "Error al eliminar recomendación", "error": "string"}
   */
  async destroy({ params, response }: HttpContext) {
    try {
      const r = await Recomendacione.findOrFail(params.id)
      await r.delete()
      return response.ok({ message: 'Recomendación eliminada correctamente' })
    } catch (error: any) {
      return response.internalServerError({ 
        message: 'Error al eliminar recomendación', 
        error: error.message 
      })
    }
  }
}
