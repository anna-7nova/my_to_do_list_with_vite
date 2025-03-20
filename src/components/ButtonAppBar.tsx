import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import logo from "../icons/LOGO - REMBOX.png"
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import { NavButton } from './NavButton';
import { useTheme } from '@mui/material';

// type ChangeMoodeType = {
//     changeMoode: ()=> void
// }

export default function ButtonAppBar({}) {
    const theme = useTheme();
    return (
        <Box sx={{ flexGrow: 1, paddingBottom: "80px" }}>
            <AppBar position="fixed">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1}}>
                        <img src={logo} />
                    </Typography>
                    <Box sx={{display: "flex", gap: "10px"}}>
                    <FormControlLabel control={<Switch />} label="Theme" onChange={()=>{}}/>
                    <NavButton backgroundColor={theme.palette.primary.light} color="inherit" variant="outlined">Login</NavButton>
                    <NavButton color="inherit" variant="outlined">LogOut</NavButton>
                    <NavButton color="inherit" variant="outlined">FAQ</NavButton>
                    </Box>
                </Toolbar>
            </AppBar>
        </Box>
    );
}