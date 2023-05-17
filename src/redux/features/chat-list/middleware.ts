import { createListenerMiddleware } from "@reduxjs/toolkit";
import { addMessages, sendMessage } from "./chatListSlice";
import { RootState } from "@redux/store";
import whatsAppClient from '@green-api/whatsapp-api-client'
import { IChatMessage, TTypeMessage } from "@custom-types/types.d";

const chatListMiddleware = createListenerMiddleware();

chatListMiddleware.startListening({
  actionCreator: sendMessage,
  effect: async (action, listenerApi) => {
    const { textMessage, chatId } = action.payload
    const { userStore: { user } } = listenerApi.getState() as RootState
    if (user !== null) {
      const { idInstance, apiTokenInstance } = user
        ;
      (async () => {
        const restAPI = whatsAppClient.restAPI(({ idInstance, apiTokenInstance }))

        try {
          const { idMessage } = await restAPI.message.sendMessage(chatId, null, textMessage);
          const chatMessage: IChatMessage = {
            chatId,
            idMessage,
            textMessage,
            timestamp: Date.now(),
            type: "outgoing",
            typeMessage: TTypeMessage.textMessage
          }

          listenerApi.dispatch(addMessages({ chatId, messages: [chatMessage] }))
        } catch (ex) {
          console.error(ex);
        }
      })()
    }

  }
})

export { chatListMiddleware }