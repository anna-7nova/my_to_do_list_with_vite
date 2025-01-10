import React from 'react';
import { Button } from './Button';
import { FilterValuesType } from '../App';

type FilterButton = {
    changeTodoListFilter: (nextFilter: FilterValuesType) => void
}

export const FiltersButtons = ({changeTodoListFilter}: FilterButton) => {
    return (
        <div>
                <Button onClickHandler={() => changeTodoListFilter("all")} title='All'/>
                <Button onClickHandler={() => changeTodoListFilter("active")} title='Active'/>
                <Button onClickHandler={() => changeTodoListFilter("completed")} title='Completed'/>
            </div>
    );
}


