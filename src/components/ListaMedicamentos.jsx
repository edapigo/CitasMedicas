import { useEffect, useState } from "react";
import { getAllmedicamentos } from "../apis/cita.api";
import {Cardmedicamentos } from "./Cardmedicamentos";


export function ListaMedicamentos() {

  const [medicamentos,setmedicamentos]= useState([ ]);

    useEffect(() => {
    
        async function loadmedicamentos(){
          const res= await getAllmedicamentos()
          setmedicamentos(res.data);
        }
        loadmedicamentos();
    }, []);

    return  <div className="grid grid-cols-2 gap-3">
    {medicamentos.map((medicamento ) => (
       
        <Cardmedicamentos key={medicamento.id} medicamento={medicamento}/>

      ))}
 </div>;
   
}

