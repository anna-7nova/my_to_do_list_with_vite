import React from 'react';
import { Button } from './Button';
import { FilterValuesType } from '../App';

type FilterButton = {
    changeTodoListFilter: (nextFilter: FilterValuesType) => void
    filter: FilterValuesType
}

export const FiltersButtons = ({changeTodoListFilter, filter}: FilterButton) => {
    return (
        <div>
                <Button className={filter==="all" ? "filtered-button" : ""} onClickHandler={() => changeTodoListFilter("all")} title='All'/>
                <Button className={filter==="active" ? "filtered-button" : ""} onClickHandler={() => changeTodoListFilter("active")} title='Active'/>
                <Button className={filter==="completed" ? "filtered-button" : ""} onClickHandler={() => changeTodoListFilter("completed")} title='Completed'/>
            </div>
    );
}


