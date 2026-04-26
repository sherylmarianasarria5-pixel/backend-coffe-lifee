import router from '@adonisjs/core/services/router'

const CatTiposRecomendacionController = () => import('#controllers/cat_tipos_recomendacions_controller')

router.group(() => {
  router.get('/', [CatTiposRecomendacionController, 'index'])
  router.post('/', [CatTiposRecomendacionController, 'store'])
  router.get('/:id', [CatTiposRecomendacionController, 'show'])
  router.put('/:id', [CatTiposRecomendacionController, 'update'])
  router.delete('/:id', [CatTiposRecomendacionController, 'destroy'])
}).prefix('/cat_tipos_recomendacion')