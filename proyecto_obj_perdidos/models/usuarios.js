const mongoose = require("mongoose")
const {Schema} = mongoose

const bcrypt = require('bcrypt')

const schemaUsuario = new Schema({
    nombreyapellido: {type:String},
    email: {type:String, required:true, index: { unique: true } },
    password:{type:String, required:true}
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
    get errores(){
        let errores=[]
        if(this.email=="") errores.push({error:"email vacío, es obligatorio."})
        if(this.password=="") errores.push({error:"password vacío, es obligatorio"})
        //validamos el email

        return errores
    }
    //privados
    comprobarPwd(password){
        return bcrypt.compare(password, this.password)
            .then(res=>{return res})
    }
}

schemaUsuario.loadClass(Usuario)
module.exports=mongoose.model('usuario',schemaUsuario)