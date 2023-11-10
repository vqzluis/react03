import React, { useEffect, useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { addDoc, collection, doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../conexion/firebase";
import { ToastContainer , toast} from 'react-toastify';

const AppForm = (props) => {
 
  ////////////////// MANEJAR INGRESO DE DATOS ///////////
  const handleStatusChange = (e) => {
    const {name, value} = e.target;       // Lectura a <input>
    setObjeto({...objeto, [name]:value}); // Pasando name y value
    //console.log({name, value});
    //console.log(objeto);
  }

  ////////////////// GUARDAR-ACTUALIZAR /////////////////
  const camposRegistro = { nombre:"", edad:"", genero:""};
  const [objeto, setObjeto] = useState(camposRegistro);
  const handleSubmit = async (e) => {                 // Manejador de submit
    e.preventDefault();                               // Evitar accion por defecto
    try {
      if(props.idActual == ""){
        if(validarForm()){                            // Validación de form
          addDoc(collection(db, 'persona'), objeto);  // Guardar en BD
          toast("Se registro con éxito...", { type: 'error', autoClose: 2000});
        }else{
          console.log("NO se guardo...");
        }
        setObjeto(camposRegistro);                    // Borrar objeto
      }else{
        await updateDoc(doc(collection(db, "persona"), props.idActual), objeto);
        props.setIdActual("");                        // Borrar id
        toast("Se ACTUALIZO el REGISTRO...", { type: 'error', autoClose: 2000});
      }
    } catch (error) {
      console.log("Error en Crear o actualizar", error);
    }
  }

  const validarForm = () => {
    if(objeto.nombre === "" || /^\s+$/.test(objeto.nombre)){
      toast("Escriba nombre...", { type: 'error', autoClose: 2000});
      return false;
    }
    return true;
  };

  ////////////// Obtener registro por id //////////////
  useEffect(()=>{ 
    if(props.idActual === ""){
      setObjeto({...camposRegistro});
    }else{
      obtenerDatosPorId(props.idActual);
    }
  }, [props.idActual]);


  const obtenerDatosPorId = async (xId) => {
    const objPorId = doc(db, "persona", xId);   // Objeto por id
    const docPorId = await getDoc(objPorId);    // Documento por id
    if(docPorId.exists()){
      setObjeto(docPorId.data());               // Pasar 
    }else{
      console.log("No hay doc");
    }
  }
  
  return (
    <div style={{ background:"orange", padding:"10px" }}>
      <form onSubmit={handleSubmit} >
        <button>Cerrar aplicación</button>


        <h2>Registrar (AppForm.js)</h2>
        <ToastContainer/>

        <input onChange={handleStatusChange} value={objeto.nombre}
          name='nombre' type='text' placeholder='Nombres...' /> <br/>
        
        <input onChange={handleStatusChange} value={objeto.edad}
          name='edad' type='text' placeholder='Edad...' /> <br/>
        
        <select onChange={handleStatusChange} value={objeto.genero} name='genero'>
          <option value="">Seleccione género...</option>
          <option value="Masculino">Masculino</option>
          <option value="Femenino">Femenino</option>
        </select> <br/>
        
        <button>
        
          {props.idActual=="" ? "Guardar": "Actualizar" }
        </button>
        <br></br>
        <i class="large material-icons">insert_chart</i>
      </form>
    </div>
  )
}

export default AppForm;

/*

import React, { useEffect, useState } from 'react';
import { addDoc, collection, doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../conexion/firebase";

const AppForm = (props) => {
 
  ////////////////// MANEJAR INGRESO DE DATOS ///////////
  const handleStatusChange = (e) => {
    const {name, value} = e.target;       // Lectura a <input>
    setObjeto({...objeto, [name]:value}); // Pasando name y value
    //console.log({name, value});
    //console.log(objeto);
  }

  ////////////////// GUARDAR-ACTUALIZAR /////////////////
  const camposRegistro = { nombre:"", edad:"", genero:""};
  const [objeto, setObjeto] = useState(camposRegistro);

  const validarForm = () => {
    if(objeto.nombre === "" || /^\s+$/.test(objeto.nombre)){
      alert("Escriba nombre...");
      return false;
    }
    return true;
  };

  ////////////// Obtener registro por id //////////////
  

  //style={{ background:"orange", padding:"10px" }}
  return (
    <div style={{ background:"orange", padding:"10px" }}>
      <form >
        <button>Cerrar aplicación</button>

        <h2>Registrar (AppForm.js)</h2>

        <input 
          name='nombre' type='text' placeholder='Nombres...' /> <br/>
        
        <input
          name='edad' type='text' placeholder='Edad...' /> <br/>
        
        <select >
          <option value="">Seleccione género...</option>
          <option value="Masculino">Masculino</option>
          <option value="Femenino">Femenino</option>
        </select> <br/>
        
        <button>
        <br/>
        
          {props.idActual=="" ? "Guardar": "Actualizar" }
        </button>
      </form>
    </div>
  )
}

export default AppForm;
*/