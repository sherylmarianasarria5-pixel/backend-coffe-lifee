import { DateTime } from 'luxon'
import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm'
import type { HasMany } from '@adonisjs/lucid/types/relations'
import Insumo from '#models/insumo'

export default class CatTipoInsumo extends BaseModel {
  public static table = 'cat_tipos_insumos'

  @column({ isPrimary: true, columnName: 'id_tipo_insumo' })
  declare idTipoInsumo: number

  @column()
  declare nombre: string

  @hasMany(() => Insumo, {
    foreignKey: 'idTipoInsumo',
  })
  declare insumos: HasMany<typeof Insumo>

  @column.dateTime({ autoCreate: true, columnName: 'fecha_registro' })
  declare fechaRegistro: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true, columnName: 'fecha_actualizacion' })
  declare fechaActualizacion: DateTime
}
