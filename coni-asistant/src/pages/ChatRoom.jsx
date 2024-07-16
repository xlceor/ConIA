import { useState, useEffect } from 'react';
import ChatSideBar from '../components/ChatSidebar';
import { auth, getConversations, addConversation } from '../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import Asistant from '../components/Asistant';

const ChatRoom = ({ project }) => {
    const [user] = useAuthState(auth);
    const [conversations, setConversations] = useState([]);
    const [selectedConversationId, setSelectedConversationId] = useState('');
    const [idCounter, setIdCounter] = useState(0);

    useEffect(() => {
        const fetchAndSelectConversation = async () => {
            try {
                const convos = await getConversations(user.uid, project);

                if (convos !== null) {
                    const convoIds = Object.keys(convos);
                    
                    if (convoIds.length > 0) {
                        const updatedConvos = convoIds.map((id, index) => ({
                            ...convos[id],
                            id: index + 1,
                            title: `Conversation ${index + 1}`
                        }));

                        setIdCounter(convoIds.length);

                        setSelectedConversationId(convoIds.length-1); 
                        setConversations(updatedConvos);
                    } else {
                        handleAddConversation();
                    }
                } else {
                    console.log('No se encontraron conversaciones.');
                }
            } catch (error) {
                console.error('Error al obtener o procesar las conversaciones:', error);
            }
        };

        fetchAndSelectConversation();
    }, [user.uid, project]);

    const handleAddConversation = async () => {
        const newConversationData = { title: `Conversation ${idCounter + 1}`, createdAt: Date.now() };
        const newConversationId = await addConversation(user.uid, project, newConversationData);

        const numericId = idCounter + 1;
        setIdCounter(numericId);
    
        setSelectedConversationId(numericId);
        setConversations(prevConversations => [
            ...prevConversations,
            { id: numericId, ...newConversationData }
        ]);
    };

    return (
        <div className='flex flex-col md:flex-row h-screen overflow-clip w-full justify-end'>
            <ChatSideBar 
                conversations={conversations} 
                addConversation={handleAddConversation} 
                selectConversation={setSelectedConversationId} 
                currentConversationId={selectedConversationId} 
            /> 
            <Asistant project={project} convoId={selectedConversationId} />
        </div>
    );
};

export default ChatRoom;