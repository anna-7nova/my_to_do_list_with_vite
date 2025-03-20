import { SxProps } from "@mui/material"

//TodoList
export const listItemStylesSx = (isDone: boolean) : SxProps => ({ 
    display: "flex", 
    justifyContent: "space-between" , 
    opacity: isDone ? 0.5 :1
})

export const cardStyle = { backgroundColor: '#d9d9d96b' }

//TodoComponentHeader
export const gridContaiter = { dispaly: "flex", justifyContent: "space-between", p: "0 15px" }