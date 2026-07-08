import { DateTime } from 'luxon'
import type { HttpContext } from '@adonisjs/core/http'
import Recomendacione from '#models/recomendacione'
import Cultivo from '#models/cultivo'
import { aceptarRecomendacionValidator } from '#validators/progreso'

function serializar(r: Recomendacione) {
  const exp = r.experto
  return {
    idRecomendacion: r.idRecomendacion,
    idMonitoreo: r.idMonitoreo,
    descripcion: r.descripcion,
    idExpertoEmisor: r.idExpertoEmisor,
    experto: exp ? `${exp.nombre} ${exp.apellido}` : null,
    idTipo: (r as any).tipo?.idTipo ?? r.idTipo,
    tipo: (r as any).tipo?.nombreTipo ?? null,
    idPrioridad: r.idPrioridad,
    prioridad: (r as any).prioridad?.nombre ?? null,
    idTratamiento: r.idTratamiento,
    tratamiento: (r as any).tratamiento?.nombre ?? null,
    fechaLimite: r.fechaLimite ? ((r.fechaLimite as any).toISODate?.() ?? r.fechaLimite) : null,
    fechaRegistro: r.fechaRegistro ? r.fechaRegistro.toISO() : null,
  }
}

export default class RecomendacionesController {
  async index({ request, response }: HttpContext) {
    try {
      const page = Number(request.input('page', 1))
      const limit = Number(request.input('limit', 10))
      const search = request.input('search', '')
      const idMonitoreo = request.input('id_monitoreo')
      const idExperto = request.input('id_experto_emisor')
      const idPrioridad = request.input('id_prioridad')
      const idTipo = request.input('id_tipo')
      const idTratamiento = request.input('id_tratamiento')
      const ALLOWED = [
        'id_recomendacion',
        'descripcion',
        'fecha_limite',
        'fecha_registro',
        'fecha_actualizacion',
        'id_monitoreo',
        'id_experto_emisor',
        'id_prioridad',
        'id_tipo',
        'id_tratamiento',
      ]
      const orderBy = request.input('order_by', 'id_recomendacion')
      const orderDir = request.input('order_dir', 'desc')
      const safeColumn = ALLOWED.includes(orderBy) ? orderBy : 'id_recomendacion'

      const query = Recomendacione.query()
        .preload('experto')
        .preload('tipo')
        .preload('tratamiento')
        .preload('prioridad')

      if (search) {
        query.where((q) => {
          q.whereILike('descripcion', `%${search}%`)
        })
      }
      if (idMonitoreo) query.where('id_monitoreo', idMonitoreo)
      if (idExperto) query.where('id_experto_emisor', idExperto)
      if (idPrioridad) query.where('id_prioridad', idPrioridad)
      if (idTipo) query.where('id_tipo', idTipo)
      if (idTratamiento) query.where('id_tratamiento', idTratamiento)

      query.orderBy(safeColumn, orderDir === 'asc' ? 'asc' : 'desc')

      const paginado = await query.paginate(page, limit)
      const json = paginado.toJSON()
      json.data = paginado.all().map(serializar)

      return response.ok(json)
    } catch (error: any) {
      return response.internalServerError({
        message: 'Error al obtener recomendaciones',
        error: error.message,
      })
    }
  }

  async store({ request, response }: HttpContext) {
    try {
      const jwt = (request as any).usuarioJwt
      const idExpertoJwt = jwt?.id as number | undefined

      const data = request.only([
        'id_monitoreo',
        'id_tipo',
        'id_prioridad',
        'id_tratamiento',
        'descripcion',
        'fecha_limite',
      ])

      if (!data.id_monitoreo)
        return response.badRequest({
          message: 'El id_monitoreo es obligatorio',
        })
      if (!data.descripcion)
        return response.badRequest({
          message: 'La descripcion es obligatoria',
        })

      const recomendacion = await Recomendacione.create({
        idMonitoreo: data.id_monitoreo,
        idExpertoEmisor: idExpertoJwt ?? null,
        idTipo: data.id_tipo ?? null,
        idPrioridad: data.id_prioridad ?? null,
        idTratamiento: data.id_tratamiento ?? null,
        descripcion: data.descripcion,
        fechaLimite: data.fecha_limite ?? null,
      })

      await recomendacion.load('experto')
      await recomendacion.load('tipo')
      await recomendacion.load('tratamiento')
      await recomendacion.load('prioridad')

      // ── Notificar al caficultor dueño de la finca ──
      try {
        const { default: Monitoreo } = await import('#models/monitoreo')
        const { default: Finca } = await import('#models/finca')
        const { crearNotificacion } = await import('#services/notificacion_service')
        const { emitirEventoFinca } = await import('#start/socket')

        const monitoreo = await Monitoreo.query()
          .where('id_monitoreo', data.id_monitoreo)
          .preload('cultivo')
          .first()

        if (monitoreo?.cultivo?.idFinca) {
          const finca = await Finca.find(monitoreo.cultivo.idFinca)
          if (finca?.idUsuario) {
            await crearNotificacion({
              idUsuario: finca.idUsuario,
              tipo: 'recomendacion_nueva',
              titulo: 'Nueva recomendación del experto',
              mensaje: `El experto ha enviado una recomendación para tu finca: "${recomendacion.descripcion}"`,
              idReferencia: recomendacion.idRecomendacion,
              tablaReferencia: 'recomendaciones',
            })
          }

          // Evento en tiempo real para quien esté viendo el dashboard de esta finca
          emitirEventoFinca(monitoreo.cultivo.idFinca, 'recomendacion:created', {
            idRecomendacion: recomendacion.idRecomendacion,
            idMonitoreo: recomendacion.idMonitoreo,
            descripcion: recomendacion.descripcion,
          })
        }
      } catch (e) {
        console.error('Error al notificar recomendación:', e)
      }
      // ───────────────────────────────────────────────

      return response.created({
        message: 'Recomendación creada correctamente',
        data: serializar(recomendacion),
      })
    } catch (error: any) {
      return response.internalServerError({
        message: 'Error al crear recomendación',
        error: error.message,
      })
    }
  }

  async show({ params, response }: HttpContext) {
    try {
      const r = await Recomendacione.query()
        .where('id_recomendacion', params.id)
        .preload('experto')
        .preload('tipo')
        .preload('tratamiento')
        .preload('prioridad')
        .firstOrFail()

      return response.ok(serializar(r))
    } catch {
      return response.notFound({ message: 'Recomendación no encontrada' })
    }
  }

  async update({ params, request, response }: HttpContext) {
    try {
      const r = await Recomendacione.findOrFail(params.id)
      const data = request.only([
        'id_monitoreo',
        'id_experto_emisor',
        'id_tipo',
        'id_prioridad',
        'id_tratamiento',
        'descripcion',
        'fecha_limite',
      ])

      const payload: Record<string, any> = {}
      if (data.id_monitoreo !== undefined) payload.idMonitoreo = data.id_monitoreo
      if (data.id_experto_emisor !== undefined) payload.idExpertoEmisor = data.id_experto_emisor
      if (data.id_tipo !== undefined) payload.idTipo = data.id_tipo
      if (data.id_prioridad !== undefined) payload.idPrioridad = data.id_prioridad
      if (data.id_tratamiento !== undefined) payload.idTratamiento = data.id_tratamiento
      if (data.descripcion !== undefined) payload.descripcion = data.descripcion
      if (data.fecha_limite !== undefined) payload.fechaLimite = data.fecha_limite

      r.merge(payload)
      await r.save()
      await r.load('experto')

      return response.ok({
        message: 'Recomendación actualizada correctamente',
        data: serializar(r),
      })
    } catch (error: any) {
      return response.internalServerError({
        message: 'Error al actualizar recomendación',
        error: error.message,
      })
    }
  }

  async destroy({ params, response }: HttpContext) {
    try {
      const r = await Recomendacione.findOrFail(params.id)
      await r.delete()
      return response.ok({ message: 'Recomendación eliminada correctamente' })
    } catch (error: any) {
      return response.internalServerError({
        message: 'Error al eliminar recomendación',
        error: error.message,
      })
    }
  }

  async aceptar({ params, request, response, auth }: HttpContext) {
    const payload = await request.validateUsing(aceptarRecomendacionValidator)

    const cultivo = await Cultivo.query()
      .where('id_cultivo', payload.idCultivo)
      .andWhere('id_usuario', auth.user!.id)
      .first()

    if (!cultivo) {
      return response.forbidden({ success: false, message: 'Este cultivo no te pertenece' })
    }

    const recomendacion = await Recomendacione.query()
      .where('id_recomendacion', params.idRecomendacion)
      .andWhere('id_cultivo', payload.idCultivo)
      .first()

    if (!recomendacion) {
      return response.notFound({ success: false, message: 'Recomendación no encontrada' })
    }

    recomendacion.aceptado = true
    recomendacion.fechaAceptacion = DateTime.now()
    await recomendacion.save()

    return response.ok({ success: true, aceptado: true })
  }
}
