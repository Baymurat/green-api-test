import Chat from '@components/chat'
import ChatList from '@components/chat-list'
import Stack from '@mui/material/Stack'
import Box from '@mui/material/Box'
import { useGetContactsQuery } from '@hooks/useData'
import { useAppSelector } from '@hooks/redux-hooks'
import { selectedChatSelector } from '@redux/features/selectedChat/selectedChatSlice'
import { useEffect, useState } from 'react'
import { useGetMessagesMutation, useGetUserInfoMutation } from '@redux/features/messages/messagesSlice'
import { useAuthContext } from '@context/AuthContextProvider'
import { IChatMessage, IContactInfo } from '@custom-types/types'

const WhatsApp = () => {
  const { data: contacts } = useGetContactsQuery()
  const selected = useAppSelector(selectedChatSelector)
  const { user } = useAuthContext()
  const [getMessages] = useGetMessagesMutation()
  const [getUserInfo] = useGetUserInfoMutation()

  const [messages, setMessages] = useState<IChatMessage[]>([])
  const [companion, setCompanion] = useState<IContactInfo | null>(null)

  useEffect(() => {
    if (user != null && selected != null && selected !== '') {
      getMessages({
        apiTokenInstance: user.apiTokenInstance,
        idInstance: user.idInstance,
        chatId: selected,
        count: 20
      }).then((response) => {
        if ('data' in response) {
          setMessages(response.data)
        }
      })

      getUserInfo({
        apiTokenInstance: user.apiTokenInstance,
        idInstance: user.idInstance,
        chatId: selected,
      }).then((response) => {
        if ('data' in response) {
          setCompanion(response.data)
        }
      })
    }
  }, [selected, user, getMessages, getUserInfo])

  return (
    <Stack
      width={'90vw'}
      height={'90vh'}
      alignContent={'center'}
      direction={'row'}
      margin={'0 auto'}
      mt={'1rem'}
      borderRadius={'2px'}
      sx={{
        '&:before': {
          content: '""',
          bgcolor: '#00a884',
          position: 'absolute',
          zIndex: -1,
          top: 0,
          left: 0,
          right: 0,
          height: 100
        },
        '&:after': {
          content: '""',
          position: 'absolute',
          zIndex: -2,
          inset: 0,
          bgcolor: '#eae6df',
        },
        overflow: 'hidden'
      }}
    >
      <Box flex={'0 1 auto'}>
        <ChatList chats={contacts ?? []} />
      </Box>
      <Box flex={'6 1 auto'} >
        <Chat
          messages={messages}
          companion={companion}
        />
      </Box>
    </Stack>
  )
}

export default WhatsApp