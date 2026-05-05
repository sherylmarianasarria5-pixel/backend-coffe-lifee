import router from '@adonisjs/core/services/router'

const AuthController                      = () => import('#controllers/auth_controller')
const UsuariosController                  = () => import('#controllers/usuarios_controller')
const AdminController                     = () => import('#controllers/admin_controller')
const CafeterosController                 = () => import('#controllers/cafeteros_controller')
const ExpertosController                  = () => import('#controllers/expertos_controller')
const MonitoreosController                = () => import('#controllers/monitoreos_controller')
const CatRolesController                  = () => import('#controllers/cat_roles_controller')
const CultivosController                  = () => import('#controllers/cultivos_controller')
const FincasController                    = () => import('#controllers/fincas_controller')
const CategoriasController                = () => import('#controllers/categorias_controller')
const CatTiposTratamientosController      = () => import('#controllers/cat_tipos_tratamientos_controller')
const CatNivelesRoyasController           = () => import('#controllers/cat_niveles_royas_controller')
const CatPrioridadesController            = () => import('#controllers/cat_prioridades_controller')
const CatTiposRecomendacionsController    = () => import('#controllers/cat_tipos_recomendacions_controller')
const CatEstadosAnalisisController        = () => import('#controllers/cat_estados_analises_controller')
const CatEstadosCultivosController        = () => import('#controllers/cat_estados_cultivos_controller')
const RecomendacionTratamientosController = () => import('#controllers/recomendacion_tratamientos_controller')
const TratamientosController              = () => import('#controllers/tratamientos_controller')
const AplicacionesTratamientosController  = () => import('#controllers/aplicaciones_tratamientos_controller')
const ImagenesController                  = () => import('#controllers/imagenes_controller')
const AnalisisIaController                = () => import('#controllers/analisis_ia_controller')
const RecomendacionesController           = () => import('#controllers/recomendaciones_controller')

router.get('/', async () => {
  return { mensaje: 'API Coffee Life funcionando correctamente' }
})

// AUTH
router.post('/login',                  [AuthController, 'login']).as('auth.login')
router.post('/register',               [AuthController, 'register']).as('auth.register')
router.post('/recuperar-password',     [AuthController, 'recuperarPassword']).as('auth.recuperarPassword')
router.post('/restablecer-password',   [AuthController, 'restablecerPassword']).as('auth.restablecerPassword')

// USUARIOS
router.get   ('/usuarios',     [UsuariosController, 'index']).as('usuarios.index')
router.post  ('/usuarios',     [UsuariosController, 'store']).as('usuarios.store')
router.get   ('/usuarios/:id', [UsuariosController, 'show']).as('usuarios.show')
router.put   ('/usuarios/:id', [UsuariosController, 'update']).as('usuarios.update')
router.delete('/usuarios/:id', [UsuariosController, 'destroy']).as('usuarios.destroy')

// ADMINS
router.get   ('/admins',     [AdminController, 'index']).as('admins.index')
router.post  ('/admins',     [AdminController, 'store']).as('admins.store')
router.get   ('/admins/:id', [AdminController, 'show']).as('admins.show')
router.put   ('/admins/:id', [AdminController, 'update']).as('admins.update')
router.delete('/admins/:id', [AdminController, 'destroy']).as('admins.destroy')

// CAFETEROS
router.get   ('/cafeteros',     [CafeterosController, 'index']).as('cafeteros.index')
router.post  ('/cafeteros',     [CafeterosController, 'store']).as('cafeteros.store')
router.get   ('/cafeteros/:id', [CafeterosController, 'show']).as('cafeteros.show')
router.put   ('/cafeteros/:id', [CafeterosController, 'update']).as('cafeteros.update')
router.delete('/cafeteros/:id', [CafeterosController, 'destroy']).as('cafeteros.destroy')

// EXPERTOS
router.get   ('/expertos',     [ExpertosController, 'index']).as('expertos.index')
router.post  ('/expertos',     [ExpertosController, 'store']).as('expertos.store')
router.get   ('/expertos/:id', [ExpertosController, 'show']).as('expertos.show')
router.put   ('/expertos/:id', [ExpertosController, 'update']).as('expertos.update')
router.delete('/expertos/:id', [ExpertosController, 'destroy']).as('expertos.destroy')

// ROLES — funciona con /roles Y /cat_roles
router.get   ('/roles',         [CatRolesController, 'index']).as('roles.index')
router.post  ('/roles',         [CatRolesController, 'store']).as('roles.store')
router.get   ('/roles/:id',     [CatRolesController, 'show']).as('roles.show')
router.put   ('/roles/:id',     [CatRolesController, 'update']).as('roles.update')
router.delete('/roles/:id',     [CatRolesController, 'destroy']).as('roles.destroy')

router.get   ('/cat_roles',     [CatRolesController, 'index']).as('cat_roles.index')
router.post  ('/cat_roles',     [CatRolesController, 'store']).as('cat_roles.store')
router.get   ('/cat_roles/:id', [CatRolesController, 'show']).as('cat_roles.show')
router.put   ('/cat_roles/:id', [CatRolesController, 'update']).as('cat_roles.update')
router.delete('/cat_roles/:id', [CatRolesController, 'destroy']).as('cat_roles.destroy')

// TIPOS TRATAMIENTO
router.get   ('/cat_tipos_tratamiento',     [CatTiposTratamientosController, 'index']).as('cat_tipos_tratamiento.index')
router.post  ('/cat_tipos_tratamiento',     [CatTiposTratamientosController, 'store']).as('cat_tipos_tratamiento.store')
router.get   ('/cat_tipos_tratamiento/:id', [CatTiposTratamientosController, 'show']).as('cat_tipos_tratamiento.show')
router.put   ('/cat_tipos_tratamiento/:id', [CatTiposTratamientosController, 'update']).as('cat_tipos_tratamiento.update')
router.delete('/cat_tipos_tratamiento/:id', [CatTiposTratamientosController, 'destroy']).as('cat_tipos_tratamiento.destroy')

// NIVELES ROYA
router.get   ('/cat_niveles_roya',     [CatNivelesRoyasController, 'index']).as('cat_niveles_roya.index')
router.post  ('/cat_niveles_roya',     [CatNivelesRoyasController, 'store']).as('cat_niveles_roya.store')
router.get   ('/cat_niveles_roya/:id', [CatNivelesRoyasController, 'show']).as('cat_niveles_roya.show')
router.put   ('/cat_niveles_roya/:id', [CatNivelesRoyasController, 'update']).as('cat_niveles_roya.update')
router.delete('/cat_niveles_roya/:id', [CatNivelesRoyasController, 'destroy']).as('cat_niveles_roya.destroy')

// PRIORIDADES
router.get   ('/cat_prioridades',     [CatPrioridadesController, 'index']).as('cat_prioridades.index')
router.post  ('/cat_prioridades',     [CatPrioridadesController, 'store']).as('cat_prioridades.store')
router.get   ('/cat_prioridades/:id', [CatPrioridadesController, 'show']).as('cat_prioridades.show')
router.put   ('/cat_prioridades/:id', [CatPrioridadesController, 'update']).as('cat_prioridades.update')
router.delete('/cat_prioridades/:id', [CatPrioridadesController, 'destroy']).as('cat_prioridades.destroy')

// TIPOS RECOMENDACION
router.get   ('/cat_tipos_recomendacion',     [CatTiposRecomendacionsController, 'index']).as('cat_tipos_recomendacion.index')
router.post  ('/cat_tipos_recomendacion',     [CatTiposRecomendacionsController, 'store']).as('cat_tipos_recomendacion.store')
router.get   ('/cat_tipos_recomendacion/:id', [CatTiposRecomendacionsController, 'show']).as('cat_tipos_recomendacion.show')
router.put   ('/cat_tipos_recomendacion/:id', [CatTiposRecomendacionsController, 'update']).as('cat_tipos_recomendacion.update')
router.delete('/cat_tipos_recomendacion/:id', [CatTiposRecomendacionsController, 'destroy']).as('cat_tipos_recomendacion.destroy')

// ESTADOS ANALISIS
router.get   ('/cat_estados_analisis',     [CatEstadosAnalisisController, 'index']).as('cat_estados_analisis.index')
router.post  ('/cat_estados_analisis',     [CatEstadosAnalisisController, 'store']).as('cat_estados_analisis.store')
router.get   ('/cat_estados_analisis/:id', [CatEstadosAnalisisController, 'show']).as('cat_estados_analisis.show')
router.put   ('/cat_estados_analisis/:id', [CatEstadosAnalisisController, 'update']).as('cat_estados_analisis.update')
router.delete('/cat_estados_analisis/:id', [CatEstadosAnalisisController, 'destroy']).as('cat_estados_analisis.destroy')

// ESTADOS CULTIVO
router.get   ('/cat_estados_cultivo',     [CatEstadosCultivosController, 'index']).as('cat_estados_cultivo.index')
router.post  ('/cat_estados_cultivo',     [CatEstadosCultivosController, 'store']).as('cat_estados_cultivo.store')
router.get   ('/cat_estados_cultivo/:id', [CatEstadosCultivosController, 'show']).as('cat_estados_cultivo.show')
router.put   ('/cat_estados_cultivo/:id', [CatEstadosCultivosController, 'update']).as('cat_estados_cultivo.update')
router.delete('/cat_estados_cultivo/:id', [CatEstadosCultivosController, 'destroy']).as('cat_estados_cultivo.destroy')

// CATEGORIAS
router.get   ('/categorias',     [CategoriasController, 'index']).as('categorias.index')
router.post  ('/categorias',     [CategoriasController, 'store']).as('categorias.store')
router.get   ('/categorias/:id', [CategoriasController, 'show']).as('categorias.show')
router.put   ('/categorias/:id', [CategoriasController, 'update']).as('categorias.update')
router.delete('/categorias/:id', [CategoriasController, 'destroy']).as('categorias.destroy')

// FINCAS
router.get   ('/fincas',     [FincasController, 'index']).as('fincas.index')
router.post  ('/fincas',     [FincasController, 'store']).as('fincas.store')
router.get   ('/fincas/:id', [FincasController, 'show']).as('fincas.show')
router.put   ('/fincas/:id', [FincasController, 'update']).as('fincas.update')
router.delete('/fincas/:id', [FincasController, 'destroy']).as('fincas.destroy')

// CULTIVOS
router.get   ('/cultivos',     [CultivosController, 'index']).as('cultivos.index')
router.post  ('/cultivos',     [CultivosController, 'store']).as('cultivos.store')
router.get   ('/cultivos/:id', [CultivosController, 'show']).as('cultivos.show')
router.put   ('/cultivos/:id', [CultivosController, 'update']).as('cultivos.update')
router.delete('/cultivos/:id', [CultivosController, 'destroy']).as('cultivos.destroy')

// MONITOREOS
router.get   ('/monitoreos',     [MonitoreosController, 'index']).as('monitoreos.index')
router.post  ('/monitoreos',     [MonitoreosController, 'store']).as('monitoreos.store')
router.get   ('/monitoreos/:id', [MonitoreosController, 'show']).as('monitoreos.show')
router.put   ('/monitoreos/:id', [MonitoreosController, 'update']).as('monitoreos.update')
router.delete('/monitoreos/:id', [MonitoreosController, 'destroy']).as('monitoreos.destroy')

// RECOMENDACION TRATAMIENTOS
router.get   ('/recomendacion_tratamientos',     [RecomendacionTratamientosController, 'index']).as('recomendacion_tratamientos.index')
router.post  ('/recomendacion_tratamientos',     [RecomendacionTratamientosController, 'store']).as('recomendacion_tratamientos.store')
router.get   ('/recomendacion_tratamientos/:id', [RecomendacionTratamientosController, 'show']).as('recomendacion_tratamientos.show')
router.put   ('/recomendacion_tratamientos/:id', [RecomendacionTratamientosController, 'update']).as('recomendacion_tratamientos.update')
router.delete('/recomendacion_tratamientos/:id', [RecomendacionTratamientosController, 'destroy']).as('recomendacion_tratamientos.destroy')

// TRATAMIENTOS
router.get   ('/tratamientos',     [TratamientosController, 'index']).as('tratamientos.index')
router.post  ('/tratamientos',     [TratamientosController, 'store']).as('tratamientos.store')
router.get   ('/tratamientos/:id', [TratamientosController, 'show']).as('tratamientos.show')
router.put   ('/tratamientos/:id', [TratamientosController, 'update']).as('tratamientos.update')
router.delete('/tratamientos/:id', [TratamientosController, 'destroy']).as('tratamientos.destroy')

// APLICACIONES TRATAMIENTOS
router.get   ('/aplicaciones_tratamientos',     [AplicacionesTratamientosController, 'index']).as('aplicaciones_tratamientos.index')
router.post  ('/aplicaciones_tratamientos',     [AplicacionesTratamientosController, 'store']).as('aplicaciones_tratamientos.store')
router.get   ('/aplicaciones_tratamientos/:id', [AplicacionesTratamientosController, 'show']).as('aplicaciones_tratamientos.show')
router.put   ('/aplicaciones_tratamientos/:id', [AplicacionesTratamientosController, 'update']).as('aplicaciones_tratamientos.update')
router.delete('/aplicaciones_tratamientos/:id', [AplicacionesTratamientosController, 'destroy']).as('aplicaciones_tratamientos.destroy')

// IMAGENES
router.get   ('/imagenes',     [ImagenesController, 'index']).as('imagenes.index')
router.post  ('/imagenes',     [ImagenesController, 'store']).as('imagenes.store')
router.get   ('/imagenes/:id', [ImagenesController, 'show']).as('imagenes.show')
router.put   ('/imagenes/:id', [ImagenesController, 'update']).as('imagenes.update')
router.delete('/imagenes/:id', [ImagenesController, 'destroy']).as('imagenes.destroy')

// ANALISIS IA
router.get   ('/analisis_ia',     [AnalisisIaController, 'index']).as('analisis_ia.index')
router.post  ('/analisis_ia',     [AnalisisIaController, 'store']).as('analisis_ia.store')
router.get   ('/analisis_ia/:id', [AnalisisIaController, 'show']).as('analisis_ia.show')
router.put   ('/analisis_ia/:id', [AnalisisIaController, 'update']).as('analisis_ia.update')
router.delete('/analisis_ia/:id', [AnalisisIaController, 'destroy']).as('analisis_ia.destroy')

// RECOMENDACIONES
router.get   ('/recomendaciones',     [RecomendacionesController, 'index']).as('recomendaciones.index')
router.post  ('/recomendaciones',     [RecomendacionesController, 'store']).as('recomendaciones.store')
router.get   ('/recomendaciones/:id', [RecomendacionesController, 'show']).as('recomendaciones.show')
router.put   ('/recomendaciones/:id', [RecomendacionesController, 'update']).as('recomendaciones.update')
router.delete('/recomendaciones/:id', [RecomendacionesController, 'destroy']).as('recomendaciones.destroy')