import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'aplicaciones_tratamientos'

  async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table
        .integer('id_insumo')
        .unsigned()
        .nullable()
        .references('id_insumo')
        .inTable('insumos')
        .onDelete('SET NULL')
    })
  }

  async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn('id_insumo')
    })
  }
}
