import React, { ChangeEvent, useState, KeyboardEvent } from 'react';
import { Button } from './Button';

type AddFormType = {
    createTask: (title: string) => void
}

export const AddForm = (props: AddFormType) => {
    const [title, setTitle] = useState<string>("")
    console.log(title)

    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.currentTarget.value)
    }

    const onClickHandler = () => {
        props.createTask(title)
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
            <input onChange={onChangeHandler} value={title} onKeyDown={onKeyDownHandler}/>
            {!title.length && <div>enter task title</div>}           
            {!IsAddTitleNamePossible && <div>task title is too long</div>}
            <Button isDisabled={IsButtonDisabled} title='+' onClickHandler={onClickHandler} />
        </div>
    );
}

