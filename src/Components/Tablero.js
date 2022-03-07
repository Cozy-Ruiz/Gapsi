import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export function TableroProveedores(){

    const [proveedores, setProveedores] = useState([]);

    useEffect(() => {
        obtenProveedores();
    }, []);

    const obtenProveedores = () => {

        axios.post('http://localhost:8080/obtenProveedores')
        .then((response) => {
            setProveedores(response.data);
            console.log(response.data);
            console.log(response.status);
            console.log(response.statusText);
            console.log(response.headers);
            console.log(response.config);
        });
    };
    
    const eliminaProveedor = (e) => {
        e.preventDefault();

        //alert('Eliminando proveedor ' + e.target.name);

        axios.post('http://localhost:8080/elimina', { 
            nombre : e.target.name
        })
        .then((response) => {
            obtenProveedores();
            console.log(response.data);
            console.log(response.status);
            console.log(response.statusText);
            console.log(response.headers);
            console.log(response.config);
        });
    };

    return(
        <div id="contenedor">
            <div id="header-tablero"><img src="./Equipo.png"></img>Administración de proveedores</div>
            <div id="agregarProveedor" align="right"><img src="./botonAzul.png"></img> <Link to="/agregar">Agregar proveedor</Link></div>
            <div align="center">
                <table id="table-proveedores">
                    <tbody>
                        <tr>
                            <td align="center">Estatus</td>
                            <td>Nombre</td>
                            <td>Razon Social</td>
                            <td>Direccion</td>
                            <td align="center">Acciones</td>
                        </tr>
                        {proveedores.map(proveedor => (
                            <tr>
                                <td align="center">
                                    <img src="./botonVerde.png"></img>
                                </td>
                                <td>{proveedor.nombre}</td>
                                <td>{proveedor.razonSocial}</td>
                                <td>{proveedor.direccion}</td>
                                <td align="center"><img id="imagenEliminar" name={proveedor.nombre} onClick={eliminaProveedor} src="./botonEliminar.png"></img></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div></div>
        </div>
    );
}

export default TableroProveedores;