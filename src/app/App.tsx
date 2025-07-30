import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { getTheme } from '../common/theme/theme'
import { Main } from './Main'
import styles from './App.module.css'
import { Header } from '@/common/components'
import { useAppSelector } from '@/common/hooks'
import { selectTheme } from './app-slice'

export function App() {
  const themeMood = useAppSelector(selectTheme)
  return (
    <div className={styles.app}>
      <ThemeProvider theme={getTheme(themeMood)}>
        <Header />
        <Main />
        <CssBaseline />
      </ThemeProvider>
    </div>
  )
}
