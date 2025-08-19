import { ChangeEvent, useState } from 'react'

export type EditableSpanPropsType = {
  title: string
  onClick: (value: string) => void
  disabled?: boolean
}

export const EditableSpan = (props: EditableSpanPropsType) => {
  const [editMode, setEditMode] = useState<boolean>(false)
  const [value, setValue] = useState(props.title)

  const onClickHandler = () => {
    setEditMode(!editMode)
    if (editMode) {
      props.onClick(value)
    }
  }

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.currentTarget.value)
  }
  return editMode&&!props.disabled ? (
    <input onChange={onChangeHandler} value={value} onBlur={onClickHandler} autoFocus />
  ) : (
    <span onDoubleClick={onClickHandler}>{props.title}</span>
  )
}
