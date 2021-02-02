const mongoose = require("mongoose")
const {Model, Schema} = mongoose

const schema = new Schema({
    nombreyapellido: {type:String, required: true},
    telefono: {type:String, required:true},
    categoria:{type:String, required:true},
    localizacion:{type:String, required:true},
    fecha:{type:String, required:true},
    file:{type:String,default:'/images/default.png'}
})


class Objeto extends Model{
  errores=[]
  //constructor

  //get y set
  get errores(){
      let errores=[]
      if(this.nombre=="") errores.push({error:"Nombre vacío, es obligatorio."})
      if(this.telefono=="") errores.push({error:"Telefono vacío, es obligatorio"})
      return errores
  }
  //metodos otros

}


schema.loadClass(Objeto)
module.exports=mongoose.model('objetosperdidos',schema)