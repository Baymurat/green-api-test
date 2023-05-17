import { WSUser } from "@custom-types/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IUserStore {
  user: WSUser | null
}

const initialState: IUserStore = {
  user: null
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<WSUser>) {
      state.user = action.payload
    }
  }
})

export const { setUser } = userSlice.actions

export const userSelector = (state: { userStore: IUserStore }) => state.userStore.user

export default userSlice