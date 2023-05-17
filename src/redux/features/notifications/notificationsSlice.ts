import { WSUser } from "@custom-types/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface INotificationsChatStore {
  isStarted: boolean
  user: WSUser | null
}

const initialState: INotificationsChatStore = {
  isStarted: false,
  user: null
}

const notificationsSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    starNotificationsListening(state, action: PayloadAction<{ isStarted: boolean, user: WSUser }>) {
      state.isStarted = action.payload.isStarted
      state.user = action.payload.user
    }
  }
})

export const { starNotificationsListening } = notificationsSlice.actions

export const notificationsStateSelector = (state: { notificationsStore: INotificationsChatStore }) => state.notificationsStore

export default notificationsSlice