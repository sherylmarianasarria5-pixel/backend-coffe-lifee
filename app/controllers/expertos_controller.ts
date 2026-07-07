import type { HttpContext } from '@adonisjs/core/http'
import Usuario from '#models/usuario'
import CatRol from '#models/cat_rol'

export default class ExpertosController {
  /**
   * @index
   * @summary Listar todos los expertos
   * @description Retorna todos los usuarios con rol de experto
   * @responseBody 200 - {"data": [{"idUsuario": 5, "nombre": "Juan", "apellido": "Pérez", "correo": "juan@gmail.com", "telefono": "3001234567", "rol": {"nombreRol": "experto"}}]}
   * @responseBody 500 - {"message": "Error al obtener expertos", "error": "string"}
   */
  async index({ request, response }: HttpContext) {
    try {
      const page = Number(request.input('page', 1))
      const limit = Number(request.input('limit', 10))
      const search = request.input('search', '')
      const activo = request.input('activo')

      const query = Usuario.query()
        .whereHas('rol', (query: any) => {
          query.whereRaw('LOWER(TRIM(nombre_rol)) = ?', ['experto'])
        })
        .preload('rol')

      if (search) {
        query.where((q) => {
          q.whereILike('nombre', `%${search}%`)
            .orWhereILike('apellido', `%${search}%`)
            .orWhereILike('correo', `%${search}%`)
        })
      }
      if (activo !== undefined && activo !== '')
        query.where('activo', activo === 'true' || activo === '1')

      const ALLOWED = [
        'id_usuario',
        'nombre',
        'apellido',
        'correo',
        'telefono',
        'activo',
        'fecha_registro',
        'fecha_actualizacion',
      ]
      const orderBy = request.input('order_by', 'id_usuario')
      const orderDir = request.input('order_dir', 'desc')
      const safeColumn = ALLOWED.includes(orderBy) ? orderBy : 'id_usuario'
      query.orderBy(safeColumn, orderDir === 'asc' ? 'asc' : 'desc')

      const usuarios = await query.paginate(page, limit)
      return response.ok(usuarios.toJSON())
    } catch (error: any) {
      return response.internalServerError({
        message: 'Error al obtener expertos',
        error: error.message,
      })
    }
  }

  /**
   * @store
   * @summary Crear un nuevo experto
   * @description Crea un usuario con rol de experto automáticamente. Solo el admin puede hacer esto.
   * @requestBody {"nombre": "Juan", "apellido": "Pérez", "correo": "juan@gmail.com", "telefono": "3001234567", "password": "123456", "observaciones": "Experto en café arábica"}
   * @responseBody 201 - {"message": "Experto creado correctamente", "data": {"idUsuario": 5, "nombre": "Juan", "rol": "experto"}}
   * @responseBody 400 - {"message": "El correo ya existe"}
   * @responseBody 500 - {"message": "Error al crear experto", "error": "string"}
   */
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

      if (!data.nombre) return response.badRequest({ message: 'El nombre es obligatorio' })
      if (!data.apellido) return response.badRequest({ message: 'El apellido es obligatorio' })
      if (!data.correo) return response.badRequest({ message: 'El correo es obligatorio' })
      if (!data.password) return response.badRequest({ message: 'La contraseña es obligatoria' })

      const existe = await Usuario.findBy('correo', data.correo)
      if (existe) return response.badRequest({ message: 'El correo ya existe' })

      const rolExperto = await CatRol.query()
        .whereRaw('LOWER(TRIM(nombre_rol)) = ?', ['experto'])
        .firstOrFail()

      const usuario = await Usuario.create({
        nombre: data.nombre,
        apellido: data.apellido,
        correo: data.correo,
        telefono: data.telefono ?? null,
        passwordHash: data.password,
        observaciones: data.observaciones ?? null,
        activo: data.activo ?? true,
        idRol: rolExperto.idRol,
      })

      await usuario.load('rol')

      return response.created({
        message: 'Experto creado correctamente',
        data: {
          idUsuario: usuario.idUsuario,
          nombre: usuario.nombre,
          apellido: usuario.apellido,
          correo: usuario.correo,
          telefono: usuario.telefono,
          rol: usuario.rol.nombreRol,
        },
      })
    } catch (error: any) {
      return response.internalServerError({
        message: 'Error al crear experto',
        error: error.message,
      })
    }
  }

  /**
   * @show
   * @summary Obtener un experto por ID
   * @paramPath id - ID del experto - @type(number) @required
   * @responseBody 200 - {"data": {"idUsuario": 5, "nombre": "Juan", "rol": {"nombreRol": "experto"}}}
   * @responseBody 404 - {"message": "Experto no encontrado"}
   */
  async show({ params, response }: HttpContext) {
    try {
      const usuario = await Usuario.query()
        .where('id_usuario', params.id)
        .whereHas('rol', (query: any) => {
          query.whereRaw('LOWER(TRIM(nombre_rol)) = ?', ['experto'])
        })
        .preload('rol')
        .firstOrFail()
      return response.ok({ data: usuario })
    } catch {
      return response.notFound({ message: 'Experto no encontrado' })
    }
  }

  /**
   * @update
   * @summary Actualizar un experto
   * @paramPath id - ID del experto - @type(number) @required
   * @requestBody {"nombre": "Juan", "apellido": "Pérez", "correo": "juan@gmail.com", "telefono": "3001234567", "password": "nuevaPassword123", "activo": true}
   * @responseBody 200 - {"message": "Experto actualizado correctamente", "data": {"idUsuario": 5, "rol": "experto"}}
   * @responseBody 400 - {"message": "El correo ya está en uso"}
   * @responseBody 404 - {"message": "Experto no encontrado"}
   */
  async update({ params, request, response }: HttpContext) {
    try {
      const usuario = await Usuario.query()
        .where('id_usuario', params.id)
        .whereHas('rol', (query: any) => {
          query.whereRaw('LOWER(TRIM(nombre_rol)) = ?', ['experto'])
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
      await usuario.load('rol')

      return response.ok({
        message: 'Experto actualizado correctamente',
        data: {
          idUsuario: usuario.idUsuario,
          nombre: usuario.nombre,
          apellido: usuario.apellido,
          correo: usuario.correo,
          telefono: usuario.telefono,
          rol: usuario.rol.nombreRol,
        },
      })
    } catch (error: any) {
      return response.internalServerError({
        message: 'Error al actualizar experto',
        error: error.message,
      })
    }
  }

  /**
   * @destroy
   * @summary Eliminar un experto
   * @paramPath id - ID del experto - @type(number) @required
   * @responseBody 200 - {"message": "Experto eliminado correctamente"}
   * @responseBody 404 - {"message": "Experto no encontrado"}
   */
  async destroy({ params, response }: HttpContext) {
    try {
      const usuario = await Usuario.query()
        .where('id_usuario', params.id)
        .whereHas('rol', (query: any) => {
          query.whereRaw('LOWER(TRIM(nombre_rol)) = ?', ['experto'])
        })
        .firstOrFail()
      await usuario.delete()
      return response.ok({ message: 'Experto eliminado correctamente' })
    } catch (error: any) {
      return response.internalServerError({
        message: 'Error al eliminar experto',
        error: error.message,
      })
    }
  }
}
