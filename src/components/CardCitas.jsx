import { useNavigate } from "react-router-dom";

export function CardCitas({cita}) {
  const navigate= useNavigate()

  return (
    <div className="relative bg-white p-3 shadow-md sm:rounded-lg hover:shadow-lg 
    hover:cursor-pointer transform transition hover:scale-105 duration-300"
    onClick={() =>{
      // la interpolacion es con el simblo ` `
      navigate(`/citas/${cita.id}`)

    }}>
        
        <p className="text-slate-950 font-bold uppercase rounded-lg">Paciente: {cita.paciente}</p>
        <p className="text-slate-700">Medico: {cita.medico}</p>
        <p className="text-slate-700">Fecha: {cita.fecha}</p>
        <p className="text-slate-700">Hora: {cita.hora}</p>
       
        

    
        
    </div>
  )
}

