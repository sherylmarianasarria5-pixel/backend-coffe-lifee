// app/models/tratamiento.ts
import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import CatTipoTratamiento from '#models/cat_tipo_tratamiento'

export default class Tratamiento extends BaseModel {
  public static table = 'tratamientos'
  public static primaryKey = 'id_tratamiento'

  @column({ isPrimary: true, columnName: 'id_tratamiento' })
  declare idTratamiento: number

  @column({ columnName: 'id_tipo_tratamiento' })
  declare idTipoTratamiento: number | null

  @column()
  declare nombre: string

  @column()
  declare descripcion: string | null

  @column.dateTime({ autoCreate: true, columnName: 'fecha_registro' })
  declare fechaRegistro: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true, columnName: 'fecha_actualizacion' })
  declare fechaActualizacion: DateTime

  @belongsTo(() => CatTipoTratamiento, {
    foreignKey: 'idTipoTratamiento',
  })
  declare tipoTratamiento: BelongsTo<typeof CatTipoTratamiento>
}
