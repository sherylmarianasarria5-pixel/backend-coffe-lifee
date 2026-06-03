import type { HttpContext } from '@adonisjs/core/http'
import Usuario from '#models/usuario'

export default class UsuariosController {

  /**
   * @index
   * @summary Listar todos los usuarios
   * @responseBody 200 - [{"idUsuario": 1, "nombre": "Juan", "correo": "juan@gmail.com", "rol": {"nombreRol": "admin"}}]
   */
  async index({ request, response }: HttpContext) {
    try {
      const page = Number(request.input('page', 1))
      const limit = Number(request.input('limit', 10))
      const usuarios = await Usuario.query().preload('rol').paginate(page, limit)
      return response.ok(usuarios.toJSON())
    } catch (error: any) {
      return response.internalServerError({ message: 'Error al obtener usuarios', error: error.message })
    }
  }

  /**
   * @store
   * @summary Crear usuario
   * @requestBody {"id_rol": 1, "nombre": "Juan", "apellido": "Pérez", "correo": "juan@gmail.com", "password": "123456", "telefono": "3001234567", "observaciones": "texto", "activo": true}
   * @responseBody 201 - {"message": "Usuario creado correctamente", "data": {"idUsuario": 1}}
   * @responseBody 400 - {"message": "El correo ya existe"}
   */
  async store({ request, response }: HttpContext) {
    try {
      const data = request.only(['id_rol', 'nombre', 'apellido', 'correo', 'telefono', 'password', 'observaciones', 'activo'])

      if (!data.nombre)   return response.badRequest({ message: 'El nombre es obligatorio' })
      if (!data.correo)   return response.badRequest({ message: 'El correo es obligatorio' })
      if (!data.password) return response.badRequest({ message: 'La contraseña es obligatoria' })
      if (!data.id_rol)   return response.badRequest({ message: 'El id_rol es obligatorio' })

      const existe = await Usuario.findBy('correo', data.correo)
      if (existe) return response.badRequest({ message: 'El correo ya existe' })

      const usuario = await Usuario.create({
        idRol:         data.id_rol,
        nombre:        data.nombre,
        apellido:      data.apellido,
        correo:        data.correo,
        telefono:      data.telefono,
        passwordHash:  data.password,
        observaciones: data.observaciones,
        activo:        data.activo ?? true,
      })
      return response.created({ message: 'Usuario creado correctamente', data: usuario })
    } catch (error: any) {
      return response.internalServerError({ message: 'Error al crear usuario', error: error.message })
    }
  }

  /**
   * @show
   * @summary Ver usuario por ID
   * @responseBody 200 - {"idUsuario": 1, "nombre": "Juan", "correo": "juan@gmail.com", "rol": {"nombreRol": "admin"}}
   * @responseBody 404 - {"message": "Usuario no encontrado"}
   */
  async show({ params, response }: HttpContext) {
    try {
      const usuario = await Usuario.query()
        .where('id_usuario', params.id)
        .preload('rol')
        .firstOrFail()
      return response.ok(usuario)
    } catch {
      return response.notFound({ message: 'Usuario no encontrado' })
    }
  }

  /**
   * @update
   * @summary Actualizar usuario
   * @requestBody {"id_rol": 2, "nombre": "Juan", "apellido": "Pérez", "correo": "juan@gmail.com", "telefono": "3001234567", "observaciones": "texto", "activo": true, "password": "nueva123"}
   * @responseBody 200 - {"message": "Usuario actualizado correctamente"}
   * @responseBody 400 - {"message": "El correo ya está en uso"}
   */
  async update({ params, request, response }: HttpContext) {
    try {
      const usuario = await Usuario.findOrFail(params.id)
      const data = request.only(['id_rol', 'nombre', 'apellido', 'correo', 'telefono', 'password', 'observaciones', 'activo'])

      if (data.correo && data.correo !== usuario.correo) {
        const existe = await Usuario.findBy('correo', data.correo)
        if (existe) return response.badRequest({ message: 'El correo ya está en uso' })
      }

      const payload: Record<string, any> = {}
      if (data.id_rol        !== undefined) payload.idRol         = data.id_rol
      if (data.nombre        !== undefined) payload.nombre        = data.nombre
      if (data.apellido      !== undefined) payload.apellido      = data.apellido
      if (data.correo        !== undefined) payload.correo        = data.correo
      if (data.telefono      !== undefined) payload.telefono      = data.telefono
      if (data.observaciones !== undefined) payload.observaciones = data.observaciones
      if (data.activo        !== undefined) payload.activo        = data.activo
      if (data.password)                    payload.passwordHash  = data.password

      usuario.merge(payload)
      await usuario.save()
      return response.ok({ message: 'Usuario actualizado correctamente', data: usuario })
    } catch (error: any) {
      return response.internalServerError({ message: 'Error al actualizar usuario', error: error.message })
    }
  }

  /**
   * @destroy
   * @summary Eliminar usuario
   * @responseBody 200 - {"message": "Usuario eliminado correctamente"}
   * @responseBody 404 - {"message": "Usuario no encontrado"}
   */
  async destroy({ params, response }: HttpContext) {
    try {
      const usuario = await Usuario.findOrFail(params.id)
      await usuario.delete()
      return response.ok({ message: 'Usuario eliminado correctamente' })
    } catch (error: any) {
      return response.internalServerError({ message: 'Error al eliminar usuario', error: error.message })
    }
  }
}
