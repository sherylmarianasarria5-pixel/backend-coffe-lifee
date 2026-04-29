import { belongsTo } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import { TratamientoSchema } from '#database/schema'
import CatTipoTratamiento from '#models/cat_tipo_tratamiento'

export default class Tratamiento extends TratamientoSchema {
  @belongsTo(() => CatTipoTratamiento, {
    foreignKey: 'idTipoTratamiento',
  })
  declare tipoTratamiento: BelongsTo<typeof CatTipoTratamiento>
}