import Header from '../common/components/Header';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { useAppSelector } from '@/common/hooks/useAppSelector';
import { selectTheme } from './app-selectors';
import { getTheme } from '../common/theme/theme';
import { Main } from './Main';
import styles from './App.module.css'

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
    );
}


