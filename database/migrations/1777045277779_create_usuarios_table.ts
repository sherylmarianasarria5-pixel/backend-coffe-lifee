import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'usuarios'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id_usuario')
      table.integer('id_rol').unsigned().references('id_rol').inTable('cat_roles').onDelete('SET NULL').nullable()
      table.string('nombre', 100).notNullable()
      table.string('apellido', 100).notNullable()
      table.string('correo', 150).notNullable().unique()
      table.string('telefono', 20).nullable()
      table.string('password_hash', 255).notNullable()
      table.string('observaciones', 255).nullable()
      table.boolean('activo').defaultTo(true)
      table.timestamp('fecha_registro').defaultTo(this.now())
      table.timestamp('fecha_actualizacion').defaultTo(this.now())
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}