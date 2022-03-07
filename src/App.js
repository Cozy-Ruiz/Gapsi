import React , { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";
import axios from "axios";

import Tablero from './Components/Tablero';
import Home from './Components/HomePage';
import Agregar from './Components/Agregar';

export function App() {

  const [version, setVersion] = useState([]);

  useEffect(() => {
      getVersion();
  }, []);

  const getVersion = () => {

      axios.post('http://localhost:8080/getVersionApp')
      .then((response) => {
          setVersion(response.data);
          console.log(response.data);
          console.log(response.status);
          console.log(response.statusText);
          console.log(response.headers);
          console.log(response.config);
      });
  };

  return (
    
    <Router>
    <div className="App">
      <div class="Header"> 
        <h1>e-Commerce Gapsi</h1>
      </div>

      <Routes>
        <Route path="/agregar" element={ <Agregar/> }></Route>
        <Route path="/tablero" element={ <Tablero/> }></Route>
        <Route path="/" element={ <Home/> }></Route>
      </Routes>

      <div class="Footer" align="right">
        <h5 id="version">{ version.mensaje }</h5>
      </div>
    </div>
    </Router>
    
  );
}

export default App;
