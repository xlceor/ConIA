import { Link } from "react-router-dom";
import { motion } from "framer-motion"
import { useEffect } from 'react';
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

        <div className='main h-full w-full flex flex-col gap-20 justify-center overflow-hidden'>
                
                <div className="main h-full w-5/6 flex flex-col ">
                    <motion.div 
                        initial={{ opacity: 0}} 
                        animate={{ opacity: 1}}
                        transition={{ duration: 1.5, ease: 'easeOut' }} 
                        exit={{ opacity: 0}} 
                        style={{ width: "100%", textAlign: "center" }}
                        className=" pt-20 rounded-lg gap-10 h-full w-11/12"
                        >
                    <div className="Upper flex flex-col h-full w-dvw justify-center items-center">
                        <div className="present flex flex-col  bg-gray-900/20 p-2 py-10 rounded-lg md:flex-row gap-4 w-full items-center ">
                        <div className="flex w-full flex-col rounded-lg">
                            <div>
                                <h2 className="introducction text-transparent bg-gradient-to-r from-gray-300 to-gray-800 bg-clip-text font-bold text-5xl md:text-6xl/[1.07]">
                                    Mejora tu
                                </h2>
                                <h2 className=" text-transparent bg-gradient-to-r from-red-600 to-orange-500 bg-clip-text font-extrabold text-5xl md:text-7xl/[1.07]">Productividad</h2>
                            </div>
                            <div>
                                <h2 className="introducction text-transparent bg-gradient-to-r from-gray-300 to-gray-600 bg-clip-text font-bold text-5xl md:text-6xl/[1.07]">
                                    Simplifica tu vida
                                </h2>
                            </div>
                        </div>
                        <div className="bg-gray-900/55 p-3 flex flex-col justify-center w-3/4 lg:w-3/4 rounded-lg items-center">
                            <motion.p 
                            initial={{ opacity: 0}} 
                            animate={{ opacity: 1}}
                            transition={{ duration: 4, ease: 'easeOut' }} 
                            exit={{ opacity: 0}} 
                            style={{ width: "100%", textAlign: "center" }}
                            className="m-5 text-gray-400 text-xl lg:text-2xl">
                                Simple. Intuitivo. Un gestor de proyectos, tareas y demas impulsado por IA para hacerte la vida escolar mas facil. Todo lo que nesesitas al alcance de un click
                            </motion.p>
                        <motion.div
                        initial={{ opacity: 0}} 
                        animate={{ opacity: 1}}
                        transition={{ duration: 6, ease: 'easeOut' }} 
                        exit={{ opacity: 0}} 
                        style={{ width: "100%", textAlign: "center" }}>
                            <Link to= "/login"><motion.button 
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            transition={{ duration: 0.2 }}
                            className='Login bg-gradient-to-r from-red-600 to-orange-500 text-gray-50 rounded-md text-2xl font-bold p-4 w-2/5 h-full'>
                                Entrar
                                </motion.button></Link>
                        </motion.div>
                    </div>
                        </div>
        <div className="min-h-screen bg-cover flex flex-col justify-center bg-center">
            <div className="container flex flex-col gap-8 py-16">
                <section id="problematica" className="pt-28">
                    <div className="p-12 bg-gray-700/50 rounded-lg shadow-lg">
                    <div className="text-center">
                        <h2 className="text-4xl font-bold text-white mb-4">Problemática</h2>
                        <p className="text-xl text-white">El objetivo de CONIA es ayudar a los jóvenes en su vida escolar mediante un asistente de voz personalizable. Este asistente ayuda con tareas escolares, recordatorios y gestión de proyectos, mejorando su productividad y organización.</p>
                    </div>
                    </div>
                </section>

                <section id="objetivo" className="pt-28">
                    <div  className="p-12 bg-gray-700/50 rounded-lg shadow-lg">
                    <div className="text-center">
                        <h2 className="text-4xl font-bold text-white mb-4">Objetivo General</h2>
                        <p className="text-xl text-white">CONIA busca ser una herramienta esencial para los estudiantes, ofreciendo soporte en la gestión de sus actividades académicas mediante tecnologías avanzadas de inteligencia artificial.</p>
                    </div>
                    </div>
                </section>

                <section id="ayuda-ia" className="pt-28">
                    <div className="p-12 bg-gray-700/50  rounded-lg shadow-lg">
                    <div className="text-center">
                        <h2 className="text-4xl font-bold text-white mb-4">¿Cómo Puede Ayudar la IA?</h2>
                        <p className="text-xl text-white">Las inteligencias artificiales pueden optimizar procesos, automatizar tareas repetitivas, mejorar la precisión diagnóstica en medicina, personalizar experiencias de usuario, analizar grandes volúmenes de datos, ayudar en la toma de decisiones y predecir tendencias futuras.</p>
                    </div>
                    </div>
                </section>

                <section id="app" className="pt-28">
                    <div className=" p-12 bg-gray-700/50 rounded-lg shadow-lg">
                        <div className="text-center">
                            <h2 className="text-4xl font-bold text-white mb-4">¿En Qué Consiste Nuestra App?</h2>
                            <p className="text-xl text-white">CONIA es una aplicación diseñada para jóvenes, con configuraciones personalizadas para su uso escolar. Es especialmente útil en la gestión de proyectos, tareas, recordatorios y herramientas útiles, mejorando su productividad y control sobre su vida escolar.</p>
                        </div>
                    </div>
                </section>
            </div>

            <footer className="bg-gray-800/50 p-6">
                <div className="container mx-auto text-center">
                    <p className="text-lg text-white">&copy; 2024 CONIA. Todos los derechos reservados.</p>
                </div>
            </footer>
        </div>
                        
                    </div>
                    </motion.div>
                </div>
            

        </div>
    )
}
export default Landing;