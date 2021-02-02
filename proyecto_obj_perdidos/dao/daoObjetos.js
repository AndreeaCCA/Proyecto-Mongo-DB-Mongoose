
const Objeto = require('../models/objetos')
const daoObjetos={}


//guardar
daoObjetos.guardar = function save(objeto){
    return new Promise((resolved, reject)=>{
        let o = new Objeto(objeto)
        console.log(o)
        if(o.errores && o.errores.length==0 ) o.save()
        
        resolved(o)
    })
}


//listar
daoObjetos.listar = function find() {
    return new Promise((resolved, reject) => {
        resolved(Objeto.find().lean())
    })
}

//buscar
daoObjetos.listaPorCategoria = function findByCategory(categoria){
    return new Promise((resolved, reject)=>{
        resolved(Objeto.find({categoria:categoria}).lean())
    })

}


module.exports = daoObjetos