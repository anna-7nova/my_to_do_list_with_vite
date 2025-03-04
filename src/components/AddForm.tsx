import { ChangeEvent, useState, KeyboardEvent } from 'react';
import { Button } from './Button';

type AddFormType = {
    createNewItem: (title: string, itemId: string) => void
    itemId: string
}

export const AddForm = (props: AddFormType) => {
    const [title, setTitle] = useState<string>("")
    console.log(title)
    const [error, setError] = useState<string | null>(null)

    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        error && setError(null)
        setTitle(event.currentTarget.value)
    }

    const onClickHandler = () => {
        const trimmedTitle = title.trim()
        if (trimmedTitle !== "") {
            props.createNewItem(title.trim(), props.itemId)
        } else {
            setError("Title is required")
        }
        setTitle("") 
    }

    const onKeyDownHandler = (event: KeyboardEvent<HTMLElement>) => {
        if(event.key==="Enter" && !IsButtonDisabled){
            onClickHandler()
        }
    }

    const IsAddTitleNamePossible = title.length<=15

    const IsButtonDisabled = !IsAddTitleNamePossible || !title.length

    return (
        <div>
            <input className={error ? "task-error" : ""} onChange={onChangeHandler} value={title} onKeyDown={onKeyDownHandler}/>
            <Button isDisabled={IsButtonDisabled} title='+' onClickHandler={onClickHandler} />
            {error && <div style={{color: "#bd1d4d"}}>{error}</div>}
            {!title.length && !error && <div>enter task title</div>}           
            {!IsAddTitleNamePossible && <div>task title is too long</div>}
        </div>
    );
}

