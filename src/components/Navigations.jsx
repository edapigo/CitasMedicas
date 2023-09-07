import {Link ,useLocation } from "react-router-dom";
import { AiFillHome,AiFillMedicineBox} from "react-icons/ai";
import { AiFillCalendar} from "react-icons/ai";
import { FaUserDoctor} from "react-icons/fa6";
import { FaUserAlt} from "react-icons/fa";

 export function Navigations() {
  const location = useLocation();

  const isActiveLink = (path) => {
    return location.pathname === path ? "bg-indigo-700" : "";
  };
 
  return (
    <div className="flex flex-wrap items-center justify-center space-x-10 p-4 py-4 bg-gray-700 text-white rounded-lg mb-4">
     

     <Link
        to="/inicio"
        
        className="bg-lime-700 p-3 py-2 rounded-lg hover:bg-lime-800 flex items-center transition"
      >
        <AiFillHome className="mr-2" />
        Inicio
      </Link>

      <Link className={`p-3 py-2 rounded-lg ${isActiveLink("/pacientes")} hover:bg-indigo-700 transition`}
        to="/pacientes" >
          <h1 >Paciente</h1>
      </Link>

      <Link  className={`p-3 py-2 rounded-lg ${isActiveLink("/medicos")}  hover:bg-indigo-700 transition`}
        to="/medicos">
        <h1>Medico</h1>
      </Link>

      <Link className={`p-3 py-2 rounded-lg ${isActiveLink("/citas")}  hover:bg-indigo-700 transition`}
        to="/citas" >
        <h1>Cita</h1>
      </Link>
        <Link className={`p-3 py-2 rounded-lg ${isActiveLink("/medicamentos")}  hover:bg-indigo-700 transition`}
        to="/medicamentos" >
          <h1>Medicamento</h1>
        </Link>
        
        
        <button className={`bg-indigo-500 px-3 py-2 rounded-lg hover:bg-indigo-700 md:ml-4 mt-2 md:mt-0 ${isActiveLink("/crear-pacientes")}`}>
          <Link to="/crear-pacientes">
            <FaUserAlt className="mr-2"/>Crear Nuevo Paciente
          </Link>
        </button>

        <button className={`bg-indigo-500 px-3 py-2 rounded-lg hover:bg-indigo-700 md:ml-4 mt-2 md:mt-0 ${isActiveLink("/crear-medicos")}`}>
        <Link to="/crear-medicos" > <FaUserDoctor  className="mr-2"/> Crear Nuevo Medico</Link>
        </button>

        <button className={`bg-indigo-500 px-3 py-2 rounded-lg hover:bg-indigo-700 md:ml-4 mt-2 md:mt-0 ${isActiveLink("/crear-citas")}`}>
        <Link to="/crear-citas " > <AiFillCalendar  className="mr-2"/> Crear Nueva Cita</Link>
        </button>

        <button className={`bg-indigo-500 px-3 py-2 rounded-lg hover:bg-indigo-700 md:ml-4 mt-2 md:mt-0 ${isActiveLink("/crear-medicamentos")}`}>
        <Link to="/crear-medicamentos " ><AiFillMedicineBox  className="mr-2"/> Crear Nuevos Medicamentos</Link>
        </button>
        
       
    </div>
   
  )
}

