export interface MetaProps {
    title: string;
    description?: string;
    keywords?: string;
    author?: string;
    robots?: string;
  }

  export interface Theme {
    id: string;
    label: string;
    color: string;
  }

  export interface ExecutionResult {
    code: string;
    output: string;
    error: string | null;
  }
  
  export interface CodeEditorState {
    language: string;
    theme: string;
    fontSize?: number;
    output: string;
    isRunning: boolean;
    error: string | null;
    editor: any;
    executionResult: ExecutionResult | null;
  }
  