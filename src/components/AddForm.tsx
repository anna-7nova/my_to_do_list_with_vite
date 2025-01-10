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

    return (
        <div>
            <input onChange={onChangeHandler} value={title}/>
            <Button title='+' onClickHandler={onClickHandler}/>
        </div>
    );
}

