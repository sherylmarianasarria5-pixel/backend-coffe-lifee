import type { HttpContext } from '@adonisjs/core/http'
import Imagene from '#models/imagene'
import app from '@adonisjs/core/services/app'
import { subirImagen } from '#services/cloudinary_service'


export default class ImagenesController {
  async index({ request, response }: HttpContext) {
    try {
      const page = Number(request.input('page', 1))
      const limit       = Number(request.input('limit', 10))
      const idMonitoreo = request.input('id_monitoreo')
      const query = Imagene.query()
      if (idMonitoreo) {
        query.where('id_monitoreo', idMonitoreo)
      }
      const ALLOWED = ['id_imagen', 'id_monitoreo', 'ruta_imagen', 'fecha_registro', 'fecha_actualizacion']
      const orderBy = request.input('order_by', 'id_imagen')
      const orderDir = request.input('order_dir', 'desc')
      const safeColumn = ALLOWED.includes(orderBy) ? orderBy : 'id_imagen'
      query.orderBy(safeColumn, orderDir === 'asc' ? 'asc' : 'desc')

      const imagenes = await query.paginate(page, limit)
      return response.ok(imagenes)
    } catch (error: any) {
      return response.internalServerError({ message: 'Error al obtener imágenes', error: error.message })
    }
  }

  async store({ request, response }: HttpContext) {
    try {
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

      const idMonitoreo = request.input('id_monitoreo')

      if (!idMonitoreo) {
        return response.badRequest({ message: 'id_monitoreo es obligatorio' })
      }

      await archivo.move(app.tmpPath('uploads'))
      const urlImagen = await subirImagen(archivo.filePath!)

      const imagen = await Imagene.create({
        idMonitoreo,
        rutaImagen: urlImagen,
      })

      return response.created({ message: 'Imagen subida correctamente', data: imagen })
    } catch (error: any) {
      return response.internalServerError({ message: 'Error al subir imagen', error: error.message })
    }
  }

  async show({ params, response }: HttpContext) {
    try {
      const imagen = await Imagene.query()
        .where('idImagen', params.id)
        .preload('monitoreo')
        .firstOrFail()
      return response.ok(imagen)
    } catch {
      return response.notFound({ message: 'Imagen no encontrada' })
    }
  }

  async update({ params, response }: HttpContext) {
    try {
      const imagen = await Imagene.findOrFail(params.id)
      await imagen.save()
      return response.ok({ message: 'Imagen actualizada correctamente', data: imagen })
    } catch (error: any) {
      return response.internalServerError({ message: 'Error al actualizar imagen', error: error.message })
    }
  }

  async destroy({ params, response }: HttpContext) {
    try {
      const imagen = await Imagene.findOrFail(params.id)
      await imagen.delete()
      return response.ok({ message: 'Imagen eliminada correctamente' })
    } catch (error: any) {
      return response.internalServerError({ message: 'Error al eliminar imagen', error: error.message })
    }
  }
}
