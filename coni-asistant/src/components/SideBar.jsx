import { NavLink } from 'react-router-dom';
import { FaHome, FaProjectDiagram, FaTasks, FaCalendarAlt, FaTools } from 'react-icons/fa';

const Sidebar = () => {
  return (
    <div className=" w-48 bg-gray-900/35 flex fixed top-14 flex-col items-center text-gray-50 h-5/6 m-5 rounded-3xl shadow-2xl">
      <div className="flex items-center justify-center mb-6">
      </div>
      <div className="flex flex-col w-3/4 gap-5">
        <NavLink to="/home" className={ ({isActive}) => 
      isActive ? "bg-gradient-to-r from-teal-500 rounded-lg w-full to-teal-600 hover:text-gray-400 text-gray-50" : "flex items-center text-gray-50 hover:text-gray-400 " }>
        <div className='flex m-1 items-center'>
        <FaHome className="mr-3" />
          Inicio
        </div>
        </NavLink>
        <NavLink to="/projects" className={ ({isActive}) => 
      isActive ? "flex items-center bg-gradient-to-r from-sky-500 to-blue-600 rounded-lg w-full hover:text-gray-50 text-gray-50" : "flex items-center text-gray-50 hover:text-gray-400 " }>
        <div className='flex m-1 items-center'>
        <FaProjectDiagram className="mr-3" />
          Proyectos
        </div>
        </NavLink>
        <NavLink to="/tasks" className={ ({isActive}) => 
      isActive ? "flex items-center bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg w-full hover:text-gray-50 text-gray-50" : "flex items-center text-gray-50 hover:text-gray-400 " }>
        <div className='flex m-1 items-center'>
        <FaTasks className="mr-3" />
          Tareas
        </div>
        </NavLink>
        <NavLink to="/asistant" className={ ({isActive}) => 
      isActive ? "flex items-center bg-gradient-to-r from-violet-500 to-indigo-600 rounded-lg w-full hover:text-gray-50 dark:text-gray-50" : "flex items-center text-gray-50 hover:text-gray-400 " }>
        <div className='flex m-1 items-center'>
        <FaTools className="mr-3" />
          Asistente
        </div>
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;