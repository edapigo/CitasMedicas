import { useNavigate } from "react-router-dom";
import React from 'react';

export function CardPacinte({ paciente }) {
  const navigate = useNavigate();

  return (
    <div>
      <div className="relative bg-white p-3 py-3 shadow-md sm:rounded-lg hover:shadow-lg 
      hover:cursor-pointer transform transition hover:scale-105 duration-300  sm:flex 
      sm:space-x-16 space-y-5 " 
      onClick={() => navigate(`/pacientes/${paciente.id}`)}>
        <div className="flex items-center justify-center gap-x-6">
          <img
            src={paciente.foto}
            alt={paciente.nombre}
            className="block mx-auto h-24 w-24 object-cover rounded-full "
            onError={(e) => {
              console.error("Error al cargar la imagen:", e);
            }}
          />
        </div>
        <div className="font-medium">
          <p className="text-slate-950 font-bold uppercase rounded-lg ml-auto mr-2">{paciente.nombre}</p>
          <p className="text-slate-700">Apellido: {paciente.apellido}</p>
          <p className="text-slate-700">Edad: {paciente.edad}</p>
          <p className="text-slate-700">Sexo: {paciente.sexo}</p>
          <p className="text-slate-700">Altura: {paciente.altura}</p>
          <p className="text-slate-700">Peso: {paciente.peso}</p>
          <p className="text-slate-700">Correo: {paciente.correo}</p>
          <p className="text-slate-700">Alergia: {paciente.alergia}</p>
        </div>
      </div>
    </div>
  );
}
