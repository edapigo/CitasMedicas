import axios from "axios"

const Basepacientes = axios.create({

    baseURL : 'http://localhost:8000/api/Medical/Paciente/'
})

const Basemedico = axios.create({

    baseURL : 'http://localhost:8000/api/Medical/Medico/'
})


const Basecitas = axios.create({

    baseURL : 'http://localhost:8000/api/Medical/Cita/'
})

const Basemedicamentos = axios.create({

    baseURL : 'http://localhost:8000/api/Medical/Medicamento/'
})


export const getAllpacientes =()=> Basepacientes.get ('/')
export const getpacientes =(id) => Basepacientes.get(`/${id}/`)
// export const Createpacientes =(pacientes) => Basepacientes.post('/', pacientes)


export const deletepacientes =(id) => Basepacientes.delete(`/ ${id}/`)
// export const updatepacientes=(id, pacientes) => Basepacientes.put(`/ ${id}/`,pacientes)

export const Createpacientes = async (pacientes) => {
  try {
    const formData = new FormData();

    formData.append("nombre", pacientes.nombre);
    formData.append("apellido", pacientes.apellido);
    formData.append("edad", pacientes.edad);
    formData.append("sexo", pacientes.sexo);
    formData.append("altura", pacientes.altura);
    formData.append("peso", pacientes.peso);
    formData.append("correo", pacientes.correo);
    formData.append("alergia", pacientes.alergia);

    const imagen = pacientes.foto[0];

    if (imagen) {
      formData.append("foto", imagen);
    }

    const response = await Basepacientes.post('/', formData);
    return response.data;
  } catch (error) {
    console.error("Error al crear paciente:", error);
    throw error;
  }
};

export const updatepacientes = async (id, pacientes) => {
  try {
    const formData = new FormData();

    formData.append("nombre", pacientes.nombre);
    formData.append("apellido", pacientes.apellido);
    formData.append("edad", pacientes.edad);
    formData.append("sexo", pacientes.sexo);
    formData.append("altura", pacientes.altura);
    formData.append("peso", pacientes.peso);
    formData.append("correo", pacientes.correo);
    formData.append("alergia", pacientes.alergia);

    if (pacientes.foto && pacientes.foto[0]) {
      formData.append("foto", pacientes.foto[0]);
    } else {
      formData.append("foto", ""); 
    }

    const response = await Basepacientes.put(`/${id}/`, formData);
    return response.data;
  } catch (error) {
    console.error("Error al actualizar paciente:", error);
    console.log("Respuesta del servidor:", error.response.data);
    throw error;
  }
};



  

///////////////////////////////////////////////////////////////////////////////////////////
export const getAllmedico =()=> Basemedico.get ('/')
export const getmedicos =(id) => Basemedico.get(`/${id}/`)
export const Createmedico =(medicos) => Basemedico.post('/', medicos)
export const deletemedico =(id) => Basemedico.delete(`/ ${id}/`)
export const updatemedico=(id, medicos) => Basemedico.put(`/ ${id}/`,medicos)

///////////////////////////////////////////////////////////////////////////////////////

export const getAllcitas =()=> Basecitas.get ('/')
export const getcitas  =(id) => Basecitas.get(`/${id}/`)
export const Createcitas  =(citas) => Basecitas.post('/', citas)
export const deletecitas  =(id) =>Basecitas.delete(`/ ${id}/`)
export const updatecitas =(id, citas) => Basecitas.put(`/ ${id}/`,citas)


/////////////////////////////////////////////////////////////////////////////////////////////


export const getAllmedicamentos =()=> Basemedicamentos.get ('/')
export const getmedicamentos  =(id) => Basemedicamentos.get(`/${id}/`)
export const Createmedicamentos  =(medicamentos) => Basemedicamentos.post('/', medicamentos)
export const deletemedicamentos  =(id) =>Basemedicamentos.delete(`/ ${id}/`)
export const updatemedicamentos =(id, medicamentos) => Basemedicamentos.put(`/ ${id}/`,medicamentos)