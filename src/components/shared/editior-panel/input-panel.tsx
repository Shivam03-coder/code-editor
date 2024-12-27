"use client";

import { LANGUAGE_CONFIG } from "@/constants/themes";
import useMounted from "@/hooks/use-mounted";
import { Editor, loader } from "@monaco-editor/react";
import React, { useEffect } from "react";
import { useReadLocalStorage } from "usehooks-ts";
import { useClerk } from "@clerk/nextjs";
import { ArrowsUpFromLine, Code, RefreshCwIcon, Share } from "lucide-react";
import Image from "next/image";
import useGetImages from "@/hooks/use-get-img";
import { Button } from "@/components/ui/button";
import { useAppDispatch, useAppSelector } from "@/store";
import { setEditor } from "@/store/states/editior-state";

const InputPanel: React.FC = () => {
  const clerk = useClerk();
  const language = useReadLocalStorage<string>("lang") || "javascript";
  const theme = useReadLocalStorage<string>("theme") || "GitHub Dark";
  const mounted = useMounted();
  const { icon } = useGetImages(language);
  const { editor } = useAppSelector((state) => state.editor);
  const dispatch = useAppDispatch();

  loader.init().then((monaco) => {
    monaco.editor.defineTheme("vs-dark", {
      base: "vs-dark",
      inherit: true,
      rules: [
        { token: "comment", foreground: "6e7681" },
        { token: "string", foreground: "a5d6ff" },
        { token: "keyword", foreground: "ff7b72" },
        { token: "number", foreground: "79c0ff" },
        { token: "type", foreground: "ffa657" },
        { token: "class", foreground: "ffa657" },
        { token: "function", foreground: "d2a8ff" },
        { token: "variable", foreground: "ffa657" },
        { token: "operator", foreground: "ff7b72" },
      ],
      colors: {
        "editor.background": "#0d1117",
        "editor.foreground": "#c9d1d9",
        "editor.lineHighlightBackground": "#161b22",
        "editorLineNumber.foreground": "#6e7681",
        "editorIndentGuide.background": "#21262d",
        "editor.selectionBackground": "#264f78",
        "editor.inactiveSelectionBackground": "#264f7855",
      },
    });
  });

  useEffect(() => {
    const savedCode = localStorage.getItem(
      `editor-code-${language.toLocaleLowerCase()}`,
    );
    const languageConfig = LANGUAGE_CONFIG[language.toLocaleLowerCase()];

    if (languageConfig) {
      const newCode = savedCode || languageConfig.defaultCode;
      if (editor) editor.setValue(newCode);
    }
  }, [language, editor]);

  const handleRefresh = () => {
    const languageConfig = LANGUAGE_CONFIG[language.toLocaleLowerCase()];
    if (languageConfig) {
      const defaultCode = languageConfig.defaultCode;
      if (editor) editor.setValue(defaultCode);
      localStorage.removeItem(`editor-code-${language.toLocaleLowerCase()}`);
    }
  };

  const handleEditorChange = (value: string | undefined) => {
    if (value)
      localStorage.setItem(
        `editor-code-${language.toLocaleLowerCase()}`,
        value,
      );
  };

  if (!mounted) return null;

  const InputPanelHeader = () => {
    return (
      <header className="flex min-h-16 flex-1 items-center justify-between bg-header p-3">
        <div className="vcenter gap-4 text-secondary">
          <span className="rounded-xl border border-gray-600 bg-black p-2">
            <Image height={30} width={30} alt="logo" src={icon as string} />
          </span>
          <span>
            <h4 className=""> CODE-X</h4>
            <p className="">{language}</p>
          </span>
        </div>
        <div className="flex gap-6">
          <Button
            onClick={handleRefresh}
            className="rounded border border-gray-600 bg-black"
          >
            <RefreshCwIcon color="white" />
          </Button>
          <Button className="rounded border border-gray-600 bg-black">
            <Share color="white" />
          </Button>
        </div>
      </header>
    );
  };

  const monacoLanguage =
    LANGUAGE_CONFIG[language]?.monacoLanguage || "javascript";

  return (
    <div className="max-h-[700px] flex-1 overflow-hidden overflow-y-scroll rounded-xl pb-5 ring-1 ring-zinc-100">
      <InputPanelHeader />
      {clerk.loaded && (
        <Editor
          height="100%"
          language={monacoLanguage}
          onChange={handleEditorChange}
          theme={"vs-dark"}
          onMount={(editor) => dispatch(setEditor(editor))}
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
      )}
    </div>
  );
};

export default InputPanel;
