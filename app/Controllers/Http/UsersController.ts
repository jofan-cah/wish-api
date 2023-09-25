import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
// import Database from '@ioc:Adonis/Lucid/Database'
import User from 'App/Models/User';
import Hash from '@ioc:Adonis/Core/Hash'
import Database from '@ioc:Adonis/Lucid/Database';
import { schema ,rules,} from '@ioc:Adonis/Core/Validator'
// import { Application } from '@adonisjs/core/build/standalone';
import Application from '@ioc:Adonis/Core/Application'
// import { schema } from '@ioc:Adonis/Core/Validator'
import fs from 'fs';



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
            
      // Ambil Variable dari request body
      const { email, password, nohp ,age,tb ,gender} = request.body();
  
      // Cek validasi 
        const emailSchema = schema.create({
          email: schema.string({}, [
            rules.email(),
            rules.required()
          ]),
          password: schema.string({},[
              rules.required(),
              rules.minLength(4)
          ]),
          nohp: schema.string({},[
              rules.required(),
              rules.minLength(10),

              rules.maxLength(14)
          ])
        })
    
      //   Kirim Validasi Unutuk Scema Mesages custom
        await request.validate({
          schema: emailSchema,
          messages: {
              'email.email': 'Email harus dalam format yang valid.',
              'email.required': 'Email harus diisi.',
              'password.required': 'Password harus diisi.',
              'password.minLength': 'Password mimin 4 karakter',
              'nohp.minLength': 'Password mimin 4 karakter',
              'nohp.maxLength': 'Password max 14 karakter',
          }
        })
      // Pengecekan email dan password
        const existingUser = await User.query()
          .where('email', email)
          .orWhere('nohp', nohp)
          .first();
    
        if (existingUser) {
          return response.status(422).json({
            message: "Email/No HP Sudah Terdaftar",
          });
        }
    
        const hashedPassword = await Hash.make(password);
        const user = await User.create({
          email: email,
          password: hashedPassword,
          nohp: nohp,
          age:age,
          tb:tb,
          gender:gender
        });
    
        return response.status(201).json({
          message: "Berhasil Daftar",
          user: user,

        });
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
    //  const {email,password} = request.body()
    const { email ,password, nohp ,age,tb ,gender} = request.body();

     // Get Ambil Data user by id
    const users = await User.query().where({id:id}).firstOrFail()
     // Periksa apakah password dirubah
     if (password) {
      const hashedPassword = await Hash.make(password);
      users.password = hashedPassword;
    }


    const postSchema = schema.create({
      avatar: schema.file({
        size: '2mb',
        extnames: ['jpg', 'gif', 'png'],
      }),
    
    })
  
    const payload = await request.validate({ schema: postSchema })

    // Hapus avatar lama jika ada
    if (users.avatar) {
      // Konstruksi path ke avatar lama
      const oldAvatarPath = Application.publicPath('avatar') + '/' + users.avatar;

      // Hapus file avatar lama
      await fs.promises.unlink(oldAvatarPath);
    }

    await payload.avatar.move(Application.publicPath('avatar'), {
      name: `${new Date().getTime()}.${payload.avatar.extname}`,
    });

     // Query Update 
     users.merge({
      email: email,
      nohp: nohp,
      age:age,
      tb:tb,
      gender:gender,
      avatar:payload.avatar.fileName
     }).save()

 
     return response.json({
       data : {
         "message" : `Data dengan id ${id} berhasil di Update`
       }
     })
   } catch (error) {
     // Tangani kesalahan di sini
     console.error(error)
     return response.status(500).json(error)
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
