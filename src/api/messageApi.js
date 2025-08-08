import api from ".";

export const getAllChatMessages = async (chatId) => {
   try {
      const response = await api.get(`/api/agent/${chatId}/all`, {});

      if (response.data.successful) {
         const result = response.data.data;
         return result;
      } else {
         throw new Error(response.data.error);
      }
   } catch (error) {
      console.error("Error getting messages: ", error);
      return error;
   }
};

export const createMessage = async (chatId, text, promptTemplate) => {

   const payload = {
      text,
      promptTemplate
   }

   try {
      const response = await api.post(`/api/agent/${chatId}`, payload);

      if (response.data.successful) {
         const result = response.data.data;
         console.log(result);
         return result;
      } else {
         throw new Error(response.data.error);
      }
   } catch (error) {
      console.error("Error getting messages: ", error);
      return error;
   }
};
