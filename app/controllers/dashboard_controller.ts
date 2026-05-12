import type { HttpContext } from '@adonisjs/core/http'
import Usuario from '#models/usuario'
import Finca from '#models/finca'
import Cultivo from '#models/cultivo'
import Monitoreo from '#models/monitoreo'
import AnalisisIa from '#models/analisis_ia'
import Recomendacione from '#models/recomendacione'

export default class DashboardController {

  async index({ response }: HttpContext) {
    try {
      const [totalUsuarios, usuariosActivos, totalFincas,
             totalCultivos, totalMonitoreos, totalAnalisis,
             totalRecomendaciones] = await Promise.all([
        Usuario.query().count('* as total').first(),
        Usuario.query().where('activo', true).count('* as total').first(),
        Finca.query().count('* as total').first(),
        Cultivo.query().count('* as total').first(),
        Monitoreo.query().count('* as total').first(),
        AnalisisIa.query().count('* as total').first(),
        Recomendacione.query().count('* as total').first(),
      ])

      const ultimosMonitoreos = await Monitoreo.query()
        .preload('cultivo')
        .preload('experto')
        .orderBy('fecha_monitoreo', 'desc')
        .limit(5)

      return response.ok({
        resumen: {
          totalUsuarios:        (totalUsuarios as any)?.$extras?.total ?? 0,
          usuariosActivos:      (usuariosActivos as any)?.$extras?.total ?? 0,
          totalFincas:          (totalFincas as any)?.$extras?.total ?? 0,
          totalCultivos:        (totalCultivos as any)?.$extras?.total ?? 0,
          totalMonitoreos:      (totalMonitoreos as any)?.$extras?.total ?? 0,
          totalAnalisis:        (totalAnalisis as any)?.$extras?.total ?? 0,
          totalRecomendaciones: (totalRecomendaciones as any)?.$extras?.total ?? 0,
        },
        ultimosMonitoreos,
      })
    } catch (error: any) {
      return response.internalServerError({ message: 'Error al obtener dashboard', error: error.message })
    }
  }
}