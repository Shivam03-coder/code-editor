import { createSlice } from "@reduxjs/toolkit";

interface initialStateType {
  isThemeDialogOpen: boolean;
  isLanguageDialogOpen: boolean;
}

const initialState: initialStateType = {
  isThemeDialogOpen: false,
  isLanguageDialogOpen: false,
};

const themeStateSlice = createSlice({
  name: "themeState",
  initialState,
  reducers: {
    setIsThemeDialogOpen: (state) => {
      state.isThemeDialogOpen = !state.isThemeDialogOpen;
    },
    setIsLanguageDialogOpen: (state) => {
      state.isLanguageDialogOpen = !state.isLanguageDialogOpen;
    },
  },
});

export const { setIsThemeDialogOpen, setIsLanguageDialogOpen } =
  themeStateSlice.actions;
export default themeStateSlice;
