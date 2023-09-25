import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Menu from 'App/Models/Menu'

export default class extends BaseSeeder {
  public async run () {
    // Write your database queries inside the run method
    await Menu.query().delete();

    await Menu.create({
      nama_menu: "Gula Darah"
    })
  }
}
