import { createSlice } from "@reduxjs/toolkit";

interface initialStateType {
  isThemeDialogOpen: boolean;
  isLanguageDialogOpen: boolean;
  isSharedDialogOpen: boolean;
}

const initialState: initialStateType = {
  isThemeDialogOpen: false,
  isLanguageDialogOpen: false,
  isSharedDialogOpen: false,
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
    setIsSharedDialogOpen: (state) => {
      state.isSharedDialogOpen = !state.isSharedDialogOpen;
    },
  },
});

export const {
  setIsThemeDialogOpen,
  setIsLanguageDialogOpen,
  setIsSharedDialogOpen,
} = themeStateSlice.actions;
export default themeStateSlice;
