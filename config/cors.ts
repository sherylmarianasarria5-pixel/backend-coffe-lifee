import app from '@adonisjs/core/services/app'
import env from '#start/env'
import { defineConfig } from '@adonisjs/cors'

const corsOriginRaw = env.get('CORS_ORIGIN')

let originConfig: boolean | string[]
if (app.inDev) {
  originConfig = true
} else if (corsOriginRaw) {
  originConfig = corsOriginRaw.split(',').map((o) => o.trim())
} else {
  console.warn(
    '[CORS] CORS_ORIGIN no está configurada. En producción se recomienda definirla como una lista separada por comas. Ej: https://app.com,https://admin.com'
  )
  originConfig = true
}

const corsConfig = defineConfig({
  enabled: true,
  origin: originConfig,
  methods: ['GET', 'HEAD', 'POST', 'PUT', 'PATCH', 'DELETE'],
  headers: true,
  exposeHeaders: [],
  credentials: true,
  maxAge: 90,
})

export default corsConfig
