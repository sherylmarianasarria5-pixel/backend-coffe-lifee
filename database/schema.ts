export class AnalisisIaSchema extends BaseModel {
  static $columns = [
    'idAnalisis',
    'idImagen',
    'idEstado',
    'idNivelRoya',
    'porcentajeConfianza',
    'descripcionResultado',
    'fechaRegistro',
    'fechaActualizacion',
  ] as const

  $columns = AnalisisIaSchema.$columns

  @column({ isPrimary: true })
  declare idAnalisis: number

  @column()
  declare idImagen: number | null

  @column()
  declare idEstado: number | null

  @column()
  declare idNivelRoya: number | null

  @column()
  declare porcentajeConfianza: number | null

  @column()
  declare descripcionResultado: string | null

  @column.dateTime()
  declare fechaRegistro: DateTime

  @column.dateTime()
  declare fechaActualizacion: DateTime
}