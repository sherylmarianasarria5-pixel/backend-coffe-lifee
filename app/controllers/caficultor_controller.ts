import type { HttpContext } from '@adonisjs/core/http'
import Finca from '#models/finca'
import Cultivo from '#models/cultivo'
import Monitoreo from '#models/monitoreo'
import Recomendacione from '#models/recomendacione'
import AnalisisIa from '#models/analisis_ia'
import AsignacionExperto from '#models/asignacion_experto'
import Imagene from '#models/imagene'

export default class CaficultorController {
  // ─── Obtiene el id del usuario desde el JWT ───────────────────────────────
  private getIdUsuario(request: HttpContext['request']): number {
    return (request as any).usuarioJwt?.id
  }

  /**
   * @dashboard
   * @summary Dashboard del caficultor autenticado
   * @description Resumen de fincas, cultivos, monitoreos y recomendaciones propias
   * @responseBody 200 - { "resumen": { "total_fincas": 2, "total_cultivos": 5, "total_monitoreos": 12, "total_recomendaciones": 4 } }
   * @responseBody 401 - { "message": "Token no proporcionado" }
   */
  async dashboard({ request, response }: HttpContext) {
    const idUsuario = this.getIdUsuario(request)

    const fincas = await Finca.query().where('id_usuario', idUsuario)
    const idFincas = fincas.map((f) => f.idFinca)

    const cultivos = idFincas.length ? await Cultivo.query().whereIn('id_finca', idFincas) : []
    const idCultivos = (cultivos as Cultivo[]).map((c) => c.idCultivo)

    const monitoreos = idCultivos.length
      ? await Monitoreo.query().whereIn('id_cultivo', idCultivos)
      : []
    const idMonitoreos = (monitoreos as Monitoreo[]).map((m) => m.idMonitoreo)

    const recomendaciones = idMonitoreos.length
      ? await Recomendacione.query().whereIn('id_monitoreo', idMonitoreos)
      : []

    return response.ok({
      resumen: {
        total_fincas: fincas.length,
        total_cultivos: cultivos.length,
        total_monitoreos: monitoreos.length,
        total_recomendaciones: recomendaciones.length,
      },
    })
  }

  /**
   * @fincas
   * @summary Listar mis fincas
   * @description Retorna solo las fincas que pertenecen al caficultor autenticado
   * @responseBody 200 - [{ "idFinca": 1, "nombreFinca": "La Esperanza", "municipio": "Chinchiná" }]
   * @responseBody 401 - { "message": "Token no proporcionado" }
   */
  async fincas({ request, response }: HttpContext) {
    const idUsuario = this.getIdUsuario(request)

    const fincas = await Finca.query().where('id_usuario', idUsuario)

    return response.ok(fincas)
  }

  /**
   * @cultivos
   * @summary Listar cultivos de mis fincas
   * @description Retorna los cultivos de todas las fincas del caficultor autenticado
   * @responseBody 200 - [{ "idCultivo": 1, "nombreCultivo": "Lote Norte", "idFinca": 1 }]
   * @responseBody 401 - { "message": "Token no proporcionado" }
   */
  async cultivos({ request, response }: HttpContext) {
    const idUsuario = this.getIdUsuario(request)

    const fincas = await Finca.query().where('id_usuario', idUsuario).select('id_finca')
    const idFincas = fincas.map((f) => f.idFinca)

    if (!idFincas.length) return response.ok([])

    const cultivos = await Cultivo.query()
      .whereIn('id_finca', idFincas)
      .preload('finca')
      .preload('estadoCultivo')

    return response.ok(cultivos)
  }

  /**
   * @monitoreos
   * @summary Listar monitoreos de mis cultivos
   * @description Retorna los monitoreos realizados en los cultivos del caficultor autenticado
   * @responseBody 200 - [{ "idMonitoreo": 1, "fechaMonitoreo": "2024-01-01", "observaciones": "..." }]
   * @responseBody 401 - { "message": "Token no proporcionado" }
   */
  async monitoreos({ request, response }: HttpContext) {
    const idUsuario = this.getIdUsuario(request)

    const fincas = await Finca.query().where('id_usuario', idUsuario).select('id_finca')
    const idFincas = fincas.map((f) => f.idFinca)
    if (!idFincas.length) return response.ok([])

    const cultivos = await Cultivo.query().whereIn('id_finca', idFincas).select('id_cultivo')
    const idCultivos = cultivos.map((c) => c.idCultivo)
    if (!idCultivos.length) return response.ok([])

    const monitoreos = await Monitoreo.query()
      .whereIn('id_cultivo', idCultivos)
      .preload('cultivo')
      .orderBy('fecha_monitoreo', 'desc')

    return response.ok(monitoreos)
  }

  /**
   * @recomendaciones
   * @summary Listar recomendaciones de mis cultivos
   * @description Retorna las recomendaciones emitidas para los cultivos del caficultor autenticado
   * @responseBody 200 - [{ "idRecomendacion": 1, "descripcion": "Aplicar fungicida" }]
   * @responseBody 401 - { "message": "Token no proporcionado" }
   */
  async recomendaciones({ request, response }: HttpContext) {
    const idUsuario = this.getIdUsuario(request)

    const fincas = await Finca.query().where('id_usuario', idUsuario).select('id_finca')
    const idFincas = fincas.map((f) => f.idFinca)
    if (!idFincas.length) return response.ok([])

    const cultivos = await Cultivo.query().whereIn('id_finca', idFincas).select('id_cultivo')
    const idCultivos = cultivos.map((c) => c.idCultivo)
    if (!idCultivos.length) return response.ok([])

    const monitoreos = await Monitoreo.query()
      .whereIn('id_cultivo', idCultivos)
      .select('id_monitoreo')
    const idMonitoreos = monitoreos.map((m) => m.idMonitoreo)
    if (!idMonitoreos.length) return response.ok([])

    const recomendaciones = await Recomendacione.query()
      .whereIn('id_monitoreo', idMonitoreos)
      .preload('monitoreo')
      .preload('tipo')
      .preload('experto')
      .orderBy('fecha_registro', 'desc')

    return response.ok(recomendaciones)
  }

  /**
   * @analisis_ia
   * @summary Listar análisis IA de mis monitoreos
   * @description Retorna los análisis de inteligencia artificial generados en los monitoreos del caficultor
   * @responseBody 200 - [{ "idAnalisis": 1, "resultado": "Roya detectada", "porcentajeConfianza": "87.5" }]
   * @responseBody 401 - { "message": "Token no proporcionado" }
   */
  async analisis_ia({ request, response }: HttpContext) {
    const idUsuario = this.getIdUsuario(request)

    const fincas = await Finca.query().where('id_usuario', idUsuario).select('id_finca')
    const idFincas = fincas.map((f) => f.idFinca)
    if (!idFincas.length) return response.ok([])

    const cultivos = await Cultivo.query().whereIn('id_finca', idFincas).select('id_cultivo')
    const idCultivos = cultivos.map((c) => c.idCultivo)
    if (!idCultivos.length) return response.ok([])

    const monitoreos = await Monitoreo.query()
      .whereIn('id_cultivo', idCultivos)
      .select('id_monitoreo')
    const idMonitoreos = monitoreos.map((m) => m.idMonitoreo)
    if (!idMonitoreos.length) return response.ok([])

    const imagenes = await Imagene.query().whereIn('id_monitoreo', idMonitoreos).select('id_imagen')
    const idImagenes = imagenes.map((i: any) => i.idImagen)
    if (!idImagenes.length) return response.ok([])

    const analisis = await AnalisisIa.query()
      .whereIn('idImagen', idImagenes)
      .preload('imagen')
      .preload('estadoAnalisis')
      .preload('nivelRoya')
      .orderBy('fechaRegistro', 'desc')

    return response.ok(analisis)
  }

  /**
   * @expertos_asignados
   * @summary Ver expertos asignados a mis fincas
   * @description Retorna los expertos que el administrador asignó a las fincas del caficultor
   * @responseBody 200 - [{ "idAsignacion": 1, "idFinca": 2, "experto": { "nombre": "Carlos" } }]
   * @responseBody 401 - { "message": "Token no proporcionado" }
   */
  async expertos_asignados({ request, response }: HttpContext) {
    const idUsuario = this.getIdUsuario(request)

    const fincas = await Finca.query().where('id_usuario', idUsuario).select('id_finca')
    const idFincas = fincas.map((f) => f.idFinca)
    if (!idFincas.length) return response.ok([])

    const asignaciones = await AsignacionExperto.query()
      .whereIn('id_finca', idFincas)
      .preload('experto')
      .preload('finca')

    return response.ok(asignaciones)
  }
}
