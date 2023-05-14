import { Message } from '@custom-types/types'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'

type Props = Message

const SentMessage = ({ id, content, messageDate, author }: Props) => {
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
          {content}
        </Typography>
      </Box>
      <Box
        mr={1}
        position={'relative'}
        bottom={-10}
      >
        <Typography variant='caption' textAlign={'end'}>
          {messageDate}
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