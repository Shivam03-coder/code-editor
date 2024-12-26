"use client";
import { LANGUAGE_CONFIG } from "@/constants/themes";
import useMounted from "@/hooks/use-mounted";
import { Editor } from "@monaco-editor/react";
import React from "react";
import { useReadLocalStorage } from "usehooks-ts";

const InputPanel: React.FC = () => {
  const language = useReadLocalStorage<string>("lang") || "javascript";
  const theme = useReadLocalStorage<string>("theme") || "GitHub Dark";
  const mounted = useMounted();

  return (
    <div className="flex-1 overflow-hidden rounded-xl ring-1 ring-zinc-100 ">
      <Editor
        height="600px"
        language={LANGUAGE_CONFIG[language]?.monacoLanguage || "javascript"}
        theme={theme}
        options={{
          minimap: { enabled: false },
          fontSize: 16,
          automaticLayout: true,
          scrollBeyondLastLine: false,
          padding: { top: 16, bottom: 16 },
          renderWhitespace: "selection",
          fontFamily: '"Fira Code", "Cascadia Code", Consolas, monospace',
          fontLigatures: true,
          cursorBlinking: "smooth",
          smoothScrolling: true,
          contextmenu: true,
          renderLineHighlight: "all",
          lineHeight: 1.6,
          letterSpacing: 0.5,
          roundedSelection: true,
          scrollbar: {
            verticalScrollbarSize: 8,
            horizontalScrollbarSize: 8,
          },
        }}
      />
    </div>
  );
};

export default InputPanel;
