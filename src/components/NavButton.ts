import { styled } from '@mui/material/styles';
import { Button } from '@mui/material';

type NavButtonProps = {
    backgroundColor?: string
}

export const NavButton = styled(Button)<NavButtonProps>(({backgroundColor, theme})=>({
  backgroundColor: backgroundColor || `${theme.palette.primary.light}`,
  fontWeight: "bold",
  boxShadow: `0 0 0 2px ${theme.palette.primary.dark}, 4px 4px 0 0 ${theme.palette.primary.dark}`,
  border: "none",
}));
