import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Finca from '#models/finca'
import CatEstadoCultivo from '#models/cat_estado_cultivo'

export default class Cultivo extends BaseModel {
  public static table = 'cultivos'

  @column({ isPrimary: true, columnName: 'id_cultivo' })
  declare idCultivo: number

  @column({ columnName: 'id_finca' })
  declare idFinca: number | null

  @column({ columnName: 'id_estado' })
  declare idEstadoCultivo: number | null

  @column({ columnName: 'nombre_cultivo' })
  declare nombreCultivo: string

  @column({ columnName: 'tipo_cultivo' })
  declare tipoCultivo: string

  @column.dateTime({ autoCreate: true, columnName: 'created_at' })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true, columnName: 'updated_at' })
  declare updatedAt: DateTime

  @belongsTo(() => Finca, { foreignKey: 'idFinca' })
  declare finca: BelongsTo<typeof Finca>

  @belongsTo(() => CatEstadoCultivo, { foreignKey: 'idEstadoCultivo' })
  declare estadoCultivo: BelongsTo<typeof CatEstadoCultivo>
}
