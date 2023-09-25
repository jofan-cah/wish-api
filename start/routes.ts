/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'


Route.get('/', async () => {
  return { hello: 'world' }
})

// Route.get('/users', 'UsersController.index')

Route.post('/api/register', 'AuthController.register')
Route.post('/api/login', 'AuthController.login')

Route.group(() => {
  // Route.resource('/menu' , 'MenusController')
  Route.resource('/api/menu' , 'MenusController')
  Route.resource('/api/users' , 'UsersController')
  Route.resource('/api/notes' , 'NotesController')
  
}).middleware('auth')
Route.post('/api/keluar', 'AuthController.keluar')


// SIGN IN ROUTES
Route.get('/twitter', 'AuthController.redirect');

//OAuth CALLBACK
Route.get('/twitter-callback', 'AuthController.handleCallback');