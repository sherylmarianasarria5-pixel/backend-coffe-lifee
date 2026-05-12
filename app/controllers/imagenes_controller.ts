import type { HttpContext } from '@adonisjs/core/http'
import Imagene from '#models/imagene'
import app from '@adonisjs/core/services/app'
import { subirImagen } from '#services/cloudinary_service'

export default class ImagenesController {
  // GET /imagenes?page=1&limit=10&id_monitoreo=2
  async index({ request, response }: HttpContext) {
    try {
      const page        = Number(request.input('page', 1))
      const limit       = Number(request.input('limit', 10))
      const idMonitoreo = request.input('id_monitoreo')

      const query = Imagene.query()
        .preload('monitoreo')
        .orderBy('created_at', 'desc')

      if (idMonitoreo) query.where('id_monitoreo', idMonitoreo)

      const imagenes = await query.paginate(page, limit)
      return response.ok(imagenes)
    } catch (error: any) {
      return response.internalServerError({
        message: 'Error al obtener imágenes',
        error: error.message,
      })
    }
  }

  // POST /imagenes  (multipart/form-data con campo "imagen" + "id_monitoreo")
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
        return response.badRequest({
          message: 'Archivo inválido',
          errors: archivo.errors,
        })
      }

      const idMonitoreo = request.input('id_monitoreo')
      const descripcion = request.input('descripcion', null)

      if (!idMonitoreo) {
        return response.badRequest({ message: 'id_monitoreo es obligatorio' })
      }

      // Mover a carpeta temporal y subir a Cloudinary
      await archivo.move(app.tmpPath('uploads'))
      const urlImagen = await subirImagen(archivo.filePath!)

      const imagen = await Imagene.create({
        idMonitoreo: idMonitoreo,
        urlImagen:   urlImagen,
        descripcion: descripcion,
      })

      return response.created({
        message: 'Imagen subida correctamente',
        data: imagen,
      })
    } catch (error: any) {
      return response.internalServerError({
        message: 'Error al subir imagen',
        error: error.message,
      })
    }
  }

  // GET /imagenes/:id
  async show({ params, response }: HttpContext) {
    try {
      const imagen = await Imagene.query()
        .where('id_imagen', params.id)
        .preload('monitoreo')
        .firstOrFail()

      return response.ok(imagen)
    } catch {
      return response.notFound({ message: 'Imagen no encontrada' })
    }
  }

  // PUT /imagenes/:id  (solo actualiza la descripción)
  async update({ params, request, response }: HttpContext) {
    try {
      const imagen = await Imagene.findOrFail(params.id)
      const descripcion = request.input('descripcion')

      if (descripcion !== undefined) imagen.descripcion = descripcion

      await imagen.save()
      return response.ok({ message: 'Imagen actualizada correctamente', data: imagen })
    } catch (error: any) {
      return response.internalServerError({
        message: 'Error al actualizar imagen',
        error: error.message,
      })
    }
  }

  // DELETE /imagenes/:id
  async destroy({ params, response }: HttpContext) {
    try {
      const imagen = await Imagene.findOrFail(params.id)
      await imagen.delete()
      return response.ok({ message: 'Imagen eliminada correctamente' })
    } catch (error: any) {
      return response.internalServerError({
        message: 'Error al eliminar imagen',
        error: error.message,
      })
    }
  }
}
