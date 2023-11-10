import React, { useEffect, useState } from 'react';
import { db } from "../firebase/firebase";
import { addDoc, collection, doc, getDoc, updateDoc } from 'firebase/firestore';

const Appform = (props) => {
  const camposRegistro = {nombre:"", edad:"", genero:""}                        ///CAMPOS REGISTRO
  const [objeto, setObjeto] = useState(camposRegistro);


////// GUARDAR / ACTUALIZAR /////
  const manejarEnvio = async (e) => {
    e.preventDefault();
    try {
      if(props.idActual==""){
        if(validarForm()){
          addDoc(collection(db, 'persona'), objeto);
          console.log("Se guardo con exito en BD");
        }else{
          console.log("No se guardo");
        }
        
      }else{
        //////////ACTUALIZAR//////////////////////
        await updateDoc(doc(collection(db, "persona"), props.idActual), objeto);
        console.log("Se actualizó en BD");
        //porps.fnRead()    ///////// No es necesario se cambio fn en useEffect
        props.setIdActual('');
      }
      setObjeto(camposRegistro);
    } catch (error){
      console.log("Error en CREAR o UPDATE: ", error);
    }
  }

  useEffect(() => {
    if ( props.idActual === "") {
      setObjeto({...camposRegistro});
    } else {
      obtenerDatosporId(props.idActual);
    }
  }, [props.idActual]);

  const obtenerDatosporId = async (xId) =>{
    //console.log("xId ", xId);
    const objPorId = doc(db, "persona", xId);
    const docPorId = await getDoc(objPorId);
    if (docPorId.exists()) {
      //console log("Datos de doc... ", docPorId.data());
      setObjeto(docPorId.data());
    } else {
      console.log("No hay doc... ");
    }
  }


  const validarForm = () => {
    if(objeto.nombre==="" || /^\s+$/.test(objeto.nombre)){
      alert("Escriba nombres...");
      return false;
    }

    if(objeto.edad==="" || /^\s+$/.test(objeto.edad)){
      alert("Escriba edad...");
      return false;
    }

    if(objeto.genero==="" || /^\s+$/.test(objeto.genero)){
      alert("Escriba genero...");
      return false;
    }

    return true;
  }
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
        <input onChange={manejarCambiosEntrada} value={objeto.nombre} name='nombre' type='text' placeholder='Nombres...'></input><br></br>
        <input onChange={manejarCambiosEntrada} value={objeto.edad} name='edad' type='text' placeholder='Edad...'></input><br></br>
        <input onChange={manejarCambiosEntrada} value={objeto.genero} name='genero' type='text' placeholder='Género...'></input><br></br>
        <br></br>
        <button>
          {props.idActual === ""? "Guardar" : "Actualizar"}
        </button>
      </form>
    </div>
  )
}

export default Appform