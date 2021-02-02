
const express = require('express')
const rtUsers = express.Router()
const daoUsuarios = require('../dao/daoUsuarios')
const Usuario = require('../models/usuarios')
const mailer = require('../modules/mailer');
const fs = require('fs')


rtUsers.post('/acceder', (req,res)=>{
  res.render('home')   
})


rtUsers.post('/registrar',(req,res)=>{
    daoUsuarios.guardar(req.body)  
    mailer.send(req.body.email)  
    res.render('home',{msg:"Usuario guardado correctamente. Revise su email para activar su cuenta."})
})


//comparar la contraseña y hacer el login
rtUsers.get('/comprobar/:pwd',async (req,res)=>{
    let pwd=req.params.pwd
    let u = await daoUsuarios.getUsuarioByEmail('sagatzt@gmail.com')
    res.send("La comparación salió: " + await u.comprobarPwd(pwd))
})

module.exports= rtUsers