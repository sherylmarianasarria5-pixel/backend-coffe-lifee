import type { HttpContext } from '@adonisjs/core/http'
import Finca from '#models/finca'
import app from '@adonisjs/core/services/app'
import { subirImagen } from '#services/cloudinary_service'
import { fincaStoreValidator, fincaUpdateValidator } from '#validators/validators'


export default class FincasController {
  private toDecimalString(value: number | undefined) {
    return value === undefined ? null : String(value)
  }

  /**
   * @index
   * @summary Listar fincas
   * @responseBody 200 - {"data": [{"idFinca": 1, "nombreFinca": "Finca El Paraíso", "municipio": "Pitalito", "departamento": "Huila"}]}
   */
  async index({ request, response }: HttpContext) {
    try {
      const page      = Number(request.input('page', 1))
      const limit     = Number(request.input('limit', 10))
      const search    = request.input('search', '')
      const payload = (request as any).usuarioJwt
      const query = Finca.query()
      if (payload.rol?.nombreRol !== 'admin') {
        query.where('id_usuario', payload.id)
      }
      if (search) {
        query.whereILike('nombre_finca', `%${search}%`)
      }
      const ALLOWED = ['id_finca', 'nombre_finca', 'municipio', 'departamento', 'area_hectareas', 'altitud_msnm', 'latitud', 'longitud', 'id_usuario', 'activo', 'fecha_registro', 'fecha_actualizacion']
      const orderBy = request.input('order_by', 'id_finca')
      const orderDir = request.input('order_dir', 'desc')
      const safeColumn = ALLOWED.includes(orderBy) ? orderBy : 'id_finca'
      query.orderBy(safeColumn, orderDir === 'asc' ? 'asc' : 'desc')
      query.preload('usuario')

      const paginado = await query.paginate(page, limit)
      const json = paginado.toJSON()
      json.data = paginado.all().map((f: any) => ({
        idFinca:           f.idFinca,
        nombreFinca:       f.nombreFinca,
        municipio:         f.municipio,
        departamento:      f.departamento,
        latitud:           f.latitud,
        longitud:          f.longitud,
        altitudMsnm:       f.altitudMsnm,
        areaHectareas:     f.areaHectareas,
        fotoUrl:           f.fotoUrl,
        activo:            f.activo,
        fechaRegistro:     f.fechaRegistro,
        fechaActualizacion: f.fechaActualizacion,
        idUsuario:         f.idUsuario,
        usuario: f.usuario ? {
          idUsuario: f.usuario.idUsuario,
          nombre:    f.usuario.nombre,
          apellido:  f.usuario.apellido,
          correo:    f.usuario.correo,
          rol:       f.usuario.idRol === 3 ? 'cafetero' : f.usuario.idRol === 2 ? 'experto' : 'admin',
        } : null,
      }))
      return response.ok(json)
    } catch (error: any) {
      return response.internalServerError({ message: 'Error al obtener fincas', error: error.message })
    }
  }

  /**
   * @store
   * @summary Crear finca
   * @requestBody {"id_usuario": 1, "nombre_finca": "Finca El Paraíso", "municipio": "Pitalito", "departamento": "Huila", "latitud": 1.85, "longitud": -76.05, "altitud_msnm": 1800, "area_hectareas": 10}
   * @responseBody 201 - {"message": "Finca creada correctamente", "data": {"idFinca": 1}}
   * @responseBody 422 - {"message": "Error de validación"}
   */
  async store({ request, response }: HttpContext) {
    try {
      const data = await request.validateUsing(fincaStoreValidator)
      const finca = await Finca.create({
        idUsuario:     data.id_usuario,
        nombreFinca:   data.nombre_finca,
        municipio:     data.municipio     ?? '',
        departamento:  data.departamento  ?? '',
        latitud:       this.toDecimalString(data.latitud),
        longitud:      this.toDecimalString(data.longitud),
        altitudMsnm:   this.toDecimalString(data.altitud_msnm),
        areaHectareas: this.toDecimalString(data.area_hectareas),
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

  /**
   * @show
   * @summary Ver finca por ID
   * @responseBody 200 - {"idFinca": 1, "nombreFinca": "Finca El Paraíso", "cultivos": []}
   * @responseBody 404 - {"message": "Finca no encontrada"}
   */
  async show({ params, response }: HttpContext) {
    try {
      const finca = await Finca.query()
        .where('id_finca', params.id)
        .preload('usuario', (query) => query.preload('rol'))
        .preload('cultivos')
        .firstOrFail()
      return response.ok(finca)
    } catch {
      return response.notFound({ message: 'Finca no encontrada' })
    }
  }

  /**
   * @update
   * @summary Actualizar finca
   * @requestBody {"nombre_finca": "Nueva Finca", "municipio": "San Agustín", "departamento": "Huila", "latitud": 1.90, "longitud": -76.10, "altitud_msnm": 2000, "area_hectareas": 15}
   * @responseBody 200 - {"message": "Finca actualizada correctamente"}
   * @responseBody 422 - {"message": "Error de validación"}
   */
  async update({ params, request, response }: HttpContext) {
    try {
      const finca = await Finca.findOrFail(params.id)
      const data  = await request.validateUsing(fincaUpdateValidator)

      const payload: Record<string, any> = {}
      if (data.id_usuario     !== undefined) payload.idUsuario     = data.id_usuario
      if (data.nombre_finca   !== undefined) payload.nombreFinca   = data.nombre_finca
      if (data.municipio      !== undefined) payload.municipio     = data.municipio
      if (data.departamento   !== undefined) payload.departamento  = data.departamento
      if (data.latitud        !== undefined) payload.latitud       = String(data.latitud)
      if (data.longitud       !== undefined) payload.longitud      = String(data.longitud)
      if (data.altitud_msnm   !== undefined) payload.altitudMsnm   = String(data.altitud_msnm)
      if (data.area_hectareas !== undefined) payload.areaHectareas = String(data.area_hectareas)
      if (data.activo !== undefined) payload.activo = data.activo

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

  /**
   * @uploadPhoto
   * @summary Subir foto de la finca
   * @responseBody 200 - {"message": "Foto subida correctamente", "data": {"fotoUrl": "https://..."}}
   * @responseBody 404 - {"message": "Finca no encontrada"}
   */
  async uploadPhoto({ params, request, response }: HttpContext) {
    try {
      const finca = await Finca.findOrFail(params.id)

      const archivo = request.file('imagen', {
        size: '10mb',
        extnames: ['jpg', 'jpeg', 'png', 'webp'],
      })

      if (!archivo) {
        return response.badRequest({ message: 'Debes enviar un archivo con el campo "imagen"' })
      }
      if (!archivo.isValid) {
        return response.badRequest({ message: 'Archivo inválido', errors: archivo.errors })
      }

      await archivo.move(app.tmpPath('uploads'))
      const urlImagen = await subirImagen(archivo.filePath!)

      finca.fotoUrl = urlImagen
      await finca.save()

      return response.ok({ message: 'Foto subida correctamente', data: { fotoUrl: urlImagen } })
    } catch (error: any) {
      if (error.code === 'E_ROW_NOT_FOUND') {
        return response.notFound({ message: 'Finca no encontrada' })
      }
      return response.internalServerError({ message: 'Error al subir foto', error: error.message })
    }
  }

  /**
   * @destroy
   * @summary Eliminar finca
   * @responseBody 200 - {"message": "Finca eliminada correctamente"}
   * @responseBody 404 - {"message": "Finca no encontrada"}
   */
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
