import type { HttpContext } from '@adonisjs/core/http'
import Usuario from '#models/usuario'
import CatRol from '#models/cat_rol'

export default class CafeterosController {
  /**
   * @index
   * @summary Listar cafeteros
   * @responseBody 200 - [{"idUsuario": 1, "nombre": "Juan", "correo": "juan@gmail.com", "rol": {"nombreRol": "cafetero"}}]
   */
  async index({ response }: HttpContext) {
    try {
      const usuarios = await Usuario.query()
        .whereHas('rol', (query: any) => {
          query.whereRaw('LOWER(TRIM(nombre_rol)) = ?', ['cafetero'])
        })
        .preload('rol')
      return response.ok(usuarios)
    } catch (error: any) {
      return response.internalServerError({ message:'Error al obtener cafeteros', error: error.message })
    }
  }

  /**
   * @store
   * @summary Crear cafetero
   * @requestBody {"nombre": "Juan", "apellido": "Pérez", "correo": "juan@gmail.com", "password": "123456", "telefono": "3001234567", "observaciones": "texto", "activo": true}
   * @responseBody 201 - {"message": "Cafetero creado correctamente", "data": {"idUsuario": 1}}
   * @responseBody 400 - {"message": "El correo ya existe"}
   */
  async store({ request, response }: HttpContext) {
    try {
      const data = request.only(['nombre', 'apellido', 'correo', 'telefono', 'password', 'observaciones', 'activo'])

      if (!data.nombre) return response.badRequest({ message: 'El nombre es obligatorio' })
      if (!data.correo) return response.badRequest({ message: 'El correo es obligatorio' })
      if (!data.password) return response.badRequest({ message: 'La contraseña es obligatoria' })

      const existe = await Usuario.findBy('correo', data.correo)
      if (existe) return response.badRequest({ message: 'El correo ya existe' })

      const rolCafetero = await CatRol.query()
        .whereRaw('LOWER(TRIM(nombre_rol)) = ?', ['cafetero'])
        .firstOrFail()

      const usuario = await Usuario.create({
        nombre: data.nombre,
        apellido: data.apellido,
        correo: data.correo,
        telefono: data.telefono,
        passwordHash: data.password,
        observaciones: data.observaciones,
        activo: data.activo ?? true,
        idRol: rolCafetero.idRol,
      })
      return response.created({ message: 'Cafetero creado correctamente', data: usuario })
    } catch (error: any) {
      return response.internalServerError({ message: 'Error al crear cafetero', error: error.message })
    }
  }

  /**
   * @show
   * @summary Ver cafetero por ID
   * @responseBody 200 - {"idUsuario": 1, "nombre": "Juan", "correo": "juan@gmail.com"}
   * @responseBody 404 - {"message": "Cafetero no encontrado"}
   */
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
    } catch {
      return response.notFound({ message: 'Cafetero no encontrado' })
    }
  }

  /**
   * @update
   * @summary Actualizar cafetero
   * @requestBody {"nombre": "Juan", "apellido": "Pérez", "correo": "juan@gmail.com", "telefono": "3001234567", "observaciones": "texto", "activo": true, "password": "nueva123"}
   * @responseBody 200 - {"message": "Cafetero actualizado correctamente"}
   * @responseBody 400 - {"message": "El correo ya está en uso"}
   */
  async update({ params, request, response }: HttpContext) {
    try {
      const usuario = await Usuario.query()
        .where('id_usuario', params.id)
        .whereHas('rol', (query: any) => {
          query.whereRaw('LOWER(TRIM(nombre_rol)) = ?', ['cafetero'])
        })
        .firstOrFail()

      const data = request.only(['nombre', 'apellido', 'correo', 'telefono', 'password', 'observaciones', 'activo'])

      if (data.correo && data.correo !== usuario.correo) {
        const existe = await Usuario.findBy('correo', data.correo)
        if (existe) return response.badRequest({ message: 'El correo ya está en uso' })
      }

      const payload: Record<string, any> = {}
      if (data.nombre !== undefined) payload.nombre = data.nombre
      if (data.apellido !== undefined) payload.apellido = data.apellido
      if (data.correo !== undefined) payload.correo = data.correo
      if (data.telefono !== undefined) payload.telefono = data.telefono
      if (data.observaciones !== undefined) payload.observaciones = data.observaciones
      if (data.activo !== undefined) payload.activo = data.activo
      if (data.password) payload.passwordHash = data.password

      usuario.merge(payload)
      await usuario.save()
      return response.ok({ message: 'Cafetero actualizado correctamente', data: usuario })
    } catch (error: any) {
      return response.internalServerError({ message: 'Error al actualizar cafetero', error: error.message })
    }
  }

  /**
   * @destroy
   * @summary Eliminar cafetero
   * @responseBody 200 - {"message": "Cafetero eliminado correctamente"}
   * @responseBody 404 - {"message": "Cafetero no encontrado"}
   */
  async destroy({ params, response }: HttpContext) {
    try {
      const usuario = await Usuario.query()
        .where('id_usuario', params.id)
        .whereHas('rol', (query: any) => {
          query.whereRaw('LOWER(TRIM(nombre_rol)) = ?', ['cafetero'])
        })
        .firstOrFail()
      await usuario.delete()
      return response.ok({ message: 'Cafetero eliminado correctamente' })
    } catch (error: any) {
      return response.internalServerError({ message: 'Error al eliminar cafetero', error: error.message })
    }
  }
}
