import type { HttpContext } from '@adonisjs/core/http'
import AnalisisIa from '#models/analisis_ia'
import Imagene    from '#models/imagene'
import Cultivo    from '#models/cultivo'
import { analisisIaStoreValidator, analisisIaUpdateValidator } from '#validators/validators'

import axios from 'axios'
import FormData from 'form-data'
import * as fs from 'node:fs'

export default class AnalisisIaController {
  async index({ request, response }: HttpContext) {
    try {
      const page        = Number(request.input('page', 1))
      const limit       = Number(request.input('limit', 10))
      const search      = request.input('search', '')
      const idImagen    = request.input('id_imagen')
      const idEstado    = request.input('id_estado')
      const idNivelRoya = request.input('id_nivel_roya')
      const ALLOWED = ['idAnalisis', 'resultado', 'porcentajeConfianza', 'fechaRegistro', 'idImagen', 'idEstado', 'idNivelRoya']
      const orderBy  = request.input('order_by', 'idAnalisis')
      const orderDir = request.input('order_dir', 'desc')
      const safeColumn = ALLOWED.includes(orderBy) ? orderBy : 'idAnalisis'

      const query = AnalisisIa.query()
        .preload('imagen')
        .preload('estadoAnalisis')
        .preload('nivelRoya')

      if (search)      query.where((q) => { q.whereILike('resultado', `%${search}%`) })
      if (idImagen)    query.where('idImagen', idImagen)
      if (idEstado)    query.where('idEstado', idEstado)
      if (idNivelRoya) query.where('idNivelRoya', idNivelRoya)

      query.orderBy(safeColumn, orderDir === 'asc' ? 'asc' : 'desc')

      const analisis = await query.paginate(page, limit)
      return response.ok(analisis)
    } catch (error: any) {
      return response.internalServerError({ message: 'Error al obtener análisis IA', error: error.message })
    }
  }

  async store({ request, response }: HttpContext) {
    try {
      const data = await request.validateUsing(analisisIaStoreValidator)

      const analisis = await AnalisisIa.create({
        idImagen:            data.id_imagen          ?? null,
        idEstado:            data.id_estado_analisis ?? null,
        resultado:           data.resultado          ?? null,
        porcentajeConfianza: data.confianza          ?? null,
        idNivelRoya:         null,
      })

      await analisis.load('estadoAnalisis')
      await analisis.load('nivelRoya')

      return response.created({ message: 'Análisis IA creado correctamente', data: analisis })
    } catch (error: any) {
      if (error.code === 'E_VALIDATION_ERROR') {
        return response.unprocessableEntity({ message: 'Error de validación', errors: error.messages })
      }
      return response.internalServerError({ message: 'Error al crear análisis IA', error: error.message })
    }
  }

  async show({ params, response }: HttpContext) {
    try {
      const analisis = await AnalisisIa.query()
        .where('idAnalisis', params.id)
        .preload('imagen')
        .preload('estadoAnalisis')
        .preload('nivelRoya')
        .firstOrFail()
      return response.ok(analisis)
    } catch {
      return response.notFound({ message: 'Análisis IA no encontrado' })
    }
  }

  async update({ params, request, response }: HttpContext) {
    try {
      const analisis = await AnalisisIa.findOrFail(params.id)
      const data     = await request.validateUsing(analisisIaUpdateValidator)

      const payload: Record<string, any> = {}
      if (data.id_estado_analisis !== undefined) payload.idEstado            = data.id_estado_analisis
      if (data.resultado          !== undefined) payload.resultado           = data.resultado
      if (data.confianza          !== undefined) payload.porcentajeConfianza = data.confianza
      if (data.observaciones      !== undefined) payload.observaciones       = data.observaciones

      analisis.merge(payload)
      await analisis.save()
      await analisis.load('estadoAnalisis')

      return response.ok({ message: 'Análisis IA actualizado correctamente', data: analisis })
    } catch (error: any) {
      if (error.code === 'E_VALIDATION_ERROR') {
        return response.unprocessableEntity({ message: 'Error de validación', errors: error.messages })
      }
      return response.internalServerError({ message: 'Error al actualizar análisis IA', error: error.message })
    }
  }

  async destroy({ params, response }: HttpContext) {
    try {
      const analisis = await AnalisisIa.findOrFail(params.id)
      await analisis.delete()
      return response.ok({ message: 'Análisis IA eliminado correctamente' })
    } catch (error: any) {
      return response.internalServerError({ message: 'Error al eliminar análisis IA', error: error.message })
    }
  }

  // =========================================
  // PREDICCIÓN IA (YOLO)
  // =========================================
  async predict({ request, response }: HttpContext) {
    try {
      const image    = request.file('file')
      const idImagen = request.input('idImagen')
      const idEstado = request.input('idEstado')

      if (!image)          return response.badRequest({ success: false, message: 'Debes subir una imagen' })
      if (!idImagen)       return response.badRequest({ success: false, message: 'idImagen es obligatorio' })
      if (!idEstado)       return response.badRequest({ success: false, message: 'idEstado es obligatorio' })
      if (!image.tmpPath)  return response.badRequest({ success: false, message: 'No se pudo procesar la imagen' })

      const form = new FormData()
      form.append('file', fs.createReadStream(image.tmpPath), image.clientName)

      const iaResponse = await axios.post(
        'http://127.0.0.1:8000/predict',
        form,
        { headers: form.getHeaders() }
      )

      const detections = iaResponse.data.detections || []

      if (detections.length === 0) {
        return response.ok({
          success:    true,
          message:    iaResponse.data.message || 'No se detectaron objetos',
          detections: []
        })
      }

      const firstDetection = detections[0]
      const confianza = firstDetection.confidence as number  // 0.0 – 1.0

      // cat_niveles_roya: 1=Crítico, 2=Alto, 3=Medio, 4=Bajo
      // Solo asigna nivel cuando hay roya. Hoja_Sana y arbol_cafe quedan null.
      let idNivelRoya: number | null = null
      if (firstDetection.class === 'Enfermedad_ROYA') {
        if      (confianza >= 0.85) idNivelRoya = 1  // Crítico
        else if (confianza >= 0.65) idNivelRoya = 2  // Alto
        else if (confianza >= 0.45) idNivelRoya = 3  // Medio
        else                        idNivelRoya = 4  // Bajo
      }

      const nuevoAnalisis = await AnalisisIa.create({
        idImagen:            Number(idImagen),
        idEstado:            Number(idEstado),
        resultado:           firstDetection.class,
        porcentajeConfianza: (confianza * 100).toFixed(2),
        idNivelRoya,
      })

      // Sincroniza automáticamente el estado del cultivo en la BD
      // cat_estados_cultivo: 1 = en roya, 2 = Sano
      if (firstDetection.class !== 'arbol_cafe') {
        try {
          const imagen = await Imagene.query()
            .where('idImagen', Number(idImagen))
            .preload('monitoreo')
            .first()

          if (imagen?.monitoreo?.idCultivo) {
            const cultivo = await Cultivo.find(imagen.monitoreo.idCultivo)
            if (cultivo) {
              cultivo.idEstadoCultivo = firstDetection.class === 'Enfermedad_ROYA' ? 1 : 2
              await cultivo.save()
            }
          }
        } catch {
          console.warn('[predict] No se pudo sincronizar estado del cultivo')
        }
      }

      // ── Notificar si se detectó roya ──
      if (firstDetection.class === 'Enfermedad_ROYA') {
        try {
          const { crearNotificacion } = await import('#services/notificacion_service')
          const imagenData = await Imagene.query()
            .where('idImagen', Number(idImagen))
            .preload('monitoreo', (q) => q.preload('cultivo', (q2: any) => q2.preload('finca')))
            .first()

          const finca   = (imagenData as any)?.monitoreo?.cultivo?.finca
          const cultivo = (imagenData as any)?.monitoreo?.cultivo

          if (finca?.idFinca) {
            const { default: AsignacionExperto } = await import('#models/asignacion_experto')
            const asignaciones = await AsignacionExperto.query()
              .where('id_finca', finca.idFinca)

            for (const asig of asignaciones) {
              await crearNotificacion({
                idUsuario:       asig.idExperto,
                tipo:            'roya_detectada',
                titulo:          '⚠️ Roya detectada',
                mensaje:         `Se detectó roya en ${finca.nombreFinca}${cultivo ? ' - ' + cultivo.nombreCultivo : ''} con ${(confianza * 100).toFixed(0)}% de confianza.`,
                idReferencia:    nuevoAnalisis.idAnalisis,
                tablaReferencia: 'analisis_ias',
              })
            }

            if (finca.idUsuario) {
              await crearNotificacion({
                idUsuario:       finca.idUsuario,
                tipo:            'roya_detectada',
                titulo:          '⚠️ Roya detectada en tu finca',
                mensaje:         `Se detectó roya en ${finca.nombreFinca}${cultivo ? ' - ' + cultivo.nombreCultivo : ''}. Un experto revisará pronto.`,
                idReferencia:    nuevoAnalisis.idAnalisis,
                tablaReferencia: 'analisis_ias',
              })
            }

            // ── Push notification si el nivel es Alto o Medio ──
            if (idNivelRoya === 2 || idNivelRoya === 3) {
              try {
                const { enviarPush } = await import('#services/firebase_service')
                const { default: FcmToken } = await import('#models/fcm_token')

                const nivelTexto = idNivelRoya === 2 ? 'Alto' : 'Medio'
                const idsDestino: number[] = []

                if (finca.idUsuario) idsDestino.push(finca.idUsuario)
                for (const asig of asignaciones) {
                  if (asig.idExperto) idsDestino.push(asig.idExperto)
                }

                for (const idUsuarioDestino of idsDestino) {
                  const fcmToken = await FcmToken.query()
                    .where('id_usuario', idUsuarioDestino)
                    .first()

                  if (fcmToken?.token) {
                    await enviarPush({
                      token:   fcmToken.token,
                      titulo:  `⚠️ Roya nivel ${nivelTexto} detectada`,
                      mensaje: `Se detectó roya nivel ${nivelTexto} en ${finca.nombreFinca}${cultivo ? ' - ' + cultivo.nombreCultivo : ''}.`,
                      data: {
                        tipo:       'roya_detectada',
                        idAnalisis: String(nuevoAnalisis.idAnalisis),
                      },
                    })
                  }
                }
              } catch (e) {
                console.error('Error al enviar push de roya:', e)
              }
            }
            // ──────────────────────────────────
          }
        } catch (e) {
          console.error('Error al notificar roya:', e)
        }
      }
      // ──────────────────────────────────

      return response.ok({
        success:  true,
        message:  'Análisis realizado correctamente',
        detections,
        analisis: nuevoAnalisis,
      })

    } catch (error: any) {
      console.error(error)
      return response.internalServerError({
        success: false,
        message: 'Error analizando imagen',
        error: error.message,
      })
    }
  }
}
