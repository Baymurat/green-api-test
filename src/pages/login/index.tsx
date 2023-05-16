import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { registerError } from '@utils/textFieldHelper'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthContext } from '@context/AuthContextProvider'
import FormHelperText from '@mui/material/FormHelperText'
import CircularProgress from '@mui/material/CircularProgress';

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

  const navigate = useNavigate()
  const { setUser } = useAuthContext()
  const [isUnauthorized, setIsUnauthorized] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const onSubmit = (data: ILoginForm) => {
    setIsLoading(true)
    fetch(`https://api.green-api.com/waInstance${data.idInstance}/GetSettings/${data.apiTokenInstance}`)
      .then((res) => {
        if (res.status === 200) {
          return res.json()
        }

        if (res.status === 401) {
          throw new Error('Unauthorized', { cause: 'Unauthorized' })
        }
      })
      .then((res) => {
        setUser({
          ...res,
          idInstance: data.idInstance,
          apiTokenInstance: data.apiTokenInstance
        })
        navigate('/whats-app')
      })
      .catch((err) => {
        setIsUnauthorized(true)
      })
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
          alignItems={'center'}
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
          {isUnauthorized && (
            <FormHelperText error>
              Неверный токен или id
            </FormHelperText>
          )}
          <Button
            type='submit'
            color="success"
            variant='contained'
            disabled={isLoading}
            fullWidth
          >
            {
              isLoading
                ? <CircularProgress size={25} />
                : <>Login</>
            }
          </Button>
        </Stack>
      </form>
    </Box>
  )
}

export default LoginPage