import type { HttpContext } from '@adonisjs/core/http'
import { DateTime } from 'luxon'
import db from '@adonisjs/lucid/services/db'

import Usuario          from '#models/usuario'
import Finca            from '#models/finca'
import Monitoreo        from '#models/monitoreo'
import AnalisisIa       from '#models/analisis_ia'
import Recomendacione   from '#models/recomendacione'
import AsignacionExperto from '#models/asignacion_experto'

function esRoya(resultado: string | null): boolean | null {
  if (!resultado) return null
  if (resultado === 'Hoja_Sana')        return false
  if (resultado === 'Enfermedad_ROYA')  return true
  return null
}

function estadoMonitoreo(analisisList: AnalisisIa[]): 'sin_roya' | 'con_roya' | 'pendiente' {
  if (analisisList.length === 0) return 'pendiente'
  const ultimo = analisisList.sort(
    (a, b) => (b.idAnalisis ?? 0) - (a.idAnalisis ?? 0)
  )[0]
  const roya = esRoya(ultimo.resultado)
  if (roya === null) return 'pendiente'
  return roya ? 'con_roya' : 'sin_roya'
}

export default class DashboardController {

  /**
   * @index
   * @summary Resumen del dashboard con contadores y variación porcentual
   * @responseBody 200 - {"fincasActivas": {"total": 10, "pctVsSemanaAnterior": 5}, "expertosActivos": {"total": 3, "pctVsSemanaAnterior": 0}, "cafeterosActivos": {"total": 7, "pctVsSemanaAnterior": -2}, "monitoreosEsteMes": {"total": 15, "pctVsMesAnterior": 10}}
   */
  async index({ response }: HttpContext) {
    try {
      const ahora     = DateTime.now()
      const inicioMes = ahora.startOf('month').toSQL()!
      const hace7dias = ahora.minus({ days: 7 }).toSQL()!

      const [
        totalFincas, fincasSemAnt,
        totalExpertos, expertosSemAnt,
        totalCafeteros, cafeterosSemAnt,
        monitoresMes, monitoresMesAnt,
      ] = await Promise.all([
        Finca.query().where('activo', true).count('* as total').first(),
        Finca.query().where('activo', true).where('fechaRegistro', '<', hace7dias).count('* as total').first(),
        Usuario.query().where('activo', true).where('idRol', 2).count('* as total').first(),
        Usuario.query().where('activo', true).where('idRol', 2).where('fechaRegistro', '<', hace7dias).count('* as total').first(),
        Usuario.query().where('activo', true).where('idRol', 3).count('* as total').first(),
        Usuario.query().where('activo', true).where('idRol', 3).where('fechaRegistro', '<', hace7dias).count('* as total').first(),
        Monitoreo.query().where('fechaMonitoreo', '>=', inicioMes).count('* as total').first(),
        Monitoreo.query()
          .where('fechaMonitoreo', '>=', ahora.minus({ months: 1 }).startOf('month').toSQL()!)
          .where('fechaMonitoreo', '<', inicioMes)
          .count('* as total').first(),
      ])

      const n   = (r: any) => Number((r as any)?.$extras?.total ?? 0)
      const pct = (actual: number, anterior: number) =>
        anterior === 0 ? null : Math.round(((actual - anterior) / anterior) * 100)

      const fA = n(totalFincas);    const fB = n(fincasSemAnt)
      const eA = n(totalExpertos);  const eB = n(expertosSemAnt)
      const cA = n(totalCafeteros); const cB = n(cafeterosSemAnt)
      const mA = n(monitoresMes);   const mB = n(monitoresMesAnt)

      return response.ok({
        fincasActivas:     { total: fA, pctVsSemanaAnterior: pct(fA, fB) },
        expertosActivos:   { total: eA, pctVsSemanaAnterior: pct(eA, eB) },
        cafeterosActivos:  { total: cA, pctVsSemanaAnterior: pct(cA, cB) },
        monitoreosEsteMes: { total: mA, pctVsMesAnterior:    pct(mA, mB) },
      })
    } catch (error: any) {
      return response.internalServerError({ message: 'Error en dashboard', error: error.message })
    }
  }

  /**
   * @monitoreosPorEstado
   * @summary Distribución de monitoreos por estado (sin roya, con roya, pendiente)
   * @responseBody 200 - {"total": 20, "sinRoya": {"cantidad": 10, "porcentaje": 50}, "conRoya": {"cantidad": 5, "porcentaje": 25}, "pendientes": {"cantidad": 5, "porcentaje": 25}}
   */
  async monitoreosPorEstado({ response }: HttpContext) {
    try {
      const monitoreos = await Monitoreo.query()

      let sinRoya = 0, conRoya = 0, pendientes = 0

      for (const m of monitoreos) {
        const analisis = await db.rawQuery(`
          SELECT a.resultado
          FROM analisis_ias a
          JOIN imagenes i ON i.idImagen = a.idImagen
          WHERE i.idMonitoreo = ?
          ORDER BY a.idAnalisis DESC
          LIMIT 1
        `, [m.idMonitoreo])

        const rows = analisis[0] as any[]

        if (rows.length === 0) {
          pendientes++
        } else {
          const resultado = rows[0].resultado
          const roya = esRoya(resultado)
          if (roya === true)       conRoya++
          else if (roya === false) sinRoya++
          else                     pendientes++
        }
      }

      const total = sinRoya + conRoya + pendientes
      return response.ok({
        total,
        sinRoya:    { cantidad: sinRoya,    porcentaje: total ? Math.round((sinRoya / total) * 100)    : 0 },
        conRoya:    { cantidad: conRoya,    porcentaje: total ? Math.round((conRoya / total) * 100)    : 0 },
        pendientes: { cantidad: pendientes, porcentaje: total ? Math.round((pendientes / total) * 100) : 0 },
      })
    } catch (error: any) {
      return response.internalServerError({ message: 'Error monitoreos por estado', error: error.message })
    }
  }

  /**
   * @tendenciaRoya
   * @summary Tendencia de detección de roya por día en un rango de días
   * @responseBody 200 - {"dias": 7, "datos": [{"fecha": "2026-06-17", "sinRoya": 3, "conRoya": 1, "pendientes": 0}]}
   * @queryParam dias - Número de días a incluir (máx 30, default 7)
   */
  async tendenciaRoya({ request, response }: HttpContext) {
    try {
      const dias  = Math.min(Number(request.input('dias', 7)), 30)
      const desde = DateTime.now().minus({ days: dias - 1 }).startOf('day')

      const analisis = await AnalisisIa.query()
        .where('fechaRegistro', '>=', desde.toSQL()!)
        .select('resultado', 'fechaRegistro')

      const mapa: Record<string, { sinRoya: number; conRoya: number; pendientes: number }> = {}
      for (let i = 0; i < dias; i++) {
        const dia = desde.plus({ days: i }).toFormat('yyyy-MM-dd')
        mapa[dia] = { sinRoya: 0, conRoya: 0, pendientes: 0 }
      }

      for (const a of analisis) {
        if (!a.fechaRegistro) continue
        const dia = a.fechaRegistro.toFormat('yyyy-MM-dd')
        if (!mapa[dia]) continue
        const roya = esRoya(a.resultado)
        if (roya === true)        mapa[dia].conRoya++
        else if (roya === false)  mapa[dia].sinRoya++
        else                      mapa[dia].pendientes++
      }

      const datos = Object.entries(mapa).map(([fecha, v]) => ({ fecha, ...v }))
      return response.ok({ dias, datos })
    } catch (error: any) {
      return response.internalServerError({ message: 'Error tendencia roya', error: error.message })
    }
  }

  /**
   * @actividadReciente
   * @summary Actividad reciente del sistema (monitoreos, roya detectada, tratamientos, nuevos usuarios)
   * @responseBody 200 - {"actividad": [{"tipo": "monitoreo", "icono": "monitoreo", "titulo": "Nuevo monitoreo registrado", "detalle": "Finca Ejemplo - Lote 1", "fecha": "2026-06-23"}]}
   * @queryParam limit - Cantidad de eventos a devolver (máx 50, default 10)
   */
  async actividadReciente({ request, response }: HttpContext) {
    try {
      const limit = Math.min(Number(request.input('limit', 10)), 50)

      const [monitoreos, analisis, recomendaciones, usuarios] = await Promise.all([
        Monitoreo.query()
          .preload('cultivo', (q) => q.preload('finca'))
          .preload('usuario')
          .orderBy('fecha_registro', 'desc')
          .limit(limit),
        AnalisisIa.query()
          .where('resultado', 'Enfermedad_ROYA')
          .preload('imagen', (q) =>
            q.preload('monitoreo', (q2) =>
              q2.preload('cultivo', (q3) => q3.preload('finca'))
            )
          )
          .orderBy('fechaRegistro', 'desc')
          .limit(limit),
        Recomendacione.query()
          .preload('monitoreo', (q) =>
            q.preload('cultivo', (q2) => q2.preload('finca'))
          )
          .orderBy('fecha_registro', 'desc')
          .limit(limit),
        Usuario.query()
          .where('activo', true)
          .orderBy('created_at', 'desc')
          .limit(limit),
      ])

      const eventos: any[] = []

      for (const m of monitoreos) {
        eventos.push({
          tipo:    'monitoreo',
          icono:   'monitoreo',
          titulo:  'Nuevo monitoreo registrado',
          detalle: `${m.cultivo?.finca?.nombreFinca ?? 'Finca desconocida'} - ${m.cultivo?.nombreCultivo ?? 'Lote desconocido'}`,
          fecha:   m.$extras?.fechaRegistro ?? m.fechaMonitoreo ?? null,
        })
      }
      for (const a of analisis) {
        eventos.push({
          tipo:    'roya_detectada',
          icono:   'alerta',
          titulo:  'Roya detectada',
          detalle: `${a.imagen?.monitoreo?.cultivo?.finca?.nombreFinca ?? 'Finca desconocida'} - ${a.imagen?.monitoreo?.cultivo?.nombreCultivo ?? 'Lote desconocido'}`,
          fecha:   a.fechaRegistro,
        })
      }
      for (const r of recomendaciones) {
        eventos.push({
          tipo:    'tratamiento',
          icono:   'tratamiento',
          titulo:  'Tratamiento asignado',
          detalle: `${(r as any).monitoreo?.cultivo?.finca?.nombreFinca ?? 'Finca desconocida'} - ${(r as any).monitoreo?.cultivo?.nombreCultivo ?? 'Lote desconocido'}`,
          fecha:   (r as any).fechaRegistro ?? null,
        })
      }
      for (const u of usuarios) {
        eventos.push({
          tipo:    'nuevo_usuario',
          icono:   'usuario',
          titulo:  `Nuevo ${u.idRol === 3 ? 'caficultor' : 'experto'} registrado`,
          detalle: `${u.nombre} ${u.apellido}`,
          fecha:   (u as any).createdAt ?? null,
        })
      }

      eventos.sort((a, b) => {
        const da  = a.fecha ? new Date(a.fecha).getTime() : 0
        const db2 = b.fecha ? new Date(b.fecha).getTime() : 0
        return db2 - da
      })

      return response.ok({ actividad: eventos.slice(0, limit) })
    } catch (error: any) {
      return response.internalServerError({ message: 'Error actividad reciente', error: error.message })
    }
  }

  /**
   * @monitoreosRecientes
   * @summary Últimos monitoreos registrados con resultado IA, severidad y estado visible
   * @responseBody 200 - {"monitoreos": [{"idMonitoreo": 1, "finca": "Finca Ejemplo", "lote": "Lote A", "fecha": "2026-06-23", "resultadoIA": "con_roya", "severidad": "Alto", "experto": "Juan Pérez", "estadoVisible": "Pendiente"}]}
   * @queryParam limit - Cantidad de monitoreos (máx 20, default 5)
   */
  async monitoreosRecientes({ request, response }: HttpContext) {
    try {
      const limit = Math.min(Number(request.input('limit', 5)), 20)

      const monitoreos = await Monitoreo.query()
        .preload('cultivo', (q) => q.preload('finca'))
        .preload('usuario')
        .preload('imagenes', (q) => q.preload('analisis', (q2) => q2.preload('nivelRoya')))
        .preload('recomendaciones')
        .orderBy('fecha_monitoreo', 'desc')
        .limit(limit)

      const rows = monitoreos.map((m) => {
        const todosAnalisis = m.imagenes.flatMap((img) => img.analisis)
        const estadoRoya    = estadoMonitoreo(todosAnalisis)

        let estadoVisible: string
        if (estadoRoya === 'sin_roya') {
          estadoVisible = 'Revisado'
        } else if (estadoRoya === 'con_roya') {
          estadoVisible = m.recomendaciones?.length > 0 ? 'Tratamiento enviado' : 'Pendiente'
        } else {
          estadoVisible = 'Pendiente'
        }

        const ultimoConRoya = todosAnalisis
          .filter((a) => a.resultado === 'Enfermedad_ROYA')
          .sort((a, b) => (b.idAnalisis ?? 0) - (a.idAnalisis ?? 0))[0]

        return {
          idMonitoreo:  m.idMonitoreo,
          finca: m.cultivo?.finca?.nombreFinca ?? null,
          lote: m.cultivo?.nombreCultivo      ?? null,
          fecha: m.fechaMonitoreo,
          resultadoIA: estadoRoya,
          severidad:    ultimoConRoya?.nivelRoya?.nombreNivel ?? null,
          experto:      m.usuario ? `${m.usuario.nombre} ${m.usuario.apellido}` : null,
          estadoVisible,
        }
      })

      return response.ok({ monitoreos: rows })
    } catch (error: any) {
      return response.internalServerError({ message: 'Error monitoreos recientes', error: error.message })
    }
  }

  /**
   * @topFincasRoya
   * @summary Ranking de fincas con más detecciones de roya
   * @responseBody 200 - {"topFincas": [{"id_finca": 1, "finca": "Finca Ejemplo", "totalRoya": 5, "nivelMax": "Crítico"}]}
   * @queryParam limit - Cantidad de fincas (máx 20, default 5)
   */
  async topFincasRoya({ request, response }: HttpContext) {
    try {
      const limit = Math.min(Number(request.input('limit', 5)), 20)

      const rows = await db.rawQuery(`
        SELECT
          f.id_finca,
          f.nombre_finca      AS finca,
          COUNT(a.idAnalisis) AS totalRoya,
          MAX(n.nombre_nivel) AS nivelMax
        FROM fincas f
        JOIN cultivos     cu ON cu.id_finca    = f.id_finca
        JOIN monitoreos   mo ON mo.id_cultivo  = cu.id_cultivo
        JOIN imagenes     im ON im.idMonitoreo = mo.id_monitoreo
        JOIN analisis_ias a  ON a.idImagen     = im.idImagen
          AND a.resultado = 'Enfermedad_ROYA'
        LEFT JOIN cat_niveles_roya n ON n.id_nivel = a.idNivelRoya
        GROUP BY f.id_finca, f.nombre_finca
        ORDER BY totalRoya DESC
        LIMIT ?
      `, [limit])

      return response.ok({ topFincas: rows[0] })
    } catch (error: any) {
      return response.internalServerError({ message: 'Error top fincas roya', error: error.message })
    }
  }

  /**
   * @proximosMonitoreos
   * @summary Próximos monitoreos agendados (asignaciones de expertos)
   * @responseBody 200 - {"proximosMonitoreos": [{"idAsignacion": 1, "finca": "Finca Ejemplo", "fecha": "2026-06-25", "etiqueta": "2 días", "experto": "Juan Pérez"}]}
   * @queryParam limit - Cantidad de próximos monitoreos (máx 20, default 5)
   */
  async proximosMonitoreos({ request, response }: HttpContext) {
    try {
      const limit = Math.min(Number(request.input('limit', 5)), 20)
      const hoy   = DateTime.now().toISODate()!

      const asignaciones = await AsignacionExperto.query()
        .where('fechaAsignada', '>=', hoy)
        .preload('finca')
        .preload('experto')
        .orderBy('fechaAsignada', 'asc')
        .limit(limit)

      const proximos = asignaciones.map((a) => {
        const fecha = DateTime.fromISO(a.fechaAsignada)
        const diff  = Math.round(fecha.diff(DateTime.now().startOf('day'), 'days').days)
        const etiqueta = diff === 0 ? 'Hoy' : diff === 1 ? 'Mañana' : `${diff} días`

        return {
          idAsignacion: a.idAsignacion,
          finca:        a.finca?.nombreFinca ?? null,
          fecha:        a.fechaAsignada,
          etiqueta,
          experto:      a.experto ? `${a.experto.nombre} ${a.experto.apellido}` : null,
        }
      })

      return response.ok({ proximosMonitoreos: proximos })
    } catch (error: any) {
      return response.internalServerError({ message: 'Error próximos monitoreos', error: error.message })
    }
  }

  /**
   * @mapaFincas
   * @summary Coordenadas y estado sanitario de todas las fincas activas para mapa
   * @responseBody 200 - {"fincas": [{"idFinca": 1, "nombre": "Finca Ejemplo", "latitud": 14.5, "longitud": -90.5, "estadoFinca": "con_roya", "totalCultivos": 3}]}
   */
  async mapaFincas({ response }: HttpContext) {
    try {
      const fincas = await Finca.query()
        .where('activo', true)
        .preload('cultivos', (q) => q.preload('estadoCultivo'))

      const puntos = fincas.map((f) => {
        const cultivos  = f.cultivos ?? []
        const tieneRoya = cultivos.some(
          (c) => c.estadoCultivo?.nombreEstado?.toLowerCase().includes('roya')
        )
        const todosSanos = cultivos.every(
          (c) => c.estadoCultivo?.nombreEstado?.toLowerCase().includes('sano')
        )
        const estadoFinca = tieneRoya ? 'con_roya' : todosSanos ? 'sin_roya' : 'pendiente'

        return {
          idFinca:       (f as any).idFinca,
          nombre:        (f as any).nombreFinca,
          latitud:       (f as any).latitud  ?? null,
          longitud:      (f as any).longitud ?? null,
          estadoFinca,
          totalCultivos: cultivos.length,
        }
      })

      return response.ok({ fincas: puntos })
    } catch (error: any) {
      return response.internalServerError({ message: 'Error mapa fincas', error: error.message })
    }
  }

  /**
   * @impacto
   * @summary Impacto del sistema: fincas con tratamiento, hectáreas protegidas, reducción de pérdidas, ahorro y productividad
   * @responseBody 200 - {"fincasConTratamiento": 5, "hectareasProtegidas": 12.5, "reduccionPerdidaPct": null, "ahorroFungicidaPct": null, "incrementoProductividadPct": null}
   */
  async impacto({ response }: HttpContext) {
    try {
      const result = await db.rawQuery(`
        SELECT COUNT(DISTINCT f.id_finca)                    AS total,
               SUM(DISTINCT COALESCE(f.area_hectareas, 0))  AS hectareas
        FROM fincas f
        JOIN cultivos        cu ON cu.id_finca      = f.id_finca
        JOIN monitoreos      mo ON mo.id_cultivo    = cu.id_cultivo
        JOIN recomendaciones r  ON r.id_monitoreo   = mo.id_monitoreo
      `)

      const [{ total, hectareas }] = result[0] as any[]

      return response.ok({
        fincasConTratamiento:       Number(total    ?? 0),
        hectareasProtegidas:        Number(hectareas ?? 0),
        reduccionPerdidaPct:        null,
        ahorroFungicidaPct:         null,
        incrementoProductividadPct: null,
      })
    } catch (error: any) {
      return response.internalServerError({ message: 'Error impacto', error: error.message })
    }
  }
}
