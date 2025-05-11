import { TodolistType } from '../app/App';
import { TodoComponentHeader } from './TodoComponentHeader'
import { AddForm } from './AddForm';
import { FiltersButtons } from './FiltersButtons';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Paper from '@mui/material/Paper';
import { cardStyle} from './TodoList.styles';
import { useAppDispatch } from '../common/hooks/useAppDispatch';
import { removeTodolistAC, updateTitleTodolistAC } from '../model/todolists-reducer';
import { TasksList } from '../TasksList';
import { createTaskAC } from '../model/tasks-reducer';

type Props = {
    todolist: TodolistType
}

export const TodoList:React.FC<Props> = ({todolist}: Props) => {
    const dispatch = useAppDispatch()

    //handlers
    const removeTodoListHandler = () => dispatch(removeTodolistAC({ todolistId: todolist.id }))
    const changeTodoListTitleHandler = (title: string) => dispatch(updateTitleTodolistAC({ todolistId: todolist.id, title }))
    const addNewTaskHandler = (title: string) => dispatch(createTaskAC({ title, itemId: todolist.id }))
    
    return (
        <div className="todoList">
            <Paper elevation={5}>
                <Card variant="outlined" sx={cardStyle}>
                    <CardContent>
                        <TodoComponentHeader title={todolist.title} onClick={removeTodoListHandler} onChange={changeTodoListTitleHandler} />
                        <AddForm createNewItem={addNewTaskHandler} />
                        <TasksList todolist={todolist}/>
                        <FiltersButtons todolist={todolist}/>
                    </CardContent>
                </Card>
            </Paper>
        </div>
    );
}


