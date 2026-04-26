 import router from '@adonisjs/core/services/router'

const UsuariosController = () => import('#controllers/usuarios_controller')

router.group(() => {
  router.get('/', [UsuariosController, 'index'])
  router.post('/', [UsuariosController, 'store'])
  router.get('/:id', [UsuariosController, 'show'])
  router.put('/:id', [UsuariosController, 'update'])
  router.delete('/:id', [UsuariosController, 'destroy'])
}).prefix('/usuarios')