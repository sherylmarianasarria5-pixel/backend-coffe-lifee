import type { HttpContext } from '@adonisjs/core/http'
import CatEstadoCultivo     from '#models/cat_estado_cultivo'
import CatEstadoAnalisis    from '#models/cat_estado_analisis'
import CatNivelRoya         from '#models/cat_nivel_roya'
import CatRol               from '#models/cat_rol'
import CatTipoTratamiento   from '#models/cat_tipo_tratamiento'
import CatTipoRecomendacion from '#models/cat_tipo_recomendacion'
import CatPrioridad         from '#models/cat_prioridad'

export default class CategoriasController {

  /**
   * @index
   * @summary Listar todas las categorías (catálogos del sistema)
   * @responseBody 200 - {"estados_cultivo": [], "estados_analisis": [], "niveles_roya": [], "roles": [], "tipos_tratamiento": [], "tipos_recomendacion": [], "prioridades": []}
   */
  async index({ response }: HttpContext) {
    try {
      const [estadosCultivo, estadosAnalisis, nivelesRoya, roles, tiposTratamiento, tiposRecomendacion, prioridades] =
        await Promise.all([
          CatEstadoCultivo.all(),
          CatEstadoAnalisis.all(),
          CatNivelRoya.all(),
          CatRol.all(),
          CatTipoTratamiento.all(),
          CatTipoRecomendacion.all(),
          CatPrioridad.all(),
        ])
      return response.ok({
        estados_cultivo:     estadosCultivo,
        estados_analisis:    estadosAnalisis,
        niveles_roya:        nivelesRoya,
        roles:               roles,
        tipos_tratamiento:   tiposTratamiento,
        tipos_recomendacion: tiposRecomendacion,
        prioridades:         prioridades,
      })
    } catch (error: any) {
      return response.internalServerError({ message: 'Error al obtener categorias', error: error.message })
    }
  }

  /**
   * @show
   * @summary Ver un catálogo por nombre (ej: estados_cultivo, niveles_roya, roles...)
   * @responseBody 200 - [{"id": 1, "nombre": "Activo"}]
   * @responseBody 404 - {"message": "Categoria 'xxx' no encontrada"}
   */
  async show({ params, response }: HttpContext) {
    try {
      const map: Record<string, any[]> = {
        estados_cultivo:     await CatEstadoCultivo.all(),
        estados_analisis:    await CatEstadoAnalisis.all(),
        niveles_roya:        await CatNivelRoya.all(),
        roles:               await CatRol.all(),
        tipos_tratamiento:   await CatTipoTratamiento.all(),
        tipos_recomendacion: await CatTipoRecomendacion.all(),
        prioridades:         await CatPrioridad.all(),
      }
      if (!map[params.id]) return response.notFound({ message: `Categoria '${params.id}' no encontrada` })
      return response.ok(map[params.id])
    } catch (error: any) {
      return response.internalServerError({ message: 'Error al obtener categoria', error: error.message })
    }
  }

  /**
   * @store
   * @summary No disponible — usar endpoints específicos de cada catálogo
   * @responseBody 400 - {"message": "Usa los endpoints específicos para crear catálogos"}
   */
  async store({ response }: HttpContext) {
    return response.badRequest({ message: 'Usa los endpoints específicos para crear catálogos' })
  }

  /**
   * @update
   * @summary No disponible — usar endpoints específicos de cada catálogo
   * @responseBody 400 - {"message": "Usa los endpoints específicos para actualizar catálogos"}
   */
  async update({ response }: HttpContext) {
    return response.badRequest({ message: 'Usa los endpoints específicos para actualizar catálogos' })
  }

  /**
   * @destroy
   * @summary No disponible — usar endpoints específicos de cada catálogo
   * @responseBody 400 - {"message": "Usa los endpoints específicos para eliminar catálogos"}
   */
  async destroy({ response }: HttpContext) {
    return response.badRequest({ message: 'Usa los endpoints específicos para eliminar catálogos' })
  }
}
