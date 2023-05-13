import { type TextFieldProps } from '@mui/material/TextField'
import { isEmpty } from 'lodash'
import { type FieldErrors, type FieldPath, type FieldValues } from 'react-hook-form'

export const registerError = <T extends FieldValues,>(
  errorObj: FieldErrors<T>,
  fieldName: FieldPath<T>,
  errorMessage?: string
): Pick<TextFieldProps, 'error' | 'helperText'> => {
  const paths = fieldName.split('.')
  let error: any = errorObj
  paths.forEach((path) => {
    error = error !== null ? (error[path] ?? null) : null
  })

  if (error !== null && !isEmpty(error)) {
    return {
      error: true,
      helperText: errorMessage ?? error.message.toString()
    }
  }

  return {
    error: false,
    helperText: ''
  }
}
