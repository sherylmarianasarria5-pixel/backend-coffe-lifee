import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'analisis_ias'

  async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table
        .integer('idNivelRoya')
        .unsigned()
        .nullable()
        .references('id_nivel')
        .inTable('cat_niveles_roya')
        .onDelete('SET NULL')
    })
  }

  async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn('idNivelRoya')
    })
  }
}