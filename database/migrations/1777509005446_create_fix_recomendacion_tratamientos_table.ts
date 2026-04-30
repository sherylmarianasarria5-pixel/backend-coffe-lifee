import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'recomendacion_tratamientos'

  async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropForeign(['id_aplicacion'])
      table.dropColumn('id_aplicacion')
      table
        .integer('id_tratamiento')
        .unsigned()
        .nullable()
        .references('id_tratamiento')
        .inTable('tratamientos')
        .onDelete('CASCADE')
    })
  }

  async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropForeign(['id_tratamiento'])
      table.dropColumn('id_tratamiento')
      table
        .integer('id_aplicacion')
        .unsigned()
        .nullable()
        .references('id_aplicacion')
        .inTable('aplicaciones_tratamientos')
        .onDelete('CASCADE')
    })
  }
}