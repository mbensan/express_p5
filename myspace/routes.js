const express = require('express')
const { get_user, create_user } = require('./db.js')

const router = express.Router()

const users = [
  {
    name: 'Hugo Muñoz',
    password: '12345',
    email: 'hugo@gmail.com'
  },
  {
    name: 'Paula Inzunza',
    password: '54321',
    email: 'paula@gmail.com'
  },
  {
    name: 'Carlos Horta',
    password: '98765',
    email: 'carlos@gmail.com'
  }
] 

// RUTAS
router.get('/', (req, res) => {
  res.render('index.html')
})

router.get('/login', (req, res) => {
  res.render('login.html')
})

router.post('/login', (req, res) => {
  // 0. Recuperamos los campos del formulario
  const email = req.body.email
  const password = req.body.password

  // 1. Revisamos si efectivamente existe el usuario
  /* versión con for ... of ...
    let user_encontrado;
    for (let user of users) {
      if (email == user.email) {
        user_encontrado = user
        break
      }
    }
  */
  const user_encontrado = users.find( function(us) { return us.email == email } )
  if (!user_encontrado) {
    return res.send('Usuario inexistente o contraseña incorrecta')
  }
  //  2. Revisamos que las contraseñas coincidan
  if (user_encontrado.password != password) {
    return res.send('Usuario inexistente o contraseña incorrecta')
  }

  // 3. Redirigir al usuario al Home
  res.redirect('/')
})

router.get('/register', (req, res) => {
  const errors = req.flash('errors')
  res.render('register.html', { errors })
})

router.post('/register', async (req, res) => {
  // 1. Recuperar los campos del formulario
  const name = req.body.name
  const email = req.body.email
  const password = req.body.password
  const password_confirm = req.body.password_confirm

  // 2. Validar que ambas contraseñas sean iguales
  if (password != password_confirm) {
    req.flash('errors', 'Las contraseñas no coinciden')
    return res.redirect('/register')
  }
  
  // 3. Validar que no exista otro usuario con el mismo correo
  const user = await get_user(email)
  if (user) {
    req.flash('errors', 'Este email ya se encuentra registrado')
    return res.redirect('/register')
  }

  // 4. Finalmente podemos guardar el nuevo usuario
  await create_user(name, email, password)

  res.redirect('/')
})

module.exports = router