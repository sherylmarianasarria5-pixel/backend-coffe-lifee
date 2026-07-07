import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'notificaciones'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id_notificacion')
      table
        .integer('id_usuario')
        .unsigned()
        .notNullable()
        .references('id_usuario')
        .inTable('usuarios')
        .onDelete('CASCADE')
      table.string('tipo', 50).notNullable()
      table.string('titulo', 200).notNullable()
      table.text('mensaje').notNullable()
      table.boolean('leida').defaultTo(false)
      table.integer('id_referencia').unsigned().nullable()
      table.string('tabla_referencia', 50).nullable()
      table.timestamp('fecha_registro').defaultTo(this.now())
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
