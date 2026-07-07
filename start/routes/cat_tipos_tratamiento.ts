import router from '@adonisjs/core/services/router'

const CatTiposTratamientoController = () => import('#controllers/cat_tipos_tratamientos_controller')

router
  .group(() => {
    router.get('/', [CatTiposTratamientoController, 'index'])
    router.post('/', [CatTiposTratamientoController, 'store'])
    router.get('/:id', [CatTiposTratamientoController, 'show'])
    router.put('/:id', [CatTiposTratamientoController, 'update'])
    router.delete('/:id', [CatTiposTratamientoController, 'destroy'])
  })
  .prefix('/cat_tipos_tratamiento')
