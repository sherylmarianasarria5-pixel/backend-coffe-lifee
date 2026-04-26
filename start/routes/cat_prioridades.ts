 import router from '@adonisjs/core/services/router'

const CatPrioridadesController = () => import('#controllers/cat_prioridades_controller')

router.group(() => {
  router.get('/', [CatPrioridadesController, 'index'])
  router.post('/', [CatPrioridadesController, 'store'])
  router.get('/:id', [CatPrioridadesController, 'show'])
  router.put('/:id', [CatPrioridadesController, 'update'])
  router.delete('/:id', [CatPrioridadesController, 'destroy'])
}).prefix('/cat_prioridades')
