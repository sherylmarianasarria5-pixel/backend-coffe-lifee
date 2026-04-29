import router from '@adonisjs/core/services/router'

import UsuariosController from '#controllers/usuarios_controller'
import MonitoreosController from '#controllers/monitoreos_controller'
import CatRolesController from '#controllers/cat_roles_controller'
import CultivosController from '#controllers/cultivos_controller'
import FincasController from '#controllers/fincas_controller'

const usuariosController = new UsuariosController()
const monitoreosController = new MonitoreosController()
const catRolesController = new CatRolesController()
const cultivosController = new CultivosController()
const fincasController = new FincasController()

router.get('/', async () => {
  return {
    mensaje: 'API Coffee Life funcionando correctamente',
  }
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
| Monitoreos
|--------------------------------------------------------------------------
*/
router.get('/monitoreos', monitoreosController.index)
router.post('/monitoreos', monitoreosController.store)
router.get('/monitoreos/:id', monitoreosController.show)
router.put('/monitoreos/:id', monitoreosController.update)
router.delete('/monitoreos/:id', monitoreosController.destroy)