import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, getProjectById, addTaskToProject, getTasksFromProject, deleteTaskFromProject, getMembersFromProject, addMemberToProject, deleteMemberFromProject, updateProject } from '../firebase';
import LogoTransition from './LogoTransition';

import ChatRoom from './ChatRoom';

const Project = () => {
  const { id } = useParams();
  const [user] = useAuthState(auth);
  const [project, setProject] = useState(null);
  const [projectName, setProjectName] = useState('');
  const [projectDescription, setProjectDescription] = useState('');
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [showMembersForm, setShowmembersForm] = useState(false);
  const [tasks, setTasks] = useState({});
  const [taskName, setTaskName] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [members, setMembers] = useState({});
  const [memberName, setMemberName] = useState('');
  const [memberRole, setMemberRole] = useState('');
  const [showConfirm, setShowConfirm] = useState(false);
  const [showOptions, setShowOptions] = useState({});

  useEffect(() => {
    const fetchProject = async () => {
      if (user) {
        const projectData = await getProjectById(user.uid, id);
        setProject(projectData);
      }
    };

    fetchProject();
  }, [user, id]);

  useEffect(() => {
    const fetchTasks = async () => {
      if (user && project) {
        const tasksData = await getTasksFromProject(user.uid, id);
        setTasks(tasksData ? Object.values(tasksData) : []);
      }
    };

    fetchTasks();
  }, [user, project, id]);
  useEffect(() => {
    const fetchMembers = async () => {
      if (user && project) {
        const membersData = await getMembersFromProject(user.uid, id);
        setMembers(membersData ? Object.values(membersData) : []);
      }
    };

    fetchMembers();
  }, [user, project, id]);

  useEffect(() => {
    const fetchMembers = async () => {
      if (user && project) {
        const membersData = await getMembersFromProject(user.uid, id);
        setMembers(membersData ? Object.values(membersData) : []);
      }
    };

    fetchMembers();
  }, [user, project, id]);

  const handleAddTask = async () => {
    if (user) {
        const newTask = {
          name: taskName,
          description: taskDescription,
          createdAt: new Date().toISOString(),
        };

    try {
      await addTaskToProject(user.uid, id, newTask);
    } catch (error) {
      console.error('Error al agregar tarea:', error);
    }
  };
}

const handleDeleteTask = async (taskId) => {
    try {
      await deleteTaskFromProject(user.uid, id, taskId);
      const updatedTasks = await getTasksFromProject(user.uid, id); 
      setTasks(updatedTasks ? updatedTasks : {});
    } catch (error) {
      console.error('Error al eliminar tarea:', error);
    }
  };
  const toggleOptions = (projectId) => {
    setShowOptions(prev => ({
      ...prev,
      [projectId]: !prev[projectId]
    }));
  };
  
  const handleUpdateProject = async () => {
    if (user && project) {
      const updatedProject = {
        ...project,
        name: projectName,
        description: projectDescription,
      };

      try {
        await updateProject(user.uid, id, updatedProject);
        setProject(updatedProject);
      } catch (error) {
        console.error('Error al actualizar proyecto:', error);
      }
    }
  };


  const handleAddMember = async () => {
    if (user) {
        const newMember = {
          name: memberName,
          role: memberRole,
        };

    try {
      await addMemberToProject(user.uid, id, newMember);
      console.log('Tarea agregada correctamente');
      const updatedMembers = await getMembersFromProject(user.uid, id);
      setMembers(updatedMembers ? updatedMembers : {});
    } catch (error) {
      console.error('Error al agregar tarea:', error);
    }
  };
}

const handleDeleteMember = async (memberId) => {
    try {
      await deleteMemberFromProject(user.uid, id, memberId);
      const updatedMembers = await getMembersFromProject(user.uid, id);
      setMembers(updatedMembers ? updatedMembers : {});
    } catch (error) {
      console.error('Error al eliminar tarea:', error);
    }
  };

  if (!project) {
    return <div className='flex justify-center items-center w-screen h-screen'><LogoTransition /></div>;
  }

  return (
    <div className='flex flex-col mt-20 p-4 bg-gray-800/55 gap-5 rounded-2xl m-2'>
      <div className="p-3 bg-gray-600 flex justify-between rounded-lg shadow-lg">
        <div>
          <h2 className="text-4xl font-bold mb-4">{project.name}</h2>
          <p className="mb-4">{project.description}</p>
        </div>
        <p className="text-gray-400 text-sm">Creado el: {new Date(project.createdAt).toLocaleDateString()}</p>
        <div className="relative">
        <button
  onClick={(e) => {
    e.stopPropagation();
    toggleOptions(project.id);
  }}
  className="hover:bg-gray-500 bg-transparent text-white px-2 py-1 rounded-full"
>
  ⋮
</button>
{showOptions[project.id] && (
  <div className="absolute right-0 mt-2 w-48 bg-gray-800 border border-gray-700 rounded shadow-lg">
    <button
            onClick={(e) => {
              e.stopPropagation();
              setShowConfirm(true);
            }}
            className=" bg-transparent text-white px-2 py-1 w-full"
          >
            Actualizar Datos
          </button>
        </div>
        )}
      </div>
      </div>
      <div className='flex justify-between'>
      <details>
        <summary>Tareas</summary>
        <div>
          <ul>
          {Object.keys(tasks).map(key => (
              <div key={key} className="bg-gray-800 p-5 rounded-lg shadow-lg">
                <h3 className="text-xl mb-2">{tasks[key].name}</h3>
                <p className="mb-2">{tasks[key].description}</p>
                <p className="text-gray-400 text-sm">Creado el: {new Date(tasks[key].createdAt).toLocaleDateString()}</p>
                <button onClick={() => handleDeleteTask(key)} className="bg-red-500 text-white px-4 py-2 rounded mt-2">
                  Eliminar Tarea
                </button>
              </div>
            ))}
            </ul>
        </div>
      </details>
      <div className='flex'>
      {showTaskForm && (
            <div className="bg-gray-800 p-6 absolute right-60 rounded-lg shadow-lg mt-4 min-w-60 max-w-72">
              <h3 className="text-xl mb-2">Agregar Nueva Tarea</h3>
              <input
                type="text"
                value={taskName}
                onChange={(e) => setTaskName(e.target.value)}
                placeholder="Nombre de la tarea"
                className="bg-gray-700 p-2 rounded mb-2 w-full"
              />
              <textarea
                value={taskDescription}
                onChange={(e) => setTaskDescription(e.target.value)}
                placeholder="Descripción de la tarea"
                className="bg-gray-700 p-2 rounded mb-2 w-full"
              />
              <button onClick={handleAddTask} className="bg-blue-500 text-white px-4 py-2 rounded">
                Agregar Tarea
              </button>
            </div>
          )}
                <button onClick={() => setShowTaskForm(!showTaskForm)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded h-10">
            {showTaskForm ? 'Cerrar Formulario' : 'Agregar Tarea'}
          </button>
      </div>
      
      </div>
      <div className='flex justify-between'>
      <details>
        <summary>Miebros</summary>
        <div>
          <ul>
          {Object.keys(members).map(key => (
              <div key={key} className="bg-gray-800 p-5 rounded-lg shadow-lg">
                <h3 className="text-xl mb-2">{members[key].name}</h3>
                <p className="mb-2">{members[key].role}</p>
                <button onClick={() => handleDeleteMember(key)} className="bg-red-500 text-white px-4 py-2 rounded mt-2">
                  Eliminar miembro
                </button>
              </div>
            ))}
            </ul>
        </div>
      </details>
      <div className='flex'>
      {showMembersForm && (
            <div className="bg-gray-800 absolute right-60 p-6 rounded-lg shadow-lg mt-4 max-w-64">
              <h3 className="text-xl mb-2">Agregar Nuevo Miembro</h3>
              <input
                type="text"
                value={memberName}
                onChange={(e) => setMemberName(e.target.value)}
                placeholder="Nombre del miembro"
                className="bg-gray-700 p-2 rounded mb-2 w-full"
              />
              <textarea
                value={memberRole}
                onChange={(e) => setMemberRole(e.target.value)}
                placeholder="Descripción del miembro"
                className="bg-gray-700 p-2 rounded mb-2 w-full"
              />
              <button onClick={handleAddMember} className="bg-blue-500 text-white px-4 py-2 rounded">
                Agregar Miembro
              </button>
            </div>
          )}
                <button onClick={() => setShowmembersForm(!showMembersForm)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded h-10">
            {showMembersForm ? 'Cerrar Formulario' : 'Agregar Miembro'}
          </button>
      </div>
      
      </div>
      {showConfirm && (
        <div className="bg-gray-800 p-6 absolute right-50 top-52 rounded-lg shadow-lg mt-4  max-w-64">
          <h3 className="text-xl mb-2">Actualizar Proyecto</h3>
          <input
            type="text"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            placeholder="Nombre del proyecto"
            className="bg-gray-700 p-2 rounded mb-2 w-full text-white"
          />
          <textarea
            value={projectDescription}
            onChange={(e) => setProjectDescription(e.target.value)}
            placeholder="Descripción del proyecto"
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
              onClick={handleUpdateProject}
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Actualizar Proyecto
            </button>
          </div>
        </div>
      )}
      <div className='h-screen'>
        <ChatRoom project={id}/>
      </div>
    </div>
  );
};

export default Project;