import React, { useState } from 'react';
import { db } from "../firebase/firebase";
import { addDoc, collection } from 'firebase/firestore';

const Appform = (props) => {
  /////// Guardar / Actualizar ////////
  const camposRegistro = {nombre:"", edad:"", genero:""}
  const [objeto, setObjeto] = useState(camposRegistro);
  //
  const manejarEnvio = (e) => {
    e.preventDefault();

    try {
      if(props.idActual == ""){   ///guardar//
        if(validarForm()){
          addDoc(collection(db, 'persona'),objeto);
          console.log("se guardo con exito en bd")
          }
        }else{
          console.log("actualizando en bd");
        }
        setObjeto(camposRegistro);
      
    } catch (error){
      console.error();
    }
  }

  const validarForm = () =>{
    if(objeto.nombre ==="" || /^\s+$/.test(objeto.nombre)){
      alert("Escriba nombre...")
      return false;
    }

    if(objeto.edad ==="" || /^\s+$/.test(objeto.edad)){
      alert("Escriba edad...")
      return false;
    }

    if(objeto.genero ==="" || /^\s+$/.test(objeto.genero)){
      alert("Escriba genero...")
      return false;
    }


    return true;
  };
  const manejarCambiosEntrada = (e) =>{
    console.log(e.target.value);
    const {name, value} = e.target;
    console.log(name, value);

    setObjeto({...objeto, [name]:value});
    console.log("nnnnn");
  }

  return (
    <div style={{background:"orange", padding:"10px", textAlign:"center"}}>
      <h>AppForm.js</h> <br/> 
      <form onSubmit={manejarEnvio} >
        <input onChange={manejarCambiosEntrada} value={objeto.nombre} 
          name='nombre' type='text' placeholder='Nombres...'></input><br></br>
        <input onChange={manejarCambiosEntrada} value={objeto.edad} name='edad' type='text' placeholder='Edad...'></input><br></br>
        <input onChange={manejarCambiosEntrada} value={objeto.genero} name='genero' type='text' placeholder='Género...'></input><br></br>
        <br></br>
        <button>
          { props.idActual===""? "guardar": "actualizar"}
          </button>
      </form>
    </div>
  )
}

export default Appform