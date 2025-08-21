import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { getTheme } from '../common/theme/theme'
import styles from './App.module.css'
import { ErrorSnackBar, Header } from '@/common/components'
import { useAppSelector } from '@/common/hooks'
import { selectTheme } from './app-slice'
import { Routing } from '@/common/routing'

export function App() {
  const themeMood = useAppSelector(selectTheme)
  return (
    <div className={styles.app}>
      <ThemeProvider theme={getTheme(themeMood)}>
        <Header />
        <Routing/>
        <ErrorSnackBar/>
        <CssBaseline />
      </ThemeProvider>
    </div>
  )
}
