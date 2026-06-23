import router from '@adonisjs/core/services/router'
import { middleware } from '#start/kernel'
import AutoSwagger from 'adonis-autoswagger'
import swagger from '#config/swagger'

const AuthController                      = () => import('#controllers/auth_controller')
const MiPerfilController                  = () => import('#controllers/mi-perfil_controller')
const DashboardController                 = () => import('#controllers/dashboard_controller')
const UsuariosController                  = () => import('#controllers/usuarios_controller')
const AdminController                     = () => import('#controllers/admin_controller')
const CafeterosController                 = () => import('#controllers/cafeteros_controller')
const ExpertosController                  = () => import('#controllers/expertos_controller')
const ExpertoController                   = () => import('#controllers/experto_controller')
const CaficultorController                = () => import('#controllers/caficultor_controller')
const MonitoreosController                = () => import('#controllers/monitoreos_controller')
const CatRolesController                  = () => import('#controllers/cat_roles_controller')
const CultivosController                  = () => import('#controllers/cultivos_controller')
const FincasController                    = () => import('#controllers/fincas_controller')
const CategoriasController                = () => import('#controllers/categorias_controller')
const CatTiposTratamientosController      = () => import('#controllers/cat_tipos_tratamientos_controller')
const CatNivelesRoyasController           = () => import('#controllers/cat_niveles_roya_controller')
const CatPrioridadesController            = () => import('#controllers/cat_prioridades_controller')
const CatTiposRecomendacionesController   = () => import('#controllers/cat_tipos_recomendaciones_controller')
const CatEstadosAnalisisController        = () => import('#controllers/cat_estados_analises_controller')
const CatEstadosCultivosController        = () => import('#controllers/cat_estados_cultivo_controller')
const TratamientosController              = () => import('#controllers/tratamientos_controller')
const AplicacionesTratamientosController  = () => import('#controllers/aplicaciones_tratamientos_controller')
const ImagenesController                  = () => import('#controllers/imagenes_controller')
const AnalisisIaController                = () => import('#controllers/analisis_ia_controller')
const RecomendacionesController           = () => import('#controllers/recomendaciones_controller')
const AsignacionesExpertosController      = () => import('#controllers/asignaciones_expertos_controller')
const CatTiposInsumosController           = () => import('#controllers/cat_tipos_insumos_controller')
const InsumosController                   = () => import('#controllers/insumos_controller')


// ─── Público ──────────────────────────────────────────────────────────────────
router.get('/', async () => ({
  mensaje: 'API Coffee Life funcionando',
  version: '2.0',
}))

router.get('/swagger', async () => AutoSwagger.default.docs(router.toJSON(), swagger))
router.get('/docs',    async () => AutoSwagger.default.ui('/swagger', swagger))

router.post('/login',                [AuthController, 'login'])
router.post('/register',             [AuthController, 'register'])
router.post('/recuperar-password',   [AuthController, 'recuperarPassword'])
router.post('/verificar-token',      [AuthController, 'verificarToken'])
router.post('/restablecer-password', [AuthController, 'restablecerPassword'])

// ─── Mi perfil (cualquier usuario autenticado) ────────────────────────────────
router.group(() => {
  router.get('/mi-perfil',                   [MiPerfilController, 'show'])
  router.put('/mi-perfil',                   [MiPerfilController, 'update'])
  router.post('/mi-perfil/cambiar-password', [MiPerfilController, 'cambiarPassword'])
}).use(middleware.jwtAuth())

// ─── Catálogos de solo lectura (cualquier usuario autenticado) ────────────────
router.group(() => {
  router.get('/cat_roles',                     [CatRolesController,                'index'])
  router.get('/cat_roles/:id',                 [CatRolesController,                'show'])
  router.get('/cat_tipos_tratamientos',        [CatTiposTratamientosController,    'index'])
  router.get('/cat_tipos_tratamientos/:id',    [CatTiposTratamientosController,    'show'])
  router.get('/cat_niveles_roya',              [CatNivelesRoyasController,         'index'])
  router.get('/cat_niveles_roya/:id',          [CatNivelesRoyasController,         'show'])
  router.get('/cat_prioridades',               [CatPrioridadesController,          'index'])
  router.get('/cat_prioridades/:id',           [CatPrioridadesController,          'show'])
  router.get('/cat_tipos_recomendaciones',     [CatTiposRecomendacionesController, 'index'])
  router.get('/cat_tipos_recomendaciones/:id', [CatTiposRecomendacionesController, 'show'])
  router.get('/cat_estados_analisis',          [CatEstadosAnalisisController,      'index'])
  router.get('/cat_estados_analisis/:id',      [CatEstadosAnalisisController,      'show'])
  router.get('/cat_estados_cultivo',           [CatEstadosCultivosController,      'index'])
  router.get('/cat_estados_cultivo/:id',       [CatEstadosCultivosController,      'show'])
  router.get('/categorias',                    [CategoriasController,              'index'])
  router.get('/categorias/:id',                [CategoriasController,              'show'])
  router.get('/cat_tipos_insumos',             [CatTiposInsumosController,         'index'])
  router.get('/cat_tipos_insumos/:id',         [CatTiposInsumosController,         'show'])
  router.get('/insumos',                       [InsumosController,                 'index'])
  router.get('/insumos/:id',                   [InsumosController,                 'show'])
}).use(middleware.jwtAuth())

// ─── Solo ADMIN ───────────────────────────────────────────────────────────────
router.group(() => {
  router.get('/dashboard',                          [DashboardController, 'index'])
  router.get('/dashboard/monitoreos-por-estado',    [DashboardController, 'monitoreosPorEstado'])
  router.get('/dashboard/tendencia-roya',           [DashboardController, 'tendenciaRoya'])
  router.get('/dashboard/actividad-reciente',       [DashboardController, 'actividadReciente'])
  router.get('/dashboard/monitoreos-recientes',     [DashboardController, 'monitoreosRecientes'])
  router.get('/dashboard/top-fincas-roya',          [DashboardController, 'topFincasRoya'])
  router.get('/dashboard/proximos-monitoreos',      [DashboardController, 'proximosMonitoreos'])
  router.get('/dashboard/mapa-fincas',              [DashboardController, 'mapaFincas'])
  router.get('/dashboard/impacto',                  [DashboardController, 'impacto'])

  // Usuarios
  router.get('/usuarios',        [UsuariosController, 'index'])
  router.post('/usuarios',       [UsuariosController, 'store'])
  router.get('/usuarios/:id',    [UsuariosController, 'show'])
  router.put('/usuarios/:id',    [UsuariosController, 'update'])
  router.delete('/usuarios/:id', [UsuariosController, 'destroy'])

  // Admins
  router.get('/admins',          [AdminController, 'index'])
  router.post('/admins',         [AdminController, 'store'])
  router.get('/admins/:id',      [AdminController, 'show'])
  router.put('/admins/:id',      [AdminController, 'update'])
  router.delete('/admins/:id',   [AdminController, 'destroy'])

  // Expertos
  router.get('/expertos',        [ExpertosController, 'index'])
  router.post('/expertos',       [ExpertosController, 'store'])
  router.get('/expertos/:id',    [ExpertosController, 'show'])
  router.put('/expertos/:id',    [ExpertosController, 'update'])
  router.delete('/expertos/:id', [ExpertosController, 'destroy'])

  // Asignaciones — escritura solo admin
  router.post('/asignaciones_expertos',       [AsignacionesExpertosController, 'store'])
  router.put('/asignaciones_expertos/:id',    [AsignacionesExpertosController, 'update'])
  router.delete('/asignaciones_expertos/:id', [AsignacionesExpertosController, 'destroy'])

  // Catálogos — escritura solo admin
  router.post('/cat_roles',                     [CatRolesController,                'store'])
  router.put('/cat_roles/:id',                  [CatRolesController,                'update'])
  router.delete('/cat_roles/:id',               [CatRolesController,                'destroy'])
  router.post('/cat_tipos_tratamiento',         [CatTiposTratamientosController,    'store'])
  router.put('/cat_tipos_tratamiento/:id',      [CatTiposTratamientosController,    'update'])
  router.delete('/cat_tipos_tratamiento/:id',   [CatTiposTratamientosController,    'destroy'])
  router.post('/cat_niveles_roya',              [CatNivelesRoyasController,         'store'])
  router.put('/cat_niveles_roya/:id',           [CatNivelesRoyasController,         'update'])
  router.delete('/cat_niveles_roya/:id',        [CatNivelesRoyasController,         'destroy'])
  router.post('/cat_prioridades',               [CatPrioridadesController,          'store'])
  router.put('/cat_prioridades/:id',            [CatPrioridadesController,          'update'])
  router.delete('/cat_prioridades/:id',         [CatPrioridadesController,          'destroy'])
  router.post('/cat_tipo_recomendacion',        [CatTiposRecomendacionesController, 'store'])
  router.put('/cat_tipo_recomendacion/:id',     [CatTiposRecomendacionesController, 'update'])
  router.delete('/cat_tipos_recomendacion/:id', [CatTiposRecomendacionesController, 'destroy'])
  router.post('/cat_estados_analisis',          [CatEstadosAnalisisController,      'store'])
  router.put('/cat_estados_analisis/:id',       [CatEstadosAnalisisController,      'update'])
  router.delete('/cat_estados_analisis/:id',    [CatEstadosAnalisisController,      'destroy'])
  router.post('/cat_estados_cultivo',           [CatEstadosCultivosController,      'store'])
  router.put('/cat_estados_cultivo/:id',        [CatEstadosCultivosController,      'update'])
  router.delete('/cat_estados_cultivo/:id',     [CatEstadosCultivosController,      'destroy'])
  router.post('/categorias',                    [CategoriasController,              'store'])
  router.put('/categorias/:id',                 [CategoriasController,              'update'])
  router.delete('/categorias/:id',              [CategoriasController,              'destroy'])
}).use(middleware.role(['admin']))

// ─── ADMIN y EXPERTO ──────────────────────────────────────────────────────────
router.group(() => {
  // Asignaciones — lectura
  router.get('/asignaciones_expertos',     [AsignacionesExpertosController, 'index'])
  router.get('/asignaciones_expertos/:id', [AsignacionesExpertosController, 'show'])

  // Cafeteros — lectura
  router.get('/cafeteros',     [CafeterosController, 'index'])
  router.get('/cafeteros/:id', [CafeterosController, 'show'])

  // Monitoreos — escritura
  router.put('/monitoreos/:id',    [MonitoreosController, 'update'])

  // Análisis IA — escritura + predicción
  router.put('/analisis_ia/:id',      [AnalisisIaController, 'update'])
  router.delete('/analisis_ia/:id',   [AnalisisIaController, 'destroy'])
  router.post('/analisis_ia/predict', [AnalisisIaController, 'predict'])

  // Recomendaciones — escritura
  router.post('/recomendaciones',       [RecomendacionesController, 'store'])
  router.put('/recomendaciones/:id',    [RecomendacionesController, 'update'])
  router.delete('/recomendaciones/:id', [RecomendacionesController, 'destroy'])

  // Tratamientos — escritura
  router.post('/tratamientos',       [TratamientosController, 'store'])
  router.put('/tratamientos/:id',    [TratamientosController, 'update'])
  router.delete('/tratamientos/:id', [TratamientosController, 'destroy'])

  // Aplicaciones tratamientos — escritura
  router.post('/aplicaciones_tratamientos',       [AplicacionesTratamientosController, 'store'])
  router.put('/aplicaciones_tratamientos/:id',    [AplicacionesTratamientosController, 'update'])
  router.delete('/aplicaciones_tratamientos/:id', [AplicacionesTratamientosController, 'destroy'])




  // Imágenes — escritura
  router.put('/imagenes/:id',    [ImagenesController, 'update'])
  router.delete('/imagenes/:id', [ImagenesController, 'destroy'])

  // Insumos — escritura
  router.post('/insumos',       [InsumosController, 'store'])
  router.put('/insumos/:id',    [InsumosController, 'update'])
  router.delete('/insumos/:id', [InsumosController, 'destroy'])

  // Cat tipos insumos — escritura
  router.post('/cat_tipos_insumos',       [CatTiposInsumosController, 'store'])
  router.put('/cat_tipos_insumos/:id',    [CatTiposInsumosController, 'update'])
  router.delete('/cat_tipos_insumos/:id', [CatTiposInsumosController, 'destroy'])
}).use(middleware.role(['admin', 'experto']))

// ─── ADMIN, EXPERTO y CAFETERO ────────────────────────────────────────────────
router.group(() => {
  // Cafeteros — escritura
  router.post('/cafeteros',       [CafeterosController, 'store'])
  router.put('/cafeteros/:id',    [CafeterosController, 'update'])
  router.delete('/cafeteros/:id', [CafeterosController, 'destroy'])

  // Fincas
  router.get('/fincas',            [FincasController, 'index'])
  router.post('/fincas',           [FincasController, 'store'])
  router.get('/fincas/:id',        [FincasController, 'show'])
  router.put('/fincas/:id',        [FincasController, 'update'])
  router.delete('/fincas/:id',     [FincasController, 'destroy'])
  router.post('/fincas/:id/foto',  [FincasController, 'uploadPhoto'])

  // Cultivos
  router.get('/cultivos',            [CultivosController, 'index'])
  router.post('/cultivos',           [CultivosController, 'store'])
  router.get('/cultivos/:id',        [CultivosController, 'show'])
  router.put('/cultivos/:id',        [CultivosController, 'update'])
  router.delete('/cultivos/:id',     [CultivosController, 'destroy'])
  router.post('/cultivos/:id/foto',  [CultivosController, 'uploadPhoto'])

  // Monitoreos — lectura, creación y eliminación
  router.get('/monitoreos',     [MonitoreosController, 'index'])
  router.get('/monitoreos/:id', [MonitoreosController, 'show'])
  router.post('/monitoreos',    [MonitoreosController, 'store'])
  router.delete('/monitoreos/:id', [MonitoreosController, 'destroy'])

  // Análisis IA — lectura y creación
  router.get('/analisis_ia',     [AnalisisIaController, 'index'])
  router.get('/analisis_ia/:id', [AnalisisIaController, 'show'])
  router.post('/analisis_ia',    [AnalisisIaController, 'store'])

  // Recomendaciones — lectura
  router.get('/recomendaciones',     [RecomendacionesController, 'index'])
  router.get('/recomendaciones/:id', [RecomendacionesController, 'show'])

  // Tratamientos — lectura
  router.get('/tratamientos',     [TratamientosController, 'index'])
  router.get('/tratamientos/:id', [TratamientosController, 'show'])

  // Aplicaciones tratamientos — lectura
  router.get('/aplicaciones_tratamientos',     [AplicacionesTratamientosController, 'index'])
  router.get('/aplicaciones_tratamientos/:id', [AplicacionesTratamientosController, 'show'])




  // Imágenes — lectura y subida
  router.get('/imagenes',      [ImagenesController, 'index'])
  router.get('/imagenes/:id',  [ImagenesController, 'show'])
  router.post('/imagenes',     [ImagenesController, 'store'])
}).use(middleware.role(['admin', 'experto', 'cafetero']))

// ─── EXPERTO (flujo propio del rol experto) ───────────────────────────────────
router.group(() => {
  router.get('/dashboard',                   [ExpertoController, 'dashboard'])
  router.get('/fincas',                      [ExpertoController, 'fincas'])
  router.get('/cultivos',                    [ExpertoController, 'cultivos'])
  router.get('/monitoreos',                  [ExpertoController, 'monitoreos'])
  router.get('/analisis_ia',                 [ExpertoController, 'analisis_ia'])
  router.post('/monitoreos',                 [ExpertoController, 'crearMonitoreo'])
  router.put('/monitoreos/:id',              [ExpertoController, 'actualizarMonitoreo'])
  router.get('/recomendaciones',             [ExpertoController, 'recomendaciones'])
  router.post('/recomendaciones',            [ExpertoController, 'crearRecomendacion'])
  router.put('/recomendaciones/:id',         [ExpertoController, 'actualizarRecomendacion'])
  router.get('/tratamientos',                [ExpertoController, 'tratamientos'])
  router.get('/aplicaciones_tratamiento',    [ExpertoController, 'aplicaciones_tratamiento'])
  router.post('/aplicaciones_tratamiento',   [ExpertoController, 'crearAplicacionTratamiento'])

}).prefix('/experto').use(middleware.role(['experto']))

// ─── CAFICULTOR (flujo propio del rol caficultor) ─────────────────────────────
router.group(() => {
  router.get('/dashboard',          [CaficultorController, 'dashboard'])
  router.get('/fincas',             [CaficultorController, 'fincas'])
  router.get('/cultivos',           [CaficultorController, 'cultivos'])
  router.get('/monitoreos',         [CaficultorController, 'monitoreos'])
  router.get('/recomendaciones',    [CaficultorController, 'recomendaciones'])
  router.get('/analisis_ia',        [CaficultorController, 'analisis_ia'])
  router.get('/expertos_asignados', [CaficultorController, 'expertos_asignados'])
  router.post('/analizar-imagen',   [CaficultorController, 'analizarImagen'])
}).prefix('/caficultor').use(middleware.role(['cafetero']))
