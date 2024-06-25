import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signOut } from 'firebase/auth';
import { getDatabase, ref, set, push, remove, get, update } from 'firebase/database';

// Configuración de Firebase
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};


// Inicialización de la app de Firebase
const app = initializeApp(firebaseConfig);

// Firebase Authentication
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

// Función para cerrar sesión
const signOutUser = () => {
  signOut(auth).then(() => {
    window.location.reload(); // Recarga la página para asegurarse de que el estado de autenticación se actualiza
  }).catch((error) => {
    console.error("Error al cerrar sesión:", error);
  });
};

// Firebase Realtime Database
const database = getDatabase(app);

// Función para agregar un proyecto
const addConversation = async (userId, projectId, conversationData) => {
  const conversationRef = ref(database, `users/${userId}/projects/${projectId}/conversations`);
  const newConversationRef = push(conversationRef);
  const conversationId = newConversationRef.key;
  
  // Asegurarse de que se genere una ID para la conversación
  if (conversationId) {
    await set(newConversationRef, { ...conversationData, id: conversationId });
    return conversationId; // Devuelve el ID de la nueva conversación
  } else {
    throw new Error("No se pudo generar un ID para la conversación");
  }
};

// Función para obtener todas las conversaciones bajo un proyecto específico
const getConversations = async (userId, projectId) => {
  const conversationRef = ref(database, `users/${userId}/projects/${projectId}/conversations`);
  const snapshot = await get(conversationRef);
  if (snapshot.exists()) {
    const conversations = snapshot.val();
    // Asegúrate de devolver las conversaciones con sus IDs
    return Object.keys(conversations).map(id => ({ id, ...conversations[id] }));
  } else {
    return null;
  }
};

const deleteConversation = async (userId, projectId,  convoId) => {
  const convoRef = ref(database, `users/${userId}/projects/${projectId}/conversations/${convoId}`);
  await remove(convoRef);
};

// Función para añadir un mensaje a una conversación existente bajo un proyecto específico
const addMessage = async (userId, projectId, conversationId, messageData) => {
  const messageRef = ref(database, `users/${userId}/projects/${projectId}/conversations/${conversationId}/messages`);
  const newMessageRef = push(messageRef);
  await set(newMessageRef, messageData);
};

// Función para obtener todos los mensajes de una conversación bajo un proyecto específico
const getMessages = async (userId, projectId, conversationId) => {
  const messageRef = ref(database, `users/${userId}/projects/${projectId}/conversations/${conversationId}/messages`);
  const snapshot = await get(messageRef);
  if (snapshot.exists()) {
    return snapshot.val();
  } else {
    return null;
  }
};

const addProject = async (userId, project) => {
  const projectRef = ref(database, `users/${userId}/projects`);
  const newProjectRef = push(projectRef);
  await set(newProjectRef, project);
};
const getProjects = async (userId) => {
    const projectRef = ref(database, `users/${userId}/projects`);
    const snapshot = await get(projectRef);
    if (snapshot.exists()) {
      return snapshot.val();
    } else {
      return {};
    }
  };
  const deleteProject = async (userId, projectId) => {
    const projectRef = ref(database, `users/${userId}/projects/${projectId}`);
    await remove(projectRef);
  };
  const updateProject = async (userId, projectId, updatedProject) => {
    const projectRef = ref(database, `users/${userId}/projects/${projectId}`);
    await update(projectRef, updatedProject);
  };

// Función para agregar una tarea
const addTask = async (userId, task) => {
  const taskRef = ref(database, `users/${userId}/tasks`);
  const newTaskRef = push(taskRef);
  await set(newTaskRef, task);
};
const getTasks = async (userId) => {
    const taskRef = ref(database, `users/${userId}/tasks`);
    const snapshot = await get(taskRef);
    if (snapshot.exists()) {
      return snapshot.val();
    } else {
      return {};
    }
  };

  const deleteTask = async (userId, taskId) => {
    const taskRef = ref(database, `users/${userId}/tasks/${taskId}`);
    await remove(taskRef);
  };
  const updateTask = async (userId, taskId, updatedTask) => {
    const TaskRef = ref(database, `users/${userId}/tasks/${taskId}`);
    await update(TaskRef, updatedTask);
  };
  const getTaskById = async (userId, taskId) => {
    const taskRef = ref(database, `users/${userId}/tasks/${taskId}`);
    const snapshot = await get(taskRef);
    return snapshot.exists() ? snapshot.val() : null;
  };
// Función para agregar un evento de calendario
const addCalendarEvent = async (userId, event) => {
  const eventRef = ref(database, `users/${userId}/calendar`);
  const newEventRef = push(eventRef);
  await set(newEventRef, event);
};

const getProjectById = async (userId, projectId) => {
  const projectRef = ref(database, `users/${userId}/projects/${projectId}`);
  const snapshot = await get(projectRef);
  return snapshot.exists() ? snapshot.val() : null;
};

const addTaskToProject = async (userId, projectId, task) => {
  const taskRef = ref(database, `users/${userId}/projects/${projectId}/tasks`);
  const newTaskRef = push(taskRef);
  await set(newTaskRef, task);
};

// Función para obtener todas las tareas de un proyecto
const getTasksFromProject = async (userId, projectId) => {
  const taskRef = ref(database, `users/${userId}/projects/${projectId}/tasks`);
  const snapshot = await get(taskRef);
  if (snapshot.exists()) {
    return snapshot.val();
  } else {
    return {};
  }
};

// Función para eliminar una tarea de un proyecto
const deleteTaskFromProject = async (userId, projectId, taskId) => {
  const taskRef = ref(database, `users/${userId}/projects/${projectId}/tasks/${taskId}`);
  await remove(taskRef);
};

const addMemberToProject = async (userId, projectId, member) => {
  const memberRef = ref(database, `users/${userId}/projects/${projectId}/members`);
  const newMemberRef = push(memberRef);
  await set(newMemberRef, member);
};

// Función para obtener todas las tareas de un proyecto
const getMembersFromProject = async (userId, projectId) => {
  const memberRef = ref(database, `users/${userId}/projects/${projectId}/members`);
  const snapshot = await get(memberRef);
  if (snapshot.exists()) {
    return snapshot.val();
  } else {
    return {};
  }
};

// Función para eliminar una tarea de un proyecto
const deleteMemberFromProject = async (userId, projectId, memberId) => {
  const memberRef = ref(database, `users/${userId}/projects/${projectId}/members/${memberId}`);
  await remove(memberRef);
};
// hello



export {
  auth,
  provider,
  signOutUser,
  database,
  addProject, 
  addTask,
  addCalendarEvent, 
  getProjects, 
  getTasks, 
  deleteProject, 
  deleteTask, 
  getProjectById,
  addTaskToProject,
  getTasksFromProject,
  deleteTaskFromProject,
  addMemberToProject,
  getMembersFromProject,
  deleteMemberFromProject,
  addMessage,
  getMessages,
  addConversation, 
  getConversations,
  getTaskById,
  updateTask,
  updateProject
};
