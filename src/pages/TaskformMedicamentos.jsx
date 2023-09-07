import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Createmedicamentos, deletemedicamentos, updatemedicamentos, getmedicamentos,getAllmedicamentos } from "../apis/cita.api";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-hot-toast";


export function TaskformMedicamentos() {
    const { register, handleSubmit, formState: {
        errors},
        setValue } = useForm()
    
      const navigate = useNavigate()
      const params = useParams()

      const checkExistingMedicamento = async (nombre,marca,costo) => {
        try {
          const response = await getAllmedicamentos();
          const medicamento = response.data;
          return medicamento.some(medicamento => medicamento.nombre === nombre && medicamento.marca === marca
            && medicamento.costo ==costo);
        } catch (error) {
          console.error("Error al verificar duplicados de medicamentos:", error);
          return false;
        }
      };
      
      const onSubmit = handleSubmit(async data => {
        const existingMedicamento = await checkExistingMedicamento(data.nombre, data.marca,data.costo);

        if (existingMedicamento && !params.id) {
          toast.error("Ya existe un medicamento con los mismos datos", {
            position: "bottom-right",
            style: {
              background: "#E53E3E",
              color: "#fff",
            },
          });
          return; 
        }

        if(params.id){
          updatemedicamentos(params.id, data) 
          toast.success("Medicamento actualizado", {
            position: "bottom-right",
            style: {
              background: "#101010",
              color: "#fff",
            },
          });
        }else{
          await Createmedicamentos(data)
          toast.success("Medicamento creado", {
            position: "bottom-right",
            style: {
              background: "#101010",
              color: "#fff",
            },
          });
        }
        navigate("/medicamentos")
      })
    
      useEffect(()=>{
        async function Loadmedicamentos(){
          if(params.id){
            
            const {data}= await getmedicamentos(params.id)
            setValue('nombre', data.nombre)
            setValue('marca', data.marca)
            setValue('costo', data.costo)
           
            
          }
        }
        Loadmedicamentos()
      },[])
  return (
    <div className="max-w-xl mx-auto">
      <form onSubmit={onSubmit} className="bg-white shadow-lg rounded-lg px-8 py-6">

      <li className="flex items-center">
      <svg className="h-6 w-6 flex-none fill-sky-100 stroke-sky-500 stroke-2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="11" />
            <path d="m8 13 2.165 2.165a1 1 0 0 0 1.521-.126L16 9" fill="none" />
          </svg>
              <h1 className="p-3   w-full mb-3 ml-4 text-black ">Medicamento </h1>
      </li>

        <input type="text" placeholder=" Nombre" className="bg-zinc-600 p-3 rounded-lg block w-full mb-3" 
        {...register("nombre", { required: true })} />
        {errors.nombre && <span className="text-black">Nombre es requerido </span>}

        <input type="text" placeholder=" Marca" className="bg-zinc-600 p-3 rounded-lg block w-full mb-3"
        {...register("marca", { required: true })} />
        {errors.marca && <span className="text-black">Marca es requerido </span>}

        <input type="number" placeholder=" costo" className="bg-zinc-600 p-3 rounded-lg block w-full mb-3"
        {...register("costo", { required: true })} />
        {errors.costo && <span className="text-black">Costo es requerido </span>}

       

        <button  className="bg-indigo-500 p-3 rounded-lg block w-full mt-3" >Guardar</button>
      </form>

    

      {params.id && (
        <div  className="flex justify-end">
          <button
           className=" bg-red-500 p-3  text-sm text-white-600 font-semibold rounded-lg border border-red-200
           hover:text-white hover:bg-red-600 hover:border-transparent focus:outline-none
            focus:ring-2 focus:ring-red-600 focus:ring-offset-2 w-48 mt-3"
            onClick={async ( ) => {
            const aceptar = window.confirm("¿Estas seguro de Eliminar?")
            if (aceptar) {
              await deletemedicamentos(params.id)
              toast.success("Medicamento eliminado", {
                position: "bottom-right",
                style: {
                  background: "#101010",
                  color: "#fff",
                },
              });
              navigate("/medicamentos/")
            }
          }}
        > Eliminar
        </button>

        </div>
      )}
    </div>




  );
}

