const Usuario = require('../models/usuarios')
const mailer = require('../modules/mailer')
let daoUsuarios={}

//guardar
daoUsuarios.guardar=function guardar(usuario){
    return new Promise((resolved)=>{
        let u = new Usuario(usuario)
        console.log(u)
        u.save()
            .then(()=>{
                mailer.send(u.email)
                resolved(u)
            })
            .catch(err=>resolved(err))
    })
}

daoUsuarios.getUsuarioByEmail=function getUsuarioByEmail(email){
    return new Promise((resolve)=>{
        resolve(Usuario.findOne({email:email})) //findOne mongoose query; buscamos solo uno en este caso solo find no nos vale
    })
    
}

daoUsuarios.acceder=function acceder(credenciales){
    return new Promise((resolved)=>{
    daoUsuarios.getUsuarioByEmail(credenciales.email)
        .then(async usuario=>{
            let respuesta=await usuario.comprobarPwd(credenciales.password)
            resolved(respuesta)
        })
    })
}

//obtener

//eliminar

//modificar

//listar



module.exports = daoUsuarios