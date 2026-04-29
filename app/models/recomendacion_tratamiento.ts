import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'

import Recomendacione from '#models/recomendacione'
import Tratamiento from '#models/tratamiento'

export default class RecomendacionTratamiento extends BaseModel {
  public static table = 'recomendacion_tratamientos'
  public static primaryKey = 'id_detalle'

  @column({ isPrimary: true, columnName: 'id_detalle' })
  declare idDetalle: number

  @column({ columnName: 'id_recomendacion' })
  declare idRecomendacion: number

  @column({ columnName: 'id_tratamiento' })
  declare idTratamiento: number

  @column()
  declare dosis: string | null

  @column()
  declare frecuencia: string | null

  @column()
  declare duracion: string | null

  @column()
  declare notas: string | null

  @belongsTo(() => Recomendacione, {
    foreignKey: 'idRecomendacion',
  })
  declare recomendacion: BelongsTo<typeof Recomendacione>

  @belongsTo(() => Tratamiento, {
    foreignKey: 'idTratamiento',
  })
  declare tratamiento: BelongsTo<typeof Tratamiento>

  @column.dateTime({ autoCreate: true, columnName: 'fecha_registro' })
  declare fechaRegistro: DateTime
}