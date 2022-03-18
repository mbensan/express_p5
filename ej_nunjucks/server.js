const express = require('express')
const axios = require('axios')
const nunjucks = require('nunjucks')

const app = express()

// Configuraciones
app.use(express.static('static'))

// se configura nunjucks
nunjucks.configure("templates", {
  express: app,
  autoscape: true,
  watch: true,
});

app.get('/', (req, res) => {
  const persona = {
    nombre: 'Carlos',
    apellido: 'Horta',
    gustaGuatitas: true
  }
  const frutas = ['mango', 'banana', 'guayaba', 'piña']

  res.render('index.html', {persona, frutas})
})


app.listen(3000, () => console.log('Servidorejecutando en puerto 3000'))

