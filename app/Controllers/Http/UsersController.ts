import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
// import Database from '@ioc:Adonis/Lucid/Database'
import User from 'App/Models/User';
import Hash from '@ioc:Adonis/Core/Hash'
import Database from '@ioc:Adonis/Lucid/Database';


export default class UsersController {
  public async index({response,request}: HttpContextContract) {
    // let user;
    try {

      // const user = auth.user;

      // // Mengakses email pengguna
      // const userEmail = user?.email;

      // response.json(userEmail)
      // const {page,limit} = request.headers();

      const page = request.input('page',1)
      const limit = request.input('limit',2)
      const data = await Database.from('users').paginate(page ,limit)

      // const posts = await User.all()
      // const postsJSON = posts.map((post) => post.serialize())

      // return response.json(postsJSON);


      return response.json({
         data
      })


    } catch (error) {
      // Tangani kesalahan di sini
      console.error(error)
      return response.status(500).json({
        message: 'Terjadi kesalahan dalam mengambil data.',
      })
    }
  }



  public async store({request,response}: HttpContextContract) {

    try {
            
        
      // Req Body Email Password
      const { email,password } = request.body();

      // Cek email Lama apakah Ada
      const oldEmail = await User.query().where({email:email}).first();
      if (oldEmail) {
          return response.status(422).json({
              message:"Email Sudah Terdaftar"
          })
      }
      // Lakukan Hasing
      const hashedPassword = await Hash.make(password)

      // Tambah Data User
      const user = await User.create({
          email:email,
          password:hashedPassword
      })
      // Generate Token
       
      //  const token = await auth.use('api').generate(user)


      return response.status(201).json({

              message : "Berhasil Daftar",
              user :user,
              // token :token
   
      })
  } catch (error) {
      response.status(500).json({
          message: "Error Server"
      })
  }
    
  }

  public async show({response,params}: HttpContextContract) {

    try {
      const {id} = params;

      const users = await User.query()
                    .where({id:id})
                    .firstOrFail()
  
          return response.json({
            suksess : {
              data : users
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


  public async update({params,request,response}: HttpContextContract) {
   try {
     // Get params
     const {id} = params;
     // Get Body
     const {email,password} = request.body()
     // Get Ambil Data user by id
     const users = await User.query().where({id:id}).firstOrFail()
 
     // Query Update 
     users.merge({
       email :email,
       password : password
     }).save()
 
     // Query Update 2
     // users.email = email
     // users.password = password
     // users.save()
 
     // // Query Update 3
     // await User.query().where({id:id}).update({email:email,password:password})
 
 
     return response.json({
       data : {
         "message" : `Data dengan id ${id} berhasil di Update`
       }
     })
   } catch (error) {
     // Tangani kesalahan di sini
     console.error(error)
     return response.status(500).json({
       message: 'Terjadi kesalahan dalam Meng Update Data.',
     })
   }


  }

  public async destroy({params, response}: HttpContextContract) {

  try {
    const {id} = params;

// Get Ambil Data user by id
    const users = await User.query().where({id:id}).firstOrFail()

    await users.delete()

    return response.json({
      data : {
        "message" : `Data dengan id ${id} berhasil di Hapus`
      }
    })
  } catch (error) {
     // Tangani kesalahan di sini
     console.error(error)
     return response.status(500).json({
       message: 'Id Tidak di temukan ',
     })
  }

  }
}
