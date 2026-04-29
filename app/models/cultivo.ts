import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class Cultivo extends BaseModel {
  @column({ isPrimary: true, columnName: 'id_cultivo' })
  declare idCultivo: number

  @column({ columnName: 'nombre_cultivo' })
  declare nombreCultivo: string

  @column({ columnName: 'tipo_cultivo' })
  declare tipoCultivo: string

  @column({ columnName: 'id_finca' })
  declare idFinca: number | null

  @column.dateTime({ autoCreate: true, columnName: 'created_at' })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true, columnName: 'updated_at' })
  declare updatedAt: DateTime
}