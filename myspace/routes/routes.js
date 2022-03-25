const express = require('express')

const router = express.Router()

function protected_route (req, res, next) {
  if (!req.session.user) {
    return res.redirect('/login')
  }
  next()
}

// RUTAS
router.get('/', protected_route, (req, res) => {
  const user = req.session.user
  res.render('index.html', { user })
})

router.get('/seguidos', protected_route, (req, res) => {
  const user = req.session.user
  res.render('seguidos.html', { user })
})

module.exports = router
