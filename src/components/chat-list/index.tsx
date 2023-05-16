import Stack from '@mui/material/Stack'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Avatar from '@mui/material/Avatar'
import { Contact } from '@custom-types/types'
import { useAppDispatch } from '@hooks/redux-hooks'
import { setSelectedChat } from '@redux/features/selectedChat/selectedChatSlice'

interface Props {
  chats: Contact[]
}

const ChatList = ({ chats }: Props) => {
  const dispatch = useAppDispatch()

  const handleClick = (chatId: string) => {
    dispatch(setSelectedChat(chatId))
  }

  return (
    <Stack
      sx={{
        bgcolor: '#fff',
        height: '100%',
        overflowY: 'auto'
      }}
    >
      {chats.map((chat) => (
        <Stack
          onClick={() => handleClick(chat.id)}
          key={chat.id}
          direction={'row'}
          padding={'0.75rem 0.75rem'}
          sx={{
            transition: 'background-color 200ms ease',
            borderBottom: '1px solid #e9edef',
            '&:hover': {
              cursor: 'pointer',
              bgcolor: '#f5f6f6'
            },
          }}
        >
          <Box flex={'0 1 auto'} pr={'1rem'} >
            <Avatar alt={chat.name} />
          </Box>
          <Stack
            flex={'1 1 auto'}
            overflow={'hidden'}
            width={220}
            pr={1}
          >
            <Typography>{chat.name}</Typography>
            {/* <Typography noWrap color={'GrayText'} variant='caption'>{chat.lastMessage}</Typography> */}
          </Stack>
          <Box flex={'0 1 auto'} >
            {/* <Typography color={'GrayText'} variant='caption'>{chat.modifiedDate}</Typography> */}
          </Box>
        </Stack>
      ))}
    </Stack>
  )
}

export default ChatList