import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useEffect } from 'react';
import Opcion1 from '../assets/Laptop_digital.png'
import Opcion2 from '../assets/books.png'
import { useNavigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase';

const Landing = () => {
    const [user] = useAuthState(auth);
    const navigate = useNavigate();
  
    useEffect(() => {
        if (user) {
            navigate('/home');
        }
    }, [user, navigate]);
    
    return (
        <div className='min-h-screen flex flex-col justify-center pt-20  text-white'>
            <div className="lg:h-dvh flex justify-center px-1">
            <div className="window lg:h-3/4 grid lg:flex justify-between bg-gray-800/60 p-5 gap-7 mb-20 lg:mb-0  rounded-2xl w-full md:w-3/4">
    <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 4, ease: 'easeOut' }} 
        className="flex flex-col w-full lg:w-2/3 justify-between  gap-5"
    >
            <div className="flex flex-col rounded-lg">
                <div>
                    <h2 className="introducction text-transparent bg-gradient-to-b from-gray-300 to-gray-400 bg-clip-text font-bold text-4xl lg:text-5xl 2xl:text-7xl">
                        Mejora tu <br />
                        <span className="text-transparent bg-gradient-to-t from-red-600 to-orange-500 bg-clip-text font-extrabold text-5xl lg:text-6xl 2xl:text-8xl">Productividad</span>
                    </h2>
                </div>
                <div>
                    <h2 className="introducction text-transparent bg-gradient-to-b from-gray-300 to-gray-400 bg-clip-text font-bold text-4xl lg:text-5xl 2xl:text-7xl">
                        Simplifica tu vida
                    </h2>
                </div>
            </div>
        <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 4, ease: 'easeOut' }}
            className="text-gray-400 text-xl lg:text-2xl 2xl:text-4xl text-justify w-full "
        >
            Simple. Intuitivo. Un gestor de proyectos, tareas y más impulsado por IA para hacerte la vida escolar más fácil. Todo lo que necesitas al alcance de un clic.
        </motion.p>
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 6, ease: 'easeOut' }}
            className="text-center"
        >
            <Link to="/login">
                <button className="bg-transparent border border-gray-300 hover:border-transparent hover:bg-orange-600 text-gray-50 rounded-md text-2xl font-bold p-4 w-full transition-all duration-300 ease-in-out">
                    Entrar
                </button>
            </Link>
        </motion.div>
    </motion.div>
    <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 4, ease: 'easeOut' }} 
        className=" w-full flex justify-center lg:justify-end items-center"
    >
        <img src={Opcion2} alt="" className=" w-72 2xl:w-1/2 " />
    </motion.div>
</div>

            </div>

        <div>
            <div className="container mx-auto">
                <section id="problematica" className="pt-16 -mt-16">
                    <div className="p-12 bg-gray-700/50 rounded-lg shadow-lg">
                        <div className="text-center flex flex-col md:flex-row justify-between items-center">
                            <h2 className="text-4xl font-bold mb-4">Problemática</h2>
                            <div className="md:w-1/2 text-justify">                            
                                <p className="text-xl">El objetivo de CONIA es ayudar a los jóvenes en su vida escolar mediante un asistente de voz personalizable. Este asistente ayuda con tareas escolares, recordatorios y gestión de proyectos, mejorando su productividad y organización.</p>
                            </div>
                        </div>
                    </div>
                </section>

                <section id="objetivo" className="pt-16">
                    <div className="p-12 bg-gray-700/50 rounded-lg shadow-lg">
                        <div className="text-center flex flex-col md:flex-row justify-between items-center">
                            <h2 className="text-4xl font-bold mb-4">Objetivo General</h2>
                            <div className="md:w-1/2 text-justify">
                            <p className="text-xl">CONIA busca ser una herramienta esencial para los estudiantes, ofreciendo soporte en la gestión de sus actividades académicas mediante tecnologías avanzadas de inteligencia artificial.</p>                                
                            </div>

                        </div>
                    </div>
                </section>

                <section id="ayuda-ia" className="pt-16">
                    <div className="p-12 bg-gray-700/50 rounded-lg shadow-lg">
                        <div className="text-center flex flex-col md:flex-row justify-between items-center">
                            <h2 className="text-4xl font-bold mb-4">¿Cómo Puede Ayudar la IA?</h2>
                            <div className="md:w-1/2 text-justify"> <p className="text-xl">Las inteligencias artificiales pueden optimizar procesos, automatizar tareas repetitivas, mejorar la precisión diagnóstica en medicina, personalizar experiencias de usuario, analizar grandes volúmenes de datos, ayudar en la toma de decisiones y predecir tendencias futuras.</p></div>
                    </div>
                    </div>
                </section>

                <section id="app" className="py-16">
                    <div className="p-12 bg-gray-700/50 rounded-lg shadow-lg">
                        <div className="text-center flex flex-col md:flex-row justify-between items-center">
                            <h2 className="text-4xl font-bold mb-4">¿En Qué Consiste Nuestra App?</h2>
                            <div className="md:w-1/2 text-justify"><p className="text-xl">CONIA es una aplicación diseñada para jóvenes, con configuraciones personalizadas para su uso escolar. Es especialmente útil en la gestión de proyectos, tareas, recordatorios y herramientas útiles, mejorando su productividad y control sobre su vida escolar.</p></div>
                            
                        </div>
                    </div>
                </section>
            </div>

            <footer className="bg-gray-800/50 p-6 text-center mt-auto">
                <p className="text-lg text-white">&copy; 2024 CONIA. Todos los derechos reservados.</p>
            </footer>
            </div>
        </div>
    );
}

export default Landing;
