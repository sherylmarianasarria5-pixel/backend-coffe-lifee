import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Cultivo from '#models/cultivo'
import Recomendacione from '#models/recomendacione'

export default class Progreso extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column({ columnName: 'id_cultivo' })
  declare idCultivo: number

  @column({ columnName: 'id_recomendacion' })
  declare idRecomendacion: number

  @column()
  declare dia: number

  @column()
  declare aplicado: boolean

  @column.date()
  declare fecha: DateTime

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @belongsTo(() => Cultivo, { foreignKey: 'idCultivo' })
  declare cultivo: BelongsTo<typeof Cultivo>

  @belongsTo(() => Recomendacione, { foreignKey: 'idRecomendacion' })
  declare recomendacion: BelongsTo<typeof Recomendacione>
}
