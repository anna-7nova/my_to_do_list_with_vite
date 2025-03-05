import { Button } from "./Button";
import { EditableSpan } from "./EditableSpan";

type TodoComponentHeaderPropsType = {
    title: string
    onClick: ()=> void
    onChange: (title:string)=> void
}

export const TodoComponentHeader = (props: TodoComponentHeaderPropsType) => {
    return (
        <div className={"container"}>
            <h3><EditableSpan title={props.title} onClick={props.onChange}/></h3>

            <Button onClickHandler={props.onClick} title={"X"}/>
        </div>
    );
}

