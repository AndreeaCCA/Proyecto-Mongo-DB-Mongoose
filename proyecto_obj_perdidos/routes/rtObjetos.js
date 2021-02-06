const express = require('express')
const rtObjetos = express.Router()
const daoObjetos = require('../dao/daoObjetos')


rtObjetos.get('/registrarObjeto', (req, res) => {
/*     if (req.session.autentificado == true) {
 */        res.render('registrarObjeto')
   /*  }
    else
       res.render ('index') */
})



rtObjetos.post('/registrarObjeto', function (req, res) {
    req.body.file = `/images/${req.files.file.name}`
    daoObjetos.guardar(req.body)
        .then(resp => {
            console.log(req.files)
            let archivo = req.files.file
            archivo.mv(`./public/images/${archivo.name}`, err => {
                if (err) return res.status(500).send({ message: err })
                res.render('registrarObjeto', { msg: "Has registrado con exito el objeto perdido" })
            })
        })
})


rtObjetos.get('/buscarObjeto', async function (req, res) {
    let misObjetos = await daoObjetos.listar()
    console.log(misObjetos)
        res.render('listado', { objetosPerdidos: misObjetos })
})

rtObjetos.post('/categoria', async function (req, res) {
    var categoria = req.body.categoria
    let misObjetos = await daoObjetos.listaPorCategoria(categoria)
    res.render('listado', { objetosPerdidos: misObjetos })
})

module.exports = rtObjetos