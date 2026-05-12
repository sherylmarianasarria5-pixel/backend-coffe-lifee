import type { HttpContext } from '@adonisjs/core/http'
import CatPrioridade from '#models/cat_prioridade'
import { catalogoStoreValidator, catalogoUpdateValidator } from '#validators/validators'

export default class CatPrioridadesController {

  async index({ request, response }: HttpContext) {
    try {
      const page       = Number(request.input('page', 1))
      const limit      = Number(request.input('limit', 20))
      const prioridades = await CatPrioridade.query().paginate(page, limit)
      return response.ok(prioridades)
    } catch (error: any) {
      return response.internalServerError({ message: 'Error al obtener prioridades', error: error.message })
    }
  }

  async store({ request, response }: HttpContext) {
    try {
      const data       = await request.validateUsing(catalogoStoreValidator)
      const prioridad  = await CatPrioridade.create({ nombrePrioridad: data.nombre, descripcion: data.descripcion ?? null })
      return response.created({ message: 'Prioridad creada correctamente', data: prioridad })
    } catch (error: any) {
      if (error.code === 'E_VALIDATION_ERROR') {
        return response.unprocessableEntity({ message: 'Error de validación', errors: error.messages })
      }
      return response.internalServerError({ message: 'Error al crear prioridad', error: error.message })
    }
  }

  async show({ params, response }: HttpContext) {
    try {
      const prioridad = await CatPrioridade.findOrFail(params.id)
      return response.ok(prioridad)
    } catch {
      return response.notFound({ message: 'Prioridad no encontrada' })
    }
  }

  async update({ params, request, response }: HttpContext) {
    try {
      const prioridad = await CatPrioridade.findOrFail(params.id)
      const data      = await request.validateUsing(catalogoUpdateValidator)
      if (data.nombre      !== undefined) prioridad.nombrePrioridad = data.nombre
      if (data.descripcion !== undefined) prioridad.descripcion     = data.descripcion ?? null
      await prioridad.save()
      return response.ok({ message: 'Prioridad actualizada correctamente', data: prioridad })
    } catch (error: any) {
      if (error.code === 'E_VALIDATION_ERROR') {
        return response.unprocessableEntity({ message: 'Error de validación', errors: error.messages })
      }
      return response.internalServerError({ message: 'Error al actualizar prioridad', error: error.message })
    }
  }

  async destroy({ params, response }: HttpContext) {
    try {
      const prioridad = await CatPrioridade.findOrFail(params.id)
      await prioridad.delete()
      return response.ok({ message: 'Prioridad eliminada correctamente' })
    } catch (error: any) {
      return response.internalServerError({ message: 'Error al eliminar prioridad', error: error.message })
    }
  }
}