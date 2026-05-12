import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'
import jwt from 'jsonwebtoken'
import env from '#start/env'

export default class RoleMiddleware {
  async handle({ request, response }: HttpContext, next: NextFn, rolesPermitidos: string[] = []) {
    const authHeader = request.header('Authorization')

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return response.unauthorized({ message: 'Token no proporcionado' })
    }

    const token = authHeader.replace('Bearer ', '')
    let payload: any

    try {
      payload = jwt.verify(token, env.get('JWT_SECRET'))
    } catch {
      return response.unauthorized({ message: 'Token inválido o expirado' })
    }

    // El rol viene del JWT como: { rol: { nombreRol: 'administrador' } }
    const nombreRol: string = payload?.rol?.nombreRol ?? payload?.rol?.nombre_rol ?? ''

    if (rolesPermitidos.length > 0 && !rolesPermitidos.includes(nombreRol)) {
      return response.forbidden({
        message: `Acceso denegado. Se requiere: ${rolesPermitidos.join(', ')}`,
        tuRol: nombreRol,
      })
    }

    ;(request as any).usuarioJwt = payload
    return next()
  }
}
