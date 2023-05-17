import Avatar from '@mui/material/Avatar'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import Box from '@mui/material/Box'
import { IoSendSharp } from 'react-icons/io5'

import { IChatMessage, IContactInfo } from '@custom-types/types'
import SentMessage from './components/SentMessage'
import ReceivedMessage from './components/ReceivedMessage'
import { useState } from 'react'
import { sendMessage as sendMessageActionCreator } from '@redux/features/chat-list/chatListSlice'
import { useAppDispatch } from '@hooks/redux-hooks'

interface Props {
  messages: IChatMessage[]
  companion: IContactInfo | null
}

const Chat = ({ messages, companion }: Props) => {
  const [pressedKeys, setPressedKeys] = useState<Record<string, string>>({})
  const [textMessage, setMessage] = useState<string>('')
  const dispatch = useAppDispatch()

  if (companion == null) {
    return (
      <Box
        sx={{
          height: '100%',
          backgroundImage: 'url(/chat-background-image.jpg)',
          backgroundSize: 'contain',
        }}
      />
    )
  }

  const handleSendMessage = () => {
    if (textMessage === '') {
      return
    }

    dispatch(sendMessageActionCreator({
      chatId: companion.chatId,
      textMessage
    }))
    setMessage('')
  }

  return (
    <Stack height={'100%'}>
      <Stack
        paddingY={1}
        paddingX={'1rem'}
        flexGrow={0}
        bgcolor={'#f0f2f5'}
        direction={'row'}
        gap={'1rem'}
        alignItems={'center'}
      >
        <Avatar alt={companion.name} src={companion.avatar} />
        <Typography>
          {companion.name}
        </Typography>
      </Stack>
      <Stack
        sx={{
          flexDirection: 'column-reverse',
          padding: 1,
          flexGrow: 1,
          backgroundImage: 'url(/chat-background-image.jpg)',
          backgroundSize: 'contain',
          overflowY: 'auto',
          height: '100%'
        }}
      >
        {messages.filter((message) => message.typeMessage === 'textMessage')
          .map((message) => (
            <div key={message.idMessage}>
              {
                message.type === 'incoming'
                  ? (<ReceivedMessage {...message} />)
                  : (<SentMessage {...message} />)
              }
            </div>
          ))}
      </Stack>
      <Stack
        flexGrow={0}
        direction={'row'}
        gap={1}
        padding={1}
        pb={'1rem'}
        bgcolor={'#f0f2f5'}
      >
        <TextField
          fullWidth
          multiline
          maxRows={2}
          InputProps={{
            sx: { padding: '0.5rem' }
          }}
          onChange={({ target }) => setMessage(target.value)}
          value={textMessage}
          placeholder='Введите сообщение'
          onKeyDown={(event) => {
            const { code } = event

            if ((code === 'NumpadEnter' || code === 'Enter') && pressedKeys.ShiftLeft === undefined) {
              event.preventDefault()
              handleSendMessage()
            }
            setPressedKeys((prev) => ({ ...prev, [code]: code }))
          }}
          onKeyUp={({ code }) => {
            setPressedKeys((prev) => {
              return Object.keys(prev).reduce((acc, curr) => {
                return curr === code ? { ...acc } : { ...acc, [curr]: curr }
              }, {})
            })
          }}
          sx={{
            bgcolor: '#fff',
            borderRadius: '5px',
            "& fieldset": {
              border: 'none',
            },
          }}
        />
        <Stack justifyContent={'center'}        >
          <IoSendSharp
            onClick={handleSendMessage}
            size={25}
            cursor={'pointer'}
            fill='gray'
          />
        </Stack>
      </Stack>
    </Stack>
  )
}

export default Chat