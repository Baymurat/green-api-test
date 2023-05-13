import { Box, Typography } from '@mui/material'
import { NavLink } from 'react-router-dom'

const ErrorPage404 = () => {
  return (
    <Box
      height={'90vh'}
      display={'flex'}
      alignItems={'center'}
      justifyContent={'center'}
      flexDirection={'column'}
      textAlign={'center'}
    >
      <Typography variant="h1">
        404 Page has no found
      </Typography>
      <Typography>
        Go back to {' '}
        <NavLink to={'/'}>Main</NavLink>
      </Typography>
    </Box>
  )
}

export default ErrorPage404
