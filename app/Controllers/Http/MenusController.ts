import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'
import Menu from 'App/Models/Menu'
import Application from '@ioc:Adonis/Core/Application'
import { schema } from '@ioc:Adonis/Core/Validator'

export default class MenusController {
  public async index({response}: HttpContextContract) {
    try {
      const menu = await Database.table('menus')
      // const menu = await Menu.all()
  
      response.json({
        data : {
          "menu" : menu
        }
      })
    } catch (error) {
       // Tangani kesalahan di sini
       console.error(error)
       return response.status(500).json({
         message: 'Terjadi kesalahan dalam mengambil Data.',
       })
    }
  }



  public async store({request, response}: HttpContextContract) {

    try {
      const {nama_menu }= request.body();

      const postSchema = schema.create({
        images: schema.file({
          size: '2mb',
          extnames: ['jpg', 'gif', 'png'],
        }),
        nama_menu: schema.string()
      })
    
      const payload = await request.validate({ schema: postSchema })

      await payload.images.move(Application.tmpPath('uploads'))

      Menu.create({
        nama_menu:nama_menu,
        images: payload.images.fileName
      })

  
      response.json({
        data :{
          "menu" : `Data dengan nama ${nama_menu} berhasil ditambahkan`
        }
      })
    } catch (error) {
        // Tangani kesalahan di sini
        console.error(error)
        return response.status(500).json({
          message: 'Terjadi kesalahan dalam mengambil Data.',
        })
    }

   

  }


  public async show({ response, params }: HttpContextContract) {
    try {
      // Dapatkan id_menu dari params
      const { id } = params;
  
      // Ambil data menu berdasarkan id_menu yang diterima
      const menu = await Menu.query().where('id_menu',id).firstOrFail();
  
      return response.json({
        data: {
          message: "Menu berhasil ditemukan",
          menu: menu,
        }
      });
  
    } catch (error) {
      if (error.code === 'E_ROW_NOT_FOUND') {
        // Handle error when no data is found
        return response.status(404).json({
          message: 'Data tidak ditemukan.',
        });
      } else {
        // Handle other errors
        console.error(error);
        return response.status(500).json({
          message: 'Terjadi kesalahan dalam mengambil Data.',
        });
      }
    }
  }
  


  public async update({params,request,response}: HttpContextContract) {
   try {
    const { id }  = params
    const { nama_menu } = request.body()

    await Menu
    .query()
    .where('id_menu', id)
    .update({ nama_menu: nama_menu })
  

    response.status(201).json({
      message : `Berhasil Meng Update Data ${nama_menu}` ,
      
    });
   } catch (error) {

    // Handel Error
    console.error(error);
    response.status(500).json({
      message : "Terjadi Kesalahan Pada Sistem",
      
    });
   }
  }

  public async destroy({params,response}: HttpContextContract) {
    try {
      
      const { id } = params;


      // Get Ambil Data user by id
      const menu = await Menu.query().where('id_menu',id).firstOrFail()

      await menu.delete()

      return response.json({
        data : {
          "message" : `Data dengan id ${id} berhasil di Hapus`
        }
      })
    } catch (error) {
      console.error(error);
      response.status(500).json({
        data :{
          message : "Kesalahan Pada server 123"
        }
      })
    }
  }

}
