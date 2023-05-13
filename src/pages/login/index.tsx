import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { registerError } from '@utils/textFieldHelper'

interface ILoginForm {
  idInstance: string
  apiTokenInstance: string
}

const yupSchema = yup.object({
  idInstance: yup.string().required('Field is required'),
  apiTokenInstance: yup.string().required('Field is required')
})

const LoginPage = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<ILoginForm>({
    resolver: yupResolver(yupSchema)
  })

  const onSubmit = (data: ILoginForm) => {
    console.log(data);
  }

  return (
    <Box
      display={'flex'}
      alignItems={'center'}
      justifyContent={'center'}
      height={'100vh'}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack
          direction={'column'}
          gap={'1rem'}
        >
          <TextField
            {...register('idInstance')}
            {...registerError(errors, 'idInstance')}
            label={'Id Instance'}
          />
          <TextField
            {...register('apiTokenInstance')}
            {...registerError(errors, 'apiTokenInstance')}
            label={'Api TokenInstance'}
          />
          <Button
            type='submit'
            color="success"
            variant='contained'
          >
            Login
          </Button>
        </Stack>
      </form>
    </Box>
  )
}

export default LoginPage