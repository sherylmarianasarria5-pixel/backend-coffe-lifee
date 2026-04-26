import type { HttpContext } from '@adonisjs/core/http'
import CatRol from '#models/cat_rol'

export default class CatRolesController {
  async index({ response }: HttpContext) {
    const roles = await CatRol.all()
    return response.ok(roles)
  }

  async store({ request, response }: HttpContext) {
    const data = request.only(['nombreRol', 'descripcion'])

    const rol = await CatRol.create({
      nombreRol: data.nombreRol,
      descripcion: data.descripcion,
    })

    return response.created({
      message: 'Rol creado correctamente',
      data: rol,
    })
  }

  async show({ params, response }: HttpContext) {
    const rol = await CatRol.findOrFail(params.id)
    return response.ok(rol)
  }

  async update({ params, request, response }: HttpContext) {
    const rol = await CatRol.findOrFail(params.id)

    const data = request.only(['nombreRol', 'descripcion'])

    rol.merge(data)
    await rol.save()

    return response.ok({
      message: 'Rol actualizado correctamente',
      data: rol,
    })
  }

  async destroy({ params, response }: HttpContext) {
    const rol = await CatRol.findOrFail(params.id)
    await rol.delete()

    return response.ok({
      message: 'Rol eliminado correctamente',
    })
  }
}