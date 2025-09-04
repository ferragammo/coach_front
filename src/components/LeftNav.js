import React, {useContext, useState} from 'react';
import {AiOutlinePlus} from 'react-icons/ai';
import {FiMessageSquare, FiMoreHorizontal} from 'react-icons/fi';
import {ContextApp} from '../utils/Context';
import ModalMore from './ModalMore';
import { createChat, deleteChat, updateTitle } from '../api/chatApi';

function LeftNav() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedChatId, setSelectedChatId] = useState(null);
  
  const [buttonPosition, setButtonPosition] = useState({ bottom: 0, right: 0 });
  const [newTitle, setNewTitle] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const {
    showSlide,
    getAllChats,
    chats,
    setSelectedChat,
    selectedChat,
    selectedChatById,
    chatsAmount,
    
    loadChatMessages,
  } = useContext(ContextApp);


  const handleSelectChat = (chatId) => {
    selectedChatById(chatId);
  };
  

  const handleOpenModal = (e, chatId) => {
    const buttonRect = e.currentTarget.getBoundingClientRect();
    setButtonPosition({
      top: buttonRect.bottom + window.scrollY,
      left: buttonRect.left + window.scrollX,
    });
    setIsModalOpen(true);
    setSelectedChatId(chatId);
  };

  const handleRename = () => {
    setIsModalOpen(false);
    setIsEditing(true);
    const chat = chats.find((c) => c.id === selectedChatId);
    setNewTitle(chat.title);
  };

  const handleSaveTitle = async () => {
    if (!selectedChatId) return;

    try {
      const response = await updateTitle(selectedChatId, newTitle);
      if (response.successful) {
        console.log('update');
      } else {
        console.error('Failed to update title:', response.message);
        alert(response.message);
      }
    } catch (error) {
      console.error('Error updating title:', error);
      alert('Unexpected error occurred while updating title.');
    } finally {
      setIsEditing(false);
      setSelectedChatId(null);
      setNewTitle('');
    }
    getAllChats();
  };

  const handleDelete = async (chatId) => {
  
    try {
      const response = await deleteChat(chatId);
      if (response.successful) {
        console.log('Chat deleted successfully:', response);
        setSelectedChat(null);
        setIsModalOpen(false);
        setSelectedChatId(null);
        loadChatMessages(null);
      } else {
        console.error('Error deleting chat:', response.message);
        alert(`Error: ${response.message}`);
      }
    } catch (error) {
      console.error('Unexpected error:', error);
    }
    getAllChats();
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleCreateChat = async () => {
    try {
    
      const response = await createChat();
      if (response.successful) {
        console.log('Chat created:', response);
        setSelectedChat(response.data.id);
        selectedChatById(response.data.id);
       
      } else {
        console.error('Error creating chat:', response.message);
        alert(`Error: ${response.message}`);
      }
    } catch (error) {
      console.error('Unexpected error:', error);
    }
    getAllChats();
  };

  return (
    <div
      className={
        !showSlide
          ? 'h-screen bg-main-grey w-[250px] hidden lg:flex items-center justify-between p-2 text-white flex-col translate-x-0'
          : 'hidden'
      }
    >
      <div className="flex items-center justify-between w-full">
        <span className="text-xl font-semibold">Chats Amount: {chatsAmount}</span>
        <button
          className="rounded px-3 py-[9px] hidden lg:flex items-center justify-center cursor-pointer text-white m-1 hover:bg-gray-600 duration-200"
          onClick={handleCreateChat}
        >
          <AiOutlinePlus fontSize={16} />
        </button>
      </div>
      <div className="h-full w-full p-2 gap-3 flex items-start justify-start flex-col overflow-y-auto text-sm scroll my-2">
        {chats && chats.length > 0 ? (
          chats.map((chat) => (
            <div
              key={chat.id}
              className={`rounded-lg w-full py-5 px-3 text-xs my-2 flex items-center justify-between cursor-pointer hover:bg-[#212121] transition-all duration-300 overflow-hidden truncate whitespace-nowrap ${
                chat.id === selectedChat ? 'bg-[#212121]' : ''
              }`}
              onClick={() => handleSelectChat(chat.id)}
            >
              {selectedChatId === chat.id && isEditing ? (
                <div className="flex w-full items-center gap-2">
                  <input
                    type="text"
                    className="w-full p-2 rounded bg-gray-700 text-white"
                    value={newTitle}
                    autoFocus
                    onChange={(e) => setNewTitle(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        handleSaveTitle();
                      }
                    }}
                    onBlur={handleSaveTitle}
                  />
                </div>
              ) : (
                <div className="flex justify-between w-full">
                  <div className="flex items-center gap-3">
                    <FiMessageSquare fontSize={20} />
                    <span className="text-base">{chat.title}</span>
                  </div>
                  <button
                    className="ml-auto flex p-2 items-center justify-end"
                    onClick={(e) => {
                      e.stopPropagation(); // Остановка всплытия события
                      handleOpenModal(e, chat.id);
                    }}
                  >
                    <FiMoreHorizontal fontSize={20} />
                  </button>
                </div>
              )}
            </div>
          ))
        ) : (
          <p>No chats available</p>
        )}
      </div>

      <ModalMore
        isOpen={isModalOpen}
        onRename={handleRename}
        onDelete={() => handleDelete(selectedChatId)}
        onClose={handleCloseModal}
        position={buttonPosition}
      />
    </div>
  );
}

export default LeftNav;
