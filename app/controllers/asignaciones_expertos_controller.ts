import type { HttpContext } from '@adonisjs/core/http'
import AsignacionExperto from '#models/asignacion_experto'
import Usuario from '#models/usuario'


function serializar(a: AsignacionExperto) {
  const exp = a.experto
  return {
    idAsignacion:  a.idAsignacion,
    idExperto:     a.idExperto,
    idFinca:       a.idFinca,
    fechaAsignada: a.fechaAsignada,
    fechaRegistro: a.fechaRegistro,
    experto: exp ? {
      idUsuario: exp.idUsuario,
      nombre:    exp.nombre,
      apellido:  exp.apellido,
      correo:    exp.correo,
      telefono:  exp.telefono,
    } : null,
    finca: a.$preloaded.finca ? a.finca : undefined,
  }
}

async function validarExperto(idExperto: number, response: any) {
  const usuario = await Usuario.query()
    .where('id_usuario', idExperto)
    .whereHas('rol', (q: any) =>
      q.whereRaw('LOWER(TRIM(nombre_rol)) = ?', ['experto'])
    )
    .first()

  if (!usuario) {
    response.badRequest({ 
      message: 'El usuario no existe o no tiene rol de experto' 
    })
    return null
  }
  return usuario
}

export default class AsignacionesExpertosController {

  /**
   * @index
   * @summary Listar todas las asignaciones de expertos
   * @description Retorna todas las asignaciones con los datos completos del experto y la finca
   * @responseBody 200 - {
   *   "data": [{
   *     "idAsignacion": 1,
   *     "idFinca": 2,
   *     "fechaAsignada": "2026-05-11",
   *     "fechaRegistro": "2026-05-11T00:00:00.000Z",
   *     "experto": {
   *       "idUsuario": 5,
   *       "nombre": "Juan",
   *       "apellido": "Pérez",
   *       "correo": "juan@gmail.com",
   *       "telefono": "3001234567"
   *     },
   *     "finca": {
   *       "idFinca": 2,
   *       "nombreFinca": "Finca El Paraíso"
   *     }
   *   }]
   * }
   * @responseBody 500 - {"message": "Error al obtener asignaciones", "error": "string"}
   */
  async index({ request, response }: HttpContext) {
    try {
      const page      = Number(request.input('page', 1))
      const limit     = Number(request.input('limit', 10))
      const idExperto = request.input('id_experto')
      const idFinca   = request.input('id_finca')
      const ALLOWED = ['id_asignacion', 'fecha_asignada', 'fecha_registro', 'fecha_actualizacion', 'id_experto', 'id_finca']
      const orderBy = request.input('order_by', 'id_asignacion')
      const orderDir = request.input('order_dir', 'desc')
      const safeColumn = ALLOWED.includes(orderBy) ? orderBy : 'id_asignacion'

      const query = AsignacionExperto.query()
        .preload('experto')
        .preload('finca')

      if (idExperto) query.where('id_experto', idExperto)
      if (idFinca)   query.where('id_finca', idFinca)

      query.orderBy(safeColumn, orderDir === 'asc' ? 'asc' : 'desc')

      const paginado = await query.paginate(page, limit)
      const json = paginado.toJSON()
      json.data = paginado.all().map(serializar)
      return response.ok(json)
    } catch (error: any) {
      return response.internalServerError({ 
        message: 'Error al obtener asignaciones', 
        error: error.message 
      })
    }
  }

  /**
   * @show
   * @summary Obtener una asignación por ID
   * @description Retorna los datos completos de una asignación incluyendo experto y finca
   * @paramPath id - ID de la asignación - @type(number) @required
   * @responseBody 200 - {
   *   "data": {
   *     "idAsignacion": 1,
   *     "idFinca": 2,
   *     "fechaAsignada": "2026-05-11",
   *     "experto": {
   *       "idUsuario": 5,
   *       "nombre": "Juan",
   *       "apellido": "Pérez",
   *       "correo": "juan@gmail.com",
   *       "telefono": "3001234567"
   *     },
   *     "finca": {
   *       "idFinca": 2,
   *       "nombreFinca": "Finca El Paraíso"
   *     }
   *   }
   * }
   * @responseBody 404 - {"message": "Asignación no encontrada"}
   * @responseBody 500 - {"message": "Error al obtener asignación", "error": "string"}
   */

  async store({ request, response }: HttpContext) {
    try {
      const { idExperto, idFinca, fechaAsignada } = request.only([
        'idExperto', 
        'idFinca', 
        'fechaAsignada'
      ])

      // 🔍 LOG TEMPORAL — para rastrear quién está reasignando expertos
      const payload = (request as any).usuarioJwt
      console.log('[AUDITORIA asignaciones_expertos.store]', {
        fecha: new Date().toISOString(),
        ip: request.ip(),
        userAgent: request.header('user-agent'),
        usuarioQueHaceLaPeticion: payload ? { id: payload.id, rol: payload.rol?.nombreRol } : 'sin-token',
        body: { idExperto, idFinca, fechaAsignada },
      })

  /**
   * @store
   * @summary Crear o actualizar asignación de experto a finca
   * @description Si ya existe una asignación para esa finca la actualiza, si no la crea. Valida que el usuario sea experto.
   * @requestBody {
   *   "idExperto": 5,
   *   "idFinca": 2,
   *   "fechaAsignada": "2026-05-11"
   * }
   * @responseBody 201 - {
   *   "message": "Asignación guardada correctamente",
   *   "data": {
   *     "idAsignacion": 1,
   *     "idFinca": 2,
   *     "fechaAsignada": "2026-05-11",
   *     "experto": {
   *       "idUsuario": 5,
   *       "nombre": "Juan",
   *       "apellido": "Pérez",
   *       "correo": "juan@gmail.com",
   *       "telefono": "3001234567"
   *     }
   *   }
   * }
   * @responseBody 400 - {"message": "El campo idExperto es obligatorio"}
   * @responseBody 400 - {"message": "El usuario no existe o no tiene rol de experto"}
   * @responseBody 500 - {"message": "Error al guardar asignación", "error": "string"}
   */
  async store({ request, response }: HttpContext) {
    try {
      const { idExperto, idFinca, fechaAsignada } = request.only([
        'idExperto', 
        'idFinca', 
        'fechaAsignada'
      ])

      if (!idExperto)     return response.badRequest({ message: 'El campo idExperto es obligatorio' })
      if (!idFinca)       return response.badRequest({ message: 'El campo idFinca es obligatorio' })
      if (!fechaAsignada) return response.badRequest({ message: 'El campo fechaAsignada es obligatorio' })

      const experto = await validarExperto(idExperto, response)
      if (!experto) return

      let asignacion = await AsignacionExperto.query()
        .where('id_finca', idFinca)
        .first()

      if (asignacion) {
        asignacion.idExperto     = idExperto
        asignacion.fechaAsignada = fechaAsignada
        await asignacion.save()
      } else {
        asignacion = await AsignacionExperto.create({ 
          idExperto, 
          idFinca, 
          fechaAsignada 
        })
      }

      await asignacion.load('experto')
      await asignacion.load('finca')

      return response.created({
        message: 'Asignación guardada correctamente',
        data: serializar(asignacion),
      })
    } catch (error: any) {
      return response.internalServerError({ 
        message: 'Error al guardar asignación', 
        error: error.message 
      })
    }
  }

  /**
   * @update
   * @summary Actualizar una asignación existente
   * @description Actualiza los datos de una asignación. Si se cambia el experto, valida que el nuevo usuario tenga rol de experto.
   * @paramPath id - ID de la asignación - @type(number) @required
   * @requestBody {
   *   "idExperto": 6,
   *   "idFinca": 2,
   *   "fechaAsignada": "2026-05-15"
   * }
   * @responseBody 200 - {
   *   "message": "Asignación actualizada",
   *   "data": {
   *     "idAsignacion": 1,
   *     "idFinca": 2,
   *     "fechaAsignada": "2026-05-15",
   *     "experto": {
   *       "idUsuario": 6,
   *       "nombre": "Carlos",
   *       "apellido": "López",
   *       "correo": "carlos@gmail.com",
   *       "telefono": "3009876543"
   *     }
   *   }
   * }
   * @responseBody 400 - {"message": "El usuario no existe o no tiene rol de experto"}
   * @responseBody 404 - {"message": "Asignación no encontrada"}
   * @responseBody 500 - {"message": "Error al actualizar asignación", "error": "string"}
   */
  async update({ params, request, response }: HttpContext) {
    try {
      const asignacion = await AsignacionExperto.findOrFail(params.id)
      const data = request.only(['idExperto', 'idFinca', 'fechaAsignada'])

      if (data.idExperto) {
        const experto = await validarExperto(data.idExperto, response)
        if (!experto) return
      }

      asignacion.merge(data)
      await asignacion.save()
      await asignacion.load('experto')
      await asignacion.load('finca')

      return response.ok({ 
        message: 'Asignación actualizada', 
        data: serializar(asignacion) 
      })
    } catch (error: any) {
      return response.internalServerError({ 
        message: 'Error al actualizar asignación', 
        error: error.message 
      })
    }
  }

  /**
   * @destroy
   * @summary Eliminar una asignación de experto
   * @description Elimina permanentemente la asignación de un experto a una finca
   * @paramPath id - ID de la asignación - @type(number) @required
   * @responseBody 200 - {"message": "Asignación eliminada correctamente"}
   * @responseBody 404 - {"message": "Asignación no encontrada"}
   * @responseBody 500 - {"message": "Error al eliminar asignación", "error": "string"}
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
