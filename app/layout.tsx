import { dictionary } from "@/config/dictionary";
import { DictionaryProvider, dictionaryType } from "@/provider/useDictionary";
import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import { cookies } from "next/headers";
import AppWrapper from "./Component/AppWrapper";
import "./globals.css";

const dm_sans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Anas Burhanuddin",
  description: "",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const savedDictionary = cookieStore.get("app-dictionary")
    ?.value as dictionaryType;
  const initialLang: dictionaryType =
    savedDictionary && dictionary[savedDictionary]
      ? savedDictionary
      : "English";
  return (
    <html
      lang={initialLang}
      className={`${dm_sans.className} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <DictionaryProvider initialLang={initialLang}>
          <AppWrapper>{children}</AppWrapper>
        </DictionaryProvider>
      </body>
    </html>
  );
}
