import { Contact } from '@custom-types/types'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const messagesApi = createApi({
  reducerPath: 'messagesApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://api.green-api.com/' }),
  endpoints: (builder) => ({
    getContacts: builder.query<Contact[], { idInstance: string, apiTokenInstance: string }>({
      query: ({ idInstance, apiTokenInstance }) => {
        return `waInstance${idInstance}/GetContacts/${apiTokenInstance}`
      }
    })
  })
})

export const { useGetContactsQuery } = messagesApi