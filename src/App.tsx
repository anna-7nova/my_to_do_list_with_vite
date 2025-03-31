import { useReducer, useState } from 'react';
import './App.css';
import { TodoList } from './components/TodoList';
import { v1 } from 'uuid';
import { AddForm } from './components/AddForm';
import ButtonAppBar from './components/ButtonAppBar';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { createNewTodolistAC, filteredTodolistAC, removeTodolistAC, todolistsReducer, updateTitleTodolistAC } from './model/todolists-reducer';
import { changeStatusTaskAC, createTaskAC, removeTaskAC, tasksReducer, updateTitleTaskAC } from './model/tasks-reducer';

//CRUD
// - repeat, duplicate
// - create clear structure
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

    const switchMoodHandler = () => {
        setMood(mood === "light" ? "dark" : "light")
    }

    // data
    const todolistId1 = v1()
    const todolistId2 = v1()

    const [todolists, dispatchTodolists] = useReducer(todolistsReducer, [
        { id: todolistId1, title: "What to learn", filter: "all" },
        { id: todolistId2, title: "What to improve", filter: "all" },
    ]
    )

    const [tasks, dispatchTasks] = useReducer(tasksReducer,{
        [todolistId1]: [
            {
                id: v1(),
                title: "HTML&CSS",
                isDone: true
            },
            {
                id: v1(),
                title: "JS",
                isDone: true
            },
            {
                id: v1(),
                title: "React",
                isDone: false
            },
        ],
        [todolistId2]: [
            {
                id: v1(),
                title: "English",
                isDone: true
            },
            {
                id: v1(),
                title: "CV",
                isDone: true
            },
            {
                id: v1(),
                title: "Cover letter",
                isDone: false
            },
        ],
    })

    // BLL - business logic
    //todolist

    const removeTodoList = (todolistId: string) => {
        dispatchTodolists(removeTodolistAC(todolistId))
        dispatchTasks(removeTodolistAC(todolistId))
    }

    const createNewTodoList = (title: string) => {
        dispatchTodolists(createNewTodolistAC(title))
        dispatchTasks(createNewTodolistAC(title))
    }

    const createNewTodoListHandler = (title: string) => createNewTodoList(title)

    const changeTodoListFilter = (todolistId: string, filter: FilterValuesType) => {
        dispatchTodolists(filteredTodolistAC(todolistId, filter))
    }

    const changeTodoListTitle = (todolistId: string, title: string) => {
        dispatchTodolists(updateTitleTodolistAC(todolistId, title))
    }

    //tasks
    const removeTask = (taskId: string, todolistId: string) => {
        dispatchTasks(removeTaskAC(taskId, todolistId))
    }

    const createTask = (title: string, itemId: string) => {
        dispatchTasks(createTaskAC(title, itemId))
    }

    const changeTaskStatus = (taskId: string, newStatus: boolean, todolistId: string) => {
        dispatchTasks(changeStatusTaskAC(taskId, newStatus, todolistId))
    }

    const changeTaskTitle = (todolistId: string, itemId: string, title: string) => {
        dispatchTasks(updateTitleTaskAC(todolistId, itemId, title))
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


