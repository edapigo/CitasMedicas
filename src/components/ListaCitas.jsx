import { useEffect, useState } from "react";
import { getAllcitas } from "../apis/cita.api";
import {CardCitas } from "./CardCitas";

export function ListaCitas() {

  const [citas, Setcitas]= useState([ ]);


  useEffect(() => {
    
    async function loadcitas(){
      const res= await getAllcitas()
      Setcitas(res.data);
    }

    
    loadcitas();
  }, []);
  
  return  (<div className="grid grid-cols-2 gap-3">
      {citas.map((cita ) => (
         
          <CardCitas key={cita.id} cita={cita}/>

        ))}



  </div>
  );
}

