import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'recomendaciones'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id_recomendacion')

      table
        .integer('id_monitoreo')
        .unsigned()
        .references('id_monitoreo')
        .inTable('monitoreos')
        .onDelete('SET NULL')

      table
        .integer('id_tipo')
        .unsigned()
        .references('id_tipo')
        .inTable('cat_tipos_recomendacion')
        .onDelete('SET NULL')

      table
        .integer('id_experto_emisor')
        .unsigned()
        .references('id_usuario')
        .inTable('usuarios')
        .onDelete('SET NULL')

      table.text('descripcion').nullable()
      table.date('fecha_limite').nullable()

      table.timestamp('fecha_registro').defaultTo(this.now())
      table.timestamp('fecha_actualizacion').defaultTo(this.now())
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}