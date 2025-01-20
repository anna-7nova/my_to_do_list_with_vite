import React from 'react';

type ButtonPropsType = {
    title: string
    onClickHandler: () => void
    isDisabled?: boolean
    className?: string
}

export const Button = ({title, onClickHandler, isDisabled, className}: ButtonPropsType) => {
    return <button className={className} disabled={isDisabled} onClick={onClickHandler} >{title}</button>
}


