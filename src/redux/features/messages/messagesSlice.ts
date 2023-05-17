import { Contact, IChatMessage } from '@custom-types/types'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const messagesApi = createApi({
  reducerPath: 'messagesApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://api.green-api.com/' }),
  endpoints: (builder) => ({
    getContacts: builder.query<Contact[], { idInstance: string, apiTokenInstance: string }>({
      query: ({ idInstance, apiTokenInstance }) => {
        return `waInstance${idInstance}/GetContacts/${apiTokenInstance}`
      },
    }),
    getUserInfo: builder.mutation<any, { idInstance: string, apiTokenInstance: string, chatId: string }>({
      query: ({ idInstance, apiTokenInstance, chatId }) => ({
        url: `waInstance${idInstance}/getContactInfo/${apiTokenInstance}`,
        method: 'POST',
        body: { chatId }
      })
    }),
    getMessages: builder.mutation<IChatMessage[], { idInstance: string, apiTokenInstance: string, chatId: string, count: number }>({
      query: ({ idInstance, apiTokenInstance, chatId, count }) => ({
        url: `waInstance${idInstance}/GetChatHistory/${apiTokenInstance}`,
        method: 'POST',
        body: { chatId, count }
      })
    })
  })
})

export const { useGetContactsQuery, useGetMessagesMutation, useGetUserInfoMutation } = messagesApi