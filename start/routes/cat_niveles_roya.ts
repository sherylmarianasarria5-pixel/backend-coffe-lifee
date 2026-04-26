 import router from '@adonisjs/core/services/router'

const CatNivelesRoyaController = () => import('#controllers/cat_niveles_royas_controller')

router.group(() => {
  router.get('/', [CatNivelesRoyaController, 'index'])
  router.post('/', [CatNivelesRoyaController, 'store'])
  router.get('/:id', [CatNivelesRoyaController, 'show'])
  router.put('/:id', [CatNivelesRoyaController, 'update'])
  router.delete('/:id', [CatNivelesRoyaController, 'destroy'])
}).prefix('/cat_niveles_roya')
