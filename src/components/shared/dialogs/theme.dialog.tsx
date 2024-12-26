"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useLocalStorage } from "usehooks-ts";
import { THEMES } from "@/constants/themes";
import { useAppSelector } from "@/store";
import { setIsThemeDialogOpen } from "@/store/states/dialog-state";
import { Settings } from "lucide-react";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";

const ThemeDialog = () => {
  const { isThemeDialogOpen } = useAppSelector((state) => state.themes);
  const dispatch = useDispatch();
  const [Mounted, setMounted] = useState<boolean>(false);
  const [Themes, setThemes] = useLocalStorage("theme", "GitHub Dark");

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!Mounted) return null;

  return (
    <Dialog
      open={isThemeDialogOpen}
      onOpenChange={() => dispatch(setIsThemeDialogOpen())}
    >
      <DialogTrigger asChild>
        <button className="vcenter gap-3 rounded-xl border border-gray-500 bg-blue-500 px-4 py-3 font-manrope text-sm font-semibold text-white hover:bg-blue-600">
          <Settings size={19} className="text-white" />
          {Themes ?? "Themes"}
        </button>
      </DialogTrigger>
      <DialogContent className="rounded-lg border-none bg-primary text-secondary sm:max-w-[625px]">
        <DialogHeader>
          <DialogTitle className="font-inter">
            CODE-X: AI-Composed Code Editor
          </DialogTitle>
          <DialogDescription>
            Seamlessly edit, compose, and manage your code with AI assistance.
            Select your preferred theme to enhance your coding experience.
          </DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
          {THEMES.map(({ color, id, label }) => (
            <button
              key={id}
              onClick={() => {
                setThemes(label);
                dispatch(setIsThemeDialogOpen());
              }}
              style={{
                backgroundColor: color,
                color: label === "VS Light" ? "black" : "white",
                border: Themes === label ? "3px solid #4caf50" : "none", // Highlight selected theme
              }}
              className={`flex flex-col items-center justify-center rounded-lg p-4 shadow-md transition-transform duration-200 hover:scale-105 hover:shadow-xl focus:outline-none ${
                Themes === label ? "scale-105 shadow-lg" : ""
              }`}
            >
              <div
                className="h-16 w-16 rounded-full shadow-inner"
                style={{
                  backgroundColor: label === "VS Light" ? "#f4f4f4" : "#333",
                  border: label === "VS Light" ? "1px solid #ddd" : "none",
                }}
              />
              <p className="mt-3 text-sm font-semibold">{label}</p>
            </button>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ThemeDialog;
