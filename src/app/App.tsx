import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { selectTheme } from './app-selectors'
import { getTheme } from '../common/theme/theme'
import { Main } from './Main'
import styles from './App.module.css'
import { Header } from '@/common/components'
import { useAppSelector } from '@/common/hooks'

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
