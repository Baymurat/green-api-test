import Avatar from '@mui/material/Avatar'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'

import { Message, WSUser } from '@custom-types/types'
import { useAuthContext } from '@context/AuthContextProvider'
import SentMessage from './components/SentMessage'
import ReceivedMessage from './components/ReceivedMessage'
import React from 'react'

interface Props {
  messages: Message[]
  companion: WSUser
}

const Chat = ({ messages, companion }: Props) => {
  const { user } = useAuthContext()

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
        <Avatar alt={companion.name} src={companion.icon} />
        <Typography>
          {companion.name}
        </Typography>
      </Stack>
      <Stack
        sx={{
          padding: 1,
          flexGrow: 1,
          justifyContent: 'end',
          backgroundImage: 'url(/chat-background-image.jpg)',
          backgroundSize: 'contain'
        }}
      >
        {messages.map((message) => (
          <React.Fragment key={message.id}>
            {
              message.author.id === user?.id
                ? (<SentMessage {...message} />)
                : (<ReceivedMessage {...message} />)
            }
          </React.Fragment>
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
          placeholder='Введите сообщение'
          sx={{
            bgcolor: '#fff',
            borderRadius: '5px',
            "& fieldset": {
              border: 'none',
            },
          }}
        />
        <Button variant='contained' >
          Send
        </Button>
      </Stack>
    </Stack>
  )
}

export default Chat