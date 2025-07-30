import { MoodType } from '@/app/app-slice'
import { createTheme } from '@mui/material'

export const getTheme = (themeMood: MoodType) =>
  createTheme({
    palette: {
      mode: themeMood,
      primary: {
        main: '#9EC0D9',
      },
    },
  })
