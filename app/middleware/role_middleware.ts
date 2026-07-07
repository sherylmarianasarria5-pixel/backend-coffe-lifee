import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'
import jwt from 'jsonwebtoken'
import env from '#start/env'

export default class RoleMiddleware {
  /**
   * @middleware
   * @summary Middleware de validación de roles
   * @description Valida el token JWT y verifica que el usuario tenga el rol requerido.
   * Normaliza mayúsculas y espacios para evitar errores de comparación.
   * El token debe enviarse en el header Authorization: Bearer <token>
   *
   * Roles disponibles: admin, experto, cafetero
   *
   * @responseBody 401 - {"message": "Token no proporcionado"}
   * @responseBody 401 - {"message": "Token inválido o expirado"}
   * @responseBody 403 - {"message": "Acceso denegado. Se requiere: admin", "tuRol": "experto"}
   */
  async handle({ request, response }: HttpContext, next: NextFn, rolesPermitidos: string[] = []) {
    const authHeader = request.header('Authorization')

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return response.unauthorized({
        message: 'Token no proporcionado',
      })
    }

    const token = authHeader.replace('Bearer ', '')
    let payload: any

    try {
      payload = jwt.verify(token, env.get('JWT_SECRET'))
    } catch {
      return response.unauthorized({
        message: 'Token inválido o expirado',
      })
    }

    // Normaliza el rol del token (quita espacios y convierte a minúsculas)
    const nombreRol: string = (payload?.rol?.nombreRol ?? payload?.rol?.nombre_rol ?? '')
      .toLowerCase()
      .trim()

    // Normaliza los roles permitidos de la ruta
    const rolesNormalizados = rolesPermitidos.map((r) => r.toLowerCase().trim())

    if (rolesNormalizados.length > 0 && !rolesNormalizados.includes(nombreRol)) {
      return response.forbidden({
        message: `Acceso denegado. Se requiere: ${rolesPermitidos.join(', ')}`,
        tuRol: nombreRol,
      })
    }

    // Guarda el payload del JWT en el request para usarlo en los controllers
    ;(request as any).usuarioJwt = payload

    return next()
  }
}
