import { IChatMessage } from '@custom-types/types'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'

type Props = IChatMessage

const SentMessage = ({ timestamp, textMessage }: Props) => {
  const date = new Date(timestamp)

  return (
    <Stack
      width={'fit-content'}
      marginLeft={'auto'}
      direction={'row'}
      bgcolor={'#84d975eb'}
      padding={'0.5rem'}
      borderRadius={'5px'}
      mb={1}
    >
      <Box mr={1}>
        <Typography>
          {textMessage}
        </Typography>
      </Box>
      <Box
        mr={1}
        position={'relative'}
        bottom={-10}
      >
        <Typography variant='caption' textAlign={'end'}>
          {date.getHours()}:{date.getMinutes()}
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