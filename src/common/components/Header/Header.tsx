import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import logo1 from '@/common/icons/LOGO_REMBOX_black.png'
import logo2 from '@/common//icons/LOGO_REMBOX_white.png'
import FormControlLabel from '@mui/material/FormControlLabel'
import Switch from '@mui/material/Switch'
import { useTheme } from '@mui/material'
import LinearProgress from '@mui/material/LinearProgress'
import { useAppSelector } from '../../hooks/useAppSelector'
import { useAppDispatch } from '../../hooks/useAppDispatch'
import { selectStatus, selectTheme, switchMoodAC } from '@/app/app-slice'
import { NavButton } from '..'
import { logoutTC, selectIsLoggedIn } from '@/features/auth/model/auth-slice'

export function Header() {
  const theme = useTheme()
  const themeMood = useAppSelector(selectTheme)
  const dispatch = useAppDispatch()

  const status = useAppSelector(selectStatus)
  const isLoggedIn = useAppSelector(selectIsLoggedIn)

  //switch
  const switchMoodHandler = () => {
    dispatch(switchMoodAC({ mood: themeMood === 'light' ? 'dark' : 'light' }))
  }

  const onClickHandler = () => dispatch(logoutTC())
  return (
    <Box sx={{ flexGrow: 1, paddingBottom: '80px' }}>
      <AppBar position="fixed">
        <Toolbar>
          <IconButton size="large" edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <img src={theme.palette.mode === 'light' ? logo1 : logo2} />
          </Typography>
          <Box sx={{ display: 'flex', gap: '10px' }}>
            <FormControlLabel control={<Switch onChange={switchMoodHandler} />} label="Theme" onChange={() => {}} />
            {isLoggedIn && (
              <NavButton onClick={onClickHandler} color="inherit" variant="outlined">
                Sign out
              </NavButton>
            )}
            <NavButton color="inherit" variant="outlined">
              FAQ
            </NavButton>
          </Box>
        </Toolbar>
        {status === 'loading' && <LinearProgress />}
      </AppBar>
    </Box>
  )
}
