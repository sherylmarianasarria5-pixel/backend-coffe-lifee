// config/swagger.ts
export default {
  path: import.meta.dirname + '/../',
  title: 'Coffee Life API',
  version: '1.0.0',
  description: 'Documentación de la API Coffee Life',
  tagIndex: 2,
  ignore: ['/swagger', '/docs', '/'],
  preferredPutPatch: 'PUT',
  common: {
    parameters: {},
    headers: {},
  },
  authMiddlewares: ['auth', 'jwtAuth'],
  defaultSecurityScheme: 'BearerAuth',
  persistAuthorization: true,
  showFullPath: false,
  snakeCase: true,
}