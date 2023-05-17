import { IChatMessage } from "@custom-types/types.d";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Chat {
  chatId: string
  messages: IChatMessage[]
}

interface IChatlistStore {
  chatList: Chat[]
}

const initialState: IChatlistStore = {
  chatList: []
}

const chatListSlice = createSlice({
  name: 'chatList',
  initialState,
  reducers: {
    sendMessage(state, action: PayloadAction<{ chatId: string, textMessage: string }>) {

    },
    addMessages(state, action: PayloadAction<{ chatId: string, messages: IChatMessage[] }>) {
      const { chatId, messages } = action.payload
      const chat = state.chatList.find((chat) => chat.chatId === chatId)
      if (chat != null) {
        chat.messages.unshift(...messages)
      }
    },
    setMessages(state, action: PayloadAction<{ chatId: string, messages: IChatMessage[] }>) {
      const { chatId, messages } = action.payload
      const chat = state.chatList.find((chat) => chat.chatId === chatId)
      if (chat != null) {
        chat.messages = messages
      } else {
        state.chatList.push({ chatId, messages })
      }
    }
  }
})

export const { sendMessage, addMessages, setMessages } = chatListSlice.actions

export const chatSelector = (chatId: string) => (state: { chatListStore: IChatlistStore }) => {
  return state.chatListStore.chatList.find((chat) => chat.chatId === chatId)
}

export default chatListSlice