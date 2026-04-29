import { MonitoreoSchema } from '#database/schema'
import { belongsTo, hasMany } from '@adonisjs/lucid/orm'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'

import Cultivo from '#models/cultivo'
import Usuario from '#models/usuario'
import Imagene from '#models/imagene'

export default class Monitoreo extends MonitoreoSchema {
  @belongsTo(() => Cultivo, {
    foreignKey: 'idCultivo',
  })
  declare cultivo: BelongsTo<typeof Cultivo>

  @belongsTo(() => Usuario, {
    foreignKey: 'idExperto',
  })
  declare experto: BelongsTo<typeof Usuario>

  @hasMany(() => Imagene, {
    foreignKey: 'idMonitoreo',
  })
  declare imagenes: HasMany<typeof Imagene>
}