import type { HttpContext } from '@adonisjs/core/http'
import Progreso from '#models/progreso'
import Recomendacione from '#models/recomendacione'
import Cultivo from '#models/cultivo'
import { guardarProgresoValidator } from '#validators/progreso'

export default class ProgresosController {
  async store({ request, response, auth }: HttpContext) {
    const payload = await request.validateUsing(guardarProgresoValidator)

    const cultivo = await Cultivo.query()
      .where('id_cultivo', payload.idCultivo)
      .andWhere('id_usuario', auth.user!.id)
      .first()

    if (!cultivo) {
      return response.forbidden({ success: false, message: 'Este cultivo no te pertenece' })
    }

    const recomendacion = await Recomendacione.query()
      .where('id_recomendacion', payload.idRecomendacion)
      .andWhere('id_cultivo', payload.idCultivo)
      .first()

    if (!recomendacion) {
      return response.notFound({ success: false, message: 'Recomendación no encontrada para este cultivo' })
    }

    await Progreso.updateOrCreate(
      {
        idCultivo: payload.idCultivo,
        idRecomendacion: payload.idRecomendacion,
        dia: payload.dia,
      },
      {
        aplicado: payload.aplicado,
        fecha: payload.fecha,
      }
    )

    return response.ok({ success: true })
  }

  async index({ request, response, auth }: HttpContext) {
    const idCultivo = request.input('idCultivo')
    const idRecomendacion = request.input('idRecomendacion')

    if (!idCultivo || !idRecomendacion) {
      return response.badRequest({ success: false, message: 'idCultivo e idRecomendacion son requeridos' })
    }

    const cultivo = await Cultivo.query()
      .where('id_cultivo', idCultivo)
      .andWhere('id_usuario', auth.user!.id)
      .first()

    if (!cultivo) {
      return response.forbidden({ success: false, message: 'Este cultivo no te pertenece' })
    }

    const recomendacion = await Recomendacione.query()
      .where('id_recomendacion', idRecomendacion)
      .andWhere('id_cultivo', idCultivo)
      .preload('tratamiento')
      .first()

    if (!recomendacion) {
      return response.notFound({ success: false, message: 'Recomendación no encontrada' })
    }

    const registros = await Progreso.query()
      .where('id_cultivo', idCultivo)
      .andWhere('id_recomendacion', idRecomendacion)

    const progreso: Record<string, boolean> = {}
    for (const r of registros) {
      progreso[String(r.dia)] = r.aplicado
    }

    return response.ok({
      progreso,
      diasTotales: (recomendacion as any).tratamiento?.duracionDias ?? null,
    })
  }
}
