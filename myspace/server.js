const express = require('express')
const nunjucks = require('nunjucks')
const session = require('express-session')
const flash = require('connect-flash')

const app = express()

// CONFIGURACIONES
app.use(express.static('static'))

nunjucks.configure("templates", {
  express: app,
  autoscape: true,
  watch: true,
});

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use(session({
  secret: 'mi-clave',
  cookie: { maxAge: 1000*60*60*24 }
}))

app.use(flash())

// RUTAS
app.use(require('./routes.js'))

const PORT = 3000
app.listen(PORT, () => console.log(`Servidor escuchando en el puerto ${PORT}`))
