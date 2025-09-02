import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { getTheme } from '../common/theme/theme'
import styles from './App.module.css'
import { ErrorSnackBar, Header } from '@/common/components'
import { useAppDispatch, useAppSelector } from '@/common/hooks'
import { selectTheme, setIsLoggedInAC } from './app-slice'
import { Routing } from '@/common/routing'
import { useEffect, useState } from 'react'
import CircularProgress from '@mui/material/CircularProgress'
import { useMeQuery } from '@/features/auth/api/authApi'
import { ResultCode } from '@/common/enums/enums'

export function App() {
  const [isInitialized, setIsInitialized] = useState(false)

  const themeMood = useAppSelector(selectTheme)
  const dispatch = useAppDispatch()

  const { data, isLoading } = useMeQuery()

  useEffect(() => {
    if (isLoading) return
    if (data?.resultCode === ResultCode.Success) {
      dispatch(setIsLoggedInAC({ isLoggedIn: true }))
    }
    setIsInitialized(true)
  }, [isLoading])

  if (!isInitialized) {
    return (
      <div className={styles.circularProgressContainer}>
        <CircularProgress color="inherit" size={150} thickness={3} />
      </div>
    )
  }

  return (
    <div className={styles.app}>
      <ThemeProvider theme={getTheme(themeMood)}>
        <Header />
        <Routing />
        <ErrorSnackBar />
        <CssBaseline />
      </ThemeProvider>
    </div>
  )
}
