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
  res.render('index.html')
})

router.get('/seguidos', protected_route, (req, res) => {
  res.render('seguidos.html')
})

module.exports = router
