import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import Logo from './Logo';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import { FaHome, FaProjectDiagram, FaTasks, FaTools, FaBars } from 'react-icons/fa';

const Navbar = ({ isLoggedIn, handleLogout }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className="text-white bg-gray-900/40 p-1 w-full fixed top-0 left-0 right-0 backdrop-blur-lg flex justify-between items-center rounded-b-lg">
      <Link to="/"><Logo /></Link>
      <button
        className="md:hidden text-gray-100 hover:text-gray-400 bg-slate-600"
        onClick={toggleMenu}
        aria-label="Abrir menú"
      >
        <FaBars />
      </button>
      <div className="hidden md:flex justify-center space-x-2.5 w-full">
        {isLoggedIn ? (
          <div className='w-full flex justify-around'>
            <div className='flex justify-center lg:gap-6 md:gap-4 w-full'>
              <NavLink
                to="/home"
                className={({ isActive }) =>
                  isActive ? "flex items-center bg-gradient-to-r from-teal-500 to-teal-600 rounded-lg p-3 hover:text-gray-400 text-gray-50" : "flex items-center text-gray-50 hover:text-gray-400"
                }
              >
                <FaHome className="mr-3" />
                Inicio
              </NavLink>
              <NavLink
                to="/projects"
                className={({ isActive }) =>
                  isActive ? "flex items-center bg-gradient-to-r from-sky-500 to-blue-600 rounded-lg p-3 hover:text-gray-50 text-gray-50" : "flex items-center text-gray-50 hover:text-gray-400"
                }
              >
                <FaProjectDiagram className="mr-3" />
                Proyectos
              </NavLink>
              <NavLink
                to="/tasks"
                className={({ isActive }) =>
                  isActive ? "flex items-center bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg p-3 hover:text-gray-50 text-gray-50" : "flex items-center text-gray-50 hover:text-gray-400"
                }
              >
                <FaTasks className="mr-3" />
                Tareas
              </NavLink>
              <NavLink to="/asistant" className={ ({isActive}) => 
      isActive ? "flex items-center bg-gradient-to-r from-violet-500 to-indigo-600 rounded-lg p-3l hover:text-gray-50 text-gray-50" : "flex items-center text-gray-50 hover:text-gray-400" }>
        <div className='flex m-1 items-center'>
        <FaTools className="mr-3" />
          Asistente
        </div>
        </NavLink>
            </div>
            {isLoggedIn ? (
              <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded">
                Logout
              </button>
            ) : (
              <Link to="/login">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  transition={{ duration: 0.2 }}
                  className="Login bg-gradient-to-r from-red-600 to-orange-500 text-gray-50 rounded-md py-2 px-4"
                >
                  Entrar
                </motion.button>
              </Link>
            )}
          </div>
        ) : (
          <div>
                  <a href="#problematica" className="text-lg mx-3 text-white">Problemática</a>
                  <a href="#objetivo" className="text-lg mx-3 text-white">Objetivo</a>
                  <a href="#ayuda-ia" className="text-lg mx-3 text-white">¿Cómo Puede Ayudar?</a>
                  <a href="#app" className="text-lg mx-3 text-white">Nuestra App</a>
          </div>
        )}
      </div>

      {menuOpen && (isLoggedIn ? (
          <div className='lg:hidden absolute flex gap-3 flex-col justify-center top-16 right-2 bg-indigo-950 rounded-lg backdrop-blur-md text-white py-2 px-4 z-index space-y-2 w-max'>
            <div className='flex justify-center lg:gap-6 md:gap-4 w-full'>
              <NavLink
                to="/home"
                className={({ isActive }) =>
                  isActive ? "flex items-center bg-gradient-to-r from-teal-500 to-teal-600 rounded-lg p-3 hover:text-gray-400 text-gray-50" : "flex items-center text-gray-50 hover:text-gray-400"
                }
              >
                <FaHome className="mr-3" />
                Inicio
              </NavLink>
              <NavLink
                to="/projects"
                className={({ isActive }) =>
                  isActive ? "flex items-center bg-gradient-to-r from-sky-500 to-blue-600 rounded-lg p-3 hover:text-gray-50 text-gray-50" : "flex items-center text-gray-50 hover:text-gray-400"
                }
              >
                <FaProjectDiagram className="mr-3" />
                Proyectos
              </NavLink>
              <NavLink
                to="/tasks"
                className={({ isActive }) =>
                  isActive ? "flex items-center bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg p-3 hover:text-gray-50 text-gray-50" : "flex items-center text-gray-50 hover:text-gray-400"
                }
              >
                <FaTasks className="mr-3" />
                Tareas
              </NavLink>
              <NavLink to="/asistant" className={ ({isActive}) => 
      isActive ? "flex items-center bg-gradient-to-r from-violet-500 to-indigo-600 rounded-lg p-3l hover:text-gray-50 text-gray-50" : "flex items-center text-gray-50 hover:text-gray-400" }>
        <div className='flex m-1 items-center'>
        <FaTools className="mr-3" />
          Asistente
        </div>
        </NavLink>
            </div>
            {isLoggedIn ? (
              <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded">
                Logout
              </button>
            ) : (
              <Link to="/login">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  transition={{ duration: 0.2 }}
                  className="Login bg-gradient-to-r from-red-600 to-orange-500 text-gray-50 rounded-md py-2 px-4"
                >
                  Entrar
                </motion.button>
              </Link>
            )}
          </div>
        ) : (
          <div className='lg:hidden absolute flex gap-3 flex-col justify-center top-16 right-2 bg-indigo-950 rounded-lg backdrop-blur-md text-white py-2 px-4 z-index space-y-2 w-max'>
                  <a href="#problematica" className="text-lg mx-3 text-white">Problemática</a>
                  <a href="#objetivo" className="text-lg mx-3 text-white">Objetivo</a>
                  <a href="#ayuda-ia" className="text-lg mx-3 text-white">¿Cómo Puede Ayudar?</a>
                  <a href="#app" className="text-lg mx-3 text-white">Nuestra App</a>
          </div>
        ))}
    </nav>
  );
};

Navbar.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  handleLogout: PropTypes.func.isRequired,
};

export default Navbar;