import { currentUser } from "@clerk/nextjs/server";
import { api } from "../../../../convex/_generated/api";
import { ConvexHttpClient } from "convex/browser";
import React from "react";
import {
  ArrowsUpFromLine,
  Code,
  PlayIcon,
  Settings,
  Globe,
  DollarSign,
  Play,
} from "lucide-react";
import { UserButton } from "@clerk/nextjs";
import ThemeDialog from "../dialogs/theme.dialog";
import LanguageDialog from "../dialogs/language.dialog";

const Header = async () => {
  const user = await currentUser();

  if (!process.env.NEXT_PUBLIC_CONVEX_URL) {
    throw new Error("NEXT_PUBLIC_CONVEX_URL is not set");
  }

  const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL);
  const dbUser = await convex.query(api.user.getUser, {
    userId: user?.id || "",
  });
  return (
    <header className="relative z-10">
      <nav className="flex w-full justify-between rounded-2xl bg-header px-3 py-2">
        <div className="vcenter gap-4 text-secondary">
          <span className="rounded-xl border border-gray-600 bg-black p-2">
            <Code size={32} />
          </span>

          <span>
            <h4 className=""> CODE-X</h4>
            <p className=""> Ai composed code editior</p>
          </span>

          <button className="vcenter ml-4 gap-3 rounded-xl border border-gray-500 bg-purple-500 px-4 py-3 font-poppins text-sm font-medium text-white hover:bg-purple-600">
            <ArrowsUpFromLine size={19} className="text-primary" />
            Snippets
          </button>
        </div>

        {/* RIGHT */}
        <div className="vcenter gap-4 text-secondary">
          {/* Themes Button */}
          <ThemeDialog />

          {/* Language Button */}
          <LanguageDialog />

          {/* Subscription Button */}
          <button className="vcenter gap-3 rounded-xl border border-gray-500 bg-yellow-500 px-4 py-3 font-poppins text-sm font-medium text-black hover:bg-yellow-600">
            <DollarSign size={19} className="text-black" />
            Subscription
          </button>

          {/* Run Button */}
          <button className="vcenter gap-3 rounded-xl border border-gray-500 bg-red-500 px-4 py-3 font-poppins text-sm font-medium text-white hover:bg-red-600">
            <Play size={19} className="text-white" />
            Run
          </button>

          {/* User Button */}
          <UserButton
            appearance={{
              elements: {
                userButtonAvatarBox: "h-12 w-12", // Increase avatar size
                userButton: "rounded-full border border-gray-500 p-1", // Add padding and border
              },
            }}
          />
        </div>
      </nav>
    </header>
  );
};

export default Header;
