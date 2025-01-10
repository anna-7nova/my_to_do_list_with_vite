import React from 'react';

type TodoComponentHeaderPropsType = {
    title: string
}

export const TodoComponentHeader = (props: TodoComponentHeaderPropsType) => {
    return (
        <h3>{props.title}</h3>
    );
}

