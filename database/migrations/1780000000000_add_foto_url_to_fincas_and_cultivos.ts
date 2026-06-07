import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  async up() {
    this.schema.alterTable('fincas', (table) => {
      table.string('foto_url', 255).nullable()
    })
    this.schema.alterTable('cultivos', (table) => {
      table.string('foto_url', 255).nullable()
    })
  }

  async down() {
    this.schema.alterTable('fincas', (table) => {
      table.dropColumn('foto_url')
    })
    this.schema.alterTable('cultivos', (table) => {
      table.dropColumn('foto_url')
    })
  }
}
