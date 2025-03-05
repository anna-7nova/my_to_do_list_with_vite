import React, { ChangeEvent, useState } from 'react';
import { TaskType } from '../App';
import { AddForm } from './AddForm';

export type EditableSpanPropsType = {
    title: string
    onClick: (value: string) => void
}

export const EditableSpan = (props: EditableSpanPropsType) => {
    const [editMode, setEditMode] = useState<boolean>(false)
    const [value, setValue] = useState(props.title)

    const onDoubleClickHandler = ()=> {
        setEditMode(true)
    }
    const onBlurHandler = ()=> {
        setEditMode(false)
        props.onClick(value)
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>)=> {
        setValue(e.currentTarget.value)
    }
    return (
        editMode
        ?<input onChange={onChangeHandler} value={value} onBlur={onBlurHandler} autoFocus/>
        :<span onDoubleClick={onDoubleClickHandler}>{props.title}</span>
    );
}


