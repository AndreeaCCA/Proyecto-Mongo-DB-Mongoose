
const express = require('express')
const rtUsers = express.Router()
const daoUsuarios = require('../dao/daoUsuarios')
const Usuario = require('../models/usuarios')
const mailer = require('../modules/mailer');
const fs = require('fs')


rtUsers.post('/acceder', (req, res) => {
  req.session.usuario = 'Antonio' // creo la sesion
  res.locals.session = req.session // la inyecto
  daoUsuarios.acceder(req.body)
    .then(respuesta => {
      if (respuesta == true) {
/*         req.session.autentificado = true
 */        res.render('home', { body: req.body, msg1: "Password Correcto" })
      }
      /* else if (usuario == null) // revisar null
        res.render('index', { body: req.body, msg1: "Usuario Incorrecto" }) */
      else
        res.render('index', { body: req.body, msg1: "Password Incorrecto" })
    })
    .catch(err => {
      res.render('index', { body: req.body, msg1: "Lo sentimos no se han podido revisar los datos, intentelo mas tarde..." })
    })
})


rtUsers.post('/registrar', (req, res) => {
  daoUsuarios.guardar(req.body)
  mailer.send(req.body.email)
    .then(resp => {
      res.render('index', { msg: "Usuario guardado correctamente. Revise su email para activar su cuenta." })
    })/* .catch((err) => {
      res.render('index', { msg: err })
      if (err.code == 1100) {
        res.render('registro', { errEmail: true })
      }
      else if (err.path == 'pasword')
        res.render('registro', { errPass: true })
      else {
        res.render('registro', { mensage: err })
      }
    }) */
})



//comparar la contraseña y hacer el login
rtUsers.get('/comprobar/:pwd', async (req, res) => {
  let pwd = req.params.pwd
  let u = await daoUsuarios.getUsuarioByEmail('sagatzt@gmail.com')
  res.send("La comparación salió: " + await u.comprobarPwd(pwd))
})

module.exports = rtUsers