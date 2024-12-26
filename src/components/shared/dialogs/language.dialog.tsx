"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useAppSelector } from "@/store";
import { setIsLanguageDialogOpen } from "@/store/states/dialog-state";
import { useDispatch } from "react-redux";
import { Globe } from "lucide-react";
import { useEffect, useState } from "react";
import { LANGUAGES } from "@/constants/themes";
import { useLocalStorage } from "usehooks-ts";
import Image from "next/image";
import useMounted from "@/hooks/use-mounted";

const LanguageDialog = () => {
  const { isLanguageDialogOpen } = useAppSelector((state) => state.themes);
  const dispatch = useDispatch();
  const mounted = useMounted();
  const [Language, setLanguage] = useLocalStorage("lang", "");
  if (!mounted) return null;

  return (
    <Dialog
      open={isLanguageDialogOpen}
      onOpenChange={() => dispatch(setIsLanguageDialogOpen())}
    >
      <DialogTrigger asChild>
        <button className="vcenter gap-3 rounded-xl border border-gray-500 bg-green-500 px-4 py-3 font-manrope text-sm font-semibold text-white hover:bg-green-600">
          <Globe size={19} className="text-white" />
          {Language || "Language"}
        </button>
      </DialogTrigger>
      <DialogContent className="rounded-lg border-none bg-primary text-secondary sm:max-w-[625px]">
        <DialogHeader>
          <DialogTitle className="font-inter">
            CODE-X: AI-Composed Code Editor
          </DialogTitle>
          <DialogDescription>
            Select your preferred programming language to customize your coding
            environment.
          </DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
          {LANGUAGES.map(({ id, name, icon, shadow }) => (
            <button
              key={id}
              style={{ backgroundColor: "black", boxShadow: shadow }}
              className="flex flex-col items-center justify-center rounded-lg p-4 transition-transform duration-200 hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
              onClick={() => {
                setLanguage(name);
                dispatch(setIsLanguageDialogOpen());
              }}
            >
              <Image
                src={icon}
                alt={`${name} logo`}
                className="h-12 w-12 rounded-md"
                width={70}
                height={70}
              />
              <p className="mt-3 text-sm font-semibold text-white">{name}</p>
            </button>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LanguageDialog;
