import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';

export function Agregar(){

    const [proveedor , setProveedor] = useState({
        nombre : "",
        razonSocial : "",
        direccion : ""
    })

    const navigate = useNavigate();
    
    const handleSubmitClick = (e) => {
        e.preventDefault();
        
        //alert('Guardando elemento' + proveedor.nombre + "-" + proveedor.razonSocial + "-" + proveedor.direccion);
        axios.post('http://localhost:8080/registro', { 
            nombre : proveedor.nombre,
            razonSocial : proveedor.razonSocial,
            direccion : proveedor.direccion,
        })
        .then((response) => {

            if(response.data.mensaje == "Registro ya existe"){
                alert("Registro ya existe intente con otro proveedor!!");
            }else{
                navigate('/Tablero', {replace: true});
            }
            
            console.log(response.data);
            /*
            console.log(response.status);
            console.log(response.statusText);
            console.log(response.headers);
            console.log(response.config);
            */
        });
    }

    const handleInputChange = (event) => {
        console.log(event.target.name)
        console.log(event.target.value)
        setProveedor({
            ...proveedor,
            [event.target.name] : event.target.value
        })
    }    

    return(
        <div align="center">
            <div id="header-tablero"><img src="./Equipo.png"></img>Nuevo proveedor</div>

            <hr></hr>

            <form>
                <div className="form-group text-left">
                <label>Nombre</label><br></br>
                <input type="text" 
                    className="form-control" 
                    id="nombre" 
                    name="nombre"
                    aria-describedby="emailHelp" 
                    placeholder="Nombre"
                    onChange={handleInputChange}
                />
                </div>
                <br></br>
                <div className="form-group text-left">
                    <label>Razón Social</label><br></br>
                    <input type="text" 
                        className="form-control" 
                        id="razonSocial" 
                        name="razonSocial"
                        placeholder="Razón Social"
                        onChange={handleInputChange}
                    />
                </div>
                <br></br>
                <div className="form-group text-left">
                    <label>Direccion</label><br></br>
                    <input type="text" 
                        className="form-control" 
                        id="direccion" 
                        name="direccion" 
                        placeholder="Direccion"
                        onChange={handleInputChange}
                    />
                </div>
                <br></br><br></br>
                <button class="boton" type="button"
                    type="submit" 
                    onClick={handleSubmitClick}
                >
                    Registrar
                </button>
            </form>
        </div>
    );
}

export default Agregar;