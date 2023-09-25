import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'
import Wish from 'App/Models/Wish'

export default class WishesController {
  public async index({response}: HttpContextContract) {

    try {
        const data = await Database.from('wishes')

       return response.status(201).json(data)
    } catch (error) {
      return response.status(501).json(error)
    }
    
  }

  public async store({request,response,auth}: HttpContextContract) {
    try {

      const {berat_badan,kolesterol,suhu_tubuh,bmi,detak_jantung,gula_darah,asam_urat,hemoglobin,oksigen_darah,tekanan_darah,status} = request.body()

      const user = auth.user;
      const nohp = user ? user.nohp : null; 

      const wish = await Wish.create({
        no_hp: nohp,
        berat_badan:berat_badan,
        kolesterol:kolesterol,
        suhu_tubuh:suhu_tubuh,
        bmi:bmi,
        detak_jantung:detak_jantung,
        gula_darah:gula_darah,
        asam_urat:asam_urat,
        hemoglobin:hemoglobin,
        oksigen_darah:oksigen_darah,
        tekanan_darah:tekanan_darah,
        // tgl:tgl,
        status:status
      })

      return response.status(501).json({message:"Berhasil Tersimpan",wish})
      
    } catch (error) {
      
    }
  }

  public async show({}: HttpContextContract) {}

  public async edit({}: HttpContextContract) {}

  public async update({}: HttpContextContract) {}

  public async destroy({}: HttpContextContract) {}
}
