import { RecomendacioneSchema } from '#database/schema'
import { belongsTo, hasMany } from '@adonisjs/lucid/orm'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'

import Monitoreo from '#models/monitoreo'
import Usuario from '#models/usuario'
import CatTipoRecomendacion from '#models/cat_tipo_recomendacion'
import RecomendacionTratamiento from '#models/recomendacion_tratamiento'

export default class Recomendacione extends RecomendacioneSchema {
  @belongsTo(() => Monitoreo, {
    foreignKey: 'idMonitoreo',
  })
  declare monitoreo: BelongsTo<typeof Monitoreo>

  @belongsTo(() => Usuario, {
    foreignKey: 'idExpertoEmisor',
  })
  declare experto: BelongsTo<typeof Usuario>

  @belongsTo(() => CatTipoRecomendacion, {
    foreignKey: 'idTipo',
  })
  declare tipo: BelongsTo<typeof CatTipoRecomendacion>

  @hasMany(() => RecomendacionTratamiento, {
    foreignKey: 'idRecomendacion',
  })
  declare tratamientos: HasMany<typeof RecomendacionTratamiento>
}