import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'notes'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id_note')
      table.integer('user_id',3).unsigned().references('users.id').onDelete('CASCADE')
      table.string('title')
      table.string('content')
      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
