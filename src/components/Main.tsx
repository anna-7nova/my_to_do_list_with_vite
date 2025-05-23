import { Container, Grid } from '@mui/material';
import React from 'react';
import { AddForm } from './AddForm';
import { TodoLists } from '../TodoLists';
import { useAppDispatch } from '../common/hooks/useAppDispatch';
import { createNewTodolistAC } from '../model/todolists-reducer';

export const Main: React.FC = () => {
    const dispatch = useAppDispatch()
    const createNewTodoList = (title: string) => dispatch(createNewTodolistAC({ title }))
    return (
        <Container fixed maxWidth={'xl'}>
            <Grid container sx={{ mb: "15px" }}>
                <AddForm createNewItem={createNewTodoList} />
            </Grid>
            <Grid container sx={{ gap: "15px", justifyContent: "space-between" }}>
                <TodoLists />
            </Grid>
        </Container>
    );
}


