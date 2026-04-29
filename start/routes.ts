import router from '@adonisjs/core/services/router'

import UsuariosController from '#controllers/usuarios_controller'
import MonitoreosController from '#controllers/monitoreos_controller'
import CatRolesController from '#controllers/cat_roles_controller'
import CultivosController from '#controllers/cultivos_controller'
import FincasController from '#controllers/fincas_controller'
import CatTiposTratamientosController from '#controllers/cat_tipos_tratamientos_controller'
import CatNivelesRoyasController from '#controllers/cat_niveles_royas_controller'
import CatPrioridadesController from '#controllers/cat_prioridades_controller'
import CatTiposRecomendacionsController from '#controllers/cat_tipos_recomendacions_controller'
import CatEstadosAnalisisController from '#controllers/cat_estados_analises_controller'
import CatEstadosCultivosController from '#controllers/cat_estados_cultivos_controller'

const usuariosController = new UsuariosController()
const monitoreosController = new MonitoreosController()
const catRolesController = new CatRolesController()
const cultivosController = new CultivosController()
const fincasController = new FincasController()
const catTiposTratamientosController = new CatTiposTratamientosController()
const catNivelesRoyasController = new CatNivelesRoyasController()
const catPrioridadesController = new CatPrioridadesController()
const catTiposRecomendacionsController = new CatTiposRecomendacionsController()
const catEstadosAnalisisController = new CatEstadosAnalisisController()
const catEstadosCultivosController = new CatEstadosCultivosController()

router.get('/', async () => {
  return { mensaje: 'API Coffee Life funcionando correctamente' }
})

/*
|--------------------------------------------------------------------------
| Usuarios
|--------------------------------------------------------------------------
*/
router.get('/usuarios', usuariosController.index)
router.post('/usuarios', usuariosController.store)
router.get('/usuarios/:id', usuariosController.show)
router.put('/usuarios/:id', usuariosController.update)
router.delete('/usuarios/:id', usuariosController.destroy)

/*
|--------------------------------------------------------------------------
| Roles
|--------------------------------------------------------------------------
*/
router.get('/cat_roles', catRolesController.index)
router.post('/cat_roles', catRolesController.store)
router.get('/cat_roles/:id', catRolesController.show)
router.put('/cat_roles/:id', catRolesController.update)
router.delete('/cat_roles/:id', catRolesController.destroy)

/*
|--------------------------------------------------------------------------
| Catálogo - Tipos de Tratamiento
|--------------------------------------------------------------------------
*/
router.get('/cat_tipos_tratamiento', catTiposTratamientosController.index)
router.post('/cat_tipos_tratamiento', catTiposTratamientosController.store)
router.get('/cat_tipos_tratamiento/:id', catTiposTratamientosController.show)
router.put('/cat_tipos_tratamiento/:id', catTiposTratamientosController.update)
router.delete('/cat_tipos_tratamiento/:id', catTiposTratamientosController.destroy)

/*
|--------------------------------------------------------------------------
| Catálogo - Niveles de Roya
|--------------------------------------------------------------------------
*/
router.get('/cat_niveles_roya', catNivelesRoyasController.index)
router.post('/cat_niveles_roya', catNivelesRoyasController.store)
router.get('/cat_niveles_roya/:id', catNivelesRoyasController.show)
router.put('/cat_niveles_roya/:id', catNivelesRoyasController.update)
router.delete('/cat_niveles_roya/:id', catNivelesRoyasController.destroy)

/*
|--------------------------------------------------------------------------
| Catálogo - Prioridades
|--------------------------------------------------------------------------
*/
router.get('/cat_prioridades', catPrioridadesController.index)
router.post('/cat_prioridades', catPrioridadesController.store)
router.get('/cat_prioridades/:id', catPrioridadesController.show)
router.put('/cat_prioridades/:id', catPrioridadesController.update)
router.delete('/cat_prioridades/:id', catPrioridadesController.destroy)

/*
|--------------------------------------------------------------------------
| Catálogo - Tipos de Recomendación
|--------------------------------------------------------------------------
*/
router.get('/cat_tipos_recomendacion', catTiposRecomendacionsController.index)
router.post('/cat_tipos_recomendacion', catTiposRecomendacionsController.store)
router.get('/cat_tipos_recomendacion/:id', catTiposRecomendacionsController.show)
router.put('/cat_tipos_recomendacion/:id', catTiposRecomendacionsController.update)
router.delete('/cat_tipos_recomendacion/:id', catTiposRecomendacionsController.destroy)

/*
|--------------------------------------------------------------------------
| Catálogo - Estados de Análisis
|--------------------------------------------------------------------------
*/
router.get('/cat_estados_analisis', catEstadosAnalisisController.index)
router.post('/cat_estados_analisis', catEstadosAnalisisController.store)
router.get('/cat_estados_analisis/:id', catEstadosAnalisisController.show)
router.put('/cat_estados_analisis/:id', catEstadosAnalisisController.update)
router.delete('/cat_estados_analisis/:id', catEstadosAnalisisController.destroy)

/*
|--------------------------------------------------------------------------
| Catálogo - Estados de Cultivo
|--------------------------------------------------------------------------
*/
router.get('/cat_estados_cultivo', catEstadosCultivosController.index)
router.post('/cat_estados_cultivo', catEstadosCultivosController.store)
router.get('/cat_estados_cultivo/:id', catEstadosCultivosController.show)
router.put('/cat_estados_cultivo/:id', catEstadosCultivosController.update)
router.delete('/cat_estados_cultivo/:id', catEstadosCultivosController.destroy)

/*
|--------------------------------------------------------------------------
| Fincas
|--------------------------------------------------------------------------
*/
router.get('/fincas', fincasController.index)
router.post('/fincas', fincasController.store)
router.get('/fincas/:id', fincasController.show)
router.put('/fincas/:id', fincasController.update)
router.delete('/fincas/:id', fincasController.destroy)

/*
|--------------------------------------------------------------------------
| Cultivos
|--------------------------------------------------------------------------
*/
router.get('/cultivos', cultivosController.index)
router.post('/cultivos', cultivosController.store)
router.get('/cultivos/:id', cultivosController.show)
router.put('/cultivos/:id', cultivosController.update)
router.delete('/cultivos/:id', cultivosController.destroy)

/*
|--------------------------------------------------------------------------
| Monitoreos
|--------------------------------------------------------------------------
*/
router.get('/monitoreos', monitoreosController.index)
router.post('/monitoreos', monitoreosController.store)
router.get('/monitoreos/:id', monitoreosController.show)
router.put('/monitoreos/:id', monitoreosController.update)
router.delete('/monitoreos/:id', monitoreosController.destroy)