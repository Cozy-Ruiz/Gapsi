import React, { useEffect, useState }  from "react";
import { Link } from "react-router-dom";
import axios from "axios";


export function HomePage(){

    const [candidatoNumber, setCandidatoNumber] = useState([]);

    useEffect(() => {
        getCandidatoNumber();
    }, []);

    const getCandidatoNumber = () => {

        axios.post('http://localhost:8080/getCandidatoNumber')
        .then((response) => {
            setCandidatoNumber(response.data);
            console.log(response.data);
            console.log(response.status);
            console.log(response.statusText);
            console.log(response.headers);
            console.log(response.config);
        });
    };

    return(
        <div align="center">
            
            <img id="Gapsi-Welcome" src="./Gapsi.png"></img>
            <h2 id="welcome-message">Bienvenido Candidato { candidatoNumber.mensaje }</h2>
            <Link to="/tablero">
                <button class="boton" type="button">
                    Continuar
                </button>
            </Link>
            
        </div>
    );
}

export default HomePage;