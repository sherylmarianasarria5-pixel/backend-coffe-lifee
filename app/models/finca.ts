import { FincaSchema } from '#database/schema'
import { column, belongsTo, hasMany, hasOne } from '@adonisjs/lucid/orm'
import type { BelongsTo, HasMany, HasOne } from '@adonisjs/lucid/types/relations'
import Usuario from '#models/usuario'
import Cultivo from '#models/cultivo'
import AsignacionExperto from '#models/asignacion_experto'

export default class Finca extends FincaSchema {
  @column()
  declare activo: boolean

  @column({ columnName: 'foto_url' })
  declare fotoUrl: string | null

  @belongsTo(() => Usuario, {
    foreignKey: 'idUsuario',
  })
  declare usuario: BelongsTo<typeof Usuario>

  @hasMany(() => Cultivo, {
    foreignKey: 'idFinca',
  })
  declare cultivos: HasMany<typeof Cultivo>

  @hasOne(() => AsignacionExperto, {
    foreignKey: 'idFinca',
  })
  declare asignacionExperto: HasOne<typeof AsignacionExperto>
}