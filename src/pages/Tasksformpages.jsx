import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Createpacientes, deletepacientes, updatepacientes, getpacientes, getAllpacientes } from "../apis/cita.api";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-hot-toast";



// usaParams es para extrar los parametros que tienes en la URL


export function Tasksformpages() {

  const [selectedImage, setSelectedImage] = useState(null);

  const { register, handleSubmit, formState: {
    errors },
    setValue } = useForm()

  const navigate = useNavigate()
  const params = useParams()



  const checkExistingPaciente = async (correo) => {
    try {
      const response = await getAllpacientes();
      const pacientes = response.data;
      return pacientes.some((paciente) => paciente.correo === correo);
    } catch (error) {
      console.error("Error al verificar duplicados de pacientes:", error);
      return false;
    }
  };



  const onSubmit = handleSubmit(async data => {
    const existingPatient = await checkExistingPaciente(data.correo);

    if (existingPatient && !params.id) {
      toast.error("Ya existe un paciente con el mismo correo electrónico", {
        position: "bottom-right",
        style: {
          background: "#E53E3E",
          color: "#fff",
        },
      });
      return;
    }

    if (params.id) {
      updatepacientes(params.id, data)
      toast.success("Paciente actualizado", {
        position: "bottom-right",
        style: {
          background: "#101010",
          color: "#fff",
        },
      });
    } else {
      await Createpacientes(data)
      toast.success("Paciente creado", {
        position: "bottom-right",
        style: {
          background: "#101010",
          color: "#fff",
        },
      });
    }
    navigate("/pacientes")
  })

  useEffect(() => {
    async function Loadpacientes() {
      if (params.id) {
        const { data } = await getpacientes(params.id);
        setValue('nombre', data.nombre);
        setValue('apellido', data.apellido);
        setValue('edad', data.edad);
        setValue('sexo', data.sexo);
        setValue('altura', data.altura);
        setValue('peso', data.peso);
        setValue('correo', data.correo);
        setValue('foto', '');
        setValue('alergia', data.alergia);

        if (data.foto) {
          setSelectedImage(data.foto);
          
        }
      }
    }
    Loadpacientes();
  }, []);



  return (
    <div className="max-w-screen-lg mx-auto px-4">
      <form onSubmit={onSubmit} className="bg-white shadow-lg rounded-lg px-8 py-6">
        <li className="flex items-center">
          <svg className="h-6 w-6 flex-none fill-sky-100 stroke-sky-500 stroke-2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="11" />
            <path d="m8 13 2.165 2.165a1 1 0 0 0 1.521-.126L16 9" fill="none" />
          </svg>
          <h1 className="p-3   w-full mb-3 ml-4 text-black ">Paciente </h1>
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

        <div className="mb-4">
          <p className="text-black">Edad</p>
          <input
            type="text"
            placeholder="Edad"
            className="bg-zinc-600 p-3 rounded-lg block w-full"
            {...register("edad", { required: true })}
          />
          {errors.edad && <span className="text-black">Edad es requerida</span>}
        </div>

        <div className="mb-4">
          <p className="text-black">Sexo</p>
          <input
            type="text"
            placeholder="Sexo"
            className="bg-zinc-600 p-3 rounded-lg block w-full"
            {...register("sexo", { required: true })}
          />
          {errors.sexo && <span className="text-black">Sexo es requerida</span>}
        </div>

        <div className="mb-4">
          <p className="text-black">Altura</p>
          <input
            type="text"
            placeholder="Altura"
            className="bg-zinc-600 p-3 rounded-lg block w-full"
            {...register("altura", { required: true })}
          />
          {errors.altura && <span className="text-black">Altura es requerida</span>}
        </div>

        <div className="mb-4">
          <p className="text-black">Peso</p>
          <input
            type="text"
            placeholder="Peso en kilogramo"
            className="bg-zinc-600 p-3 rounded-lg block w-full"
            {...register("peso", { required: true })}
          />
          {errors.peso && <span className="text-black">Peso es requerida</span>}
        </div>


        <div className="mb-4">
          <p className="text-black">Correo</p>
          <input
            type="email"
            placeholder="Correo"
            className="bg-zinc-600 p-3 rounded-lg block w-full"
            {...register("correo", { required: true })}
          />
          {errors.correo && (
            <span className="text-black">Correo es requerido</span>
          )}
        </div>


        <div className="mb-4">
          <p className="text-black">Foto</p>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              if (e.target.files.length > 0) {
                const file = e.target.files[0];
                setSelectedImage(URL.createObjectURL(file));
                setValue("foto", file);
              }
            }}
            {...register("foto", { required: !params.id })}
            className="bg-zinc-600 p-3 rounded-lg block w-full file:rounded-lg  hover:file:bg-slate-400"
          />
          {selectedImage && (
            <div className="mt-2">
              <img
                src={selectedImage}
                alt="Imagen seleccionada"
                className="w-32 h-32 object-cover rounded-lg"
              />
            </div>
          )}
          
        </div>




        <div className="mb-4">
          <p className="text-black">Alergia</p>
          <textarea
            placeholder="Alergia"
            className="bg-zinc-600 p-3 rounded-lg block w-full "
            {...register("alergia", { required: true })}
          />
          {errors.alergia && (
            <span className="text-black">Alergia es requerida</span>
          )}
        </div>

        <button className="bg-indigo-500 p-3 rounded-lg block w-full mt-3 hover:bg-indigo-700" >Guardar</button>
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
                await deletepacientes(params.id)
                toast.success("Paciente eliminado", {
                  position: "bottom-right",
                  style: {
                    background: "#101010",
                    color: "#fff",
                  },
                });
                navigate("/pacientes/")
              }
            }}
          > Eliminar
          </button>

        </div>
      )}
    </div>



  );


}



