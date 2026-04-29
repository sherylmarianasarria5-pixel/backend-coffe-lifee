import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Recomendacione from '#models/recomendacione'
import AplicacionesTratamiento from '#models/aplicaciones_tratamiento'

export default class RecomendacionTratamiento extends BaseModel {
  public static table = 'recomendacion_tratamientos'
  public static primaryKey = 'id_rec_tratamiento'

  @column({ isPrimary: true, columnName: 'id_rec_tratamiento' })
  declare idRecTratamiento: number

  @column({ columnName: 'id_recomendacion' })
  declare idRecomendacion: number

  @column({ columnName: 'id_aplicacion' })
  declare idAplicacion: number

  @column({ columnName: 'dosis_ajustada' })
  declare dosisAjustada: string | null

  @column()
  declare notas: string | null

  @column.dateTime({ autoCreate: true, columnName: 'created_at' })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true, columnName: 'updated_at' })
  declare updatedAt: DateTime

  @belongsTo(() => Recomendacione, {
    foreignKey: 'idRecomendacion',
  })
  declare recomendacion: BelongsTo<typeof Recomendacione>

  @belongsTo(() => AplicacionesTratamiento, {
    foreignKey: 'idAplicacion',
  })
  declare aplicacion: BelongsTo<typeof AplicacionesTratamiento>
}