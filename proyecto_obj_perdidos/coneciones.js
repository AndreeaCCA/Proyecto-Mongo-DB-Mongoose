mongoose = require('mongoose')

mongoose.connect('mongodb://usuario:1234@localhost:27017/proyectoObjPerdidos',{
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false  
})

module.exports = mongoose.connection






//otra opcion
//conectando con la BD de Mongo
/* mongoose.connect('mongodb://localhost:27017',(err)=>{
    if(err)
    console.log("No se ha podido realiar la conexion con la base de datos MongoDB")
    console.log(err)
})

//revisando la conexion a Mongo
var db = mongoose.connection;
db.on("open", function (ref) { console.log("Conectado to Mongo server."); });
db.on("error", function (ref) {
    console.log("Error en conexion con Mongo");
    connect();
});

modeule.exports = db */