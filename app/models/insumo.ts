import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import CatTipoInsumo from '#models/cat_tipo_insumo'

export default class Insumo extends BaseModel {
  public static table = 'insumos'
  public static primaryKey = 'id_insumo'

  @column({ isPrimary: true, columnName: 'id_insumo' })
  declare idInsumo: number

  @column({ columnName: 'id_tipo_insumo' })
  declare idTipoInsumo: number | null

  @column()
  declare nombre: string

  @column()
  declare descripcion: string | null

  @belongsTo(() => CatTipoInsumo, {
    foreignKey: 'idTipoInsumo',
  })
  declare tipoInsumo: BelongsTo<typeof CatTipoInsumo>

  @column.dateTime({ autoCreate: true, columnName: 'fecha_registro' })
  declare fechaRegistro: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true, columnName: 'fecha_actualizacion' })
  declare fechaActualizacion: DateTime
}
