import { styled } from '@mui/material/styles'
import { Button, ButtonProps } from '@mui/material'
import { NavLinkProps } from 'react-router'

type NavButtonProps = Partial<ButtonProps> &
  Partial<NavLinkProps> & {
    backgroundcolor?: string
  }

export const NavButton = styled(Button, {
  shouldForwardProp: (prop) => prop !== 'backgroundcolor',
})<NavButtonProps>(({ backgroundcolor, theme }) => ({
  backgroundColor: backgroundcolor || theme.palette.primary.light,
  fontWeight: 'bold',
  boxShadow: `0 0 0 2px ${theme.palette.primary.dark}, 4px 4px 0 0 ${theme.palette.primary.dark}`,
  border: 'none',
}))
