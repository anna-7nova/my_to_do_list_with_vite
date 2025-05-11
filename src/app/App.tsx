import './App.css';
import Header from '../components/Header';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { useAppSelector } from '../common/hooks/useAppSelector';
import { selectTheme } from './app-selectors';
import { getTheme } from '../common/theme/theme';
import { Main } from '../components/Main';

//CRUD
export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export type FilterValuesType = "all" | "active" | "completed"

export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}

export type TasksType = {
    [todolistId: string]: Array<TaskType>
}

export function App() {
    const themeMood = useAppSelector(selectTheme)
    return (
        <div className="App">
            <ThemeProvider theme={getTheme(themeMood)}>
                <Header />
                <Main />
                <CssBaseline />
            </ThemeProvider>
        </div>
    );
}


