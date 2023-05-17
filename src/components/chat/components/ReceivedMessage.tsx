import { IChatMessage } from '@custom-types/types'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'

type Props = IChatMessage

const ReceivedMessage = ({ timestamp, textMessage }: Props) => {
  const date = new Date(timestamp)

  return (
    <Stack
      width={'fit-content'}
      marginRight={'auto'}
      direction={'row'}
      bgcolor={'#cfcdb7d6'}
      padding={'0.5rem'}
      borderRadius={'5px'}
      mb={1}
      maxWidth={350}
    >
      <Box mx={1}>
        <Typography>
          {textMessage}
        </Typography>
      </Box>
      <Box
        position={'relative'}
        bottom={-10}
      >
        <Typography variant='caption' textAlign={'end'}>
          {date.getHours()}:{date.getMinutes()}
        </Typography>
      </Box>
    </Stack>
  )
}

export default ReceivedMessage