import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'
import jwt from 'jsonwebtoken'
import env from '#start/env'

export default class JwtAuthMiddleware {
  async handle({ request, response }: HttpContext, next: NextFn) {
    const authHeader = request.header('Authorization')

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return response.unauthorized({
        message: 'Token no proporcionado. Usa: Authorization: Bearer <token>',
      })
    }

    const token = authHeader.replace('Bearer ', '')

    try {
      const payload = jwt.verify(token, env.get('JWT_SECRET'))
      ;(request as any).usuarioJwt = payload
    } catch {
      return response.unauthorized({ message: 'Token inválido o expirado' })
    }

    return next()
  }
}
