import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { motion } from 'framer-motion';
import { auth, getProjects, getTasks } from '../firebase';

const Home = () => {
  const [user] = useAuthState(auth);
  const [projects, setProjects] = useState({});
  const [tasks, setTasks] = useState({});

  useEffect(() => {
    const fetchTasks = async () => {
      if (user) {
        const userTasks = await getTasks(user.uid);
        setTasks(userTasks);
      }
    };

    fetchTasks();
  }, [user]);


  useEffect(() => {
    const fetchProjects = async () => {
      if (user) {
        const userProjects = await getProjects(user.uid);
        setProjects(userProjects);
      }
    };

    fetchProjects();
  }, [user]);



  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="flex flex-col gap-5 p-5 h-full overflow-y-auto text-gray-50 pt-20">
      <motion.div
        className="flex flex-col rounded-lg shadow-lg"
        initial="hidden"
        animate="show"
        variants={containerVariants}
      >
      <div className='bg-gradient-to-r from-teal-500 rounded-t-lg to-teal-600 h-10 w-full'></div>
      <div className='flex justify-between bg-gray-900/30 p-5  items-center'>   

          <motion.div variants={itemVariants}>
          <h2 className="text-2xl">Hola!, {user.displayName}</h2>
          <p className="dark:text-gray-400">Resumen de tus actividades recientes.</p>
        </motion.div>
        <motion.div className="flex items-center" variants={itemVariants}>
          <img
            src={user.photoURL || '/path/to/default-profile-pic.jpg'}
            alt="Perfil"
            className="w-12 h-12 rounded-full mr-3 shadow-lg"
          />
        </motion.div>
      </div>

      </motion.div>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
        initial="hidden"
        animate="show"
        variants={containerVariants}
      >
        <motion.div className=" w-full flex flex-col  rounded-lg shadow-xl" variants={itemVariants}>
        <div className='bg-gradient-to-r from-sky-500 to-blue-600 h-10 rounded-t-lg w-full'></div>
        <div className='bg-gray-900/30 p-5 flex flex-col h-full'>
        <h3 className="text-xl mb-2">Proyectos Activos</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 mt-5 w-max">
            
            <ul className='h-32 flex flex-col gap-2'>
            { Object.keys(projects).map((key) => (projects[key].name)) != 0 ? Object.keys(projects).map((key) => (
                      <div key={key} className="bg-gray-900/40 p-1 items-center justify-center text-center w-full md:min-w-36 rounded-lg shadow-2xl">
                        <li className="text-xl mb-2">{projects[key].name}</li>
                      </div>
                    )) : (<p className=' text-gray-500'>no hay projectos</p>)}
            </ul>

      </div>
          <Link to="/projects" className="text-blue-400">Ver todos los proyectos</Link>
        </div>
        </motion.div>
        <motion.div className="flex flex-col rounded-lg shadow-xl" variants={itemVariants}>
        <div className='bg-gradient-to-r from-green-500 to-emerald-600 h-10 rounded-t-lg w-full'></div>
        <div className=' bg-gray-900/30 p-5 flex flex-col justify-between h-full'>
        <h3 className="text-xl mb-2">Tareas Pendientes</h3>
          <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 mt-5  w-max">
            
          {Object.keys(tasks).map((key) => (
          <div key={key} className="bg-gray-900/40 p-1 rounded-lg shadow-2xl">
            <li className="text-xl mb-2">{tasks[key].name}</li>
          </div>
          
        ))}

</ul>
          <Link to="/tasks" className="text-blue-400">Ver todas las tareas</Link>
        </div>
        </motion.div>

        <motion.div className="flex flex-col rounded-lg shadow-xl" variants={itemVariants}>
        <div className='bg-gradient-to-r from-violet-500 to-indigo-600 h-10 rounded-t-lg w-full'></div>
        <div className=' bg-gray-900/30 p-5 h-full'>
          <h3 className="text-xl mb-2">Asistente</h3>
          <p className="mb-2">Preguntas rapidas y asistencia en tiempo real</p>
          <Link to="/chatroom" className="text-blue-400">Asistente</Link>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Home;