import Avatar from '@mui/material/Avatar'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'

import { IChatMessage, IContactInfo } from '@custom-types/types'
import SentMessage from './components/SentMessage'
import ReceivedMessage from './components/ReceivedMessage'
import React, { useState } from 'react'

interface Props {
  messages: IChatMessage[]
  companion: IContactInfo | null
}

const Chat = ({ messages, companion }: Props) => {
  const [pressedKeys, setPressedKeys] = useState<Record<string, string>>({})

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
          placeholder='Введите сообщение'
          onKeyDown={(event) => {
            const { code } = event

            if ((code === 'NumpadEnter' || code === 'Enter') && pressedKeys.ShiftLeft === undefined) {
              event.preventDefault()
              console.log('SEND MESSAGE');
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
        <Button variant='contained' >
          Send
        </Button>
      </Stack>
    </Stack>
  )
}

export default Chat