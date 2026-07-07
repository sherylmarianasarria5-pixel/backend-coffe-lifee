import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Imagene from '#models/imagene'
import CatEstadoAnalisis from '#models/cat_estado_analisis'
import CatNivelRoya from '#models/cat_nivel_roya'

export default class AnalisisIa extends BaseModel {
  public static table = 'analisis_ias'

  @column({ isPrimary: true, columnName: 'idAnalisis' })
  declare idAnalisis: number

  @column({ columnName: 'idImagen' })
  declare idImagen: number | null

  @column({ columnName: 'idEstado' })
  declare idEstado: number | null

  @column({ columnName: 'resultado' })
  declare resultado: string | null

  @column({ columnName: 'porcentajeConfianza' })
  declare porcentajeConfianza: string | null

  @column({ columnName: 'idNivelRoya' })
  declare idNivelRoya: number | null

  @column({
    prepare: (value: any) => (value ? JSON.stringify(value) : null),
    consume: (value: any) => (typeof value === 'string' ? JSON.parse(value) : value),
  })
  declare recomendaciones: any

  @column.dateTime({ autoCreate: true, columnName: 'fechaRegistro' })
  declare fechaRegistro: DateTime | null

  @column.dateTime({ autoCreate: true, autoUpdate: true, columnName: 'fechaActualizacion' })
  declare fechaActualizacion: DateTime | null

  @belongsTo(() => Imagene, { foreignKey: 'idImagen' })
  declare imagen: BelongsTo<typeof Imagene>

  @belongsTo(() => CatEstadoAnalisis, { foreignKey: 'idEstado' })
  declare estadoAnalisis: BelongsTo<typeof CatEstadoAnalisis>

  @belongsTo(() => CatNivelRoya, { foreignKey: 'idNivelRoya' })
  declare nivelRoya: BelongsTo<typeof CatNivelRoya>
}
