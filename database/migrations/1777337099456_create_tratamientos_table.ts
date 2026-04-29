import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'tratamientos'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id_tratamiento')

      table
        .integer('id_tipo_tratamiento')
        .unsigned()
        .references('id_tipo')
        .inTable('cat_tipos_tratamiento')
        .onDelete('CASCADE')

      table.string('nombre', 100).notNullable()
      table.text('descripcion').nullable()

      table.timestamp('fecha_registro').defaultTo(this.now())
      table.timestamp('fecha_actualizacion').defaultTo(this.now())
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}