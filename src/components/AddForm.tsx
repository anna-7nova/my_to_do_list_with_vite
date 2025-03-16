import { ChangeEvent, useState, KeyboardEvent } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

type AddFormType = {
    createNewItem: (title: string) => void
}

export const AddForm = (props: AddFormType) => {
    //styles
    const buttonStyled = {
        height: "40px",
        minHeight: "40px",
        minWidth: "40px",
        width: "40px"

    }

    const [title, setTitle] = useState<string>("")
    console.log(title)
    const [errorState, setErrorState] = useState<string | null>(null)

    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        errorState && setErrorState(null)
        setTitle(event.currentTarget.value)
    }

    const onClickHandler = () => {
        const trimmedTitle = title.trim()
        if (trimmedTitle !== "") {
            props.createNewItem(title.trim())
        } else {
            setErrorState("Title is required")
        }
        setTitle("")
    }

    const onKeyDownHandler = (event: KeyboardEvent<HTMLElement>) => {
        if (event.key === "Enter" && !IsButtonDisabled) {
            onClickHandler()
        }
    }

    const IsAddTitleNamePossible = title.length <= 15

    const IsButtonDisabled = !IsAddTitleNamePossible || !title.length

    return (
        <div>
            <TextField 
            error={IsButtonDisabled&&title.length>0} 
            onChange={onChangeHandler} 
            onKeyDown={onKeyDownHandler} 
            id={"outlined-basic"} 
            label={IsAddTitleNamePossible?"Please, type the title": "the title is too long"} 
            variant="outlined" 
            size={"small"}
            value={title}
            />
            <Button onClick={onClickHandler} variant="contained" disabled={IsButtonDisabled} sx={buttonStyled}>+</Button>
        </div>
    );
}

