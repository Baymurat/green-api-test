import Stack from '@mui/material/Stack'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'


interface Chat {
  name: string
  lastMessage: string
  modifiedDate: string
  icon: string
}

interface Props {
  chats: Chat[]
}

const ChatList = ({ chats }: Props) => {
  return (
    <Stack padding={'0.5rem 0.25rem'}>
      {chats.map((chat) => (
        <Stack
          key={chat.name}
          direction={'row'}
        >
          <Box flex={'0 1 auto'} pr={1} >
            {chat.icon}</Box>
          <Stack flex={'1 1 auto'} >
            <Typography>{chat.name}</Typography>
            <Typography variant='caption'>{chat.lastMessage}</Typography>
          </Stack>
          <Box flex={'0 1 auto'} >
            <Typography variant='caption'>{chat.modifiedDate}</Typography>
          </Box>
        </Stack>
      ))}
    </Stack>
  )
}

export default ChatList