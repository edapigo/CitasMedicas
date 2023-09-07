import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Createmedico, deletemedico, updatemedico, getmedicos, getAllmedico } from "../apis/cita.api";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-hot-toast";


export function TaskformMedico() {

  const { register, handleSubmit, formState: {
    errors },
    setValue } = useForm()

  const navigate = useNavigate()
  const params = useParams()

  const checkExistingMedico = async (nombre, apellido) => {
    try {
      const response = await getAllmedico();
      const medico = response.data;
      return medico.some(medico => medico.nombre === nombre && medico.apellido === apellido);
    } catch (error) {
      console.error("Error al verificar duplicados de medico:", error);
      return false;
    }
  };

  const onSubmit = handleSubmit(async data => {
    const existingMedico = await checkExistingMedico(data.nombre, data.apellido);

    if (existingMedico && !params.id) {
      toast.error("Ya existe un médico con el mismo nombre y apellido", {
        position: "bottom-right",
        style: {
          background: "#E53E3E",
          color: "#fff",
        },
      });
      return;
    }

    if (params.id) {
      updatemedico(params.id, data)
      toast.success("Medico actializado", {
        position: "bottom-right",
        style: {
          background: "#101010",
          color: "#fff",
        },
      });
    } else {
      await Createmedico(data)
      toast.success("Medico creado", {
        position: "bottom-right",
        style: {
          background: "#101010",
          color: "#fff",
        },
      });
    }
    navigate("/medicos")
  })

  useEffect(() => {
    async function Loadmedico() {
      if (params.id) {

        const { data } = await getmedicos(params.id)
        setValue('nombre', data.nombre)
        setValue('apellido', data.apellido)
        setValue('edad', data.edad)
        setValue('especialidad', data.especialidad)

      }
    }
    Loadmedico()
  }, [])

  return (
    <div className="max-w-screen-lg mx-auto px-4">
      <form onSubmit={onSubmit} className="bg-white shadow-lg rounded-lg px-8 py-6">

        <li className="flex items-center">
          <svg className="h-6 w-6 flex-none fill-sky-100 stroke-sky-500 stroke-2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="11" />
            <path d="m8 13 2.165 2.165a1 1 0 0 0 1.521-.126L16 9" fill="none" />
          </svg>
          <h1 className="p-3   w-full mb-3 ml-4 text-black  ">Medico </h1>
        </li>


        <div className="flex mb-4">
          <div className="w-1/2 pr-2">
            <p className="text-black">Nombre</p>
            <input
              type="text"
              placeholder="Nombre"
              className="bg-zinc-600 p-3 rounded-lg block w-full"
              {...register("nombre", { required: true })}
            />
            {errors.nombre && (
              <span className="text-black">Nombre es requerido</span>
            )}
          </div>
          <div className="w-1/2 pl-2">
            <p className="text-black">Apellido</p>
            <input
              type="text"
              placeholder="Apellido"
              className="bg-zinc-600 p-3 rounded-lg block w-full"
              {...register("apellido", { required: true })}
            />
            {errors.apellido && (
              <span className="text-black">Apellido es requerido</span>
            )}
          </div>
        </div>


        <p className="text-black">Edad</p>   
        <input type="text" placeholder=" Edad" className="bg-zinc-600 p-3 rounded-lg block w-full mb-3"
          {...register("edad", { required: true })} />
        {errors.edad && <span className="text-black">Edad es requerido </span>}

        <p className="text-black">Especialidad</p>
        <input type="text" placeholder=" Especialidad" className="bg-zinc-600 p-3 rounded-lg block w-full mb-3"
          {...register("especialidad", { required: true })} />
        {errors.especialidad && <span className="text-black"> Especialidd es requerido </span>}



        <button className="bg-indigo-500 p-3 rounded-lg block w-full mt-3 " >Guardar</button>
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
                await deletemedico(params.id)
                toast.success("Medico eliminado", {
                  position: "bottom-right",
                  style: {
                    background: "#101010",
                    color: "#fff",
                  },
                });
                navigate("/medicos/")
              }
            }}
          > Eliminar
          </button>

        </div>
      )}
    </div>

  );
}

