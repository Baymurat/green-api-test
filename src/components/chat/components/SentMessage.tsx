import { Message } from '@custom-types/types'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'

type Props = Message

const SentMessage = ({ timestamp, messageData }: Props) => {
  return (
    <Stack
      width={'fit-content'}
      marginLeft={'auto'}
      direction={'row'}
      bgcolor={'#84d975eb'}
      padding={'0.5rem'}
      borderRadius={'5px'}
    >
      <Box mr={1}>
        <Typography>
          {messageData.typeMessage === 'textMessage' && messageData.textMessageData.textMessage}
        </Typography>
      </Box>
      <Box
        mr={1}
        position={'relative'}
        bottom={-10}
      >
        <Typography variant='caption' textAlign={'end'}>
          {timestamp}
        </Typography>
      </Box>
      <Box
        position={'relative'}
        bottom={-10}
      >
        +
      </Box>
    </Stack>
  )
}

export default SentMessage