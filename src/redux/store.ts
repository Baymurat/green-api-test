import { configureStore } from '@reduxjs/toolkit'
import { messagesApi } from './features/messages/messagesSlice'
import selectedChatSlice from './features/selectedChat/selectedChatSlice'
import { notificationsMiddleware } from './features/notifications/middleware'
import notificationsSlice from './features/notifications/notificationsSlice'
import userSlice from './features/user/userSlice'
import { chatListMiddleware } from './features/chat-list/middleware'
import chatListSlice from './features/chat-list/chatListSlice'

export const store = configureStore({
  reducer: {
    [messagesApi.reducerPath]: messagesApi.reducer,
    selectedChatStore: selectedChatSlice.reducer,
    notificationsStore: notificationsSlice.reducer,
    userStore: userSlice.reducer,
    chatListStore: chatListSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware()
    .prepend(chatListMiddleware.middleware)
    .concat(messagesApi.middleware)
    .concat(notificationsMiddleware)
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch