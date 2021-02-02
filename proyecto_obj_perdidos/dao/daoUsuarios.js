const Usuario = require('../models/usuarios')
const mailer = require('../modules/mailer')
let daoUsuarios={}

//guardar
daoUsuarios.guardar=function guardar(usuario){

    let u = new Usuario(usuario)
      //la validacion la llamariamos aqui
    if(u.errores.length>0)
    u.save().then(mailer.send(u.email))
}

daoUsuarios.getUsuarioByEmail=function getUsuarioByEmail(email){
    return new Promise((resolve)=>{
        resolve(Usuario.findOne({email:email}))
    })
    
}
//obtener

//eliminar

//modificar

//listar



module.exports = daoUsuarios