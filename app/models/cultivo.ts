import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Finca from '#models/finca'

export default class Cultivo extends BaseModel {
  public static table = 'cultivos'

  @column({ isPrimary: true })
  declare idCultivo: number

  @column()
  declare nombreCultivo: string

  @column()
  declare tipoCultivo: string

  @column()
  declare idFinca: number | null

  @column()
  declare idEstado: number | null

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @belongsTo(() => Finca, {
    foreignKey: 'idFinca',
  })
  declare finca: BelongsTo<typeof Finca>
}
