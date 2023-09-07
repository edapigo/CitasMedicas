import { useNavigate } from "react-router-dom";

export function Cardmedicamentos({medicamento}) {
  const navigate= useNavigate()
  return (
    <div className="relative bg-white p-3 shadow-md sm:rounded-lg hover:shadow-lg 
    hover:cursor-pointer transform transition hover:scale-105 duration-300"
    onClick={() =>{
      // la interpolacion es con el simblo ` `
      navigate(`/medicamentos/${medicamento.id}`)

    }}>
             
        <p className="text-slate-950 font-bold uppercase rounded-lg">{medicamento.nombre}</p>
        <p className="text-slate-700">Marca: {medicamento.marca}</p>
        <p className="text-slate-700">Costo: {medicamento.costo}</p>
        
       
        

    
        
    </div>
  )
}

