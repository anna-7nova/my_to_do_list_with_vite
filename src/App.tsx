import { useState } from 'react';
import './App.css';
import { TodoList } from './components/TodoList';
import { AddForm } from './components/AddForm';
import ButtonAppBar from './components/ButtonAppBar';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { createNewTodolistAC, removeTodolistAC, updateFilterTodolistAC, updateTitleTodolistAC } from './model/todolists-reducer';
import { changeStatusTaskAC, createTaskAC, removeTaskAC, updateTitleTaskAC } from './model/tasks-reducer';
import { useAppDispatch } from './common/hooks/useAppDispatch';
import { useAppSelector } from './common/hooks/useAppSelector';
import { selectTodolists } from './model/todolists-selectors';
import { selectTasks } from './model/tasks-selectors';

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
type MoodType = "light" | "dark"

export function App() {
    //theme
    const [mood, setMood] = useState<MoodType>("light")
    const theme = createTheme({
        palette: {
            mode: (mood === "light" ? "light" : "dark"),
            primary: {
                main: '#9EC0D9',
            },
        }
    });
    //switch
    const switchMoodHandler = () => {
        setMood(mood === "light" ? "dark" : "light")
    }
    // data
    const todolists = useAppSelector(selectTodolists)
    const tasks = useAppSelector(selectTasks)
    const dispatch = useAppDispatch()

    // BLL - business logic
    //todolist

    const removeTodoList = (todolistId: string) => dispatch(removeTodolistAC({ todolistId }))

    const createNewTodoList = (title: string) => dispatch(createNewTodolistAC(title))

    const createNewTodoListHandler = (title: string) => createNewTodoList(title)

    const changeTodoListFilter = (todolistId: string, filter: FilterValuesType) => {
        dispatch(updateFilterTodolistAC({ todolistId, filter }))
    }

    const changeTodoListTitle = (todolistId: string, title: string) => {
        dispatch(updateTitleTodolistAC({ todolistId, title }))
    }

    //tasks
    const removeTask = (taskId: string, todolistId: string) => {
        dispatch(removeTaskAC({ taskId, todolistId }))
    }

    const createTask = (title: string, itemId: string) => {
        dispatch(createTaskAC({ title, itemId }))
    }

    const changeTaskStatus = (taskId: string, newStatus: boolean, todolistId: string) => {
        dispatch(changeStatusTaskAC({ taskId, newStatus, todolistId }))
    }

    const changeTaskTitle = (todolistId: string, itemId: string, title: string) => {
        dispatch(updateTitleTaskAC({ todolistId, itemId, title }))
    }

    //UI
    const todolistComponents = todolists?.map(t => {
        const todolistTasks = tasks[t.id]
        let filteredTask = todolistTasks
        if (t.filter === "active") {
            filteredTask = todolistTasks.filter(item => !item.isDone)
        }
        if (t.filter === "completed") {
            filteredTask = todolistTasks.filter(item => item.isDone)
        }
        return (
            <TodoList
                key={t.id}
                todolist={t}
                tasks={filteredTask}
                removeTask={removeTask}
                createTask={createTask}
                changeTaskStatus={changeTaskStatus}
                changeTaskTitle={changeTaskTitle}
                changeTodoListFilter={changeTodoListFilter}
                removeTodoList={removeTodoList}
                changeTodoListTitle={changeTodoListTitle}
            />
        )
    })

    return (
        <div className="App">
            <ThemeProvider theme={theme}>
                <Container fixed maxWidth={'xl'}>
                    <ButtonAppBar onChange={switchMoodHandler} />
                    <Grid container sx={{ mb: "15px" }}>
                        <AddForm createNewItem={createNewTodoListHandler} />
                    </Grid>
                    <Grid container sx={{ gap: "15px", justifyContent: "space-between" }}>
                        {todolistComponents}
                    </Grid>
                </Container>
                <CssBaseline />
            </ThemeProvider>
        </div>
    );
}


