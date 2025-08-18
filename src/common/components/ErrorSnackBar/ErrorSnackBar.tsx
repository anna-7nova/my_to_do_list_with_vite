import React from 'react'
import Snackbar, { SnackbarCloseReason } from '@mui/material/Snackbar'
import Alert from '@mui/material/Alert'
import { useSelector } from 'react-redux'
import { selectError, setAppErrorAC } from '@/app/app-slice'
import { useAppDispatch } from '@/common/hooks'

export const ErrorSnackBar: React.FC = () => {
  const error = useSelector(selectError)
  const dispatch = useAppDispatch()

  const handleClose = (_event?: React.SyntheticEvent | Event, reason?: SnackbarCloseReason) => {
    if (reason === 'clickaway') return
    dispatch(setAppErrorAC({error: null}))
  }

  return (
    <Snackbar open={error !== null} autoHideDuration={6000} onClose={handleClose}>
      <Alert onClose={handleClose} severity="error" variant="filled" sx={{ width: '100%' }}>
        {error}
      </Alert>
    </Snackbar>
  )
}
