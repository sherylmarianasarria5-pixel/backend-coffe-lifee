import router from '@adonisjs/core/services/router'

const CatRolesController = () => import('#controllers/cat_roles_controller')

router.group(() => {
  router.get('/', [CatRolesController, 'index'])
  router.post('/', [CatRolesController, 'store'])
  router.get('/:id', [CatRolesController, 'show'])
  router.put('/:id', [CatRolesController, 'update'])
  router.delete('/:id', [CatRolesController, 'destroy'])
}).prefix('/cat_roles') 
