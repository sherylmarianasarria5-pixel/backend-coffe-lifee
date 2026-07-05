import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'fcm_tokens'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id_fcm_token')
      table.integer('id_usuario').unsigned().notNullable().unique()
        .references('id_usuario').inTable('usuarios').onDelete('CASCADE')
      table.string('token', 255).notNullable()
      table.timestamp('fecha_registro').defaultTo(this.now())
      table.timestamp('fecha_actualizacion').defaultTo(this.now())
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
