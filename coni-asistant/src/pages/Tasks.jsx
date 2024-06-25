import { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, addTask, getTasks, deleteTask } from '../firebase';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const Tasks = () => {
  const [user] = useAuthState(auth);
  const [tasks, setTasks] = useState({});
  const [taskName, setTaskName] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [showOptions, setShowOptions] = useState({});
  const [showConfirm, setShowConfirm] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTasks = async () => {
      if (user) {
        const userTasks = await getTasks(user.uid);
        setTasks(userTasks);
      }
    };

    fetchTasks();
  }, [user]);

  const handleAddTask = async () => {
    if (user) {
      const task = {
        name: taskName,
        description: taskDescription,
        createdAt: new Date().toISOString(),
      };
      await addTask(user.uid, task);
      setTaskName('');
      setTaskDescription('');
      setShowForm(false);
      const userTasks = await getTasks(user.uid);
      setTasks(userTasks);
    }
  };

  const handleDeleteTask = async (taskId) => {
    if (user) {
      await deleteTask(user.uid, taskId);
      const userTasks = await getTasks(user.uid);
      setTasks(userTasks);
      setShowConfirm(false);
    }
  };

  const handleTaskClick = (taskId) => {
    navigate(`/task/${taskId}`);
  };

  const toggleOptions = (taskId) => {
    setShowOptions(prev => ({
      ...prev,
      [taskId]: !prev[taskId]
    }));
  };

  const confirmDelete = (taskId) => {
    setTaskToDelete(taskId);
    setShowConfirm(true);
  };

  return (
    <div className="space-y-6 mt-20">
      <div className="flex justify-between m-2 items-center bg-gray-900/30 p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold">Tareas</h2>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-blue-500 text-white px-4 py-2 rounded transition duration-300 ease-in-out transform hover:scale-105"
        >
          {showForm ? 'Cerrar' : 'Agregar Tarea'}
        </button>
      </div>

      <div className={` ${showForm ? 'max-h-screen top-40 right-5' : 'max-h-0 opacity-0 overflow-hidden'}`}>
        <div className="bg-gray-900/70 p-6 rounded-lg shadow-lg">
          <h3 className="text-xl mb-2">Agregar Nueva Tarea</h3>
          <input
            type="text"
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
            placeholder="Nombre de la tarea"
            className="bg-gray-700/30 p-2 rounded mb-2 w-full text-white"
          />
          <textarea
            value={taskDescription}
            onChange={(e) => setTaskDescription(e.target.value)}
            placeholder="Descripción de la tarea"
            className="bg-gray-700/30 p-2 rounded mb-2 w-full text-white"
          />
          <motion.button 
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            transition={{ duration: 0.2 }}
            onClick={handleAddTask} className="bg-blue-500 text-white px-4 py-2 rounded">
            Agregar Tarea
          </motion.button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-5">
        {Object.keys(tasks).length > 0 ? Object.keys(tasks).map((key) => (
          <div key={key} className="bg-gray-900/55 p-5 w-full md:min-w-36 rounded-lg shadow-lg cursor-pointer" onClick={() => handleTaskClick(key)}>
            <div className="flex justify-between items-center">
              <h3 className="text-xl mb-2">{tasks[key].name}</h3>
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
                      Eliminar Tarea
                    </button>
                  </div>
                )}
              </div>
            </div>
            <p className="mb-2">{tasks[key].description}</p>
            <p className="text-gray-400 text-sm">Creado el: {new Date(tasks[key].createdAt).toLocaleDateString()}</p>
          </div>
        )) : (<p className='text-gray-500'>No hay tareas</p>)}
      </div>

      {showConfirm && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
            <h3 className="text-xl mb-4 text-white">¿Estás seguro de que quieres eliminar esta tarea?</h3>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setShowConfirm(false)}
                className="bg-gray-500 text-white px-4 py-2 rounded"
              >
                Cancelar
              </button>
              <button
                onClick={() => handleDeleteTask(taskToDelete)}
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

export default Tasks;