import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'recomendacion_tratamientos'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id_rec_tratamiento')

      table
        .integer('id_recomendacion')
        .unsigned()
        .references('id_recomendacion')
        .inTable('recomendaciones')
        .onDelete('CASCADE')

      table
        .integer('id_aplicacion')
        .unsigned()
        .references('id_aplicacion')
        .inTable('aplicaciones_tratamientos')
        .onDelete('CASCADE')

      table.string('dosis_ajustada', 100).nullable()
      table.text('notas').nullable()
      table.timestamp('created_at').nullable()
      table.timestamp('updated_at').nullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}