import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'wishes'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id_wish')
      table.string('no_hp', 15)
      table.integer('berat_badan', 5)
      table.integer('kolesterol', 5)
      table.integer('suhu_tubuh', 5)
      table.integer('bmi', 5)
      table.integer('detak_jantung', 5)
      table.integer('gula_darah', 5)
      table.integer('asam_urat', 5)
      table.integer('hemoglobin', 5)
      table.integer('oksigen_darah', 5)
      table.integer('tekanan_darah', 5)
      table.string('status', 7).defaultTo("Normal")
      table.date("tgl")
      
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
