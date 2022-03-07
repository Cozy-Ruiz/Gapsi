Proyecto Gapsi

Tecnologias utilizadas:

Node.js 16.14
React + hooks 17.0.2
HTML 5 
javascript
CSS3
Servicios Rest cliente (React + Axios) y Servicio (Express)


Repositorio de proyecto

https://github.com/Cozy-Ruiz/Gapsi

Una vez descargado intalar dependencias de node_modules


En el folder del proyecto, puedes correrlo con el sig comando:

### `node Server.js` //para el servicio REST
### `npm start` //para el servicio WEB

Correr app en modo desarrollo.
Open [http://localhost:3000](http://localhost:3000).

La paguina se recargara cuando se realicen cambios.


Servicios REST

http:localhost:8080
    Mensaje de Bienvenida

http:localhost:8080/registro
    Registra un nuevo elemento en la lista de proveedores

http:localhost:8080/elimina
    Elimina el registro indicado por el nombre de la lista de proveedores

http:localhost:8080/obtenProveedores
    Obtiene un arreglo con el listado de todos los proveedores actualmente registrados

http:localhost:8080/getVersionApp
    Obtiene la version actual de la app

http:localhost:8080/getCandidatoNumber
    Obtiene el numero de candidato