import React, { ChangeEvent, useState } from 'react';
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

    const IsTitleNamePossible = title.length<=15 && title.length>0

    return (
        <div>
            <input onChange={onChangeHandler} value={title}/>
            {!title.length && <div>enter your task</div>}           
            {!IsTitleNamePossible && Boolean(title.length) && <div>until 15 letters</div>}
            <Button isDisabled={!IsTitleNamePossible} title='+' onClickHandler={onClickHandler}/>
        </div>
    );
}

