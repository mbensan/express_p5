const express = require('express')

const app = express()

// Middlewares
app.use(express.static('static'))
app.use(express.static('node_modules/bootstrap/dist'))
app.use(express.static('node_modules/axios/dist'))

app.use(express.json())

// Obtengo las rutas de archivos externos
const rutas_api = require('./routes/api.js')
app.use('/api', rutas_api)


app.post('/buscar/:comuna/:barrio', async (req, res) => {
  console.log('params', req.params);
  console.log('query', req.query);
  console.log('headers', req.headers);
  // Sólo para POST
  console.log('body', req.body);

  res.send('No se encontraron propiedades')
})

app.listen(3000, () => console.log('conectados en puerto 3000'))
