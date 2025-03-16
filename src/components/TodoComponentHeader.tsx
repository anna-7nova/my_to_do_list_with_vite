import { EditableSpan } from "./EditableSpan";
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';

type TodoComponentHeaderPropsType = {
    title: string
    onClick: () => void
    onChange: (title: string) => void
}

export const TodoComponentHeader = (props: TodoComponentHeaderPropsType) => {
    return (
        <div className={"container"}>
            <Grid container>
                <h3><EditableSpan title={props.title} onClick={props.onChange} /></h3>
                <IconButton onClick={props.onClick} aria-label="delete">
                    <DeleteIcon />
                </IconButton>
            </Grid >
        </div >
    );
}

