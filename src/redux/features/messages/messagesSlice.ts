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
    getMessages: builder.mutation<IChatMessage[], { idInstance: string, apiTokenInstance: string, chatId: string, count: number }>({
      query: ({ idInstance, apiTokenInstance, chatId, count }) => ({
        url: `waInstance${idInstance}/GetChatHistory/${apiTokenInstance}`,
        method: 'POST',
        body: { chatId, count }
      })
    })
  })
})

export const { useGetContactsQuery, useGetMessagesMutation } = messagesApi