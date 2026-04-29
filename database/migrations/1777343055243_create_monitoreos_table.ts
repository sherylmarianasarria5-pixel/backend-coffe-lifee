import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'monitoreos'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id_monitoreo')

      table
        .integer('id_cultivo')
        .unsigned()
        .references('id_cultivo')
        .inTable('cultivos')
        .onDelete('CASCADE')

      table
        .integer('id_experto')
        .unsigned()
        .references('id_usuario')
        .inTable('usuarios')
        .onDelete('SET NULL')
        .nullable()

      table.date('fecha_monitoreo').notNullable()
      table.text('observaciones').nullable()

      table.timestamp('fecha_registro').defaultTo(this.now())
      table.timestamp('fecha_actualizacion').defaultTo(this.now())
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}