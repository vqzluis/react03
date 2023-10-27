import logo from './logo.svg';
import './App.css';
//import C01componente from './components/C01componente';
//import P4variable from './components/P4variable';
import AppForm from './components/AppForm';
import { useEffect, useState } from 'react';
import { collection, onSnapshot, query } from 'firebase/firestore';
import { db } from './firebase/firebase';

function App() {
  ////////Reac - Lectura - fnRact /////
  const [docBD, setDocBD] = useState([]);
  const fnRead = () => {
    try {
      const xColeccionConQuery = query(collection(db, "persona"));
      const unsubscribe = onSnapshot(xColeccionConQuery,(xDatosBD) => {
        const xDoc = [];
        xDatosBD.forEach( (doc) => {
          xDoc.push({id: doc.id, ...doc.data()});

     
      });
      setDocBD(xDoc);
    });
  } catch (error) {
    console.error(error);
  }

}
console.log(docBD);

useEffect( () => {
  fnRead();
}, []);

  ////////Delete - Eliminar - fnDelete /////

  const [idActual, setIdActual] = useState("");
  const fnDelete = (xId) => {

  }
  return (
    <div style={{background:"yellow", width:"350px", padding:"10px", textAlign:"center"}}>
      
      <AppForm {...{idActual, setIdActual, fnRead}}/>
      {
        docBD.map((p)=>
        <p key={p.id}>
          NO. 1 {p.nombre} ....
          <span onClick={() => fnDelete(p.id)}> x </span>
          ...
          <span onClick={() => setIdActual(p.id)}> A </span>
        </p>
        )
      }
      <i class="large material-icons">insert_chart</i>

      <p>1. Juan Manuel   23 Masculino    ---- x - A</p>
      <p>2. Rosa Maria    25 Femenino     ---- x - A</p>
      <p>3. Jacinto Mario 22 Masculino    ---- x - A</p>
    </div>
  );
}

export default App;