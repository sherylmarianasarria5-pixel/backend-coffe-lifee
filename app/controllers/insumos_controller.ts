import type { HttpContext } from '@adonisjs/core/http'
import Insumo from '#models/insumo'

export default class InsumosController {
  async index({ request, response }: HttpContext) {
    try {
      const page = Number(request.input('page', 1))
      const limit = Number(request.input('limit', 10))
      const search = request.input('search', '')
      const idTipo = request.input('id_tipo_insumo')
      const query = Insumo.query()
      if (search) {
        query.whereILike('nombre', `%${search}%`)
      }
      if (idTipo) {
        query.where('id_tipo_insumo', idTipo)
      }
      const ALLOWED = ['id_insumo', 'nombre', 'fecha_registro', 'fecha_actualizacion']
      const orderBy = request.input('order_by', 'id_insumo')
      const orderDir = request.input('order_dir', 'desc')
      const safeColumn = ALLOWED.includes(orderBy) ? orderBy : 'id_insumo'
      query.orderBy(safeColumn, orderDir === 'asc' ? 'asc' : 'desc')

      const insumos = await query.paginate(page, limit)
      return response.ok(insumos)
    } catch (error: any) {
      return response.internalServerError({
        message: 'Error al obtener insumos',
        error: error.message,
      })
    }
  }

  async show({ params, response }: HttpContext) {
    try {
      const insumo = await Insumo.query()
        .where('id_insumo', params.id)
        .preload('tipoInsumo')
        .firstOrFail()
      return response.ok(insumo)
    } catch {
      return response.notFound({ message: 'Insumo no encontrado' })
    }
  }

  async store({ request, response }: HttpContext) {
    try {
      const data = request.only(['id_tipo_insumo', 'nombre', 'descripcion'])

      if (!data.nombre) {
        return response.badRequest({ message: 'El nombre es obligatorio' })
      }

      const existe = await Insumo.query().whereILike('nombre', data.nombre.trim()).first()

      if (existe) {
        return response.conflict({
          message: `Ya existe un insumo con el nombre "${data.nombre}". Usa uno diferente o edita el existente.`,
          data: {
            idInsumo: existe.idInsumo,
            nombre: existe.nombre,
            descripcion: existe.descripcion,
          },
        })
      }

      const insumo = await Insumo.create({
        idTipoInsumo: data.id_tipo_insumo ?? null,
        nombre: data.nombre,
        descripcion: data.descripcion ?? null,
      })

      await insumo.load('tipoInsumo')

      return response.created({
        message: 'Insumo creado correctamente',
        data: insumo,
      })
    } catch (error: any) {
      return response.internalServerError({
        message: 'Error al crear insumo',
        error: error.message,
      })
    }
  }

  async update({ params, request, response }: HttpContext) {
    try {
      const insumo = await Insumo.findOrFail(params.id)

      const data = request.only(['id_tipo_insumo', 'nombre', 'descripcion'])

      const payload: Record<string, any> = {}
      if (data.id_tipo_insumo !== undefined) payload.idTipoInsumo = data.id_tipo_insumo
      if (data.nombre !== undefined) payload.nombre = data.nombre
      if (data.descripcion !== undefined) payload.descripcion = data.descripcion

      insumo.merge(payload)
      await insumo.save()
      await insumo.load('tipoInsumo')

      return response.ok({
        message: 'Insumo actualizado correctamente',
        data: insumo,
      })
    } catch (error: any) {
      return response.internalServerError({
        message: 'Error al actualizar insumo',
        error: error.message,
      })
    }
  }

  async destroy({ params, response }: HttpContext) {
    try {
      const insumo = await Insumo.findOrFail(params.id)
      await insumo.delete()
      return response.ok({ message: 'Insumo eliminado correctamente' })
    } catch (error: any) {
      return response.internalServerError({
        message: 'Error al eliminar insumo',
        error: error.message,
      })
    }
  }
}
