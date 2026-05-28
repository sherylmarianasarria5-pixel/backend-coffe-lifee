import type { HttpContext } from '@adonisjs/core/http'
import Finca from '#models/finca'
import Cultivo from '#models/cultivo'
import Monitoreo from '#models/monitoreo'
import Recomendacione from '#models/recomendacione'
import AnalisisIa from '#models/analisis_ia'
import AsignacionExperto from '#models/asignacion_experto'
import Imagene from '#models/imagene'
import app from '@adonisjs/core/services/app'
import { subirImagen } from '#services/cloudinary_service'
import axios from 'axios'
import FormData from 'form-data'
import * as fs from 'node:fs'

export default class CaficultorController {

  private getIdUsuario(request: HttpContext['request']): number {
    return (request as any).usuarioJwt?.id
  }

  // =========================================
  // DASHBOARD
  // =========================================
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
        total_fincas:          fincas.length,
        total_cultivos:        cultivos.length,
        total_monitoreos:      monitoreos.length,
        total_recomendaciones: recomendaciones.length,
      },
    })
  }

  // =========================================
  // MIS FINCAS
  // =========================================
  async fincas({ request, response }: HttpContext) {
    const idUsuario = this.getIdUsuario(request)
    const fincas = await Finca.query().where('id_usuario', idUsuario)
    return response.ok(fincas)
  }

  // =========================================
  // MIS CULTIVOS
  // =========================================
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

  // =========================================
  // MIS MONITOREOS
  // =========================================
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

  // =========================================
  // MIS RECOMENDACIONES
  // =========================================
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

  // =========================================
  // MIS ANÁLISIS IA
  // =========================================
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

  // =========================================
  // EXPERTOS ASIGNADOS A MIS FINCAS
  // =========================================
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

  // =========================================
  // ANALIZAR IMAGEN (FOTO → CLOUDINARY → IA)
  // =========================================
  async analizarImagen({ request, response }: HttpContext) {
    const idUsuario = this.getIdUsuario(request)

    // ── 1. Validar archivo ───────────────────────────────────────────────────
    const archivo = request.file('imagen', {
      size: '10mb',
      extnames: ['jpg', 'jpeg', 'png', 'webp'],
    })

    if (!archivo) {
      return response.badRequest({
        success: false,
        message: 'Debes enviar una imagen con el campo "imagen"',
      })
    }

    if (!archivo.isValid) {
      return response.badRequest({
        success: false,
        message: 'Archivo inválido',
        errors: archivo.errors,
      })
    }

    const idMonitoreo = request.input('id_monitoreo')
    const idEstado    = request.input('id_estado') ?? 1

    if (!idMonitoreo) {
      return response.badRequest({
        success: false,
        message: 'id_monitoreo es obligatorio',
      })
    }

    // ── 2. Verificar que el monitoreo pertenece al caficultor ────────────────
    const fincas = await Finca.query()
      .where('id_usuario', idUsuario)
      .select('id_finca')
    const idFincas = fincas.map((f) => f.idFinca)

    if (!idFincas.length) {
      return response.forbidden({
        success: false,
        message: 'No tienes fincas registradas',
      })
    }

    const cultivos = await Cultivo.query()
      .whereIn('id_finca', idFincas)
      .select('id_cultivo')
    const idCultivos = cultivos.map((c) => c.idCultivo)

    const monitoreo = await Monitoreo.query()
      .where('id_monitoreo', idMonitoreo)
      .whereIn('id_cultivo', idCultivos)
      .first()

    if (!monitoreo) {
      return response.forbidden({
        success: false,
        message: 'No tienes acceso a ese monitoreo',
      })
    }

    // ── 3. Subir imagen a Cloudinary ─────────────────────────────────────────
    await archivo.move(app.tmpPath('uploads'))
    const urlImagen = await subirImagen(archivo.filePath!)

    const imagen = await Imagene.create({
      idMonitoreo: Number(idMonitoreo),
      rutaImagen:  urlImagen,
    })

    // ── 4. Enviar a FastAPI YOLO ─────────────────────────────────────────────
    try {
      const form = new FormData()
      form.append(
        'file',
        fs.createReadStream(archivo.filePath!),
        archivo.clientName
      )

      const iaResponse = await axios.post(
        'http://127.0.0.1:8000/predict',
        form,
        { headers: form.getHeaders() }
      )

      const detections = iaResponse.data.detections || []

      // ── 5. Sin detecciones válidas ────────────────────────────────────────
      if (detections.length === 0) {
        return response.ok({
          success: true,
          message:  iaResponse.data.message ?? 'Imagen no válida para análisis',
          imagen:   imagen,
          analisis: null,
          detections: [],
        })
      }

      // ── 6. Procesar primer resultado ──────────────────────────────────────
      const firstDetection = detections[0]

      let idNivelRoya: number | null = null
      if (firstDetection.class === 'Enfermedad_ROYA') idNivelRoya = 1
      if (firstDetection.class === 'Hoja_Sana')       idNivelRoya = 2
      if (firstDetection.class === 'arbol_cafe')       idNivelRoya = 3

      // ── 7. Guardar análisis en BD ─────────────────────────────────────────
      const analisis = await AnalisisIa.create({
        idImagen:            imagen.idImagen,
        idEstado:            Number(idEstado),
        resultado:           firstDetection.class,
        porcentajeConfianza: Number((firstDetection.confidence * 100).toFixed(2)),
        idNivelRoya,
      })

      await analisis.load('nivelRoya')
      await analisis.load('estadoAnalisis')

      // ── 8. Respuesta final ────────────────────────────────────────────────
      return response.ok({
        success:    true,
        message:    'Análisis realizado correctamente',
        imagen:     imagen,
        detections: detections,
        analisis: {
          id:                  analisis.idAnalisis,
          resultado:           analisis.resultado,
          porcentajeConfianza: analisis.porcentajeConfianza,
          nivelRoya:           analisis.nivelRoya,
          estadoAnalisis:      analisis.estadoAnalisis,
        },
      })

    } catch (iaError: any) {
      // Imagen guardada pero IA falló
      return response.ok({
        success:  false,
        message:  'Imagen guardada pero el análisis IA falló. Intenta de nuevo.',
        imagen:   imagen,
        analisis: null,
        error:    iaError.message,
      })
    }
  }
}
