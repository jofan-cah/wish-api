import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Note from 'App/Models/Note'

export default class NotesController {
  public async index({response}: HttpContextContract) {

    try {

      // AMbil data dalam Database
      const note = await Note.all()

      // Tampilkan Data
      response.status(201).json({data: "Hasil Note",
        note})
      
    } catch (error) {
      response.status(201).json(error)
    }
  }


  public async store({response,auth,request}: HttpContextContract) {
    try {
      // ambil data dari body
      const {title,content} = request.body();
     
    // Dapatkan id pengguna dari objek auth.user
    const user = auth.user;
    const userId = user ? user.id : null; 
      // 
      const note = await Note.create({
        "title" : title ,
        "content" : content,
        "user_id" : userId
      })

      response.status(201).json({
        mesagge:"Berhail Menambahkan Note",note})

    } catch (error) {
      
    }
  }

  public async show({response,params}: HttpContextContract) {
    try {
      // Ambil ID Dari Params 
      const id_note = params.id;

      const note = await Note.query().where('id_note', id_note).first()

      return response.status(201).json(note)

    } catch (error) {

      // const id_note = params;
      return response.status(501).json(error)
    
    }
  }

  public async update({request,params,response}: HttpContextContract) {
    // Ambil datanya
   try {
    const {title,content} = request.body()

    const id_note = params.id


      const note = await Note.query().where('id_note', id_note).firstOrFail()
      // Query Update 
      note.merge({
        title :title,
        content : content
      }).save()
      return response.status(201).json(note)
   } catch (error) {
      response.json(error)
   }

  }

  public async destroy({response,params}: HttpContextContract) {
    //    Ambil Params nya
    const id_note = params.id
    const note = await Note.query().where('id_note',id_note).firstOrFail()
    await note.delete()

    return response.status(201).json({message:`Berhasil Menghapus ${id_note}`,
  note})

  }
}
