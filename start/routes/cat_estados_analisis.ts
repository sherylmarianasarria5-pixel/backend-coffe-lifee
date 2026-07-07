import router from '@adonisjs/core/services/router'

const CatEstadosAnalisisController = () => import('#controllers/cat_estados_analises_controller')

router
  .group(() => {
    router.get('/', [CatEstadosAnalisisController, 'index'])
    router.post('/', [CatEstadosAnalisisController, 'store'])
    router.get('/:id', [CatEstadosAnalisisController, 'show'])
    router.put('/:id', [CatEstadosAnalisisController, 'update'])
    router.delete('/:id', [CatEstadosAnalisisController, 'destroy'])
  })
  .prefix('/cat_estados_analisis')
