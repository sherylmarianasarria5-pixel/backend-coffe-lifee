import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'aplicaciones_tratamientos'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id_aplicacion')

      table
        .integer('id_tratamiento')
        .unsigned()
        .references('id_tratamiento')
        .inTable('tratamientos')
        .onDelete('CASCADE')

      table.string('dosis', 100).notNullable()
      table.string('frecuencia', 100).nullable()
      table.text('observaciones').nullable()

      table.timestamp('fecha_registro').defaultTo(this.now())
      table.timestamp('fecha_actualizacion').defaultTo(this.now())
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}