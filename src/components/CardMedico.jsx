import { useNavigate } from "react-router-dom";

export function CardMedico({medico}) {
  const navigate= useNavigate()

  return (
    <div className="relative bg-white p-3 py-3 shadow-md sm:rounded-lg hover:shadow-lg 
    hover:cursor-pointer transform transition hover:scale-105 duration-300  
    "
    onClick={() =>{
      // la interpolacion es con el simblo ` `
      navigate(`/medicos/${medico.id}`)

    }}>
             
        <p className="text-slate-950 font-bold uppercase rounded-lg">{medico.nombre}</p>
        <p className="text-slate-700">Apellido: {medico.apellido}</p>
        <p className="text-slate-700">Edad: {medico.edad}</p>
        <p className="text-slate-700">Especialidad: {medico.especialidad}</p>
       
       

    
        
    </div>
  )
}

