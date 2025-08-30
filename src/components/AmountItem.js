import React, { useContext } from "react";
import { ContextApp } from "../utils/Context";

const AmountItem = () => {
   const { documentsAmount } = useContext(ContextApp);

   return (
      <div className="text-white mr-5">
         Number of uploaded documents: {documentsAmount ? documentsAmount : "."}
      </div>
   );
};

export default AmountItem;
