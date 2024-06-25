import micro from '../assets/micro.png';
import send from '../assets/arrow.png';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, addMessage, getMessages } from '../firebase';
import { useState, useEffect } from 'react';
import axios from 'axios';

const Asistant = ({ project, convoId }) => {
    const [loading, setLoading] = useState(false);
    const [user] = useAuthState(auth);
    const [recording, setRecording] = useState(false);
    const [mediaRecorder, setMediaRecorder] = useState(null);
    const [txRequest, setTxRequest] = useState('');
    const [messages, setMessages] = useState([]);
    
    useEffect(() => {
        if (convoId) {
            fetchMessages(convoId);
        }
    }, [convoId]);

  const fetchMessages = async (conversationId) => {
    if (!conversationId) return;
    const msgs = await getMessages(user.uid, project, conversationId);
    if (msgs) {
      setMessages(Object.values(msgs));
    } else {
      setMessages([]);
    }
  };

  const updateMessages = async (request, response) => {
    const userMessage = {
        role: 'user',
        content: request,
    };

    const assistantMessage = {
        role: 'assistant',
        content: response,
    };

    setMessages(prevMessages => [
        ...prevMessages,
        userMessage,
        assistantMessage,
    ]);

    await addMessage(user.uid, project, convoId, userMessage);
    await addMessage(user.uid, project, convoId, assistantMessage);
};

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      let chunks = [];

      recorder.ondataavailable = (e) => {
        chunks.push(e.data);
      };

      recorder.onstop = async () => {
        const blob = new Blob(chunks, { type: 'audio/mpeg' });
        await handleUpload(blob);
      };

      recorder.start();
      setRecording(true);
      setMediaRecorder(recorder);
    } catch (error) {
      console.error('Error al acceder al micrófono:', error);
    }
  };

  const stopRecording = () => {
    if (mediaRecorder && mediaRecorder.state === 'recording') {
      mediaRecorder.stop();
      setRecording(false);
      setMediaRecorder(null);
    }
  };

  const txUpload = async () => {
    setLoading(true);
    const formDataTx = new FormData();
    formDataTx.append('text', txRequest);

    const messagesObj = messages.map(msg => ({
        role: msg.role,
        content: msg.content
    }));

    formDataTx.append('messages', JSON.stringify(messagesObj));
    formDataTx.append('username', user.displayName);
    formDataTx.append('user_id', user.uid);
    formDataTx.append('project_id', project);


    try {
        const response = await axios.post('http://127.0.0.1:5000/', formDataTx);
        if (response.status === 200) {
            const { text, file } = response.data;
            updateMessages(txRequest, text);
            const audio = new Audio('data:audio/mp3;base64,' + file);
            audio.play();
        } else {
            console.error('Fallo al subir el texto');
        }
    } catch (error) {
        console.error('Error al subir el texto:', error);
    } finally {
        setLoading(false);
    }
};

const handleUpload = async (blob) => {
    setLoading(true); 
    const formDataAu = new FormData();
    formDataAu.append('audio', blob, 'audio');

    const messagesObj = messages.map(msg => ({
        role: msg.role,
        content: msg.content
    }));

    formDataAu.append('messages', JSON.stringify(messagesObj));
    formDataAu.append('username', user.displayName);
    formDataAu.append('user_id', user.uid);
    formDataAu.append('project_id', project);


    try {
        const response = await axios.post('http://127.0.0.1:5000/', formDataAu);
        if (response.status === 200) {
            const Response = response.data;
            setTxRequest(Response.prompt);
            updateMessages(Response.prompt, Response.text);
            const audio = new Audio('data:audio/mp3;base64,' + Response.file);
            audio.play();
        } else {
            console.error('Fallo al subir el audio');
        }
    } catch (error) {
        console.error('Error al subir el audio:', error);
    } finally {
        setLoading(false);
    }
};

    return (
            <div className='flex flex-col h-full items-center justify-center w-full'>
                <div className='h-full md:w-3/4 w-full flex flex-col justify-center items-center'>
                    <div className="flex flex-col overflow-auto bg-slate-500/50 h-3/4 items-start md:w-3/4 w-full m-5 rounded-lg">
                        {loading && <div className="loading">Cargando...</div>}
    
                        {messages.map((msg, index) => (
                            <div 
                                key={index} 
                                className={`w-auto max-w-xs p-2 m-2 rounded-lg ${msg.role === 'user' ? 'self-end bg-blue-400 text-right' : 'self-start bg-gray-600 text-left'}`}
                            >
                                {msg.content}
                            </div>
                        ))}
                    </div>
        
                    <div className='flex md:w-3/4 w-full bg-slate-600 p-0 rounded-full justify-between'>
                        {!recording ? (
                            <button className="flex items-center justify-center m-0 bg-gradient-to-r from-red-600 to-orange-500 rounded-full" onClick={startRecording} disabled={recording}>
                                <img className='micro w-10 h-7' src={micro} alt="micro"></img>
                            </button>
                        ) : (
                            <button className="flex items-center justify-center m-0 bg-gradient-to-r from-green-600 to-emerald-500 rounded-full" onClick={stopRecording} disabled={!recording}>
                                <img className='micro w-10 h-7' src={micro} alt="micro"></img>
                            </button>
                        )}
                        <textarea className="resize-none h-full w-full rounded-xl m-0 p-2 outline-0 bg-transparent flex justify-center" type="text" value={txRequest} placeholder='Inserte su mensaje' onChange={(e) => setTxRequest(e.target.value)} />
                        <button onClick={txUpload} className='bg-slate-300 m-0 rounded-full'>
                            <img className='w-7 h-7' src={send} alt="send" />
                        </button>
                    </div>
                </div>
            </div>
        );
};

export default Asistant;