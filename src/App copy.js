//import logo from './logo.svg';
//import './App.css';
import { useState } from 'react';
import AppForm from './components/AppForm';
import { collection, deleteDoc, doc, onSnapshot, query } from 'firebase/firestore';
import { db } from './firebase/firebase';

function App() {
  ///////// READ - Lectura - fnRead ////////////
  const [docBD, setDocBD] = useState([]);
  const fnRead = () => {
    const xColecionConQuery = query(collection(db, "persona"));
    const unsubscribe = onSnapshot(xColecionConQuery, (xDatosBD) => {
      const xDoc = [];
      xDatosBD.forEach((docV)=>{
        xDoc.push({id:docV.id, ...docV.data()});
        //console({id:doc.id, ...doc.data()});
      });
      setDocBD(xDoc);
    });
  }
  fnRead();
  console.log(docBD);
  ///////// DELETE - Eliminar - fnDelete ///////
  const [idActual, setIdActual] = useState("");
  const fnDelete = async(xId) => {
    if(window.confirm("confirme para eliminra")){
      await deleteDoc(doc(db, 'persona', xId));
      console.log("se elemino..."+xId);
    }
  }
  
  return (
    <div style={{background:"yellow", width:"350px", 
     padding:"10px"}}>
      <AppForm {...{idActual}} />
      {
        docBD.map((p, index) =>
         <p key={p.id}>
          {index+1}. {p.nombre} 
          ---- 
          <span onClick={() => fnDelete(p.id)}>X</span>
          ---- 
          <span onClick={() => setIdActual(p.id)}>A</span> <br/>
          
          23
          Masculino 
        </p>)
      }
    </div>
  );
}

export default App;

