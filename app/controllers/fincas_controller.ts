import type { HttpContext } from '@adonisjs/core/http'
import Finca from '#models/finca'
import { fincaStoreValidator, fincaUpdateValidator } from '#validators/validators'

export default class FincasController {

  async index({ request, response }: HttpContext) {
    try {
      const page      = Number(request.input('page', 1))
      const limit     = Number(request.input('limit', 10))
      const search    = request.input('search', '')
      const idUsuario = request.input('id_usuario')

      const query = Finca.query().preload('usuario')

      if (search) {
        query.where((q) => {
          q.whereILike('nombre_finca',  `%${search}%`)
           .orWhereILike('municipio',    `%${search}%`)
           .orWhereILike('departamento', `%${search}%`)
        })
      }
      if (idUsuario) query.where('id_usuario', idUsuario)

      const fincas = await query.paginate(page, limit)
      return response.ok(fincas)
    } catch (error: any) {
      return response.internalServerError({ message: 'Error al obtener fincas', error: error.message })
    }
  }

  async store({ request, response }: HttpContext) {
    try {
      const data = await request.validateUsing(fincaStoreValidator)
      const finca = await Finca.create({
        idUsuario:     data.id_usuario,
        nombreFinca:   data.nombre_finca,
        municipio:     data.municipio ?? null,
        departamento:  data.departamento ?? null,
        latitud:       data.latitud ?? null,
        longitud:      data.longitud ?? null,
        altitudMsnm:   data.altitud_msnm ?? null,
        areaHectareas: data.area_hectareas ?? null,
      })
      await finca.load('usuario')
      return response.created({ message: 'Finca creada correctamente', data: finca })
    } catch (error: any) {
      if (error.code === 'E_VALIDATION_ERROR') {
        return response.unprocessableEntity({ message: 'Error de validación', errors: error.messages })
      }
      return response.internalServerError({ message: 'Error al crear finca', error: error.message })
    }
  }

  async show({ params, response }: HttpContext) {
    try {
      const finca = await Finca.query()
        .where('id_finca', params.id)
        .preload('usuario')
        .preload('cultivos')
        .firstOrFail()
      return response.ok(finca)
    } catch {
      return response.notFound({ message: 'Finca no encontrada' })
    }
  }

  async update({ params, request, response }: HttpContext) {
    try {
      const finca = await Finca.findOrFail(params.id)
      const data  = await request.validateUsing(fincaUpdateValidator)

      const payload: Record<string, any> = {}
      if (data.nombre_finca   !== undefined) payload.nombreFinca   = data.nombre_finca
      if (data.municipio      !== undefined) payload.municipio     = data.municipio
      if (data.departamento   !== undefined) payload.departamento  = data.departamento
      if (data.latitud        !== undefined) payload.latitud       = data.latitud
      if (data.longitud       !== undefined) payload.longitud      = data.longitud
      if (data.altitud_msnm   !== undefined) payload.altitudMsnm   = data.altitud_msnm
      if (data.area_hectareas !== undefined) payload.areaHectareas = data.area_hectareas

      finca.merge(payload)
      await finca.save()
      return response.ok({ message: 'Finca actualizada correctamente', data: finca })
    } catch (error: any) {
      if (error.code === 'E_VALIDATION_ERROR') {
        return response.unprocessableEntity({ message: 'Error de validación', errors: error.messages })
      }
      return response.internalServerError({ message: 'Error al actualizar finca', error: error.message })
    }
  }

  async destroy({ params, response }: HttpContext) {
    try {
      const finca = await Finca.findOrFail(params.id)
      await finca.delete()
      return response.ok({ message: 'Finca eliminada correctamente' })
    } catch (error: any) {
      return response.internalServerError({ message: 'Error al eliminar finca', error: error.message })
    }
  }
}
