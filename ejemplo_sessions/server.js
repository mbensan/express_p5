const express = require('express')
const nunjucks = require('nunjucks')
const crypto = require('crypto')
const session = require('express-session')

const app = express()

// Configuraciones estáticos
app.use(express.static('static'))

// se configura nunjucks
nunjucks.configure("templates", {
  express: app,
  autoscape: true,
  watch: true,
});

// configuraciones de formulario
app.use(express.json())
app.use(express.urlencoded({extended: true}))

// configuración de sessiones
app.use(session({
  secret: 'mi-clave',
  cookie: { maxAge: 1000*60*60*24 }
}))

// RUTAS
app.get('/frutas', (req, res) => {
  if (!req.session.frutas) {
    req.session.frutas = []
  }
  const frutas = req.session.frutas
  res.json({frutas})
})

app.get('/frutas/add/:fruta', (req, res) => {
  req.session.frutas.push(req.params.fruta)

  res.redirect('/frutas')
})

app.get('/random', (req, res) => {

  if (!req.session.intentos) {
    req.session.intentos = 0
  }
  req.session.intentos += 1
  const palabra = crypto.randomBytes(7).toString('hex')

  res.render('random.html', {palabra, intentos: req.session.intentos})
});

app.get('/random/reset', (req, res) => {
  req.session.intentos = 0
  res.redirect('/random')
});


const PORT = 3000
app.listen(PORT, () => console.log(`Servidor escuchando en el puerto ${PORT}`))
