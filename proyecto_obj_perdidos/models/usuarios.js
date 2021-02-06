const mongoose = require("mongoose")
const {Schema} = mongoose
const beautifyUnique = require('mongoose-beautiful-unique-validation')

const bcrypt = require('bcrypt')

const schemaUsuario = new Schema({
    nombreyapellido: {type:String},
    email: {type:String,
         required:[true, 'El email es obligatorio'], 
         index: true, 
         unique: 'Existe una cuenta creada con el mismo correo electronico ({body.email})',
         lowercase: true},
    password:{type:String, required:[true, 'El password es obligatorio']},
    activo:{type:Boolean, default: false}
})

//esta función "captura" el método save() y ejecuta primero
//todo el código que tiene dentro. En este caso, antes de 
//guardar un usuario, hasheará el password: ;)
schemaUsuario.pre('save', function(next) {               //metodo pre es decir antes de guardar ejecuta bcrypt
    bcrypt.hash(this.password, 10)                       //nivel de encriptacion
        .then(hash=>{
            this.password = hash
            next()
        })
})

class Usuario{
    //get y set
    set emailMal(pepe){
        this.email=pepe.toLowerCase()
    }

 /*   get errores(){
        let errores=[]
        if(this.email=="") errores.push({error:"email vacío, es obligatorio."})
        if(this.password=="") errores.push({error:"password vacío, es obligatorio"})
        //validamos el email

        return errores 
    }*/


    //privados
    comprobarPwd(password){
        return bcrypt.compare(password, this.password)  //password es el passsword que introduce el usuario y el this.password es el rellena cuando accede de nuevo
            .then(res=>{return res})
    }
}

//plugin
schemaUsuario.plugin(beautifyUnique)
schemaUsuario.loadClass(Usuario)
module.exports=mongoose.model('usuarios',schemaUsuario)