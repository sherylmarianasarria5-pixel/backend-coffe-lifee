import type { HttpContext } from '@adonisjs/core/http'
import CatNivelesRoya from '#models/cat_nivel_roya'
import { catalogoStoreValidator, catalogoUpdateValidator } from '#validators/validators'

export default class CatNivelesRoyasController {

  /**
   * @index
   * @summary Listar niveles de roya
   * @responseBody 200 - {"data": [{"idNivel": 1, "nombreNivel": "Alto", "descripcion": "Nivel crítico"}]}
   */
  async index({ request, response }: HttpContext) {
    try {
      const page    = Number(request.input('page', 1))
      const limit   = Number(request.input('limit', 20))
      const niveles = await CatNivelesRoya.query().paginate(page, limit)
      return response.ok(niveles)
    } catch (error: any) {
      return response.internalServerError({ message: 'Error al obtener niveles de roya', error: error.message })
    }
  }

  /**
   * @store
   * @summary Crear nivel de roya
   * @requestBody {"nombre": "Alto", "descripcion": "Nivel crítico de roya"}
   * @responseBody 201 - {"message": "Nivel de roya creado correctamente", "data": {"idNivel": 1}}
   * @responseBody 422 - {"message": "Error de validación"}
   */
  async store({ request, response }: HttpContext) {
    try {
      const data  = await request.validateUsing(catalogoStoreValidator)
      const nivel = await CatNivelesRoya.create({ nombreNivel: data.nombre, descripcion: data.descripcion ?? null })
      return response.created({ message: 'Nivel de roya creado correctamente', data: nivel })
    } catch (error: any) {
      if (error.code === 'E_VALIDATION_ERROR') {
        return response.unprocessableEntity({ message: 'Error de validación', errors: error.messages })
      }
      return response.internalServerError({ message: 'Error al crear nivel de roya', error: error.message })
    }
  }

  /**
   * @show
   * @summary Ver nivel de roya por ID
   * @responseBody 200 - {"idNivel": 1, "nombreNivel": "Alto"}
   * @responseBody 404 - {"message": "Nivel de roya no encontrado"}
   */
  async show({ params, response }: HttpContext) {
    try {
      const nivel = await CatNivelesRoya.findOrFail(params.id)
      return response.ok(nivel)
    } catch {
      return response.notFound({ message: 'Nivel de roya no encontrado' })
    }
  }

  /**
   * @update
   * @summary Actualizar nivel de roya
   * @requestBody {"nombre": "Medio", "descripcion": "Nivel moderado"}
   * @responseBody 200 - {"message": "Nivel de roya actualizado correctamente"}
   * @responseBody 422 - {"message": "Error de validación"}
   */
  async update({ params, request, response }: HttpContext) {
    try {
      const nivel = await CatNivelesRoya.findOrFail(params.id)
      const data  = await request.validateUsing(catalogoUpdateValidator)
      if (data.nombre      !== undefined) nivel.nombreNivel = data.nombre
      if (data.descripcion !== undefined) nivel.descripcion = data.descripcion ?? null
      await nivel.save()
      return response.ok({ message: 'Nivel de roya actualizado correctamente', data: nivel })
    } catch (error: any) {
      if (error.code === 'E_VALIDATION_ERROR') {
        return response.unprocessableEntity({ message: 'Error de validación', errors: error.messages })
      }
      return response.internalServerError({ message: 'Error al actualizar nivel de roya', error: error.message })
    }
  }

  /**
   * @destroy
   * @summary Eliminar nivel de roya
   * @responseBody 200 - {"message": "Nivel de roya eliminado correctamente"}
   * @responseBody 404 - {"message": "Nivel de roya no encontrado"}
   */
  async destroy({ params, response }: HttpContext) {
    try {
      const nivel = await CatNivelesRoya.findOrFail(params.id)
      await nivel.delete()
      return response.ok({ message: 'Nivel de roya eliminado correctamente' })
    } catch (error: any) {
      return response.internalServerError({ message: 'Error al eliminar nivel de roya', error: error.message })
    }
  }
}
