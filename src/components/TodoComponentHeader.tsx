import { Button } from "./Button";

type TodoComponentHeaderPropsType = {
    title: string
    onClick: ()=> void
}

export const TodoComponentHeader = (props: TodoComponentHeaderPropsType) => {
    return (
        <div className={"container"}>
            <h3>{props.title}</h3>
            <Button onClickHandler={props.onClick} title={"X"}/>
        </div>
    );
}

