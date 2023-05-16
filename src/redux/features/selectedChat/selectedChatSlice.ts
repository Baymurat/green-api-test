import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ISelectedChatStore {
  chatId: string
}

const initialState: ISelectedChatStore = { chatId: "" }

const selectedChatSlice = createSlice({
  name: 'selectedChat',
  initialState,
  reducers: {
    setSelectedChat(state, action: PayloadAction<string>) {
      state.chatId = action.payload
    }
  }
})

export const { setSelectedChat } = selectedChatSlice.actions

export const selectedChatSelector = (state: { selectedChatStore: ISelectedChatStore }) => state.selectedChatStore.chatId

export default selectedChatSlice