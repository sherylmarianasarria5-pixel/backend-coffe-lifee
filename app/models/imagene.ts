import { ImageneSchema } from '#database/schema'
import { belongsTo, hasMany } from '@adonisjs/lucid/orm'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'

import Monitoreo from '#models/monitoreo'
import AnalisisIa from '#models/analisis_ia'

export default class Imagene extends ImageneSchema {
  @belongsTo(() => Monitoreo, {
    foreignKey: 'idMonitoreo',
  })
  declare monitoreo: BelongsTo<typeof Monitoreo>

  @hasMany(() => AnalisisIa, {
    foreignKey: 'idImagen',
  })
  declare analisis: HasMany<typeof AnalisisIa>
}