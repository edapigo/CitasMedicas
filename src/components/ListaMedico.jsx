import { useEffect, useState } from "react";
import { getAllmedico } from "../apis/cita.api";
import {CardMedico } from "./CardMedico";

export function ListaMedico() {
    const [medicos,setmedicos]= useState([ ]);

    useEffect(() => {
    
        async function loadmedico(){
          const res= await getAllmedico()
          setmedicos(res.data);
        }
    
        
        loadmedico();
    }, []);
  
    return  <div className="grid grid-cols-2 gap-3">
      {medicos.map((medico ) => (
         
          <CardMedico key={medico.id} medico={medico}/>

        ))}



   </div>;
   


  
}

