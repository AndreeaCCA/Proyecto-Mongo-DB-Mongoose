const express = require('express')
const app = express()
const rtMain = require('./routes/rtMain')
const rtUsers = require('./routes/rtUsers')
const rtObjetos = require('./routes/rtObjetos')
var exphbs  = require('express-handlebars')
var db  = require('./coneciones')
const fileUpload = require('express-fileupload')
var session = require('express-session')

//configuración del motor de plantillas handlebars
app.engine('.hbs', exphbs({
    extname: '.hbs'
}))
app.set('view engine', '.hbs')

//middlewares
app.use(express.static(__dirname + '/public'))
app.use(express.urlencoded({extended:true}))  
app.use(fileUpload())
app.use(session({
    secret: 'keyboard cat',    //antes  secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }
  }))

  let rutasPrivadas=[
'/objetos/registrarObjeto',
'/objetos/buscarObjeto',
/* '/objetos/listado' */
'/home',
  ]

  app.use((req,res,next)=>{
      if(req.session.autentificado){
          res.locals.sessions =req.session
          next()
    }else{
        if(rutasPrivadas.indexOf(req.url)!=-1){
            res.render('acceso-denegado')
        }else next()
    }
  })



//enrutador principal
app.use('/',rtMain)
app.use('/usuarios',rtUsers)
app.use('/objetos',rtObjetos)


//arrancamos el servidor:
app.listen(8080,(err)=>{
    console.log('Server run on port 8080')
})
//base de datos mongodb
db.on('error',console.error.bind(console,"Error de conexion mongo"))
db.once('open',()=>console.log("Conexión mongo OK!!"))