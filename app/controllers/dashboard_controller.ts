import type { HttpContext } from '@adonisjs/core/http'
import { DateTime } from 'luxon'
import db from '@adonisjs/lucid/services/db'
import Usuario from '#models/usuario'
import Finca from '#models/finca'
import Monitoreo from '#models/monitoreo'
import Recomendacione from '#models/recomendacione'
import AsignacionExperto from '#models/asignacion_experto'

/**
 * ─────────────────────────────────────────────────────────────────────────────
 * Helpers de clasificación
 * ─────────────────────────────────────────────────────────────────────────────
 * El esquema no tiene una columna "estado" directa en monitoreos, así que el
 * estado de roya y el estado del flujo (Revisado / Pendiente / Tratamiento
 * enviado) se derivan de los análisis IA y las recomendaciones asociadas.
 *
 * IMPORTANTE: el catálogo real `cat_niveles_roya` solo tiene 4 niveles de
 * SEVERIDAD (Crítico, Alto, Medio, Bajo) — todos implican que SÍ hay roya.
 * No existe un nivel "Sin roya" en ese catálogo. Por lo tanto, la ausencia
 * de roya se detecta cuando el análisis IA más reciente NO tiene ningún
 * id_nivel_roya asignado (queda null), porque a una planta sana no se le
 * asigna severidad.
 *
 *  - "sin_roya"  -> hay análisis IA más reciente, pero idNivelRoya es null.
 *  - "con_roya"  -> el análisis IA más reciente tiene idNivelRoya asignado
 *                   (Crítico / Alto / Medio / Bajo).
 *  - "pendiente" -> el monitoreo no tiene ningún análisis IA todavía.
 *
 *  Estado visible:
 *  - "Revisado"            -> sin_roya
 *  - "Tratamiento enviado" -> con_roya y ya existe una recomendación/tratamiento
 *  - "Pendiente"           -> con_roya sin recomendación todavía, o sin análisis
 */

function ultimoAnalisis(m: any) {
  const todos = (m.imagenes || []).flatMap((img: any) => img.analisis || [])
  if (todos.length === 0) return null
  return todos.sort((a: any, b: any) => {
    const fa = a.fechaRegistro ? DateTime.fromISO(String(a.fechaRegistro)).toMillis() : 0
    const fb = b.fechaRegistro ? DateTime.fromISO(String(b.fechaRegistro)).toMillis() : 0
    return fb - fa
  })[0]
}

function estadoRoya(m: any): 'sin_roya' | 'con_roya' | 'pendiente' {
  const ultimo: any = ultimoAnalisis(m)
  if (!ultimo) return 'pendiente'
  return ultimo.idNivelRoya ? 'con_roya' : 'sin_roya'
}

/** Nombre del nivel de severidad (Crítico/Alto/Medio/Bajo) si lo hay, o null si está sano/pendiente. */
function severidadRoya(m: any): string | null {
  const ultimo: any = ultimoAnalisis(m)
  return ultimo?.nivelRoya?.nombreNivel ?? null
}

function estadoVisible(m: any, tieneRecomendacion: boolean): 'Revisado' | 'Pendiente' | 'Tratamiento enviado' {
  const roya = estadoRoya(m)
  if (roya === 'sin_roya') return 'Revisado'
  if (roya === 'con_roya') return tieneRecomendacion ? 'Tratamiento enviado' : 'Pendiente'
  return 'Pendiente'
}

async function cargarMonitoreosCompletos(query: any) {
  return query
    .preload('cultivo', (q: any) => q.preload('finca'))
    .preload('usuario')
    .preload('imagenes', (q: any) => q.preload('analisis', (qa: any) => qa.preload('nivelRoya').preload('estadoAnalisis')))
    .preload('recomendaciones')
}

export default class DashboardController {
  /**
   * @index
   * @summary Tarjetas de resumen del dashboard (fincas activas, expertos activos, cafeteros activos, monitoreos del mes)
   * @description Equivale a las 4 tarjetas superiores del dashboard, cada una con su variación % vs el periodo anterior
   * @responseBody 200 - {"fincasActivas": {"total": 10, "variacionPorcentual": 15}, "expertosActivos": {"total": 8, "variacionPorcentual": 5}, "cafeterosActivos": {"total": 20, "variacionPorcentual": 12}, "monitoreosEsteMes": {"total": 128, "variacionPorcentual": 22}}
   */
  async index({ response }: HttpContext) {
    try {
      const ahora = DateTime.now()
      const inicioMes = ahora.startOf('month')
      const inicioMesAnterior = ahora.minus({ months: 1 }).startOf('month')
      const finMesAnterior = inicioMes

      const inicioSemana = ahora.startOf('week')
      const finSemanaAnterior = inicioSemana

      const variacion = (actual: number, anterior: number) => {
        if (anterior === 0) return actual > 0 ? 100 : 0
        return Math.round(((actual - anterior) / anterior) * 100)
      }

      const [
        fincasActivasActual, fincasActivasAnterior,
        expertosActivosActual, expertosActivosAnterior,
        cafeterosActivosActual, cafeterosActivosAnterior,
        monitoreosMesActual, monitoreosMesAnterior,
      ] = await Promise.all([
        Finca.query().where('activo', true).count('* as total').first(),
        Finca.query().where('activo', true).where('fecha_registro', '<', finSemanaAnterior.toSQL()!).count('* as total').first(),

        Usuario.query().where('activo', true).whereHas('rol', (q) => q.whereRaw('LOWER(TRIM(nombre_rol)) = ?', ['experto'])).count('* as total').first(),
        Usuario.query().where('activo', true).whereHas('rol', (q) => q.whereRaw('LOWER(TRIM(nombre_rol)) = ?', ['experto'])).where('fecha_registro', '<', finSemanaAnterior.toSQL()!).count('* as total').first(),

        Usuario.query().where('activo', true).whereHas('rol', (q) => q.whereRaw('LOWER(TRIM(nombre_rol)) = ?', ['cafetero'])).count('* as total').first(),
        Usuario.query().where('activo', true).whereHas('rol', (q) => q.whereRaw('LOWER(TRIM(nombre_rol)) = ?', ['cafetero'])).where('fecha_registro', '<', finSemanaAnterior.toSQL()!).count('* as total').first(),

        Monitoreo.query().where('fecha_monitoreo', '>=', inicioMes.toSQL()!).count('* as total').first(),
        Monitoreo.query().where('fecha_monitoreo', '>=', inicioMesAnterior.toSQL()!).where('fecha_monitoreo', '<', finMesAnterior.toSQL()!).count('* as total').first(),
      ])

      const extraer = (r: any) => Number(r?.$extras?.total ?? 0)

      return response.ok({
        fincasActivas: {
          total: extraer(fincasActivasActual),
          variacionPorcentual: variacion(extraer(fincasActivasActual), extraer(fincasActivasAnterior)),
        },
        expertosActivos: {
          total: extraer(expertosActivosActual),
          variacionPorcentual: variacion(extraer(expertosActivosActual), extraer(expertosActivosAnterior)),
        },
        cafeterosActivos: {
          total: extraer(cafeterosActivosActual),
          variacionPorcentual: variacion(extraer(cafeterosActivosActual), extraer(cafeterosActivosAnterior)),
        },
        monitoreosEsteMes: {
          total: extraer(monitoreosMesActual),
          variacionPorcentual: variacion(extraer(monitoreosMesActual), extraer(monitoreosMesAnterior)),
        },
      })
    } catch (error: any) {
      return response.internalServerError({ message: 'Error al obtener resumen del dashboard', error: error.message })
    }
  }

  /**
   * @monitoreosPorEstado
   * @summary Donut "Monitoreos por estado" (Sin roya / Con roya / Pendientes)
   * @paramQuery desde - Fecha inicial (YYYY-MM-DD) - @type(string)
   * @paramQuery hasta - Fecha final (YYYY-MM-DD) - @type(string)
   * @responseBody 200 - {"total": 128, "sinRoya": {"cantidad": 83, "porcentaje": 65}, "conRoya": {"cantidad": 32, "porcentaje": 25}, "pendientes": {"cantidad": 13, "porcentaje": 10}}
   */
  async monitoreosPorEstado({ request, response }: HttpContext) {
    try {
      const desde = request.input('desde')
      const hasta = request.input('hasta')

      const query = Monitoreo.query()
      if (desde) query.where('fecha_monitoreo', '>=', desde)
      if (hasta) query.where('fecha_monitoreo', '<=', hasta)

      const monitoreos = await cargarMonitoreosCompletos(query)

      let sinRoya = 0
      let conRoya = 0
      let pendientes = 0
      for (const m of monitoreos as any[]) {
        const estado = estadoRoya(m)
        if (estado === 'sin_roya') sinRoya++
        else if (estado === 'con_roya') conRoya++
        else pendientes++
      }

      const total = monitoreos.length
      const pct = (n: number) => (total === 0 ? 0 : Math.round((n / total) * 100))

      return response.ok({
        total,
        sinRoya:    { cantidad: sinRoya,    porcentaje: pct(sinRoya) },
        conRoya:    { cantidad: conRoya,    porcentaje: pct(conRoya) },
        pendientes: { cantidad: pendientes, porcentaje: pct(pendientes) },
      })
    } catch (error: any) {
      return response.internalServerError({ message: 'Error al obtener monitoreos por estado', error: error.message })
    }
  }

  /**
   * @tendenciaRoya
   * @summary Línea "Tendencia de roya (últimos 7 días)"
   * @paramQuery dias - Cantidad de días hacia atrás (default 7) - @type(number)
   * @responseBody 200 - {"dias": [{"fecha": "2026-06-17", "diaSemana": "Mar", "sinRoya": 12, "conRoya": 5, "pendientes": 2}]}
   */
  async tendenciaRoya({ request, response }: HttpContext) {
    try {
      const dias = Number(request.input('dias', 7))
      const hoy = DateTime.now().endOf('day')
      const desde = hoy.minus({ days: dias - 1 }).startOf('day')

      const monitoreos = await cargarMonitoreosCompletos(
        Monitoreo.query()
          .where('fecha_monitoreo', '>=', desde.toSQL()!)
          .where('fecha_monitoreo', '<=', hoy.toSQL()!)
      )

      const buckets: Record<string, { sinRoya: number; conRoya: number; pendientes: number }> = {}
      for (let i = 0; i < dias; i++) {
        const fecha = desde.plus({ days: i }).toISODate()!
        buckets[fecha] = { sinRoya: 0, conRoya: 0, pendientes: 0 }
      }

      for (const m of monitoreos as any[]) {
        const fecha = DateTime.fromISO(String(m.fechaMonitoreo)).toISODate()
        if (!fecha || !buckets[fecha]) continue
        const estado = estadoRoya(m)
        if (estado === 'sin_roya') buckets[fecha].sinRoya++
        else if (estado === 'con_roya') buckets[fecha].conRoya++
        else buckets[fecha].pendientes++
      }

      const resultado = Object.entries(buckets).map(([fecha, valores]) => ({
        fecha,
        diaSemana: DateTime.fromISO(fecha).setLocale('es').toFormat('ccc'),
        ...valores,
      }))

      return response.ok({ dias: resultado })
    } catch (error: any) {
      return response.internalServerError({ message: 'Error al obtener tendencia de roya', error: error.message })
    }
  }

  /**
   * @actividadReciente
   * @summary Feed "Actividad reciente" (monitoreos, detecciones de roya, recomendaciones/tratamientos y nuevos cafeteros)
   * @paramQuery limit - Cantidad de eventos a retornar (default 10) - @type(number)
   * @responseBody 200 - {"data": [{"tipo": "monitoreo_nuevo", "titulo": "Nuevo monitoreo registrado", "detalle": "Finca El Rosal - Lote A", "fecha": "2026-06-22T10:00:00.000Z"}]}
   */
  async actividadReciente({ request, response }: HttpContext) {
    try {
      const limit = Number(request.input('limit', 10))

      const [monitoreosRecientes, recomendacionesRecientes, cafeterosRecientes] = await Promise.all([
        cargarMonitoreosCompletos(Monitoreo.query().orderBy('fecha_registro', 'desc').limit(limit)),
        Recomendacione.query().preload('monitoreo', (q: any) => q.preload('cultivo', (qc: any) => qc.preload('finca'))).orderBy('fecha_registro', 'desc').limit(limit),
        Usuario.query().whereHas('rol', (q) => q.whereRaw('LOWER(TRIM(nombre_rol)) = ?', ['cafetero'])).orderBy('fecha_registro', 'desc').limit(limit),
      ])

      const eventos: Array<{ tipo: string; titulo: string; detalle: string; fecha: string | null }> = []

      for (const m of monitoreosRecientes) {
        const fincaNombre = m.cultivo?.finca?.nombreFinca ?? 'Finca sin asignar'
        const cultivoNombre = m.cultivo?.nombreCultivo ?? ''
        eventos.push({
          tipo: 'monitoreo_nuevo',
          titulo: 'Nuevo monitoreo registrado',
          detalle: `${fincaNombre}${cultivoNombre ? ' - ' + cultivoNombre : ''}`,
          fecha: m.fechaRegistro ? m.fechaRegistro.toISO() : null,
        })
        if (estadoRoya(m) === 'con_roya') {
          eventos.push({
            tipo: 'roya_detectada',
            titulo: 'Roya detectada',
            detalle: `${fincaNombre}${cultivoNombre ? ' - ' + cultivoNombre : ''}`,
            fecha: m.fechaRegistro ? m.fechaRegistro.toISO() : null,
          })
        }
      }

      for (const r of recomendacionesRecientes) {
        const finca = r.monitoreo?.cultivo?.finca?.nombreFinca ?? 'Finca sin asignar'
        const cultivo = r.monitoreo?.cultivo?.nombreCultivo ?? ''
        eventos.push({
          tipo: 'tratamiento_asignado',
          titulo: 'Tratamiento / recomendación asignada',
          detalle: `${finca}${cultivo ? ' - ' + cultivo : ''}`,
          fecha: r.fechaRegistro ? r.fechaRegistro.toISO() : null,
        })
      }

      for (const c of cafeterosRecientes) {
        eventos.push({
          tipo: 'cafetero_nuevo',
          titulo: 'Nuevo caficultor registrado',
          detalle: `${c.nombre} ${c.apellido} (Caficultor)`,
          fecha: c.fechaRegistro ? c.fechaRegistro.toISO() : null,
        })
      }

      eventos.sort((a, b) => (b.fecha ?? '').localeCompare(a.fecha ?? ''))

      return response.ok({ data: eventos.slice(0, limit) })
    } catch (error: any) {
      return response.internalServerError({ message: 'Error al obtener actividad reciente', error: error.message })
    }
  }

  /**
   * @monitoreosRecientes
   * @summary Tabla "Monitoreos recientes" (finca, lote/cultivo, fecha, resultado IA, experto, estado)
   * @paramQuery limit - Cantidad de filas a retornar (default 5) - @type(number)
   * @responseBody 200 - {"data": [{"idMonitoreo": 1, "finca": "El Rosal", "lote": "Lote A", "fecha": "2026-06-22T08:45:00.000Z", "resultadoIA": "Sin roya", "experto": "Danier Experto", "estado": "Revisado"}]}
   */
  async monitoreosRecientes({ request, response }: HttpContext) {
    try {
      const limit = Number(request.input('limit', 5))
      const monitoreos = await cargarMonitoreosCompletos(
        Monitoreo.query().orderBy('fecha_monitoreo', 'desc').limit(limit)
      )

      const data = monitoreos.map((m: any) => {
        const roya = estadoRoya(m)
        const tieneRecomendacion = (m.recomendaciones || []).length > 0
        return {
          idMonitoreo: m.idMonitoreo,
          finca: m.cultivo?.finca?.nombreFinca ?? null,
          lote: m.cultivo?.nombreCultivo ?? null,
          fecha: m.fechaMonitoreo,
          resultadoIA: roya === 'con_roya' ? 'Tiene roya' : roya === 'sin_roya' ? 'Sin roya' : 'Pendiente de análisis',
          severidad: roya === 'con_roya' ? severidadRoya(m) : null,
          experto: m.usuario ? `${m.usuario.nombre} ${m.usuario.apellido}` : null,
          estado: estadoVisible(m, tieneRecomendacion),
        }
      })

      return response.ok({ data })
    } catch (error: any) {
      return response.internalServerError({ message: 'Error al obtener monitoreos recientes', error: error.message })
    }
  }

  /**
   * @topFincasRoya
   * @summary Ranking "Top 5 fincas con más roya"
   * @paramQuery limit - Cantidad de fincas a retornar (default 5) - @type(number)
   * @responseBody 200 - {"data": [{"idFinca": 3, "nombreFinca": "La Victoria", "casosConRoya": 18, "porSeveridad": {"Critico": 4, "Alto": 6, "Medio": 5, "Bajo": 3}}]}
   */
  async topFincasRoya({ request, response }: HttpContext) {
    try {
      const limit = Number(request.input('limit', 5))
      const monitoreos = await cargarMonitoreosCompletos(Monitoreo.query())

      const conteoPorFinca = new Map<number, { nombreFinca: string; casosConRoya: number; porSeveridad: Record<string, number> }>()
      for (const m of monitoreos as any[]) {
        if (estadoRoya(m) !== 'con_roya') continue
        const finca = m.cultivo?.finca
        if (!finca) continue
        const sev = severidadRoya(m) ?? 'Sin clasificar'
        const actual = conteoPorFinca.get(finca.idFinca) ?? { nombreFinca: finca.nombreFinca, casosConRoya: 0, porSeveridad: {} as Record<string, number> }
        actual.casosConRoya++
        actual.porSeveridad[sev] = (actual.porSeveridad[sev] ?? 0) + 1
        conteoPorFinca.set(finca.idFinca, actual)
      }

      const data = Array.from(conteoPorFinca.entries())
        .map(([idFinca, valor]) => ({ idFinca, ...valor }))
        .sort((a, b) => b.casosConRoya - a.casosConRoya)
        .slice(0, limit)

      return response.ok({ data })
    } catch (error: any) {
      return response.internalServerError({ message: 'Error al obtener top de fincas con roya', error: error.message })
    }
  }

  /**
   * @proximosMonitoreos
   * @summary Lista "Próximos monitoreos programados"
   * @description No existe una tabla de "monitoreos programados/calendario" en el esquema actual.
   * Este endpoint expone, como aproximación, las asignaciones de expertos a fincas (fecha_asignada futura)
   * agrupadas como próximas visitas. Si más adelante se crea una tabla real de calendario, este método debe migrarse a ella.
   * @paramQuery limit - Cantidad de elementos a retornar (default 5) - @type(number)
   * @responseBody 200 - {"data": [{"idAsignacion": 1, "finca": "El Rosal", "experto": "Danier Experto", "fecha": "2026-06-23", "etiqueta": "Hoy"}]}
   */
  async proximosMonitoreos({ request, response }: HttpContext) {
    try {
      const limit = Number(request.input('limit', 5))
      const hoy = DateTime.now().startOf('day')

      const asignaciones = await AsignacionExperto.query()
        .preload('finca')
        .preload('experto')
        .where('fecha_asignada', '>=', hoy.toISODate()!)
        .orderBy('fecha_asignada', 'asc')
        .limit(limit)

      const data = asignaciones.map((a) => {
        const fecha = DateTime.fromISO(String(a.fechaAsignada))
        const diff = Math.round(fecha.diff(hoy, 'days').days)
        const etiqueta = diff === 0 ? 'Hoy' : diff === 1 ? 'Mañana' : `${diff} días`
        return {
          idAsignacion: a.idAsignacion,
          finca: a.finca?.nombreFinca ?? null,
          experto: a.experto ? `${a.experto.nombre} ${a.experto.apellido}` : null,
          fecha: fecha.toISODate(),
          etiqueta,
        }
      })

      return response.ok({ data })
    } catch (error: any) {
      return response.internalServerError({ message: 'Error al obtener próximos monitoreos', error: error.message })
    }
  }

  /**
   * @mapaFincas
   * @summary Datos para el "Mapa de fincas" (lat/lng + estado de roya por finca)
   * @responseBody 200 - {"data": [{"idFinca": 1, "nombreFinca": "El Rosal", "latitud": 2.4448, "longitud": -76.6147, "estado": "con_roya"}]}
   */
  async mapaFincas({ response }: HttpContext) {
    try {
      const fincas = await Finca.query().where('activo', true).whereNotNull('latitud').whereNotNull('longitud')
      const monitoreos = await cargarMonitoreosCompletos(Monitoreo.query())

      const ultimoEstadoPorFinca = new Map<number, { fecha: number; estado: 'sin_roya' | 'con_roya' | 'pendiente'; severidad: string | null }>()
      for (const m of monitoreos as any[]) {
        const idFinca = m.cultivo?.finca?.idFinca
        if (!idFinca) continue
        const fechaMillis = DateTime.fromISO(String(m.fechaMonitoreo)).toMillis()
        const actual = ultimoEstadoPorFinca.get(idFinca)
        if (!actual || fechaMillis > actual.fecha) {
          ultimoEstadoPorFinca.set(idFinca, { fecha: fechaMillis, estado: estadoRoya(m), severidad: severidadRoya(m) })
        }
      }

      const data = fincas.map((f) => ({
        idFinca: f.idFinca,
        nombreFinca: f.nombreFinca,
        latitud: f.latitud ? Number(f.latitud) : null,
        longitud: f.longitud ? Number(f.longitud) : null,
        estado: ultimoEstadoPorFinca.get(f.idFinca)?.estado ?? 'pendiente',
        severidad: ultimoEstadoPorFinca.get(f.idFinca)?.severidad ?? null,
      }))

      return response.ok({ data })
    } catch (error: any) {
      return response.internalServerError({ message: 'Error al obtener mapa de fincas', error: error.message })
    }
  }

  /**
   * @impactoSistema
   * @summary Métricas "Impacto del sistema" (reducción de pérdida, ahorro de fungicidas, incremento de productividad, hectáreas protegidas)
   * @description IMPORTANTE: el esquema actual no registra pérdidas de cultivo, costos de fungicidas ni productividad histórica,
   * por lo que estas métricas no se pueden calcular con datos reales todavía. Este endpoint devuelve únicamente lo que SÍ es
   * calculable hoy (hectáreas protegidas = suma de área de fincas con al menos un tratamiento/recomendación aplicado) y
   * deja explícitamente en null los valores que requerirían nuevas tablas (registro de pérdidas, costos de insumos, histórico de cosecha).
   * @responseBody 200 - {"reduccionPerdidaPorcentaje": null, "ahorroFungicidasPorcentaje": null, "incrementoProductividadPorcentaje": null, "hectareasProtegidas": 120}
   */
  async impactoSistema({ response }: HttpContext) {
    try {
      const fincasConTratamiento = await db
        .from('fincas as f')
        .innerJoin('cultivos as cu', 'cu.id_finca', 'f.id_finca')
        .innerJoin('monitoreos as mo', 'mo.id_cultivo', 'cu.id_cultivo')
        .innerJoin('recomendaciones as r', 'r.id_monitoreo', 'mo.id_monitoreo')
        .where('f.activo', true)
        .distinct('f.id_finca', 'f.area_hectareas')
        .select('f.id_finca', 'f.area_hectareas')

      const hectareasProtegidas = fincasConTratamiento.reduce(
        (acc: number, row: any) => acc + (Number(row.area_hectareas) || 0),
        0
      )

      return response.ok({
        reduccionPerdidaPorcentaje: null,
        ahorroFungicidasPorcentaje: null,
        incrementoProductividadPorcentaje: null,
        hectareasProtegidas: Math.round(hectareasProtegidas),
        nota: 'reduccionPerdidaPorcentaje, ahorroFungicidasPorcentaje e incrementoProductividadPorcentaje requieren tablas de costos/cosecha que aún no existen en el esquema.',
      })
    } catch (error: any) {
      return response.internalServerError({ message: 'Error al obtener impacto del sistema', error: error.message })
    }
  }

}
