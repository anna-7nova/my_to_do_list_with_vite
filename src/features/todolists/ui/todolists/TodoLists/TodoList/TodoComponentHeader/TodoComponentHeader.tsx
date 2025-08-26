import Grid from '@mui/material/Grid'
import IconButton from '@mui/material/IconButton'
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined'
import { gridContaiter } from './TodoComponentHeader.styles'
import { EditableSpan } from '@/common/components'

type Props = {
  title: string
  onClick: () => void
  onChange: (title: string) => void
  disabled?: boolean
}

export const TodoComponentHeader: React.FC<Props> = (props: Props) => {
  return (
    <div className={'container'}>
      <Grid container sx={gridContaiter}>
        <h3>
          <EditableSpan title={props.title} onClick={props.onChange} disabled={props.disabled} />
        </h3>
        <IconButton disabled={props.disabled} onClick={props.onClick} aria-label="delete">
          <DeleteOutlinedIcon />
        </IconButton>
      </Grid>
    </div>
  )
}
