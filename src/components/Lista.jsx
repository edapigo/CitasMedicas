import { useEffect, useState } from "react";
import { getAllpacientes } from "../apis/cita.api";
import {CardPacinte } from "./CardPaciente";


export function Lista() {
      // aqui el useState comienza vacion, pero se pone como arreglo como useState([])
    const [pacientes, Setpacientes]= useState([ ]);

    // useEffect para añadir un estado a nuestro componente
    // valor de retorno de la función será, "por dentro de javascript", una Promesa. en async
  useEffect(() => {
    
    async function loadpacientes(){
      const res= await getAllpacientes()
      Setpacientes(res.data);
    }

    
    loadpacientes()
  }, []);
        // map  es un método incorporado en los arreglos, para iterar 
        // a través de los elementos dentro de una colección de arreglos en JavaScript
        
  return  (<div className="grid grid-cols-2 gap-2">
      {pacientes.map((paciente ) => (
         
          <CardPacinte key={paciente.id} paciente={paciente}/>

        ))}



  </div>
  );
}

