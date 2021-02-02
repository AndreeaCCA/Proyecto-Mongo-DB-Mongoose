const express = require('express')
const rtMain = express.Router()


rtMain.get ('/', (req,res)=>{
  res.render('index')
})


module.exports = rtMain