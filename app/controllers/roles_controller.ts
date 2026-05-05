import type { HttpContext } from '@adonisjs/core/http'
import Usuario from '#models/usuario'
import CatRol from '#models/cat_rol'
import hash from '@adonisjs/core/services/hash'

export default class CafeterosController {

  // =========================================
  // GET /cafeteros
  // =========================================
  async index({ response }: HttpContext) {
    try {

      const usuarios = await Usuario.query()
        .whereHas('rol', (query: any) => {
          query.whereRaw('LOWER(TRIM(nombre_rol)) = ?', ['cafetero'])
        })
        .preload('rol')

      return response.ok(usuarios)

    } catch (error: any) {

      return response.internalServerError({
        message: 'Error al obtener cafeteros',
        error: error.message,
      })
    }
  }

  // =========================================
  // POST /cafeteros
  // =========================================
  async store({ request, response }: HttpContext) {
    try {

      const data = request.only([
        'nombre',
        'apellido',
        'correo',
        'telefono',
        'password',
        'observaciones',
        'activo',
      ])

      if (!data.nombre) {
        return response.badRequest({ message: 'El nombre es obligatorio' })
      }

      if (!data.correo) {
        return response.badRequest({ message: 'El correo es obligatorio' })
      }

      if (!data.password) {
        return response.badRequest({ message: 'La contraseña es obligatoria' })
      }

      const existe = await Usuario.findBy('correo', data.correo)

      if (existe) {
        return response.badRequest({ message: 'El correo ya existe' })
      }

      const rolCafetero = await CatRol.query()
        .whereRaw('LOWER(TRIM(nombre_rol)) = ?', ['cafetero'])
        .firstOrFail()

      const passwordHash = await hash.make(data.password)

      const usuario = await Usuario.create({
        nombre: data.nombre,
        apellido: data.apellido,
        correo: data.correo,
        telefono: data.telefono,
        passwordHash,
        observaciones: data.observaciones,
        activo: data.activo ?? true,
        idRol: rolCafetero.idRol,
      })

      return response.created({
        message: 'Cafetero creado correctamente',
        data: usuario,
      })

    } catch (error: any) {

      return response.internalServerError({
        message: 'Error al crear cafetero',
        error: error.message,
      })
    }
  }

  // =========================================
  // GET /cafeteros/:id
  // =========================================
  async show({ params, response }: HttpContext) {
    try {

      const usuario = await Usuario.query()
        .where('id_usuario', params.id)
        .whereHas('rol', (query: any) => {
          query.whereRaw('LOWER(TRIM(nombre_rol)) = ?', ['cafetero'])
        })
        .preload('rol')
        .firstOrFail()

      return response.ok(usuario)

    } catch (error: any) {

      return response.notFound({
        message: 'Cafetero no encontrado',
      })
    }
  }

  // =========================================
  // PUT /cafeteros/:id
  // =========================================
  async update({ params, request, response }: HttpContext) {
    try {

      const usuario = await Usuario.query()
        .where('id_usuario', params.id)
        .whereHas('rol', (query: any) => {
          query.whereRaw('LOWER(TRIM(nombre_rol)) = ?', ['cafetero'])
        })
        .firstOrFail()

      const data = request.only([
        'nombre',
        'apellido',
        'correo',
        'telefono',
        'password',
        'observaciones',
        'activo',
      ])

      if (data.correo && data.correo !== usuario.correo) {
        const existe = await Usuario.findBy('correo', data.correo)
        if (existe) {
          return response.badRequest({ message: 'El correo ya está en uso' })
        }
      }

      const payload: Record<string, any> = {}
      if (data.nombre !== undefined)        payload.nombre = data.nombre
      if (data.apellido !== undefined)      payload.apellido = data.apellido
      if (data.correo !== undefined)        payload.correo = data.correo
      if (data.telefono !== undefined)      payload.telefono = data.telefono
      if (data.observaciones !== undefined) payload.observaciones = data.observaciones
      if (data.activo !== undefined)        payload.activo = data.activo

      if (data.password) {
        payload.passwordHash = await hash.make(data.password)
      }

      usuario.merge(payload)
      await usuario.save()

      return response.ok({
        message: 'Cafetero actualizado correctamente',
        data: usuario,
      })

    } catch (error: any) {

      return response.internalServerError({
        message: 'Error al actualizar cafetero',
        error: error.message,
      })
    }
  }

  // =========================================
  // DELETE /cafeteros/:id
  // =========================================
  async destroy({ params, response }: HttpContext) {
    try {

      const usuario = await Usuario.query()
        .where('id_usuario', params.id)
        .whereHas('rol', (query: any) => {
          query.whereRaw('LOWER(TRIM(nombre_rol)) = ?', ['cafetero'])
        })
        .firstOrFail()

      await usuario.delete()

      return response.ok({
        message: 'Cafetero eliminado correctamente',
      })

    } catch (error: any) {

      return response.internalServerError({
        message: 'Error al eliminar cafetero',
        error: error.message,
      })
    }
  }
}