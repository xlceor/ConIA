import { useState, useEffect } from "react";
import Logo from "../components/Logo";
import { motion } from 'framer-motion'
const LogoTransition = () => {
    const [isVisible, setIsVisible] = useState(true);
    useEffect(() => {
      const timer = setTimeout(() => {
        setIsVisible(false);
      }, 3000);
  
      return () => clearTimeout(timer);
    }, []);
  
    return (
      <div>
        
          <div>
            {isVisible && (
                <motion.div                         initial={{ opacity: 0}} 
                animate={{ opacity: 1}}
                transition={{ duration: 1.5, ease: 'easeOut' }} 
                exit={{ opacity: 0}} 
                style={{ width: "100%", textAlign: "center" }}
                className="logo-container">
                    <Logo/>
                </motion.div>
            )}
          </div>
        
      </div>
    );
  };

export default LogoTransition;