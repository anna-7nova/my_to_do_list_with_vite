import { createTheme } from "@mui/material";
import type { MoodType } from "../../app/app-reducer";

export const getTheme = (themeMood: MoodType) =>
  createTheme({
    palette: {
      mode: themeMood,
      primary: {
        main: "#9EC0D9",
      },
    },
  });
