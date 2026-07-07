import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'asignaciones_expertos'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id_asignacion')
      table
        .integer('id_experto')
        .unsigned()
        .references('id_usuario')
        .inTable('usuarios')
        .onDelete('CASCADE')
        .notNullable()
      table
        .integer('id_finca')
        .unsigned()
        .references('id_finca')
        .inTable('fincas')
        .onDelete('CASCADE')
        .notNullable()
      table.date('fecha_asignada').notNullable()
      table.timestamp('fecha_registro').defaultTo(this.now())
      table.timestamp('fecha_actualizacion').defaultTo(this.now())
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
