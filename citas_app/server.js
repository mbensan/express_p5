const express = require('express')

const app = express()

// Middlewares
app.use(express.static('static'))
app.use(express.static('node_modules/bootstrap/dist'))
app.use(express.static('node_modules/axios/dist'))

// Obtengo las rutas de archivos externos
const rutas_api = require('./routes/api.js')
app.use('/api', rutas_api)


app.listen(3000, () => console.log('conectados en puerto 3000'))
