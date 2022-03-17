const express = require('express')
const fs = require('fs').promises


const app = express()

// Middlewares
app.use(express.static('static'))
app.use(express.static('node_modules/bootstrap/dist'))
app.use(express.static('node_modules/axios/dist'))

// Abrir el archivo db.json
let db;
async function init() {
  db = await fs.readFile('./db.json', 'utf-8')
  db = JSON.parse(db)
}
init()

function pass_only (req, res, next) {
  // Si no tiene un pass en sus headers, se le manda un error
  //  y no le permite seguir avanzando
  if (req.headers.pass != '12345') {
    res.status(403)
    return res.send('Usted no tiene acceso')
  }
  next()
}

// Nuestras rutas
app.get('/api/citas', pass_only, (req, res) => {
  res.json(db.citas)
})


app.listen(3000, () => console.log('conectados en puerto 3000'))
