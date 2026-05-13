import type { HttpContext } from '@adonisjs/core/http'
import CatEstadosCultivo from '#models/cat_estado_cultivo'
import { catalogoStoreValidator, catalogoUpdateValidator } from '#validators/validators'

export default class CatEstadosCultivosController {

  /**
   * @index
   * @summary Listar estados de cultivo
   * @responseBody 200 - {"data": [{"idEstado": 1, "nombreEstado": "Activo", "descripcion": "Cultivo en producción"}]}
   */
  async index({ request, response }: HttpContext) {
    try {
      const page    = Number(request.input('page', 1))
      const limit   = Number(request.input('limit', 20))
      const estados = await CatEstadosCultivo.query().paginate(page, limit)
      return response.ok(estados)
    } catch (error: any) {
      return response.internalServerError({ message: 'Error al obtener estados de cultivo', error: error.message })
    }
  }

  /**
   * @store
   * @summary Crear estado de cultivo
   * @requestBody {"nombre": "Activo", "descripcion": "Cultivo en producción"}
   * @responseBody 201 - {"message": "Estado de cultivo creado correctamente", "data": {"idEstado": 1}}
   * @responseBody 422 - {"message": "Error de validación"}
   */
  async store({ request, response }: HttpContext) {
    try {
      const data   = await request.validateUsing(catalogoStoreValidator)
      const estado = await CatEstadosCultivo.create({ nombreEstado: data.nombre, descripcion: data.descripcion ?? null })
      return response.created({ message: 'Estado de cultivo creado correctamente', data: estado })
    } catch (error: any) {
      if (error.code === 'E_VALIDATION_ERROR') {
        return response.unprocessableEntity({ message: 'Error de validación', errors: error.messages })
      }
      return response.internalServerError({ message: 'Error al crear estado de cultivo', error: error.message })
    }
  }

  /**
   * @show
   * @summary Ver estado de cultivo por ID
   * @responseBody 200 - {"idEstado": 1, "nombreEstado": "Activo"}
   * @responseBody 404 - {"message": "Estado de cultivo no encontrado"}
   */
  async show({ params, response }: HttpContext) {
    try {
      const estado = await CatEstadosCultivo.findOrFail(params.id)
      return response.ok(estado)
    } catch {
      return response.notFound({ message: 'Estado de cultivo no encontrado' })
    }
  }

  /**
   * @update
   * @summary Actualizar estado de cultivo
   * @requestBody {"nombre": "Inactivo", "descripcion": "Cultivo sin producción"}
   * @responseBody 200 - {"message": "Estado de cultivo actualizado correctamente"}
   * @responseBody 422 - {"message": "Error de validación"}
   */
  async update({ params, request, response }: HttpContext) {
    try {
      const estado = await CatEstadosCultivo.findOrFail(params.id)
      const data   = await request.validateUsing(catalogoUpdateValidator)
      if (data.nombre      !== undefined) estado.nombreEstado = data.nombre
      if (data.descripcion !== undefined) estado.descripcion  = data.descripcion ?? null
      await estado.save()
      return response.ok({ message: 'Estado de cultivo actualizado correctamente', data: estado })
    } catch (error: any) {
      if (error.code === 'E_VALIDATION_ERROR') {
        return response.unprocessableEntity({ message: 'Error de validación', errors: error.messages })
      }
      return response.internalServerError({ message: 'Error al actualizar estado de cultivo', error: error.message })
    }
  }

  /**
   * @destroy
   * @summary Eliminar estado de cultivo
   * @responseBody 200 - {"message": "Estado de cultivo eliminado correctamente"}
   * @responseBody 404 - {"message": "Estado de cultivo no encontrado"}
   */
  async destroy({ params, response }: HttpContext) {
    try {
      const estado = await CatEstadosCultivo.findOrFail(params.id)
      await estado.delete()
      return response.ok({ message: 'Estado de cultivo eliminado correctamente' })
    } catch (error: any) {
      return response.internalServerError({ message: 'Error al eliminar estado de cultivo', error: error.message })
    }
  }
}
