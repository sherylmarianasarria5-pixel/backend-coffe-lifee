import { AnalisisIaSchema } from '#database/schema'
import { belongsTo } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'

import Imagene from '#models/imagene'
import CatEstadoAnalisis from '#models/cat_estado_analisis'
import CatNivelRoya from '#models/cat_nivel_roya'

export default class AnalisisIa extends AnalisisIaSchema {
  @belongsTo(() => Imagene, {
    foreignKey: 'idImagen',
  })
  declare imagen: BelongsTo<typeof Imagene>

  @belongsTo(() => CatEstadoAnalisis, {
    foreignKey: 'idEstadoAnalisis',
  })
  declare estadoAnalisis: BelongsTo<typeof CatEstadoAnalisis>

  @belongsTo(() => CatNivelRoya, {
    foreignKey: 'idNivelRoya',
  })
  declare nivelRoya: BelongsTo<typeof CatNivelRoya>
}