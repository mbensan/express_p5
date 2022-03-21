const express = require('express')
const nunjucks = require('nunjucks')
const axios = require('axios')

const PORT = 4000
const app = express()


// Configuraciones
app.use(express.static('static'))

app.use(express.json())

// se configura nunjucks
nunjucks.configure("templates", {
  express: app,
  autoscape: true,
  watch: true,
})


app.get('/', async (req, res) => {
  // 1. Obtengo los primeros 30 pokemones
  const { data } = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=30')
  const pokemones = data.results

  // 2. Obtengo el ID de cada pokemon
  pokemones.map(pokemon => {
    pokemon.id = pokemon.url.split('/')[6]
  })

  console.log(pokemones);
  res.render('index.html', {pokemones})
})

app.get('/pokemon/:id', async (req, res) => {
  const id = req.params.id
  const { data } = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}/`)
  console.log('datps de POKEMOn' ,data);
  res.render('pokemon.html', {pokemon: data})
})

app.get('/buscar', (req, res) => {
  res.render('buscador.html')
});


app.listen(PORT, () => console.log(`Servidor ejecutando en puerto ${PORT}`))
