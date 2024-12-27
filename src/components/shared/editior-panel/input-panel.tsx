"use client";
import { LANGUAGE_CONFIG } from "@/constants/themes";
import useMounted from "@/hooks/use-mounted";
import { Editor } from "@monaco-editor/react";
import React from "react";
import { useReadLocalStorage } from "usehooks-ts";
import { useClerk } from "@clerk/nextjs";
import { ArrowsUpFromLine, Code, RefreshCwIcon, Share } from "lucide-react";
import Image from "next/image";
import useGetImages from "@/hooks/use-get-img";
import { Button } from "@/components/ui/button";

const InputPanel: React.FC = () => {
  const clerk = useClerk();
  const language = useReadLocalStorage<string>("lang") || "javascript";
  const theme = useReadLocalStorage<string>("theme") || "GitHub Dark";
  const mounted = useMounted();
  const { icon } = useGetImages(language);

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
          <Button className="rounded border border-gray-600 bg-black">
            <RefreshCwIcon color="white" />
          </Button>
          <Button className="rounded border border-gray-600 bg-black">
            <Share color="white" />
          </Button>
        </div>
      </header>
    );
  };

  return (
    <div className="h-screen flex-1 overflow-hidden rounded-xl ring-1 ring-zinc-100">
      <InputPanelHeader />
      {clerk.loaded && (
        <Editor
          height="100%"
          language={LANGUAGE_CONFIG[language]?.monacoLanguage || "javascript"}
          theme={"vs-dark"}
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
