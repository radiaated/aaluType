import { createSlice } from "@reduxjs/toolkit";

export const appSlice = createSlice({
  name: "app",
  initialState: {
    playStart: false,
    inPlay: false,
    timerValue: 0,
    result: null,
  },
  reducers: {
    setTimer: (state) => {
      state.timerValue += 1;
    },
    resetTimer: (state) => {
      state.timerValue = 0;
    },
    setPlayStart: (state, action) => {
      state.playStart = action.payload;
    },
    setInPlay: (state, action) => {
      state.inPlay = action.payload;
    },
    setResult: (state, action) => {
      const { text, userInput, inc } = action.payload;
      let correctWords = 0;
      userInput.split(" ").map((item) => {
        correctWords = text.split(" ").includes(item) ? correctWords + 1 : 0;
      });

      const wpm =
        (correctWords / (state.timerValue === 0 ? 1 : state.timerValue)) * 60;

      state.result = {
        wpm: wpm,
        acc: ((text.split("").length - inc) / text.split("").length) * 100,
        resultTime: state.timerValue,
      };

      if (localStorage.getItem("typTest")) {
        if (JSON.parse(localStorage.getItem("typTest")).pb < wpm) {
          localStorage.setItem(
            "typTest",
            JSON.stringify({
              pb: wpm,
            })
          );
        }
      } else {
        localStorage.setItem(
          "typTest",
          JSON.stringify({
            pb: wpm,
          })
        );
      }
    },
    resetResult: (state) => {
      state.result = null;
    },
  },
});

export const appAction = appSlice.actions;

export default appSlice.reducer;