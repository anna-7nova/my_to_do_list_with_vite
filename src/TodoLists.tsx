import React from 'react';
import { useAppSelector } from './common/hooks/useAppSelector';
import { selectTodolists } from './model/todolists-selectors';
import { TodoList } from './components/TodoList';

export const TodoLists: React.FC = () => {
    const todolists = useAppSelector(selectTodolists)
    return (
        <>
            {todolists?.map(t => {
                return (
                    <TodoList
                        key={t.id}
                        todolist={t}
                    />
                )
            })
            }
        </>
    );
}

