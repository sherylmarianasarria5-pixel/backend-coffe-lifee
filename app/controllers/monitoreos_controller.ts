import type { HttpContext } from '@adonisjs/core/http'
import Monitoreo from '#models/monitoreo'
import Usuario from '#models/usuario'
import { monitoreoStoreValidator, monitoreoUpdateValidator } from '#validators/validators'

import { DateTime } from 'luxon'

function serializar(m: Monitoreo) {
  const exp = m.usuario
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
    usuario: exp ? {
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
      const search    = request.input('search', '')
      const idCultivo = request.input('id_cultivo')
      const idExperto = request.input('id_experto')
      const ALLOWED = ['id_monitoreo', 'fecha_monitoreo', 'observaciones', 'fecha_registro', 'fecha_actualizacion', 'id_cultivo', 'id_usuario']
      const orderBy = request.input('order_by', 'id_monitoreo')
      const orderDir = request.input('order_dir', 'desc')
      const safeColumn = ALLOWED.includes(orderBy) ? orderBy : 'id_monitoreo'

      const query = Monitoreo.query()
        .preload('cultivo')
        .preload('usuario')
        .preload('imagenes', (q) => {
          q.preload('analisis', (a) => {
            a.preload('estadoAnalisis')
            a.preload('nivelRoya')
          })
        })
        .preload('recomendaciones', (r) => {
          r.preload('tipo')
           r.preload('tratamiento')
        })

      if (search) {
        query.where((q) => {
          q.whereILike('observaciones', `%${search}%`)
        })
      }
      if (idCultivo) query.where('id_cultivo', idCultivo)
      if (idExperto) query.where('id_usuario', idExperto)

      query.orderBy(safeColumn, orderDir === 'asc' ? 'asc' : 'desc')

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
      const idUsuario = jwt?.id as number | undefined

      if (!idUsuario) {
        return response.unauthorized({ 
          message: 'Token inválido: no se encontró el id del usuario' 
        })
      }

      const usuario = await Usuario.query()
        .where('id_usuario', idUsuario)
        .first()

      if (!usuario) {
        return response.forbidden({ 
          message: 'Usuario no encontrado' 
        })
      }

      const data = await request.validateUsing(monitoreoStoreValidator)
      const fechaMonitoreo = DateTime.fromISO(data.fecha_monitoreo)

      // ── Regla: 1 monitoreo por día por cultivo ──
      const existente = await Monitoreo.query()
        .where('id_cultivo', data.id_cultivo)
        .where('fecha_monitoreo', fechaMonitoreo.toSQLDate()!)
        .first()

      if (existente) {
        return response.conflict({
          message: 'Ya existe un monitoreo para este cultivo en esta fecha. Si necesitas corregir algo, edita el monitoreo existente en lugar de crear uno nuevo.',
          data: {
            idMonitoreo:    existente.idMonitoreo,
            idCultivo:      existente.idCultivo,
            fechaMonitoreo: existente.fechaMonitoreo,
            observaciones:  existente.observaciones,
          },
        })
      }
      // ───────────────────────────────────────────────────────────────

      const monitoreo = await Monitoreo.create({
        idCultivo:      data.id_cultivo,
        idUsuario:      idUsuario,
        fechaMonitoreo: fechaMonitoreo,
        observaciones:  data.observaciones ?? null,
      })

      // ── Notificar al admin sobre nuevo monitoreo ──
      try {
        const { crearNotificacion } = await import('#services/notificacion_service')
        const { default: Usuario }  = await import('#models/usuario')
        const { default: Cultivo }  = await import('#models/cultivo')

        const cultivo = await Cultivo.query()
          .where('id_cultivo', monitoreo.idCultivo!)
          .preload('finca')
          .first()

        const admins = await Usuario.query().where('id_rol', 2).where('activo', true)
        for (const admin of admins) {
          await crearNotificacion({
            idUsuario:       admin.idUsuario,
            tipo:            'monitoreo_nuevo',
            titulo:          'Nuevo monitoreo registrado',
            mensaje:         `Se registró un nuevo monitoreo en ${(cultivo as any)?.finca?.nombreFinca ?? 'una finca'} - ${cultivo?.nombreCultivo ?? ''}.`,
            idReferencia:    monitoreo.idMonitoreo,
            tablaReferencia: 'monitoreos',
          })
        }
      } catch (e) {
        console.error('Error al notificar nuevo monitoreo:', e)
      }
      // ─────────────────────────────────────────────

      return response.created({
        message: 'Monitoreo creado correctamente',
        data: {
          idMonitoreo:    monitoreo.idMonitoreo,
          idCultivo:      monitoreo.idCultivo,
          fechaMonitoreo: monitoreo.fechaMonitoreo,
          observaciones:  monitoreo.observaciones,
          usuario: {
            idUsuario: usuario.idUsuario,
            nombre:    usuario.nombre,
            apellido:  usuario.apellido,
            correo:    usuario.correo,
            telefono:  usuario.telefono,
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
        .preload('usuario')
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
   * @description Actualiza solo las observaciones de un monitoreo. La fecha del monitoreo es inmutable.
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
      if (data.observaciones !== undefined) payload.observaciones = data.observaciones

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
  async destroy({ params, request, response }: HttpContext) {
    try {
      const monitoreo = await Monitoreo.findOrFail(params.id)

      const jwt = (request as any).usuarioJwt
      const idUsuarioJwt = jwt?.id
      const nombreRol: string = (
        jwt?.rol?.nombreRol ??
        jwt?.rol?.nombre_rol ??
        ''
      ).toLowerCase().trim()

      const esAdmin = nombreRol === 'admin'
      const esDueño = monitoreo.idUsuario === idUsuarioJwt

      if (!esAdmin && !esDueño) {
        return response.forbidden({ 
          message: 'No tienes permiso para eliminar este monitoreo' 
        })
      }

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
