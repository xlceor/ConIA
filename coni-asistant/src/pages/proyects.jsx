import { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, addProject, getProjects, deleteProject } from '../firebase';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const Projects = () => {
  const [user] = useAuthState(auth);
  const [projects, setProjects] = useState({});
  const [projectName, setProjectName] = useState('');
  const [projectDescription, setProjectDescription] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [showOptions, setShowOptions] = useState({});
  const [showConfirm, setShowConfirm] = useState(false);
  const [projectToDelete, setProjectToDelete] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProjects = async () => {
      if (user) {
        const userProjects = await getProjects(user.uid);
        setProjects(userProjects);
      }
    };

    fetchProjects();
  }, [user]);

  const handleAddProject = async () => {
    if (user) {
      const project = {
        name: projectName,
        description: projectDescription,
        createdAt: new Date().toISOString(),
      };
      await addProject(user.uid, project);
      setProjectName('');
      setProjectDescription('');
      setShowForm(false);
      const userProjects = await getProjects(user.uid);
      setProjects(userProjects);
    }
  };

  const handleDeleteProject = async (projectId) => {
    if (user) {
      await deleteProject(user.uid, projectId);
      const userProjects = await getProjects(user.uid);
      setProjects(userProjects);
      setShowConfirm(false);
    }
  };

  const handleProjectClick = (projectId) => {
    navigate(`/project/${projectId}`);
  };

  const toggleOptions = (projectId) => {
    setShowOptions(prev => ({
      ...prev,
      [projectId]: !prev[projectId]
    }));
  };

  const confirmDelete = (projectId) => {
    setProjectToDelete(projectId);
    setShowConfirm(true);
  };

  return (
    <div className="space-y-6 mt-20">
      <div className="flex mt-20 justify-between m-2 items-center bg-gray-900/30 p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold">Proyectos</h2>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-blue-500 text-white px-4 py-2 rounded transition duration-300 ease-in-out transform hover:scale-105"
        >
          {showForm ? 'Cerrar' : 'Agregar Proyecto'}
        </button>
      </div>

      <div className={` ${showForm ? 'max-h-screen top-40 right-5' : 'max-h-0 opacity-0 overflow-hidden'}`}>
        <div className="bg-gray-900/70 p-6 rounded-lg shadow-lg">
          <h3 className="text-xl mb-2">Agregar Nuevo Proyecto</h3>
          <input
            type="text"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            placeholder="Nombre del proyecto"
            className="bg-gray-700/30 p-2 rounded mb-2 w-full text-white"
          />
          <textarea
            value={projectDescription}
            onChange={(e) => setProjectDescription(e.target.value)}
            placeholder="Descripción del proyecto"
            className="bg-gray-700/30 p-2 rounded mb-2 w-full text-white"
          />
          <motion.button 
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            transition={{ duration: 0.2 }}
            onClick={handleAddProject} className="bg-blue-500 text-white px-4 py-2 rounded">
            Agregar Proyecto
          </motion.button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-5">
      {Object.keys(projects).length > 0 ? Object.keys(projects).map((key) => (
  <div key={key} className="bg-gray-900/55 p-5 w-full md:min-w-36 rounded-lg shadow-lg cursor-pointer" onClick={() => handleProjectClick(key)}>
    <div className="flex justify-between items-center">
      <h3 className="text-xl mb-2">{projects[key].name}</h3>
      <div className="relative">
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleOptions(key);
          }}
          className="hover:bg-gray-500 bg-transparent text-white px-2 py-1 rounded-full"
        >
          ⋮
        </button>
        {showOptions[key] && (
          <div className="absolute right-0 mt-2 w-48 bg-gray-800 border border-gray-700 rounded shadow-lg">
            <button
              onClick={(e) => {
                e.stopPropagation();
                confirmDelete(key);
              }}
              className="block w-full text-left px-4 py-2 text-sm text-gray-200 hover:bg-gray-700"
            >
              Eliminar Proyecto
            </button>
          </div>
        )}
      </div>
    </div>
    <p className="mb-2">{projects[key].description}</p>
    <p className="text-gray-400 text-sm">Creado el: {new Date(projects[key].createdAt).toLocaleDateString()}</p>
  </div>
)) : (<p className='text-gray-500'>No hay proyectos</p>)}
      </div>

      {showConfirm && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
            <h3 className="text-xl mb-4 text-white">¿Estás seguro de que quieres eliminar este proyecto?</h3>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setShowConfirm(false)}
                className="bg-gray-500 text-white px-4 py-2 rounded"
              >
                Cancelar
              </button>
              <button
                onClick={() => handleDeleteProject(projectToDelete)}
                className="bg-red-500 text-white px-4 py-2 rounded"
              >
                Eliminar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Projects;