import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'aplicaciones_tratamientos'

  async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.string('dosis', 100).nullable()
      table.string('frecuencia', 100).nullable()
      table.integer('duracion_dias').unsigned().nullable()
    })
  }

  async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn('dosis')
      table.dropColumn('frecuencia')
      table.dropColumn('duracion_dias')
    })
  }
}
