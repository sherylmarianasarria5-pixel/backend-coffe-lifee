import type { HttpContext } from '@adonisjs/core/http'
import Notificacione from '#models/notificacione'

export default class NotificacionesController {
  async index({ request, response }: HttpContext) {
    try {
      const jwt = (request as any).usuarioJwt
      const idUsuario = jwt?.id

      const page = Number(request.input('page', 1))
      const limit = Number(request.input('limit', 20))
      const soloNoLeidas = request.input('no_leidas')

      const query = Notificacione.query()
        .where('id_usuario', idUsuario)
        .orderBy('fecha_registro', 'desc')

      if (soloNoLeidas === 'true') {
        query.where('leida', false)
      }

      const notificaciones = await query.paginate(page, limit)

      const totalNoLeidas = await Notificacione.query()
        .where('id_usuario', idUsuario)
        .where('leida', false)
        .count('* as total')
        .first()

      return response.ok({
        totalNoLeidas: Number((totalNoLeidas as any)?.$extras?.total ?? 0),
        ...notificaciones.toJSON(),
      })
    } catch (error: any) {
      return response.internalServerError({
        message: 'Error al obtener notificaciones',
        error: error.message,
      })
    }
  }

  async marcarLeida({ params, request, response }: HttpContext) {
    try {
      const jwt = (request as any).usuarioJwt
      const notificacion = await Notificacione.query()
        .where('id_notificacion', params.id)
        .where('id_usuario', jwt?.id)
        .firstOrFail()

      notificacion.leida = true
      await notificacion.save()

      return response.ok({ message: 'Notificación marcada como leída' })
    } catch {
      return response.notFound({ message: 'Notificación no encontrada' })
    }
  }

  async marcarTodasLeidas({ request, response }: HttpContext) {
    try {
      const jwt = (request as any).usuarioJwt
      await Notificacione.query()
        .where('id_usuario', jwt?.id)
        .where('leida', false)
        .update({ leida: true })

      return response.ok({ message: 'Todas las notificaciones marcadas como leídas' })
    } catch (error: any) {
      return response.internalServerError({
        message: 'Error al marcar notificaciones',
        error: error.message,
      })
    }
  }

  async destroy({ params, request, response }: HttpContext) {
    try {
      const jwt = (request as any).usuarioJwt
      const notificacion = await Notificacione.query()
        .where('id_notificacion', params.id)
        .where('id_usuario', jwt?.id)
        .firstOrFail()

      await notificacion.delete()
      return response.ok({ message: 'Notificación eliminada' })
    } catch {
      return response.notFound({ message: 'Notificación no encontrada' })
    }
  }
}
