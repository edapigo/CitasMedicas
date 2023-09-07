import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Createcitas, deletecitas, updatecitas, getcitas} from "../apis/cita.api";
import { useNavigate, useParams } from "react-router-dom";
import { getAllcitas } from "../apis/cita.api";
import { toast } from "react-hot-toast";

export function TaskformCitas() {
  //  el getvalues vas alado de setValue
  const { register, handleSubmit, formState: {
    errors },
    setValue  } = useForm()

  const navigate = useNavigate()
  const params = useParams()

  const checkExistingCita = async (paciente, medico, fecha) => {
    try {
      const response = await getAllcitas();
      const citas = response.data;
      return citas.some((cita) => 
        cita.paciente === paciente &&
        cita.medico === medico &&
        cita.fecha === fecha
      );
    } catch (error) {
      console.error("Error al verificar duplicados de citas:", error);
      return false;
    }
  };


  const onSubmit = handleSubmit(async data => {
    const existingCita= await checkExistingCita(data.paciente, data.medico, data.fecha);

    if (existingCita && !params.id) {
      toast.error("Ya existe una cita ", {
        position: "bottom-right",
        style: {
          background: "#E53E3E",
          color: "#fff",
        },
      });
      return; 
    }

    if (params.id) {
      updatecitas(params.id, data)
      toast.success("Cita actualizado", {
        position: "bottom-right",
        style: {
          background: "#101010",
          color: "#fff",
        },
      });
    } else {
      await Createcitas(data)
      toast.success("Cita creado", {
        position: "bottom-right",
        style: {
          background: "#101010",
          color: "#fff",
        },
      });
    }
    navigate("/citas")
  })
  const [citas, Setcitas]= useState([ ]);
  useEffect(() => {
    async function Loadcitas() {
      if (params.id) {

        const { data } = await getcitas(params.id)
        setValue('paciente', data.paciente)
        setValue('medico', data.medico)
        setValue('fecha', data.fecha)
        setValue('hora', data.hora)

      }
    }

    async function Loadcitas1(){
      const res = await getAllcitas()
      Setcitas(res.data);

    }
    Loadcitas1()
    Loadcitas()
  }, [])
  
  // const getValue = (fieldName) => {
  //   return getValues(fieldName) || "1";
  // };


  return (
    <div className="max-w-xl mx-auto">
      <form onSubmit={onSubmit} className="bg-white shadow-lg rounded-lg px-8 py-6">

      <li className="flex items-center">
      <svg className="h-6 w-6 flex-none fill-sky-100 stroke-sky-500 stroke-2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="11" />
            <path d="m8 13 2.165 2.165a1 1 0 0 0 1.521-.126L16 9" fill="none" />
          </svg>
              <h1 className="p-3   w-full mb-3 ml-4  text-black ">Cita </h1>
      </li>


        <select
          className="bg-zinc-600 p-3 rounded-lg block w-full mb-3"
          {...register("paciente", { required: true })}
          // value={getValue("paciente")}
        >
          
          <option value="0">Seleccione un paciente</option>
          {citas.map((cita) => (
            <option key={cita.id} value={cita.paciente}>
              {cita.paciente}
            </option>
          ))}
        </select>

        {errors.paciente && <span className="text-black">Paciente requerido </span>}


        <select
          className="bg-zinc-600 p-3 rounded-lg block w-full mb-3"
          {...register("medico", { required: true })}
         
        >
          
          <option value="0">Seleccione un medico</option>
          {citas.map((cita) => (
            <option key={cita.id} cita={cita}>
              {cita.medico}
            </option>
          ))}
        </select>
        {errors.medico && <span className="text-black">Medico es requerido </span>}

        < input type="date" placeholder=" Fecha" className="bg-zinc-600 p-3 rounded-lg block w-full mb-3"
          {...register("fecha", { required: true })} />
        {errors.fecha && <span className="text-black">Fecha es requerido </span>}

        < input type="time" placeholder=" Hora" className="bg-zinc-600 p-3 rounded-lg block w-full mb-3"
          {...register("hora", { required: true })} />
        {errors.hora && <span className="text-black">Hora es requerido </span>}



        < button className="bg-indigo-500 p-3 rounded-lg block w-full mt-3" > Guardar</button>
      </form>



      {params.id && (
        <div className="flex justify-end">
          <button
           className=" bg-red-500 p-3  text-sm text-white-600 font-semibold rounded-lg border border-red-200
           hover:text-white hover:bg-red-600 hover:border-transparent focus:outline-none
            focus:ring-2 focus:ring-red-600 focus:ring-offset-2 w-48 mt-3"
            onClick={async () => {
              const aceptar = window.confirm("¿Estas seguro de Eliminar?")
              if (aceptar) {
                await deletecitas(params.id)
                toast.success("Cita eliminado", {
                  position: "bottom-right",
                  style: {
                    background: "#101010",
                    color: "#fff",
                  },
                });
                navigate("/citas/")
              }
            }}
          > Eliminar
          </button>

        </div>
      )}
    </div>

  );

}

