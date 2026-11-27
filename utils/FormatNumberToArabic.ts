import { dictionaryType } from "@/provider/useDictionary";

export const formatNumber = (num: number, lang: dictionaryType) =>
  lang === "Arab"
    ? new Intl.NumberFormat("ar-EG").format(num)
    : new Intl.NumberFormat("en-US").format(num);
