import React, { useContext } from "react";
import { defaultTemplateText } from "../static/defaultTemplateText";
import { CiCircleCheck } from "react-icons/ci";
import { CiCircleRemove } from "react-icons/ci";
import { ContextApp } from "../utils/Context";

const TemplateModal = ({setTemplateModalOpen}) => {
    const { templateText, setTemplateText } = useContext(ContextApp);

    const handleSave = () => {
        setTemplateText(templateText);
        setTemplateModalOpen(false);
    }

    
   return (
      <div onClick={() => setTemplateModalOpen(false)} className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
         <div onClick={(e) => e.stopPropagation()} className="w-1/2 h-3/4 flex flex-col bg-main-light-grey rounded-lg p-4">
            <textarea
             value={templateText}
             onChange={(e) => setTemplateText(e.target.value)}
             className="w-full h-full text-sm bg-transparent text-white resize-none outline-none px-4 py-2 scroll"
             style={{ whiteSpace: "pre-wrap", fontFamily: "monospace" }}
            />
            <div className="flex justify-end items-center gap-5 w-full">
               <CiCircleCheck onClick={handleSave} className="text-green-500 text-3xl cursor-pointer" />
               <CiCircleRemove onClick={() => setTemplateText(defaultTemplateText)} className="text-red-500 text-3xl cursor-pointer" />
            </div>
         </div>
      </div>
   );
};

export default TemplateModal;
