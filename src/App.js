import logo from './logo.svg';
import './App.css';
//import C01componente from './components/C01componente';
//import P4variable from './components/P4variable';
import AppForm from './components/AppForm';
import { useState } from 'react';

function App() {
  ////////Reac - Lectura - fnRact /////
  const [docBD, setDocBD] = useState([]);
  const fnRead = () => {

  }
  ////////Delete - Eliminar - fnDelete /////

  const [idActual, setIdActual] = useState("");
  const fnDelete = (xId) => {

  }
  return (
    <div style={{background:"yellow", width:"350px", padding:"10px", textAlign:"center"}}>
      
      <AppForm {...{idActual}}/>
      <i class="large material-icons">insert_chart</i>

      <p>1. Juan Manuel   23 Masculino    ---- x - A</p>
      <p>2. Rosa Maria    25 Femenino     ---- x - A</p>
      <p>3. Jacinto Mario 22 Masculino    ---- x - A</p>
    </div>
  );
}

export default App;