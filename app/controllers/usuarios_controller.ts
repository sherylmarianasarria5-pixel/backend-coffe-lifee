import type { HttpContext } from '@adonisjs/core/http'
import Usuario from '#models/usuario'

export default class UsuariosController {
  async index({ response }: HttpContext) {
    const usuarios = await Usuario.query().preload('rol')

    return response.ok({
      message: 'Lista de usuarios',
      data: usuarios,
    })
  }

  async store({ request, response }: HttpContext) {
    const data = request.only([
      'idRol',
      'nombre',
      'apellido',
      'correo',
      'telefono',
      'passwordHash',
      'observaciones',
      'activo',
    ])

    const usuario = await Usuario.create(data)

    return response.created({
      message: 'Usuario creado correctamente',
      data: usuario,
    })
  }

  async show({ params, response }: HttpContext) {
    const usuario = await Usuario.query()
      .where('id_usuario', params.id)
      .preload('rol')
      .firstOrFail()

    return response.ok({
      message: 'Usuario encontrado',
      data: usuario,
    })
  }

  async update({ params, request, response }: HttpContext) {
    const usuario = await Usuario.findOrFail(params.id)

    const data = request.only([
      'idRol',
      'nombre',
      'apellido',
      'correo',
      'telefono',
      'passwordHash',
      'observaciones',
      'activo',
    ])

    usuario.merge(data)
    await usuario.save()

    return response.ok({
      message: 'Usuario actualizado correctamente',
      data: usuario,
    })
  }

  async destroy({ params, response }: HttpContext) {
    const usuario = await Usuario.findOrFail(params.id)

    await usuario.delete()

    return response.ok({
      message: 'Usuario eliminado correctamente',
    })
  }
}