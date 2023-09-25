import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User';
import Hash from '@ioc:Adonis/Core/Hash'
// import Schema from '@ioc:Adonis/Lucid/Schema';
import { schema ,rules,} from '@ioc:Adonis/Core/Validator'

export default class AuthController {

    public async redirect({ally,response}: HttpContextContract) {
      
        const twtitter = await ally.use('twitter')
        return   response.json(twtitter)
    }

    public async handleCallback ({ally}: HttpContextContract) {
        const twitterUser = ally.use('twitter');
        if (twitterUser.hasError()) {
            console.error(twitterUser.getError()); // Tampilkan pesan kesalahan ke konsol
            return 'Terjadi kesalahan selama autentikasi Twitter.';
          }
        /**
         * User has explicitly denied the login request
         */
        if (twitterUser.accessDenied()) {
            return 'Access was denied'
        }

        /**
         * Unable to verify the CSRF state
         */
        if (twitterUser.stateMisMatch()) {
            return 'Request expired. try again'
        }

        /**
         * There was an unknown error during the redirect
         */
        if (twitterUser.hasError()) {
            return twitterUser.getError()
        }

        /**
         * Finally, access the user
         */
   

    

     
    }


    public async register({ request, response }: HttpContextContract) {
        try {
        // Ambil Variable dari request body
        const { email, password, nohp } = request.body();
    
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
          });
      
          return response.status(201).json({
            message: "Berhasil Daftar",
            user: user,

          });
        } catch (error) {
         // Validasi gagal, kirim pesan kesalahan
         return response.status(422).json(error.messages)
        //   response.status(500).json({
        //     message: "Terjadi kesalahan server",
        //   });
        }
      }
      

    public async login({request,response,auth}: HttpContextContract) {
        
        // Req Body Email Password
        const { email,password } = request.body();

        // Cek email  apakah Ada
        const user = await User.query().where({email:email}).first();
        if (!user) {
            return response.status(422).json({
                message: "Email Tidak Terdaftar"
            })
        }

         // Verify password
        if (!(await Hash.verify(user.password, password))) {
            return response.status(422).json({
                message: "Password Salah"
            })
        }

          
        


        // Generate Token
         const token = await auth.use('api').generate(user)


        return response.status(201).json({
          
                message : "Berhasil Login",
                user :user,
                token :token
            
        })

       

  
    }

    public async keluar({response,auth} : HttpContextContract) {

        try {
            // Ambil pengguna yang saat ini masuk
            // const user = auth.user
      
            // Revoke semua token pengguna
            await auth.use('api').revoke()
      
            return response.status(200).json({
              message: 'Token berhasil dicabut',
            })
          } catch (error) {
            return response.status(500).json({
              message: 'Terjadi kesalahan saat mencabut token',
              error: error.message,
            })
          }
    }
    
}