import { FincaSchema } from '#database/schema'
import { belongsTo, hasMany } from '@adonisjs/lucid/orm'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
import Usuario from '#models/usuario'
import Cultivo from '#models/cultivo'

export default class Finca extends FincaSchema {
  @belongsTo(() => Usuario, {
    foreignKey: 'idUsuario',
  })
  declare usuario: BelongsTo<typeof Usuario>

  @hasMany(() => Cultivo, {
    foreignKey: 'idFinca',
  })
  declare cultivos: HasMany<typeof Cultivo>
}