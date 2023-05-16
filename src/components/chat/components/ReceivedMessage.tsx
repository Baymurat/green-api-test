import { Message } from '@custom-types/types'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'

type Props = Message

const ReceivedMessage = ({ timestamp, messageData }: Props) => {
  return (
    <Stack
      width={'fit-content'}
      marginRight={'auto'}
      direction={'row'}
      bgcolor={'#cfcdb7d6'}
      padding={'0.5rem'}
      borderRadius={'5px'}
    >
      <Box mx={1}>
        <Typography>
          {messageData.typeMessage === 'textMessage' && messageData.textMessageData.textMessage}
        </Typography>
      </Box>
      <Box
        position={'relative'}
        bottom={-10}
      >
        <Typography variant='caption' textAlign={'end'}>
          {timestamp}
        </Typography>
      </Box>
    </Stack>
  )
}

export default ReceivedMessage