import type { HttpContext } from '@adonisjs/core/http'
import Categoria from '#models/categoria'

export default class CategoriasController {

  // =========================================
  // GET /categorias
  // =========================================
  async index({ response }: HttpContext) {
    try {

      const categorias = await Categoria.all()

      return response.ok(categorias)

    } catch (error: any) {

      return response.internalServerError({
        message: 'Error al obtener categorias',
        error: error.message,
      })
    }
  }

  // =========================================
  // POST /categorias
  // =========================================
  async store({ request, response }: HttpContext) {
    try {

      const data = request.only([
        'nombre_categoria',
        'descripcion',
      ])

      if (!data.nombre_categoria) {
        return response.badRequest({
          message: 'El nombre_categoria es obligatorio',
        })
      }

      const existe = await Categoria.findBy('nombre_categoria', data.nombre_categoria)

      if (existe) {
        return response.badRequest({
          message: 'La categoria ya existe',
        })
      }

      const categoria = await Categoria.create({
        nombreCategoria: data.nombre_categoria,
        descripcion: data.descripcion,
      })

      return response.created({
        message: 'Categoria creada correctamente',
        data: categoria,
      })

    } catch (error: any) {

      return response.internalServerError({
        message: 'Error al crear categoria',
        error: error.message,
      })
    }
  }

  // =========================================
  // GET /categorias/:id
  // =========================================
  async show({ params, response }: HttpContext) {
    try {

      const categoria = await Categoria.findOrFail(params.id)

      return response.ok(categoria)

    } catch (error: any) {

      return response.notFound({
        message: 'Categoria no encontrada',
      })
    }
  }

  // =========================================
  // PUT /categorias/:id
  // =========================================
  async update({ params, request, response }: HttpContext) {
    try {

      const categoria = await Categoria.findOrFail(params.id)

      const data = request.only([
        'nombre_categoria',
        'descripcion',
      ])

      if (data.nombre_categoria && data.nombre_categoria !== categoria.nombreCategoria) {
        const existe = await Categoria.findBy('nombre_categoria', data.nombre_categoria)
        if (existe) {
          return response.badRequest({
            message: 'Ya existe una categoria con ese nombre',
          })
        }
      }

      const payload: Record<string, any> = {}
      if (data.nombre_categoria !== undefined) payload.nombreCategoria = data.nombre_categoria
      if (data.descripcion !== undefined)      payload.descripcion = data.descripcion

      categoria.merge(payload)
      await categoria.save()

      return response.ok({
        message: 'Categoria actualizada correctamente',
        data: categoria,
      })

    } catch (error: any) {

      return response.internalServerError({
        message: 'Error al actualizar categoria',
        error: error.message,
      })
    }
  }

  // =========================================
  // DELETE /categorias/:id
  // =========================================
  async destroy({ params, response }: HttpContext) {
    try {

      const categoria = await Categoria.findOrFail(params.id)

      await categoria.delete()

      return response.ok({
        message: 'Categoria eliminada correctamente',
      })

    } catch (error: any) {

      return response.internalServerError({
        message: 'Error al eliminar categoria',
        error: error.message,
      })
    }
  }
}