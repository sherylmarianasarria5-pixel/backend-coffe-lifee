import type { HttpContext } from '@adonisjs/core/http'
import Finca from '#models/finca'

export default class FincasController {

  async index({ response }: HttpContext) {
    try {
      const fincas = await Finca.query().preload('usuario')
      return response.ok(fincas)
    } catch (error: any) {
      return response.internalServerError({ message: 'Error al obtener fincas', error: error.message })
    }
  }

  async store({ request, response }: HttpContext) {
    try {
      const data = request.only(['id_usuario', 'nombre_finca', 'municipio', 'departamento', 'latitud', 'longitud', 'altitud_msnm', 'area_hectareas'])

      if (!data.id_usuario)   return response.badRequest({ message: 'El id_usuario es obligatorio' })
      if (!data.nombre_finca) return response.badRequest({ message: 'El nombre_finca es obligatorio' })

      const finca = await Finca.create({
        idUsuario: data.id_usuario,
        nombreFinca: data.nombre_finca,
        municipio: data.municipio,
        departamento: data.departamento,
        latitud: data.latitud,
        longitud: data.longitud,
        altitudMsnm: data.altitud_msnm,
        areaHectareas: data.area_hectareas,
      })
      return response.created({ message: 'Finca creada correctamente', data: finca })
    } catch (error: any) {
      return response.internalServerError({ message: 'Error al crear finca', error: error.message })
    }
  }

  async show({ params, response }: HttpContext) {
    try {
      const finca = await Finca.query()
        .where('id_finca', params.id)
        .preload('usuario')
        .firstOrFail()
      return response.ok(finca)
    } catch {
      return response.notFound({ message: 'Finca no encontrada' })
    }
  }

  async update({ params, request, response }: HttpContext) {
    try {
      const finca = await Finca.findOrFail(params.id)
      const data = request.only(['nombre_finca', 'municipio', 'departamento', 'latitud', 'longitud', 'altitud_msnm', 'area_hectareas'])

      const payload: Record<string, any> = {}
      if (data.nombre_finca !== undefined)   payload.nombreFinca = data.nombre_finca
      if (data.municipio !== undefined)      payload.municipio = data.municipio
      if (data.departamento !== undefined)   payload.departamento = data.departamento
      if (data.latitud !== undefined)        payload.latitud = data.latitud
      if (data.longitud !== undefined)       payload.longitud = data.longitud
      if (data.altitud_msnm !== undefined)   payload.altitudMsnm = data.altitud_msnm
      if (data.area_hectareas !== undefined) payload.areaHectareas = data.area_hectareas

      finca.merge(payload)
      await finca.save()
      return response.ok({ message: 'Finca actualizada correctamente', data: finca })
    } catch (error: any) {
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
