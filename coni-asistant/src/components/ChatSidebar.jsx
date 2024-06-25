const ChatSideBar = ({ conversations, addConversation, selectConversation, currentConversationId }) => {

    return (
        <div className=" hidden md:flex flex-col box-content bg-gray-800/50 rounded-xl p-4 h-screen gap-4 w-2/6">
            <div className=''>
            <div className="flex justify-between">      
                <button className="Hide-sidebar flex bg-slate-600">{"<"}-</button>
                <button className="New-chat bg-slate-600" onClick={addConversation}>+</button>
            </div>
            <ul className='w-full flex flex-col justify-center items-center'>
                {conversations.map(conversation => (
                    <li key={conversation.id} className=' w-3/4 box-content'>
                        <button 
                            className={`py-2 p-1 w-full flex justify-center items-center ${conversation.id === currentConversationId ? 'bg-indigo-500' : 'hover:bg-gray-700 bg-inherit'}`} 
                            onClick={() => selectConversation(conversation.id)}
                        >
                            Conversation {conversation.id}
                        </button>
                    </li>
                ))}
            </ul>
            </div>
        </div>
    );
};

export default ChatSideBar;
