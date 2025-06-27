import { EditableSpan } from "@/common/components/EditableSpan";
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import { gridContaiter } from "./TodoComponentHeader.styles";


type Props = {
    title: string
    onClick: () => void
    onChange: (title: string) => void
}

export const TodoComponentHeader:React.FC<Props> = (props: Props) => {
    return (
        <div className={"container"}>
            <Grid container sx={gridContaiter}>
                <h3><EditableSpan title={props.title} onClick={props.onChange} /></h3>
                <IconButton onClick={props.onClick} aria-label="delete">
                <DeleteOutlinedIcon />
                </IconButton>
            </Grid >
        </div >
    );
}

