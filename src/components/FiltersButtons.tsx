import { Button } from './Button';
import { FilterValuesType } from '../App';

type FilterButton = {
    changeTodoListFilter: (todolistId: string, filter: FilterValuesType) => void
    filter: FilterValuesType
    todolistsId: string
}

export const FiltersButtons = ({changeTodoListFilter, filter, todolistsId}: FilterButton) => {
    const changeTodoListFilterHandler = (filter: FilterValuesType) => {
        changeTodoListFilter( todolistsId, filter)
    }
    return (
        <div>
                <Button className={filter==="all" ? "filtered-button" : ""} onClickHandler={() => changeTodoListFilterHandler("all")} title='All'/>
                <Button className={filter==="active" ? "filtered-button" : ""} onClickHandler={() => changeTodoListFilterHandler("active")} title='Active'/>
                <Button className={filter==="completed" ? "filtered-button" : ""} onClickHandler={() => changeTodoListFilterHandler("completed")} title='Completed'/>
            </div>
    );
}


