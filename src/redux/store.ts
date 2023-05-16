import { configureStore } from '@reduxjs/toolkit'
import { messagesApi } from './features/messages/messagesSlice'
import selectedChatSlice from './features/selectedChat/selectedChatSlice'

export const store = configureStore({
  reducer: {
    [messagesApi.reducerPath]: messagesApi.reducer,
    selectedChatStore: selectedChatSlice.reducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(messagesApi.middleware)
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch