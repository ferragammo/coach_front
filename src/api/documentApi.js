import api from ".";

export const getDocumentsAmount = async () => {
   try {
      const response = await api.get(`/api/agent/documents`, {});
      if (response.data.successful) {
         return response.data;
      } else {
         throw new Error(
            response.data.error.message || "Unknown error occurred"
         );
      }
   } catch (error) {
      console.error(
         "Failed to fetch chats:",
         error.response ? error.response.data : error.message
      );
      throw error;
   }
};
