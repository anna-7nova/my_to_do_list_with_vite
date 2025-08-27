import { ThemeProvider} from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { getTheme } from '../common/theme/theme'
import styles from './App.module.css'
import { ErrorSnackBar, Header } from '@/common/components'
import { useAppDispatch, useAppSelector } from '@/common/hooks'
import { selectTheme } from './app-slice'
import { Routing } from '@/common/routing'
import { useEffect, useState } from 'react'
import { initializeAppTC } from '@/features/auth/model/auth-slice'
import CircularProgress from '@mui/material/CircularProgress'

export function App() {
  const [isInitialized, setIsInitialized] = useState(false)

  const themeMood = useAppSelector(selectTheme)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(initializeAppTC()).finally(() => setIsInitialized(true))
  }, [])

  if (!isInitialized) {
    return (
      <div className={styles.circularProgressContainer}>
        <CircularProgress color='inherit' size={150} thickness={3} />
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
