import { LANGUAGE_CONFIG } from "@/constants/themes";
import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "@/store";
import { CodeEditorState } from "@/types/global";

const getInitialState = (): CodeEditorState => {
  if (typeof window === "undefined") {
    return {
      language: "javascript",
      theme: "vs-dark",
      fontSize: 16,
      output: "",
      isRunning: false,
      error: null,
      editor: null,
      executionResult: null,
    };
  }

  const savedLanguage = localStorage.getItem("lang") || "javascript";
  const savedTheme = localStorage.getItem("theme") || "vs-dark";

  return {
    language: savedLanguage,
    theme: savedTheme,
    output: "",
    isRunning: false,
    error: null,
    editor: null,
    executionResult: null,
  };
};

const initialState = getInitialState();

// Thunk to handle code execution
export const runCode = createAsyncThunk(
  "codeEditor/runCode",
  async (_, { getState, rejectWithValue }) => {
    const state = getState() as RootState;
    const { language, editor } = state.editor;

    const code = editor?.getValue();
    if (!code) {
      return rejectWithValue("Please enter some code");
    }

    if (!language) {
      throw new Error("No language found");
    }

    const runtime = LANGUAGE_CONFIG[language]?.pistonRuntime;

    if (!runtime) {
      throw new Error("No language found");
    }

    try {
      const response = await fetch("https://emkc.org/api/v2/piston/execute", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          language: runtime.language,
          version: runtime.version,
          files: [{ content: code }],
        }),
      });

      const data = await response.json();

      if (data.message) {
        throw new Error(data.message);
      }

      if (data.compile?.code !== 0) {
        throw new Error(data.compile.stderr || data.compile.output);
      }

      if (data.run?.code !== 0) {
        throw new Error(data.run.stderr || data.run.output);
      }

      return { code, output: data.run.output.trim() };
    } catch (error: any) {
      return rejectWithValue(error.message || "Error running code");
    }
  },
);

const codeEditorSlice = createSlice({
  name: "codeEditor",
  initialState,
  reducers: {
    setTheme(state, action: PayloadAction<string>) {
      state.theme = action.payload;
      localStorage.setItem("editor-theme", action.payload);
    },

    setLanguage(state, action: PayloadAction<string>) {
      const currentCode = state.editor?.getValue();
      if (currentCode) {
        localStorage.setItem(`editor-code-${state.language}`, currentCode);
      }
      state.language = action.payload;
      state.output = "";
      state.error = null;
      localStorage.setItem("editor-language", action.payload);
    },
    setEditor(state, action: PayloadAction<any>) {
      const savedCode = localStorage.getItem(`editor-code-${state.language}`);
      if (savedCode) {
        action.payload.setValue(savedCode);
      }
      state.editor = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(runCode.pending, (state) => {
        state.isRunning = true;
        state.error = null;
        state.output = "";
      })
      .addCase(runCode.fulfilled, (state, action) => {
        state.isRunning = false;
        state.output = action.payload.output;
        state.executionResult = {
          code: action.payload.code,
          output: action.payload.output,
          error: null,
        };
      })
      .addCase(runCode.rejected, (state, action) => {
        state.isRunning = false;
        state.error = action.payload as string;
        state.executionResult = {
          code: "",
          output: "",
          error: action.payload as string,
        };
      });
  },
});

export const { setTheme, setLanguage, setEditor } = codeEditorSlice.actions;

export default codeEditorSlice;
