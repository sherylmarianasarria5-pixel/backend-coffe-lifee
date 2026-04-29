import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'fincas'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id_finca')

      table
        .integer('id_usuario')
        .unsigned()
        .references('id_usuario')
        .inTable('usuarios')
        .onDelete('CASCADE')

      table.string('nombre_finca', 150).notNullable()
      table.string('municipio', 100).notNullable()
      table.string('departamento', 100).notNullable()

      table.decimal('latitud', 10, 7).nullable()
      table.decimal('longitud', 10, 7).nullable()
      table.decimal('altitud_msnm', 8, 2).nullable()
      table.decimal('area_hectareas', 8, 2).nullable()

      table.timestamp('fecha_registro').defaultTo(this.now())
      table.timestamp('fecha_actualizacion').defaultTo(this.now())
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}