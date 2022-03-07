var express = require('express');
var app = express() 
app.use(express.urlencoded());
app.use(express.json());

var port = process.env.PORT || 8080  // establecemos nuestro puerto

function writeJson(params){

    const fs = require('fs');
    var estatusExiste = false;

    // Ahora lee el archivo json
    fs.readFile('./bd.json',function(err,data){
        if(err){
            return console.error(err);
        }
        var proveedores = data.toString();// Convertir datos binarios a cadena
        proveedores = JSON.parse(proveedores);// Convierte la cadena en un objeto json

        for(var i = 0; i<proveedores.length; i++){
            console.log(params.nombre + "-" + proveedores[i].nombre);
            if(params.nombre == proveedores[i].nombre){
                estatusExiste = true;
                return console.log("Registro ya existe");
            }
        }
        
        proveedores.push(params);// Empuja el objeto pasado en el objeto de matriz

        var str = JSON.stringify(proveedores);// Debido a que el archivo de escritura de nodejs solo reconoce cadenas o números binarios, el objeto json se convierte en una cadena y se reescribe en el archivo json
        fs.writeFile('./bd.json',str,function(err){
            if(err){
                console.error(err);
            }
            console.log('----------agregado exitosamente-------------');
        })
        
    })

}

function deleteJson(nombre){
    console.log("Parametro de entrada");
    console.log(nombre);

    
    const fs = require('fs');

    fs.readFile('./bd.json',function(err,data){
        if(err){
            return console.error(err);
        }
        var proveedores = data.toString();
        proveedores = JSON.parse(proveedores);
        
        // Leer los datos para eliminar
        for(var i = 0; i<proveedores.length; i++){
            console.log(nombre.nombre + "-" + proveedores[i].nombre);
            if(nombre.nombre == proveedores[i].nombre){
                console.log(proveedores[i])
                proveedores.splice(i,1);
            }
        }
        console.log(proveedores);

        var str = JSON.stringify(proveedores);
        // Luego escribe los datos en
        fs.writeFile('./bd.json',str,function(err){
            if(err){
                console.error(err);
            }
            console.log("---------- eliminado correctamente ------------");
        })
        
    })
    
}

function verificaExistencia(params, callback){

    const fs = require('fs');
    var estatusExiste = false;

    // Ahora lee el archivo json
    fs.readFile('./bd.json',function(err,data){
        if(err){
            return console.error(err);
        }
        var proveedores = data.toString();// Convertir datos binarios a cadena
        proveedores = JSON.parse(proveedores);// Convierte la cadena en un objeto json

        for(var i = 0; i<proveedores.length; i++){
            console.log(params.nombre + "-" + proveedores[i].nombre);
            if(params.nombre == proveedores[i].nombre){
                estatusExiste = true;
                console.log(estatusExiste);
            }
        }
    })

    return callback(estatusExiste);

}

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000") // update to match the domain you will make the request from
    // Metodos de solicitud que deseas permitir
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    // Encabecedados que permites (ej. 'X-Requested-With,content-type')
    res.setHeader('Access-Control-Allow-Headers', '*');
    
    if (req.method === "OPTIONS") {
      res.status(200).end();
    } else {
      next()
    }
  });

app.post('/registro', function(req, res) {
    
    const fs = require('fs');
    var estatusExiste = false;

    // Ahora lee el archivo json
    fs.readFile('./bd.json',function(err,data){
        if(err){
            return console.error(err);
        }
        var proveedores = data.toString();// Convertir datos binarios a cadena
        proveedores = JSON.parse(proveedores);// Convierte la cadena en un objeto json

        for(var i = 0; i<proveedores.length; i++){
            console.log(req.body.nombre + "-" + proveedores[i].nombre);
            if(req.body.nombre == proveedores[i].nombre){
                estatusExiste = true;
            }
        }

        if(estatusExiste == true){
            res.json({ mensaje: "Registro ya existe" });
        }else{
            writeJson(req.body);
            res.json({ mensaje: 'Método post registro' });  
        }
    })
    
})

app.post('/elimina', function(req, res) {
    
    deleteJson(req.body);

    res.json({ mensaje: 'Método post elimina' }) 
})

app.post('/obtenProveedores', function(req, res) {
    const fs = require('fs');

    let rawdata = fs.readFileSync('bd.json');
    let proveedores = JSON.parse(rawdata);
    console.log(proveedores);

    res.json(proveedores)   
})

app.post('/getVersionApp', function(req, res) {
    res.json({ mensaje: '0.0.1' })  
})

app.post('/getCandidatoNumber', function(req, res) {
    res.json({ mensaje: '01' })   
})

app.del('/', function(req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    res.json({ mensaje: 'Método delete' })  
})

app.post('/', function(req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    res.json({ mensaje: 'Método post' })   
})

app.get('/', function(req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    res.json({ mensaje: '¡Bienvenido servicio REST Gapsi!' })   
})

// iniciamos nuestro servidor
app.listen(port)
console.log('API escuchando en el puerto ' + port)