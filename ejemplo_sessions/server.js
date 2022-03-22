const express = require('express')
const nunjucks = require('nunjucks')
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


const PORT = 3000
app.listen(PORT, () => console.log(`Servidor escuchando en el puerto ${PORT}`))
