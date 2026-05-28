import type { HttpContext } from '@adonisjs/core/http'
import Monitoreo from '#models/monitoreo'
import Usuario from '#models/usuario'
import { monitoreoStoreValidator, monitoreoUpdateValidator } from '#validators/validators'
import { DateTime } from 'luxon'

function serializar(m: Monitoreo) {
  const exp = m.experto
  const imagenes = m.imagenes ? m.imagenes.map((img: any) => ({
    idImagen: img.idImagen,
    rutaImagen: img.rutaImagen,
    analisis: img.analisis ? img.analisis.map((a: any) => ({
      idAnalisis: a.idAnalisis,
      resultado: a.resultado,
      porcentajeConfianza: a.porcentajeConfianza,
      estadoAnalisis: a.estadoAnalisis ? { nombreEstado: a.estadoAnalisis.nombreEstado } : null,
      nivelRoya: a.nivelRoya ? { nombreNivel: a.nivelRoya.nombreNivel } : null,
    })) : [],
  })) : []
  return {
    idMonitoreo:    m.idMonitoreo,
    idCultivo:      m.idCultivo,
    fechaMonitoreo: m.fechaMonitoreo,
    observaciones:  m.observaciones,
    fechaRegistro:  m.fechaRegistro,
    fechaActualizacion: m.fechaActualizacion,
    cultivo: m.cultivo ? {
      idCultivo: m.cultivo.idCultivo,
      idFinca: m.cultivo.idFinca,
      nombreCultivo: m.cultivo.nombreCultivo,
    } : null,
    imagenes,
    recomendaciones: m.recomendaciones ? m.recomendaciones.map((r: any) => ({
      idRecomendacion: r.idRecomendacion,
      descripcion: r.descripcion,
      tipo: r.tipo ? { nombre: r.tipo.nombreTipo || r.tipo.nombre } : null,
      tratamientos: r.tratamientos ? r.tratamientos.map(() => ({})) : [],
    })) : [],
    experto: exp ? {
      idUsuario: exp.idUsuario,
      nombre:    exp.nombre,
      apellido:  exp.apellido,
      correo:    exp.correo,
      telefono:  exp.telefono,
    } : null,
  }
}

export default class MonitoreosController {

  /**
   * @index
   * @summary Listar todos los monitoreos
   * @description Retorna lista paginada de monitoreos con datos completos del experto
   * @paramQuery page - Número de página - @type(number)
   * @paramQuery limit - Cantidad por página - @type(number)
   * @paramQuery id_cultivo - Filtrar por cultivo - @type(number)
   * @paramQuery id_experto - Filtrar por experto - @type(number)
   * @responseBody 200 - {
   *   "data": [{
   *     "idMonitoreo": 1,
   *     "idCultivo": 3,
   *     "fechaMonitoreo": "2026-05-26",
   *     "observaciones": "Revisión del lote norte",
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
   * @responseBody 500 - {"message": "Error al obtener monitoreos", "error": "string"}
   */
  async index({ request, response }: HttpContext) {
    try {
      const page      = Number(request.input('page', 1))
      const limit     = Number(request.input('limit', 10))
      const idCultivo = request.input('id_cultivo')
      const idExperto = request.input('id_experto')

      const query = Monitoreo.query()
        .preload('cultivo')
        .preload('experto')
        .preload('imagenes', (q) => {
          q.preload('analisis', (a) => {
            a.preload('estadoAnalisis')
            a.preload('nivelRoya')
          })
        })
        .preload('recomendaciones', (r) => {
          r.preload('tipo')
          r.preload('tratamientos')
        })
        .orderBy('fecha_monitoreo', 'desc')

      if (idCultivo) query.where('id_cultivo', idCultivo)
      if (idExperto) query.where('id_experto', idExperto)

      const paginado = await query.paginate(page, limit)
      const json = paginado.toJSON()
      json.data  = paginado.all().map(serializar)

      return response.ok(json)
    } catch (error: any) {
      return response.internalServerError({ 
        message: 'Error al obtener monitoreos', 
        error: error.message 
      })
    }
  }

  /**
   * @store
   * @summary Crear un nuevo monitoreo
   * @description El experto se toma automáticamente del token JWT. Solo expertos pueden crear monitoreos.
   * @requestBody {
   *   "id_cultivo": 3,
   *   "fecha_monitoreo": "2026-05-26",
   *   "observaciones": "Revisión del lote norte"
   * }
   * @responseBody 201 - {
   *   "message": "Monitoreo creado correctamente",
   *   "data": {
   *     "idMonitoreo": 1,
   *     "idCultivo": 3,
   *     "fechaMonitoreo": "2026-05-26",
   *     "observaciones": "Revisión del lote norte",
   *     "experto": {
   *       "idUsuario": 5,
   *       "nombre": "Juan",
   *       "apellido": "Pérez",
   *       "correo": "juan@gmail.com",
   *       "telefono": "3001234567"
   *     }
   *   }
   * }
   * @responseBody 401 - {"message": "Token inválido: no se encontró el id del usuario"}
   * @responseBody 403 - {"message": "Solo los expertos pueden registrar monitoreos"}
   * @responseBody 422 - {"message": "Error de validación", "errors": {}}
   * @responseBody 500 - {"message": "Error al crear monitoreo", "error": "string"}
   */
  async store({ request, response }: HttpContext) {
    try {
      const jwt       = (request as any).usuarioJwt
      const idExperto = jwt?.id as number | undefined

      if (!idExperto) {
        return response.unauthorized({ 
          message: 'Token inválido: no se encontró el id del usuario' 
        })
      }

      const experto = await Usuario.query()
        .where('id_usuario', idExperto)
        .whereHas('rol', (q: any) =>
          q.whereRaw('LOWER(TRIM(nombre_rol)) = ?', ['experto'])
        )
        .preload('rol')
        .first()

      if (!experto) {
        return response.forbidden({ 
          message: 'Solo los expertos pueden registrar monitoreos' 
        })
      }

      const data = await request.validateUsing(monitoreoStoreValidator)

      const monitoreo = await Monitoreo.create({
        idCultivo:      data.id_cultivo,
        idExperto:      idExperto,
        fechaMonitoreo: DateTime.fromISO(data.fecha_monitoreo),
        observaciones:  data.observaciones ?? null,
      })

      return response.created({
        message: 'Monitoreo creado correctamente',
        data: {
          idMonitoreo:    monitoreo.idMonitoreo,
          idCultivo:      monitoreo.idCultivo,
          fechaMonitoreo: monitoreo.fechaMonitoreo,
          observaciones:  monitoreo.observaciones,
          experto: {
            idUsuario: experto.idUsuario,
            nombre:    experto.nombre,
            apellido:  experto.apellido,
            correo:    experto.correo,
            telefono:  experto.telefono,
          }
        },
      })
    } catch (error: any) {
      if (error.code === 'E_VALIDATION_ERROR') {
        return response.unprocessableEntity({ 
          message: 'Error de validación', 
          errors: error.messages 
        })
      }
      return response.internalServerError({ 
        message: 'Error al crear monitoreo', 
        error: error.message 
      })
    }
  }

  /**
   * @show
   * @summary Obtener un monitoreo por ID
   * @description Retorna los datos completos de un monitoreo incluyendo experto, cultivo e imágenes
   * @paramPath id - ID del monitoreo - @type(number) @required
   * @responseBody 200 - {
   *   "idMonitoreo": 1,
   *   "idCultivo": 3,
   *   "fechaMonitoreo": "2026-05-26",
   *   "observaciones": "Revisión del lote norte",
   *   "experto": {
   *     "idUsuario": 5,
   *     "nombre": "Juan",
   *     "apellido": "Pérez",
   *     "correo": "juan@gmail.com",
   *     "telefono": "3001234567"
   *   }
   * }
   * @responseBody 404 - {"message": "Monitoreo no encontrado"}
   * @responseBody 500 - {"message": "Error al obtener monitoreo", "error": "string"}
   */
  async show({ params, response }: HttpContext) {
    try {
      const monitoreo = await Monitoreo.query()
        .where('id_monitoreo', params.id)
        .preload('cultivo')
        .preload('experto')
        .preload('imagenes')
        .preload('analisisIas')
        .firstOrFail()

      return response.ok(serializar(monitoreo))
    } catch {
      return response.notFound({ message: 'Monitoreo no encontrado' })
    }
  }

  /**
   * @update
   * @summary Actualizar un monitoreo
   * @description Actualiza la fecha o las observaciones de un monitoreo existente
   * @paramPath id - ID del monitoreo - @type(number) @required
   * @requestBody {
   *   "fecha_monitoreo": "2026-05-27",
   *   "observaciones": "Actualización de observaciones"
   * }
   * @responseBody 200 - {"message": "Monitoreo actualizado correctamente", "data": {}}
   * @responseBody 422 - {"message": "Error de validación", "errors": {}}
   * @responseBody 404 - {"message": "Monitoreo no encontrado"}
   * @responseBody 500 - {"message": "Error al actualizar monitoreo", "error": "string"}
   */
  async update({ params, request, response }: HttpContext) {
    try {
      const monitoreo = await Monitoreo.findOrFail(params.id)
      const data      = await request.validateUsing(monitoreoUpdateValidator)

      const payload: Record<string, any> = {}
      if (data.observaciones   !== undefined) payload.observaciones  = data.observaciones
      if (data.fecha_monitoreo !== undefined) payload.fechaMonitoreo = DateTime.fromISO(data.fecha_monitoreo)

      monitoreo.merge(payload)
      await monitoreo.save()

      return response.ok({ 
        message: 'Monitoreo actualizado correctamente', 
        data: monitoreo 
      })
    } catch (error: any) {
      if (error.code === 'E_VALIDATION_ERROR') {
        return response.unprocessableEntity({ 
          message: 'Error de validación', 
          errors: error.messages 
        })
      }
      return response.internalServerError({ 
        message: 'Error al actualizar monitoreo', 
        error: error.message 
      })
    }
  }

  /**
   * @destroy
   * @summary Eliminar un monitoreo
   * @description Elimina permanentemente un monitoreo y sus datos relacionados
   * @paramPath id - ID del monitoreo - @type(number) @required
   * @responseBody 200 - {"message": "Monitoreo eliminado correctamente"}
   * @responseBody 404 - {"message": "Monitoreo no encontrado"}
   * @responseBody 500 - {"message": "Error al eliminar monitoreo", "error": "string"}
   */
  async destroy({ params, response }: HttpContext) {
    try {
      const monitoreo = await Monitoreo.findOrFail(params.id)
      await monitoreo.delete()
      return response.ok({ message: 'Monitoreo eliminado correctamente' })
    } catch (error: any) {
      return response.internalServerError({ 
        message: 'Error al eliminar monitoreo', 
        error: error.message 
      })
    }
  }
}
