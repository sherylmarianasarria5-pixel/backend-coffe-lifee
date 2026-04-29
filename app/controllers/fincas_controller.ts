import type { HttpContext } from '@adonisjs/core/http'
import Finca from '#models/finca'

export default class FincasController {
  // Listar fincas
  async index({ response }: HttpContext) {
    const fincas = await Finca.all()

    return response.ok({
      message: 'Lista de fincas',
      data: fincas,
    })
  }

  // Crear finca
  async store({ request, response }: HttpContext) {
    const data = request.only([
      'nombreFinca',
      'ubicacion',
      'tamanoHectareas',
    ])

    const finca = await Finca.create(data)

    return response.created({
      message: 'Finca creada correctamente',
      data: finca,
    })
  }

  // Ver una finca
  async show({ params, response }: HttpContext) {
    const finca = await Finca.findOrFail(params.id)

    return response.ok({
      message: 'Finca encontrada',
      data: finca,
    })
  }

  // Actualizar finca
  async update({ params, request, response }: HttpContext) {
    const finca = await Finca.findOrFail(params.id)

    const data = request.only([
      'nombreFinca',
      'ubicacion',
      'tamanoHectareas',
    ])

    finca.merge(data)
    await finca.save()

    return response.ok({
      message: 'Finca actualizada correctamente',
      data: finca,
    })
  }

  // Eliminar finca
  async destroy({ params, response }: HttpContext) {
    const finca = await Finca.findOrFail(params.id)

    await finca.delete()

    return response.ok({
      message: 'Finca eliminada correctamente',
    })
  }
}