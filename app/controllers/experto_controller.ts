import type { HttpContext } from '@adonisjs/core/http'
import Finca from '#models/finca'
import Cultivo from '#models/cultivo'
import Monitoreo from '#models/monitoreo'
import Recomendacione from '#models/recomendacione'
import AsignacionExperto from '#models/asignacion_experto'
import AplicacionesTratamiento from '#models/aplicaciones_tratamiento'
import RecomendacionTratamiento from '#models/recomendacion_tratamiento'
import Tratamiento from '#models/tratamiento'

export default class ExpertoController {
  // ─── Obtiene el id del usuario desde el JWT ────────────────────────────────
  private getIdUsuario(request: HttpContext['request']): number {
    return (request as any).usuarioJwt?.id
  }

  // ─── Helper: IDs de fincas asignadas al experto ────────────────────────────
  private async fincasAsignadas(idExperto: number): Promise<number[]> {
    const asignaciones = await AsignacionExperto.query()
      .where('id_experto', idExperto)
      .select('id_finca')
    return asignaciones.map((a) => a.idFinca)
  }

  // ─── Helper: IDs de cultivos en fincas asignadas ──────────────────────────
  private async cultivosDeExperto(idExperto: number): Promise<number[]> {
    const idFincas = await this.fincasAsignadas(idExperto)
    if (!idFincas.length) return []
    const cultivos = await Cultivo.query().whereIn('id_finca', idFincas).select('id_cultivo')
    return cultivos.map((c) => c.idCultivo)
  }

  // ─── Helper: IDs de monitoreos en cultivos del experto ────────────────────
  private async monitoreosDeExperto(idExperto: number): Promise<number[]> {
    const idCultivos = await this.cultivosDeExperto(idExperto)
    if (!idCultivos.length) return []
    const monitoreos = await Monitoreo.query()
      .whereIn('id_cultivo', idCultivos)
      .select('id_monitoreo')
    return monitoreos.map((m) => m.idMonitoreo)
  }

  // ─── Helper: verifica que un cultivo pertenece a finca asignada ───────────
  private async tieneCultivo(idCultivo: number, idExperto: number): Promise<boolean> {
    const idCultivos = await this.cultivosDeExperto(idExperto)
    return idCultivos.includes(idCultivo)
  }

  // ─── Helper: verifica que un monitoreo pertenece a cultivo de finca asignada
  private async tieneMonitoreo(idMonitoreo: number, idExperto: number): Promise<boolean> {
    const idMonitoreos = await this.monitoreosDeExperto(idExperto)
    return idMonitoreos.includes(idMonitoreo)
  }

  /**
   * @dashboard
   * @summary Dashboard del experto autenticado
   * @description Resumen de fincas asignadas, cultivos, monitoreos y recomendaciones emitidas
   * @responseBody 200 - { "resumen": { "total_fincas_asignadas": 3, "total_cultivos": 8, "total_monitoreos": 15, "total_recomendaciones_emitidas": 6 } }
   * @responseBody 401 - { "message": "Token no proporcionado" }
   */
  async dashboard({ request, response }: HttpContext) {
    const idUsuario = this.getIdUsuario(request)

    const idFincas = await this.fincasAsignadas(idUsuario)
    const idCultivos = await this.cultivosDeExperto(idUsuario)
    const idMonitoreos = await this.monitoreosDeExperto(idUsuario)

    const recomendaciones = await Recomendacione.query().where('id_experto_emisor', idUsuario)

    return response.ok({
      resumen: {
        total_fincas_asignadas: idFincas.length,
        total_cultivos: idCultivos.length,
        total_monitoreos: idMonitoreos.length,
        total_recomendaciones_emitidas: recomendaciones.length,
      },
    })
  }

  /**
   * @fincas
   * @summary Listar mis fincas asignadas
   * @description Retorna solo las fincas que el administrador asignó a este experto
   * @responseBody 200 - [{ "idFinca": 1, "nombreFinca": "La Esperanza", "municipio": "Chinchiná" }]
   * @responseBody 401 - { "message": "Token no proporcionado" }
   */
  async fincas({ request, response }: HttpContext) {
    const idUsuario = this.getIdUsuario(request)
    const page = Number(request.input('page', 1))
    const limit = Number(request.input('limit', 10))
    const idFincas = await this.fincasAsignadas(idUsuario)
    if (!idFincas.length) return response.ok({ data: [], meta: { total: 0, perPage: limit, page, lastPage: 1 } })

    const fincas = await Finca.query().whereIn('id_finca', idFincas).paginate(page, limit)

    return response.ok(fincas.toJSON())
  }

  /**
   * @cultivos
   * @summary Listar cultivos de mis fincas asignadas
   * @description Retorna los cultivos de las fincas donde el experto tiene asignación
   * @responseBody 200 - [{ "idCultivo": 1, "nombreCultivo": "Lote Norte" }]
   * @responseBody 401 - { "message": "Token no proporcionado" }
   */
  async cultivos({ request, response }: HttpContext) {
    const idUsuario = this.getIdUsuario(request)
    const page = Number(request.input('page', 1))
    const limit = Number(request.input('limit', 10))
    const idFincas = await this.fincasAsignadas(idUsuario)
    if (!idFincas.length) return response.ok({ data: [], meta: { total: 0, perPage: limit, page, lastPage: 1 } })

    const cultivos = await Cultivo.query()
      .whereIn('id_finca', idFincas)
      .preload('finca')
      .preload('estadoCultivo')
      .paginate(page, limit)

    return response.ok(cultivos.toJSON())
  }

  /**
   * @monitoreos
   * @summary Listar monitoreos de mis fincas asignadas
   * @description Retorna los monitoreos de los cultivos en las fincas asignadas al experto
   * @responseBody 200 - [{ "idMonitoreo": 1, "fechaMonitoreo": "2024-01-01", "observaciones": "..." }]
   * @responseBody 401 - { "message": "Token no proporcionado" }
   */
  async monitoreos({ request, response }: HttpContext) {
    const idUsuario = this.getIdUsuario(request)
    const page = Number(request.input('page', 1))
    const limit = Number(request.input('limit', 10))
    const idCultivos = await this.cultivosDeExperto(idUsuario)
    if (!idCultivos.length) return response.ok({ data: [], meta: { total: 0, perPage: limit, page, lastPage: 1 } })

    const monitoreos = await Monitoreo.query()
      .whereIn('id_cultivo', idCultivos)
      .preload('cultivo')
      .orderBy('fecha_monitoreo', 'desc')
      .paginate(page, limit)

    return response.ok(monitoreos.toJSON())
  }

  /**
   * @crearMonitoreo
   * @summary Registrar un monitoreo (solo en fincas asignadas)
   * @description El experto puede crear monitoreos únicamente en cultivos de sus fincas asignadas
   * @requestBody { "id_cultivo": 1, "fecha_monitoreo": "2024-01-01", "observaciones": "Revisión general" }
   * @responseBody 201 - { "idMonitoreo": 10, "idCultivo": 1, "observaciones": "..." }
   * @responseBody 403 - { "message": "No tienes acceso a ese cultivo" }
   */
  async crearMonitoreo({ request, response }: HttpContext) {
    const idUsuario = this.getIdUsuario(request)
    const body = request.body()
    const idCultivo = body.id_cultivo ?? body.idCultivo

    const tieneAcceso = await this.tieneCultivo(idCultivo, idUsuario)
    if (!tieneAcceso) {
      return response.forbidden({ message: 'No tienes acceso a ese cultivo' })
    }

    const monitoreo = await Monitoreo.create({
      idCultivo: idCultivo,
      idExperto: idUsuario,
      observaciones: body.observaciones ?? null,
      fechaMonitoreo: body.fecha_monitoreo ?? body.fechaMonitoreo,
    })

    return response.created(monitoreo)
  }

  /**
   * @actualizarMonitoreo
   * @summary Actualizar un monitoreo (solo si pertenece a finca asignada)
   * @description El experto solo puede editar monitoreos de cultivos en sus fincas asignadas
   * @paramPath id - ID del monitoreo a actualizar
   * @requestBody { "observaciones": "Actualizado" }
   * @responseBody 200 - { "idMonitoreo": 10, "observaciones": "Actualizado" }
   * @responseBody 403 - { "message": "No tienes acceso a ese monitoreo" }
   * @responseBody 404 - { "message": "Monitoreo no encontrado" }
   */
  async actualizarMonitoreo({ request, params, response }: HttpContext) {
    const idUsuario = this.getIdUsuario(request)

    const tieneAcceso = await this.tieneMonitoreo(Number(params.id), idUsuario)
    if (!tieneAcceso) {
      return response.forbidden({ message: 'No tienes acceso a ese monitoreo' })
    }

    const monitoreo = await Monitoreo.find(params.id)
    if (!monitoreo) return response.notFound({ message: 'Monitoreo no encontrado' })

    monitoreo.merge(request.body())
    await monitoreo.save()

    return response.ok(monitoreo)
  }

  /**
   * @recomendaciones
   * @summary Listar mis recomendaciones emitidas
   * @description Retorna todas las recomendaciones que este experto ha emitido
   * @responseBody 200 - [{ "idRecomendacion": 1, "descripcion": "Aplicar fungicida" }]
   * @responseBody 401 - { "message": "Token no proporcionado" }
   */
  async recomendaciones({ request, response }: HttpContext) {
    const idUsuario = this.getIdUsuario(request)
    const page = Number(request.input('page', 1))
    const limit = Number(request.input('limit', 10))

    const recomendaciones = await Recomendacione.query()
      .where('id_experto_emisor', idUsuario)
      .preload('monitoreo')
      .preload('tipo')
      .orderBy('fecha_registro', 'desc')
      .paginate(page, limit)

    return response.ok(recomendaciones.toJSON())
  }

  /**
   * @crearRecomendacion
   * @summary Emitir una recomendación para un monitoreo
   * @description El experto solo puede recomendar en monitoreos de sus fincas asignadas
   * @requestBody { "id_monitoreo": 1, "descripcion": "Aplicar fungicida", "id_tipo": 2, "id_prioridad": 1, "fecha_limite": "2024-02-01" }
   * @responseBody 201 - { "idRecomendacion": 5, "descripcion": "Aplicar fungicida" }
   * @responseBody 403 - { "message": "No tienes acceso a ese monitoreo" }
   */
  async crearRecomendacion({ request, response }: HttpContext) {
    const idUsuario = this.getIdUsuario(request)
    const body = request.body()
    const idMonitoreo = body.id_monitoreo ?? body.idMonitoreo

    const tieneAcceso = await this.tieneMonitoreo(idMonitoreo, idUsuario)
    if (!tieneAcceso) {
      return response.forbidden({ message: 'No tienes acceso a ese monitoreo' })
    }

    const recomendacion = await Recomendacione.create({
      idMonitoreo: idMonitoreo,
      idExpertoEmisor: idUsuario,
      descripcion: body.descripcion,
      idTipo: body.id_tipo ?? body.idTipo ?? null,
      idPrioridad: body.id_prioridad ?? body.idPrioridad ?? null,
      fechaLimite: body.fecha_limite ?? body.fechaLimite ?? null,
    })

    return response.created(recomendacion)
  }

  /**
   * @actualizarRecomendacion
   * @summary Actualizar una recomendación propia
   * @description El experto solo puede editar recomendaciones que él mismo emitió
   * @paramPath id - ID de la recomendación
   * @requestBody { "descripcion": "Actualizada", "id_prioridad": 2 }
   * @responseBody 200 - { "idRecomendacion": 5, "descripcion": "Actualizada" }
   * @responseBody 403 - { "message": "No puedes editar esta recomendación" }
   * @responseBody 404 - { "message": "Recomendación no encontrada" }
   */
  async actualizarRecomendacion({ request, params, response }: HttpContext) {
    const idUsuario = this.getIdUsuario(request)

    const recomendacion = await Recomendacione.find(params.id)
    if (!recomendacion) return response.notFound({ message: 'Recomendación no encontrada' })

    if (recomendacion.idExpertoEmisor !== idUsuario) {
      return response.forbidden({ message: 'No puedes editar esta recomendación' })
    }

    recomendacion.merge(request.body())
    await recomendacion.save()

    return response.ok(recomendacion)
  }

  /**
   * @aplicaciones_tratamiento
   * @summary Listar mis aplicaciones de tratamiento registradas
   * @description Retorna las aplicaciones de tratamiento registradas por este experto
   * @responseBody 200 - [{ "idAplicacion": 1, "dosis": "50ml", "frecuencia": "semanal" }]
   * @responseBody 401 - { "message": "Token no proporcionado" }
   */
  async aplicaciones_tratamiento({ request, response }: HttpContext) {
    const idUsuario = this.getIdUsuario(request)
    const page = Number(request.input('page', 1))
    const limit = Number(request.input('limit', 10))

    const aplicaciones = await AplicacionesTratamiento.query()
      .where('id_usuario', idUsuario)
      .preload('tratamiento')
      .orderBy('fecha_registro', 'desc')
      .paginate(page, limit)

    return response.ok(aplicaciones.toJSON())
  }

  /**
   * @crearAplicacionTratamiento
   * @summary Registrar una aplicación de tratamiento
   * @description El experto registra una aplicación de tratamiento que realizó
   * @requestBody { "id_tratamiento": 1, "dosis": "50ml", "frecuencia": "semanal", "observaciones": "Aplicado en zona norte" }
   * @responseBody 201 - { "idAplicacion": 8, "dosis": "50ml" }
   * @responseBody 401 - { "message": "Token no proporcionado" }
   */
  async crearAplicacionTratamiento({ request, response }: HttpContext) {
    const idUsuario = this.getIdUsuario(request)
    const body = request.body()

    const aplicacion = await AplicacionesTratamiento.create({
      idUsuario: idUsuario,
      idTratamiento: body.id_tratamiento ?? body.idTratamiento,
      dosis: body.dosis,
      frecuencia: body.frecuencia ?? null,
      observaciones: body.observaciones ?? null,
    })

    return response.created(aplicacion)
  }

  /**
   * @crearRecomendacionTratamiento
   * @summary Vincular una aplicación de tratamiento a una recomendación
   * @description Asocia una aplicación registrada con una recomendación emitida por el experto
   * @requestBody { "id_aplicacion": 8, "id_recomendacion": 5, "dosis_ajustada": "60ml", "notas": "Se ajustó por lluvia" }
   * @responseBody 201 - { "idRecTratamiento": 3 }
   * @responseBody 403 - { "message": "La aplicación no te pertenece" }
   */
  async crearRecomendacionTratamiento({ request, response }: HttpContext) {
    const idUsuario = this.getIdUsuario(request)
    const body = request.body()
    const idAplicacion = body.id_aplicacion ?? body.idAplicacion
    const idRecomendacion = body.id_recomendacion ?? body.idRecomendacion

    const aplicacion = await AplicacionesTratamiento.query()
      .where('id_aplicacion', idAplicacion)
      .where('id_usuario', idUsuario)
      .first()

    if (!aplicacion) {
      return response.forbidden({ message: 'La aplicación no te pertenece' })
    }

    const recomendacion = await Recomendacione.query()
      .where('id_recomendacion', idRecomendacion)
      .where('id_experto_emisor', idUsuario)
      .first()

    if (!recomendacion) {
      return response.forbidden({ message: 'La recomendación no te pertenece' })
    }

    const vinculo = await RecomendacionTratamiento.create({
      idAplicacion: idAplicacion,
      idRecomendacion: idRecomendacion,
      dosisAjustada: body.dosis_ajustada ?? body.dosisAjustada ?? null,
      notas: body.notas ?? null,
    })

    return response.created(vinculo)
  }

  /**
   * @tratamientos
   * @summary Ver catálogo de tratamientos disponibles
   * @description Retorna todos los tratamientos que el experto puede aplicar
   * @responseBody 200 - [{ "idTratamiento": 1, "nombre": "Fungicida X", "descripcion": "..." }]
   * @responseBody 401 - { "message": "Token no proporcionado" }
   */
  async tratamientos({ request, response }: HttpContext) {
    const page = Number(request.input('page', 1))
    const limit = Number(request.input('limit', 10))

    const tratamientos = await Tratamiento.query()
      .preload('tipoTratamiento')
      .orderBy('nombre', 'asc')
      .paginate(page, limit)

    return response.ok(tratamientos.toJSON())
  }
}
