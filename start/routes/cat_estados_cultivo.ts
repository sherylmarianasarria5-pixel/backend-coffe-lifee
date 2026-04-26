import router from '@adonisjs/core/services/router'

const CatEstadosCultivoController = () => import('#controllers/cat_estados_cultivos_controller')

router.group(() => {
  router.get('/', [CatEstadosCultivoController, 'index'])
  router.post('/', [CatEstadosCultivoController, 'store'])
  router.get('/:id', [CatEstadosCultivoController, 'show'])
  router.put('/:id', [CatEstadosCultivoController, 'update'])
  router.delete('/:id', [CatEstadosCultivoController, 'destroy'])
}).prefix('/cat_estados_cultivo') 
