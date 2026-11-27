"use client";

import { dictionary } from "@/config/dictionary";
import { createContext, useContext, useState } from "react";

export type dictionaryType = keyof typeof dictionary;

interface DictionaryContextType {
  isDictionary: dictionaryType;
  setDictionary: (value: dictionaryType) => void;
  t: (path: string) => string;
}

const DictionaryContext = createContext<DictionaryContextType | undefined>(
  undefined,
);

interface DictionaryProviderProps {
  children: React.ReactNode;
  initialLang: dictionaryType;
}

export const DictionaryProvider: React.FC<DictionaryProviderProps> = ({
  children,
  initialLang,
}) => {
  const [isDictionary, setIsDictionary] = useState<dictionaryType>(initialLang);
  const setDictionary = (value: dictionaryType) => {
    if (dictionary[value]) {
      setIsDictionary(value);
      document.cookie = `app-dictionary=${value};path=/; max-age=31536000`;
    }
  };

  const t = (path: string) => {
    const keys = path.split(".");
    const getValue = (dictObj: any) => {
      return keys.reduce(
        (a, k) => (a && a[k] !== undefined ? a[k] : undefined),
        dictObj,
      );
    };

    let result = getValue(dictionary[isDictionary]);
    if (result === undefined) {
      result = getValue(dictionary["English"]);
    }

    return typeof result === "string" ? result : path;
  };

  return (
    <DictionaryContext.Provider value={{ isDictionary, setDictionary, t }}>
      {children}
    </DictionaryContext.Provider>
  );
};

export const useDictionary = (): DictionaryContextType => {
  const context = useContext(DictionaryContext);
  if (!context) {
    throw new Error("useDictionary must be used within a DictionaryProvider");
  }
  return context;
};
