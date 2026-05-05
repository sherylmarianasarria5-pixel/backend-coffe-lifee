import type { HttpContext } from '@adonisjs/core/http'
import Imagene from '#models/imagene'

export default class ImagenesController {

  async index({ response }: HttpContext) {
    try {
      const imagenes = await Imagene.query()
        .preload('monitoreo')
      return response.ok(imagenes)
    } catch (error: any) {
      return response.internalServerError({
        message: 'Error al obtener imágenes',
        error: error.message,
      })
    }
  }

  async store({ request, response }: HttpContext) {
    try {
      const data = request.only(['id_monitoreo', 'ruta_imagen'])

      if (!data.id_monitoreo) {
        return response.badRequest({ message: 'El id_monitoreo es obligatorio' })
      }

      if (!data.ruta_imagen) {
        return response.badRequest({ message: 'La ruta_imagen es obligatoria' })
      }

      const imagen = await Imagene.create({
        idMonitoreo: data.id_monitoreo,
        rutaImagen:  data.ruta_imagen,
      })

      return response.created({
        message: 'Imagen creada correctamente',
        data: imagen,
      })
    } catch (error: any) {
      return response.internalServerError({
        message: 'Error al crear imagen',
        error: error.message,
      })
    }
  }

  async show({ params, response }: HttpContext) {
    try {
      const imagen = await Imagene.query()
        .where('idImagen', params.id)
        .preload('monitoreo')
        .preload('analisis')
        .firstOrFail()
      return response.ok(imagen)
    } catch {
      return response.notFound({ message: 'Imagen no encontrada' })
    }
  }

  async update({ params, request, response }: HttpContext) {
    try {
      const imagen = await Imagene.findOrFail(params.id)
      const data = request.only(['ruta_imagen', 'id_monitoreo'])

      const payload: Record<string, any> = {}
      if (data.ruta_imagen  !== undefined) payload.rutaImagen  = data.ruta_imagen
      if (data.id_monitoreo !== undefined) payload.idMonitoreo = data.id_monitoreo

      imagen.merge(payload)
      await imagen.save()

      return response.ok({
        message: 'Imagen actualizada correctamente',
        data: imagen,
      })
    } catch (error: any) {
      return response.internalServerError({
        message: 'Error al actualizar imagen',
        error: error.message,
      })
    }
  }

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