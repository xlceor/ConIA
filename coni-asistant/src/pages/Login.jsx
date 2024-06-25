import { motion } from "framer-motion";
import { signInWithPopup } from 'firebase/auth';
import { database, auth, provider, signOutUser } from '../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { ref, set } from 'firebase/database';
import { FaGoogle } from "react-icons/fa";
import PropTypes from 'prop-types';

const Login = ({ onLogin }) => {
  const [user] = useAuthState(auth);

  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      const userRef = ref(database, 'users/' + user.uid);
      const userData = {
        displayName: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
      };
      set(userRef, userData);

      if (onLogin) {
        onLogin();
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      style={{ width: "100%", textAlign: "center" }}
      className="my-20 flex justify-center"
    >
      <div>
        {user ? (
          <div>
            <motion.h2
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
            >
              Bienvenido, {user.displayName}
            </motion.h2>
            <motion.button
              onClick={signOutUser}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              transition={{ duration: 0.2 }}
              className="bg-red-500 text-white px-4 py-2 rounded mt-4 flex gap-4 items-center"
            >
                <FaGoogle />
              Cerrar sesión
            </motion.button>
          </div>
        ) : (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="bg-gray-900/55 p-20 rounded-lg "
          >
            <h1 className="text-3xl mb-6">Iniciar Sesión</h1>
            <motion.button
              onClick={signInWithGoogle}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              transition={{ duration: 0.2 }}
              className="bg-blue-500 text-white px-4 py-2 rounded flex gap-4 items-center"
            >
            <FaGoogle />
              Iniciar sesión con Google
            </motion.button>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};
Login.propTypes = {
    onLogin: PropTypes.func.isRequired,
  };


export default Login;