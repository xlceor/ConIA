import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, getTaskById, updateTask } from '../firebase';
import LogoTransition from './LogoTransition';

const Task = () => {
  const { id } = useParams();
  const [user] = useAuthState(auth);
  const [task, setTask] = useState(null);
  const [taskName, setTaskName] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [showConfirm, setShowConfirm] = useState(false);
  const [showOptions, setShowOptions] = useState({});

  useEffect(() => {
    const fetchTask = async () => {
      if (user) {
        const taskData = await getTaskById(user.uid, id);
        setTask(taskData);
        setTaskName(taskData.name);
        setTaskDescription(taskData.description);
      }
    };

    fetchTask();
  }, [user, id]);

  const toggleOptions = (taskId) => {
    setShowOptions(prev => ({
      ...prev,
      [taskId]: !prev[taskId]
    }));
  };

  const handleUpdateTask = async () => {
    if (user && task) {
      const updatedTask = {
        ...task,
        name: taskName,
        description: taskDescription,
      };

      try {
        await updateTask(user.uid, id, updatedTask);
        setTask(updatedTask);
        setShowConfirm(false);
      } catch (error) {
        console.error('Error al actualizar tarea:', error);
      }
    }
  };

  if (!task) {
    return <div className='flex justify-center items-center w-screen h-screen'><LogoTransition /></div>;
  }

  return (
    <div className='flex flex-col mt-20 p-4 bg-gray-800/55 gap-5 rounded-2xl m-2'>
      <div className="p-3 bg-gray-700/55 flex justify-between rounded-lg shadow-lg">
        <div>
          <h2 className="text-4xl font-bold mb-4">{task.name}</h2>
          <p className="mb-4">{task.description}</p>
        </div>
        <p className="text-gray-400 text-sm">Creado el: {new Date(task.createdAt).toLocaleDateString()}</p>
        <div className="relative">
          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleOptions(task.id);
            }}
            className="hover:bg-gray-500 bg-transparent text-white px-2 py-1 rounded-full"
          >
            ⋮
          </button>
          {showOptions[task.id] && (
            <div className="absolute right-0 mt-2 w-48 bg-gray-800 border border-gray-700 rounded shadow-lg">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setShowConfirm(true); 
                }}
                className="hover:bg-gray-500 bg-transparent text-white px-2 py-1 rounded-full"
              >
                Actualizar Datos
              </button>
            </div>
          )}
        </div>
      </div>
      {showConfirm && (
        <div className="bg-gray-800 p-6 absolute right-72 le rounded-lg shadow-lg mt-4 max-w-64">
          <h3 className="text-xl mb-2">Actualizar Tarea</h3>
          <input
            type="text"
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
            placeholder="Nombre de la tarea"
            className="bg-gray-700 p-2 rounded mb-2 w-full text-white"
          />
          <textarea
            value={taskDescription}
            onChange={(e) => setTaskDescription(e.target.value)}
            placeholder="Descripción de la tarea"
            className="bg-gray-700 p-2 rounded mb-2 w-full text-white"
          />
          <div className="flex justify-end">
            <button
              onClick={() => setShowConfirm(false)}
              className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
            >
              Cancelar
            </button>
            <button
              onClick={handleUpdateTask}
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Actualizar Tarea
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Task;