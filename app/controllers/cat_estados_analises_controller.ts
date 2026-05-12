import type { HttpContext } from '@adonisjs/core/http'
import CatEstadosAnalisi from '#models/cat_estados_analisi'
import { catalogoStoreValidator, catalogoUpdateValidator } from '#validators/validators'

export default class CatEstadosAnalisisController {

  async index({ request, response }: HttpContext) {
    try {
      const page    = Number(request.input('page', 1))
      const limit   = Number(request.input('limit', 20))
      const estados = await CatEstadosAnalisi.query().paginate(page, limit)
      return response.ok(estados)
    } catch (error: any) {
      return response.internalServerError({ message: 'Error al obtener estados de análisis', error: error.message })
    }
  }

  async store({ request, response }: HttpContext) {
    try {
      const data   = await request.validateUsing(catalogoStoreValidator)
      const estado = await CatEstadosAnalisi.create({ nombreEstado: data.nombre, descripcion: data.descripcion ?? null })
      return response.created({ message: 'Estado de análisis creado correctamente', data: estado })
    } catch (error: any) {
      if (error.code === 'E_VALIDATION_ERROR') {
        return response.unprocessableEntity({ message: 'Error de validación', errors: error.messages })
      }
      return response.internalServerError({ message: 'Error al crear estado de análisis', error: error.message })
    }
  }

  async show({ params, response }: HttpContext) {
    try {
      const estado = await CatEstadosAnalisi.findOrFail(params.id)
      return response.ok(estado)
    } catch {
      return response.notFound({ message: 'Estado de análisis no encontrado' })
    }
  }

  async update({ params, request, response }: HttpContext) {
    try {
      const estado = await CatEstadosAnalisi.findOrFail(params.id)
      const data   = await request.validateUsing(catalogoUpdateValidator)
      if (data.nombre      !== undefined) estado.nombreEstado = data.nombre
      if (data.descripcion !== undefined) estado.descripcion  = data.descripcion ?? null
      await estado.save()
      return response.ok({ message: 'Estado de análisis actualizado correctamente', data: estado })
    } catch (error: any) {
      if (error.code === 'E_VALIDATION_ERROR') {
        return response.unprocessableEntity({ message: 'Error de validación', errors: error.messages })
      }
      return response.internalServerError({ message: 'Error al actualizar estado de análisis', error: error.message })
    }
  }

  async destroy({ params, response }: HttpContext) {
    try {
      const estado = await CatEstadosAnalisi.findOrFail(params.id)
      await estado.delete()
      return response.ok({ message: 'Estado de análisis eliminado correctamente' })
    } catch (error: any) {
      return response.internalServerError({ message: 'Error al eliminar estado de análisis', error: error.message })
    }
  }
}