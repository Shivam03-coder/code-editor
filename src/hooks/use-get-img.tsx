import { LANGUAGES } from "@/constants/themes";
import React from "react";

const useGetImages = (lang: string) => {
  const lan = LANGUAGES.find(
    (lg) => lg.name.toLocaleLowerCase() === lang.toLocaleLowerCase(),
  );
  if (lan) {
    return {
      icon: lan.icon,
    };
  }

  return {
    icon: null,
  };
};

export default useGetImages;
