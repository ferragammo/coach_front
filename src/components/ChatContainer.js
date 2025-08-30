import React, { useContext, useEffect, useState } from "react";
import { ContextApp } from "../utils/Context";
import { LuPanelLeftClose, LuPanelLeftOpen } from "react-icons/lu";
import { HiOutlineMenuAlt2 } from "react-icons/hi";
// import { BsPaperclip } from 'react-icons/bs';
import { TbTemplate } from "react-icons/tb";
import { IoArrowUp } from "react-icons/io5";
import Chat from "./Chat";
import ChatModelDropdown from "./ChatModelDropdown";
import { AiFillCloseCircle } from "react-icons/ai";
import TemplateModal from "./TemplateModal";
import AmountItem from "./AmountItem";

function ChatContainer() {
   const {
      selectedModel,
      setSelectedModel,
      setShowSlide,
      showSlide,
      setMobile,
      Mobile,
      chatValue,
      setChatValue,
      handleSend,
      handleKeyPress,
      fileData,
      setFileData,
      isLoading,
   } = useContext(ContextApp);

   const [isDropdownOpen, setIsDropdownOpen] = useState(false);
   const [filePreview, setFilePreview] = useState(null);
   const [isTemplateModalOpen, setIsTemplateModalOpen] = useState(false);

   // const handleClick = () => {
   //   document.getElementById('file-upload').click();
   // };

   const handleTemplateClick = () => {
      setIsTemplateModalOpen(true);
   };

   useEffect(() => {
      if (!fileData) {
         setFilePreview(null);
      }
   }, [fileData]);

   // const handleFileChange = (event) => {
   //   const file = event.target.files[0];
   //   if (file) {
   //     // Если это изображение, показать превью
   //     if (file.type.startsWith('image/')) {
   //       const reader = new FileReader();

   //       reader.onload = (e) => {
   //         setFilePreview(e.target.result); // Устанавливаем превью

   //         // После того как файл прочитан, сохраняем имя и base64-строку
   //         setFileData({
   //           name: file.name, // Имя файла
   //           base64String: e.target.result.split(',')[1], // Содержимое файла в base64
   //         });
   //       };

   //       reader.readAsDataURL(file); // Читаем файл как Data URL
   //     } else {
   //       setFilePreview(null); // Если не изображение, удаляем превью
   //     }
   //   }
   // };

   return (
      <div
         className={`h-screen bg-black flex items-start flex-col p-2
        ${showSlide ? " w-full " : "w-full lg:w-[calc(100%-250px)]"}
     `}
      >
         <div className="flex mb-3 w-full justify-between items-center">
            <div className="flex gap-4">
               <span
                  className="rounded px-3 py-[9px] hidden lg:flex items-center justify-center cursor-pointer text-white m-1 hover:bg-gray-600 duration-200"
                  title="Open sidebar"
                  onClick={() => setShowSlide(!showSlide)}
               >
                  {showSlide ? <LuPanelLeftOpen /> : <LuPanelLeftClose />}
               </span>
               <span
                  className="rounded px-3 py-[9px] lg:hidden flex items-center justify-center cursor-pointer text-white mt-0 border border-gray-600"
                  title="Open sidebar"
                  onClick={() => setMobile(!Mobile)}
               >
                  <HiOutlineMenuAlt2 fontSize={20} />
               </span>
               <div className="relative">
                  <button
                     className="text-white h-full text-start px-2 w-28"
                     onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  >
                     {selectedModel}
                  </button>
                  {isDropdownOpen && (
                     <ChatModelDropdown
                        onSelect={(model) => setSelectedModel(model)}
                        onClose={() => setIsDropdownOpen(false)}
                     />
                  )}
               </div>
            </div>
            <AmountItem />
         </div>
         {/* chat section */}
         <div className="w-full h-full flex flex-col items-center justify-start overflow-hidden overflow-y-auto scroll">
            <Chat />
            {isLoading && (
               <div className="w-4/5 flex justify-start items-center my-4">
                  <div className="w-7 h-7 mx-2 rounded-full animate-pulse bg-gray-500"></div>
               </div>
            )}
         </div>

         {/* chat input section */}
         <div className="self-center h-fit w-[90%] lg:w-2/5 xl:w-1/2 flex rounded-lg shadow-md  items-center bg-main-light-grey justify-center flex-col gap-2 my-2">
            {fileData && (
               <div className="relative self-start">
                  <img
                     src={filePreview}
                     alt="Preview"
                     className="border-main-black  border rounded shadow h-14"
                  />
                  <button
                     className="absolute top-0 right-0 text-center text-white w-4 h-4 flex items-center justify-center text-xs"
                     onClick={() => {
                        setFilePreview(null);
                        setFileData(null);
                     }}
                     title="Delete"
                  >
                     <AiFillCloseCircle size={20} />
                  </button>
               </div>
            )}
            <span className="w-full flex h-full gap-2 items-end">
               <textarea
                  type="text"
                  placeholder="Send a message"
                  className="resize-none overflow-hidden overflow-y-auto scroll  h-full text-white bg-transparent px-3 py-4 w-full border-none outline-none text-base "
                  value={chatValue}
                  onChange={(e) => setChatValue(e.target.value)}
                  onKeyUp={handleKeyPress}
               />
               <div className="m-3 gap-3 flex">
                  {/* <BsPaperclip
              title="upload image"
              className={` p-1 rounded-full m text-3xl  bg-black text-white cursor-pointer 
                        `}
              onClick={handleClick}
            />
            <input
              id="file-upload"
              type="file"
              accept=".jpg, .png"
              className="hidden"
             
            /> */}
                  <TbTemplate
                     title="upload image"
                     className={` p-1 rounded-full text-3xl  bg-black text-white cursor-pointer 
                        `}
                     onClick={handleTemplateClick}
                  />
                  <IoArrowUp
                     title="send message"
                     className={` p-1 rounded-full text-3xl ${
                        chatValue.length > 0 || fileData
                           ? "text-white cursor-pointer bg-blue-800 shadow-md"
                           : "text-gray-400 bg-blue-800/50"
                     }`}
                     aria-disabled={isLoading}
                     onClick={() => {
                        if (!isLoading) {
                           handleSend();
                        }
                     }}
                  />
               </div>
            </span>
         </div>
         {isTemplateModalOpen && (
            <TemplateModal setTemplateModalOpen={setIsTemplateModalOpen} />
         )}
      </div>
   );
}

export default ChatContainer;
