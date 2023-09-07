import {BrowserRouter, Routes,Route, Navigate} from "react-router-dom";
import {Taskspages } from "./pages/Taskspages";
import {Tasksformpages } from "./pages/Tasksformpages";

import { TaskformMedico } from "./pages/TaskformMedico";
import { TaskMedicoinicio } from "./pages/TaskMedicoinicio";

import { TaskCitasinicio } from "./pages/TaskCitasinicio";
import {  TaskformCitas } from "./pages/TaskformCitas";

import { TaskMedicamentosinicio } from "./pages/TaskMedicamentosinicio";
import { TaskformMedicamentos } from "./pages/TaskformMedicamentos";


import { TaskInicio } from "./pages/TaskInicio";


import {Navigations  } from "./components/Navigations";
import {Toaster  } from "react-hot-toast";


function App() {
  return (
    <BrowserRouter>
      <div className="container mx-auto">


      <Navigations />
      <Routes>
        <Route path="/" element={<Navigate to="/inicio" />} />


        <Route path="/inicio" element={<TaskInicio />} />
        
        <Route path="/pacientes" element={<Taskspages/>} />
        <Route path="/crear-pacientes" element= { <Tasksformpages/>} />
        <Route path="/pacientes/:id" element= { <Tasksformpages/>} />

        <Route path="/medicos" element= { <TaskMedicoinicio/>} />
        <Route path="/crear-medicos" element= { <TaskformMedico/>} />
        <Route path="/medicos/:id" element= { <TaskformMedico/>} />


        <Route path="/citas" element= { <TaskCitasinicio/>} />
        <Route path="/crear-citas" element= { <TaskformCitas/>} />
        <Route path="/citas/:id" element= { <TaskformCitas/>} />


        <Route path="/medicamentos" element= { <TaskMedicamentosinicio/>} />
        <Route path="/crear-medicamentos" element= { <TaskformMedicamentos/>} />
        <Route path="/medicamentos/:id" element= { <TaskformMedicamentos/>} />
    
        
      </Routes> 
      <Toaster/>
      </div>
    </BrowserRouter>
  )
}

export default App