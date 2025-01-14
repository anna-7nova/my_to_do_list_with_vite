import React from 'react';

type ButtonPropsType = {
    title: string
    onClickHandler: () => void
    isDisabled?: boolean
}

export const Button = ({title, onClickHandler, isDisabled}: ButtonPropsType) => {
    return <button disabled={isDisabled} onClick={onClickHandler} >{title}</button>
}


