import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import User from 'App/Models/User'

export default class extends BaseSeeder {
  public async run () {
    // Delete User
    await User.query().delete();
    // Tambah User
    await User.create({
      email : 'test1@gmail.com',
      password : 'jfn'
    })

    for (let index = 0; index < 2; index++) {
      await User.create({
        email : `test${index+1}@gmail.com `,
        password : `test ${index+1}`
      })
      
    }
   

  }
}
