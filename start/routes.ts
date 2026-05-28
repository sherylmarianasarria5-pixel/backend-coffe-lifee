import router from '@adonisjs/core/services/router'
import { middleware } from '#start/kernel'
import AutoSwagger from 'adonis-autoswagger'
import swagger from '#config/swagger'

const AuthController = () => import('#controllers/auth_controller')
const MiPerfilController = () => import('#controllers/mi-perfil_controller')
const DashboardController = () => import('#controllers/dashboard_controller')
const UsuariosController = () => import('#controllers/usuarios_controller')
const AdminController = () => import('#controllers/admin_controller')
const CafeterosController = () => import('#controllers/cafeteros_controller')
const ExpertosController = () => import('#controllers/expertos_controller')
const MonitoreosController = () => import('#controllers/monitoreos_controller')
const CatRolesController = () => import('#controllers/cat_roles_controller')
const CultivosController = () => import('#controllers/cultivos_controller')
const FincasController = () => import('#controllers/fincas_controller')
const CategoriasController = () => import('#controllers/categorias_controller')
const CatTiposTratamientosController = () => import('#controllers/cat_tipos_tratamientos_controller')
const CatNivelesRoyasController = () => import('#controllers/cat_niveles_roya_controller')
const CatPrioridadesController = () => import('#controllers/cat_prioridades_controller')
const CatTiposRecomendacionesController = () => import('#controllers/cat_tipos_recomendaciones_controller')
const CatEstadosAnalisisController = () => import('#controllers/cat_estados_analises_controller')
const CatEstadosCultivosController = () => import('#controllers/cat_estados_cultivo_controller')
const RecomendacionTratamientosController = () => import('#controllers/recomendacion_tratamientos_controller')
const TratamientosController = () => import('#controllers/tratamientos_controller')
const AplicacionesTratamientosController = () => import('#controllers/aplicaciones_tratamientos_controller')
const ImagenesController = () => import('#controllers/imagenes_controller')
const AnalisisIaController = () => import('#controllers/analisis_ia_controller')
const RecomendacionesController = () => import('#controllers/recomendaciones_controller')
const AsignacionesExpertosController = () => import('#controllers/asignaciones_expertos_controller')


router.get('/', async () => ({
  mensaje: 'API Coffee Life funcionando',
  version: '2.0',
}))

router.get('/swagger', async () => AutoSwagger.default.docs(router.toJSON(), swagger))
router.get('/docs', async () => AutoSwagger.default.ui('/swagger', swagger))

router.post('/login', [AuthController, 'login'])
router.post('/register', [AuthController, 'register'])
router.post('/recuperar-password', [AuthController, 'recuperarPassword'])
router.post('/verificar-token', [AuthController, 'verificarToken'])
router.post('/restablecer-password', [AuthController, 'restablecerPassword'])


router.group(() => {
  router.get('/mi-perfil', [MiPerfilController, 'show'])
  router.put('/mi-perfil', [MiPerfilController, 'update'])
  router.post('/mi-perfil/cambiar-password', [MiPerfilController, 'cambiarPassword'])
}).use(middleware.jwtAuth())

router.group(() => {
  router.get('/cat_roles', [CatRolesController, 'index'])
  router.get('/cat_roles/:id', [CatRolesController, 'show'])
  router.get('/cat_tipos_tratamientos', [CatTiposTratamientosController, 'index'])
  router.get('/cat_tipos_tratamientos/:id', [CatTiposTratamientosController, 'show'])
  router.get('/cat_niveles_roya', [CatNivelesRoyasController, 'index'])
  router.get('/cat_niveles_roya/:id', [CatNivelesRoyasController, 'show'])
  router.get('/cat_prioridades', [CatPrioridadesController, 'index'])
  router.get('/cat_prioridades/:id', [CatPrioridadesController, 'show'])
  router.get('/cat_tipos_recomendaciones', [CatTiposRecomendacionesController, 'index'])
  router.get('/cat_tipos_recomendaciones/:id', [CatTiposRecomendacionesController, 'show'])
  router.get('/cat_estados_analisis', [CatEstadosAnalisisController, 'index'])
  router.get('/cat_estados_analisis/:id', [CatEstadosAnalisisController, 'show'])
  router.get('/cat_estados_cultivo', [CatEstadosCultivosController, 'index'])
  router.get('/cat_estados_cultivo/:id', [CatEstadosCultivosController, 'show'])
  router.get('/categorias', [CategoriasController, 'index'])
  router.get('/categorias/:id', [CategoriasController, 'show'])
}).use(middleware.jwtAuth())

// MODIFICADO: CRUD completo de asignaciones permitido para admin y experto.
// Esto permite que el experto vea y cree sus fincas asignadas desde el frontend.
router.group(() => {
  router.get('/asignaciones_expertos', [AsignacionesExpertosController, 'index'])
  router.get('/asignaciones_expertos/:id', [AsignacionesExpertosController, 'show'])
  router.post('/asignaciones_expertos', [AsignacionesExpertosController, 'store'])
  router.put('/asignaciones_expertos/:id', [AsignacionesExpertosController, 'update'])
  router.delete('/asignaciones_expertos/:id', [AsignacionesExpertosController, 'destroy'])
}).use(middleware.role(['admin', 'experto']))

router.group(() => {
  router.get('/dashboard', [DashboardController, 'index'])

  router.get('/usuarios', [UsuariosController, 'index'])
  router.post('/usuarios', [UsuariosController, 'store'])
  router.get('/usuarios/:id', [UsuariosController, 'show'])
  router.put('/usuarios/:id', [UsuariosController, 'update'])
  router.delete('/usuarios/:id', [UsuariosController, 'destroy'])

  router.get('/admins', [AdminController, 'index'])
  router.post('/admins', [AdminController, 'store'])
  router.get('/admins/:id', [AdminController, 'show'])
  router.put('/admins/:id', [AdminController, 'update'])
  router.delete('/admins/:id', [AdminController, 'destroy'])

  router.get('/expertos', [ExpertosController, 'index'])
  router.post('/expertos', [ExpertosController, 'store'])
  router.get('/expertos/:id', [ExpertosController, 'show'])
  router.put('/expertos/:id', [ExpertosController, 'update'])
  router.delete('/expertos/:id', [ExpertosController, 'destroy'])



  router.post('/cat_roles', [CatRolesController, 'store'])
  router.put('/cat_roles/:id', [CatRolesController, 'update'])
  router.delete('/cat_roles/:id', [CatRolesController, 'destroy'])
  router.post('/cat_tipos_tratamiento', [CatTiposTratamientosController, 'store'])
  router.put('/cat_tipos_tratamiento/:id', [CatTiposTratamientosController, 'update'])
  router.delete('/cat_tipos_tratamiento/:id', [CatTiposTratamientosController, 'destroy'])
  router.post('/cat_niveles_roya', [CatNivelesRoyasController, 'store'])
  router.put('/cat_niveles_roya/:id', [CatNivelesRoyasController, 'update'])
  router.delete('/cat_niveles_roya/:id', [CatNivelesRoyasController, 'destroy'])
  router.post('/cat_prioridades', [CatPrioridadesController, 'store'])
  router.put('/cat_prioridades/:id', [CatPrioridadesController, 'update'])
  router.delete('/cat_prioridades/:id', [CatPrioridadesController, 'destroy'])
  router.post('/cat_tipo_recomendacion', [CatTiposRecomendacionesController, 'store'])
  router.put('/cat_tipo_recomendacion/:id', [CatTiposRecomendacionesController, 'update'])
  router.delete('/cat_tipos_recomendacion/:id', [CatTiposRecomendacionesController, 'destroy'])
  router.post('/cat_estados_analisis', [CatEstadosAnalisisController, 'store'])
  router.put('/cat_estados_analisis/:id', [CatEstadosAnalisisController, 'update'])
  router.delete('/cat_estados_analisis/:id', [CatEstadosAnalisisController, 'destroy'])
  router.post('/cat_estados_cultivo', [CatEstadosCultivosController, 'store'])
  router.put('/cat_estados_cultivo/:id', [CatEstadosCultivosController, 'update'])
  router.delete('/cat_estados_cultivo/:id', [CatEstadosCultivosController, 'destroy'])
  router.post('/categorias', [CategoriasController, 'store'])
  router.put('/categorias/:id', [CategoriasController, 'update'])
  router.delete('/categorias/:id', [CategoriasController, 'destroy'])
}).use(middleware.role(['admin']))

router.group(() => {
  router.get('/cafeteros', [CafeterosController, 'index'])
  router.get('/cafeteros/:id', [CafeterosController, 'show'])

  router.post('/monitoreos', [MonitoreosController, 'store'])
  router.put('/monitoreos/:id', [MonitoreosController, 'update'])
  router.delete('/monitoreos/:id', [MonitoreosController, 'destroy'])

  router.post('/analisis_ia', [AnalisisIaController, 'store'])
  router.put('/analisis_ia/:id', [AnalisisIaController, 'update'])
  router.delete('/analisis_ia/:id', [AnalisisIaController, 'destroy'])

  router.post('/recomendaciones', [RecomendacionesController, 'store'])
  router.put('/recomendaciones/:id', [RecomendacionesController, 'update'])
  router.delete('/recomendaciones/:id', [RecomendacionesController, 'destroy'])

  router.post('/tratamientos', [TratamientosController, 'store'])
  router.put('/tratamientos/:id', [TratamientosController, 'update'])
  router.delete('/tratamientos/:id', [TratamientosController, 'destroy'])

  router.post('/aplicaciones_tratamientos', [AplicacionesTratamientosController, 'store'])
  router.put('/aplicaciones_tratamientos/:id', [AplicacionesTratamientosController, 'update'])
  router.delete('/aplicaciones_tratamientos/:id', [AplicacionesTratamientosController, 'destroy'])

  router.post('/recomendacion_tratamientos', [RecomendacionTratamientosController, 'store'])
  router.put('/recomendacion_tratamientos/:id', [RecomendacionTratamientosController, 'update'])
  router.delete('/recomendacion_tratamientos/:id', [RecomendacionTratamientosController, 'destroy'])

  router.put('/imagenes/:id', [ImagenesController, 'update'])
  router.delete('/imagenes/:id', [ImagenesController, 'destroy'])
}).use(middleware.role(['admin', 'experto']))

router.group(() => {
  router.post('/cafeteros', [CafeterosController, 'store'])
  router.put('/cafeteros/:id', [CafeterosController, 'update'])
  router.delete('/cafeteros/:id', [CafeterosController, 'destroy'])

  router.get('/fincas', [FincasController, 'index'])
  router.post('/fincas', [FincasController, 'store'])
  router.get('/fincas/:id', [FincasController, 'show'])
  router.put('/fincas/:id', [FincasController, 'update'])
  router.delete('/fincas/:id', [FincasController, 'destroy'])

  router.get('/cultivos', [CultivosController, 'index'])
  router.post('/cultivos', [CultivosController, 'store'])
  router.get('/cultivos/:id', [CultivosController, 'show'])
  router.put('/cultivos/:id', [CultivosController, 'update'])
  router.delete('/cultivos/:id', [CultivosController, 'destroy'])

  router.get('/monitoreos', [MonitoreosController, 'index'])
  router.get('/monitoreos/:id', [MonitoreosController, 'show'])

  router.get('/analisis_ia', [AnalisisIaController, 'index'])
  router.get('/analisis_ia/:id', [AnalisisIaController, 'show'])

  router.get('/recomendaciones', [RecomendacionesController, 'index'])
  router.get('/recomendaciones/:id', [RecomendacionesController, 'show'])

  router.get('/tratamientos', [TratamientosController, 'index'])
  router.get('/tratamientos/:id', [TratamientosController, 'show'])
  router.get('/aplicaciones_tratamientos', [AplicacionesTratamientosController, 'index'])
  router.get('/aplicaciones_tratamientos/:id', [AplicacionesTratamientosController, 'show'])
  router.get('/recomendacion_tratamientos', [RecomendacionTratamientosController, 'index'])
  router.get('/recomendacion_tratamientos/:id', [RecomendacionTratamientosController, 'show'])

  router.get('/imagenes', [ImagenesController, 'index'])
  router.get('/imagenes/:id', [ImagenesController, 'show'])
  router.post('/imagenes', [ImagenesController, 'store'])
}).use(middleware.role(['admin', 'experto', 'cafetero']))