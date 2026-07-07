import type { HttpContext } from '@adonisjs/core/http'
import Cultivo from '#models/cultivo'
import app from '@adonisjs/core/services/app'
import { subirImagen } from '#services/cloudinary_service'
import { cultivoStoreValidator, cultivoUpdateValidator } from '#validators/validators'

export default class CultivosController {
  /**
   * @index
   * @summary Listar cultivos
   * @responseBody 200 - {"data": [{"idCultivo": 1, "nombreCultivo": "Cultivo Principal", "tipoCultivo": "Cafe", "finca": {"nombreFinca": "Finca El Paraíso"}}]}
   */
  async index({ request, response }: HttpContext) {
    try {
      const page = Number(request.input('page', 1))
      const limit = Number(request.input('limit', 10))
      const idFinca = request.input('id_finca')
      const idEstadoCultivo = request.input('id_estado_cultivo')
      const idUsuario = request.input('id_usuario')
      const tipoCultivo = request.input('tipo_cultivo')
      const search = request.input('search', '')
      const query = Cultivo.query()
      if (search) {
        query.whereILike('nombre_cultivo', `%${search}%`)
      }
      if (idFinca) {
        query.where('id_finca', idFinca)
      }
      if (idEstadoCultivo) {
        query.where('id_estado_cultivo', idEstadoCultivo)
      }
      if (idUsuario) {
        query.where('id_usuario', idUsuario)
      }
      if (tipoCultivo) {
        query.where('tipo_cultivo', tipoCultivo)
      }
      const ALLOWED = [
        'id_cultivo',
        'nombre_cultivo',
        'tipo_cultivo',
        'created_at',
        'updated_at',
        'id_finca',
        'id_estado',
      ]
      const orderBy = request.input('order_by', 'id_cultivo')
      const orderDir = request.input('order_dir', 'desc')
      const safeColumn = ALLOWED.includes(orderBy) ? orderBy : 'id_cultivo'
      query.orderBy(safeColumn, orderDir === 'asc' ? 'asc' : 'desc')

      const cultivos = await query.paginate(page, limit)
      return response.ok(cultivos)
    } catch (error: any) {
      return response.internalServerError({
        message: 'Error al obtener cultivos',
        error: error.message,
      })
    }
  }

  /**
   * @store
   * @summary Crear cultivo
   * @requestBody {"id_finca": 1, "nombre_cultivo": "Cultivo Principal", "tipo_cultivo": "Cafe", "id_estado_cultivo": 1}
   * @responseBody 201 - {"message": "Cultivo creado correctamente", "data": {"idCultivo": 1}}
   * @responseBody 422 - {"message": "Error de validación"}
   */
  async store({ request, response }: HttpContext) {
    try {
      const data = await request.validateUsing(cultivoStoreValidator)

      const cultivo = await Cultivo.create({
        idFinca: data.id_finca,
        nombreCultivo: data.nombre_cultivo,
        tipoCultivo: data.tipo_cultivo,
        idEstadoCultivo: data.id_estado_cultivo ?? null,
        numeroArboles: data.numero_arboles ?? 0,
      })

      await cultivo.load('finca')
      await cultivo.load('estadoCultivo')

      return response.created({ message: 'Cultivo creado correctamente', data: cultivo })
    } catch (error: any) {
      if (error.code === 'E_VALIDATION_ERROR') {
        return response.unprocessableEntity({
          message: 'Error de validación',
          errors: error.messages,
        })
      }
      return response.internalServerError({
        message: 'Error al crear cultivo',
        error: error.message,
      })
    }
  }

  /**
   * @show
   * @summary Ver cultivo por ID
   * @responseBody 200 - {"idCultivo": 1, "nombreCultivo": "Cultivo Principal", "tipoCultivo": "Cafe"}
   * @responseBody 404 - {"message": "Cultivo no encontrado"}
   */
  async show({ params, response }: HttpContext) {
    try {
      const cultivo = await Cultivo.query()
        .where('id_cultivo', params.id)
        .preload('finca')
        .preload('estadoCultivo')
        .firstOrFail()
      return response.ok(cultivo)
    } catch {
      return response.notFound({ message: 'Cultivo no encontrado' })
    }
  }

  /**
   * @update
   * @summary Actualizar cultivo
   * @requestBody {"nombre_cultivo": "Cultivo Actualizado", "tipo_cultivo": "Cafe", "id_estado_cultivo": 2}
   * @responseBody 200 - {"message": "Cultivo actualizado correctamente"}
   * @responseBody 422 - {"message": "Error de validación"}
   */
  async update({ params, request, response }: HttpContext) {
    try {
      const cultivo = await Cultivo.findOrFail(params.id)
      const data = await request.validateUsing(cultivoUpdateValidator)

      const payload: Record<string, any> = {}
      if (data.nombre_cultivo !== undefined) payload.nombreCultivo = data.nombre_cultivo
      if (data.tipo_cultivo !== undefined) payload.tipoCultivo = data.tipo_cultivo
      if (data.id_estado_cultivo !== undefined) payload.idEstadoCultivo = data.id_estado_cultivo
      if (data.numero_arboles !== undefined) payload.numeroArboles = data.numero_arboles

      cultivo.merge(payload)
      await cultivo.save()
      await cultivo.load('finca')
      await cultivo.load('estadoCultivo')

      return response.ok({ message: 'Cultivo actualizado correctamente', data: cultivo })
    } catch (error: any) {
      if (error.code === 'E_VALIDATION_ERROR') {
        return response.unprocessableEntity({
          message: 'Error de validación',
          errors: error.messages,
        })
      }
      return response.internalServerError({
        message: 'Error al actualizar cultivo',
        error: error.message,
      })
    }
  }

  /**
   * @uploadPhoto
   * @summary Subir foto del cultivo
   * @responseBody 200 - {"message": "Foto subida correctamente", "data": {"fotoUrl": "https://..."}}
   * @responseBody 404 - {"message": "Cultivo no encontrado"}
   */
  async uploadPhoto({ params, request, response }: HttpContext) {
    try {
      const cultivo = await Cultivo.findOrFail(params.id)

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

      cultivo.fotoUrl = urlImagen
      await cultivo.save()

      return response.ok({ message: 'Foto subida correctamente', data: { fotoUrl: urlImagen } })
    } catch (error: any) {
      if (error.code === 'E_ROW_NOT_FOUND') {
        return response.notFound({ message: 'Cultivo no encontrado' })
      }
      return response.internalServerError({ message: 'Error al subir foto', error: error.message })
    }
  }

  /**
   * @destroy
   * @summary Eliminar cultivo
   * @responseBody 200 - {"message": "Cultivo eliminado correctamente"}
   * @responseBody 404 - {"message": "Cultivo no encontrado"}
   */
  async destroy({ params, response }: HttpContext) {
    try {
      const cultivo = await Cultivo.findOrFail(params.id)
      await cultivo.delete()
      return response.ok({ message: 'Cultivo eliminado correctamente' })
    } catch (error: any) {
      return response.internalServerError({
        message: 'Error al eliminar cultivo',
        error: error.message,
      })
    }
  }
}
