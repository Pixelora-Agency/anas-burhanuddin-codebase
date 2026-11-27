"use client";

import { useDictionary } from "@/provider/useDictionary";
import Image from "next/image";
import { ReactNode, useEffect, useRef, useState } from "react";
import ContentBox from "../Component/ContentBox";
import Header from "../Component/Header";
import LeftNavbar from "../Component/LeftNavbar";

const page = () => {
  const { t, isDictionary } = useDictionary();
  const [page, setPage] = useState<number>(0);
  const [pageNumber, setPageNumber] = useState<ReactNode[]>([]);
  const [isData, setIsData] = useState<any>({});
  const [isProfile, setIsProfile] = useState<any>({});
  const [isLoading, setIsloading] = useState<boolean>(true);
  const fetchRef = useRef(false);

  const fetchEbook = async () => {
    const hasData = sessionStorage.getItem("ebook");
    const hasProfile = sessionStorage.getItem("profile");

    if (hasData) {
      try {
        if (hasProfile && hasProfile !== "undefined" && hasProfile !== "null") {
          setIsProfile(JSON.parse(hasProfile));
        } else {
          setIsProfile({});
        }

        if (hasData && hasData !== "undefined" && hasData !== "null") {
          setIsData(JSON.parse(hasData));
        } else {
          setIsData({});
        }
        setIsloading(false);
        setPage(JSON.parse(hasData)?.page);
        return;
      } catch (e) {
        setIsloading(false);
        console.log("Error parsing session storage", e);
      }
    }

    try {
      const res = await fetch("api/ebook");
      if (!res.ok) {
        setIsloading(false);
        throw new Error("Failed Fetch lesson-list");
      }
      const data = await res.json();

      const initialData = {
        display: data.groupByDisplay,
        recommended_ebook: data.recommended_ebook,
        page: 0,
      };

      sessionStorage.setItem("profile", JSON.stringify(data.profile));
      sessionStorage.setItem("ebook", JSON.stringify(initialData));

      setIsProfile(data.profile);
      setIsData(initialData);
      setIsloading(false);
    } catch (error) {
      console.log(error);
      setIsloading(false);
    }
  };

  useEffect(() => {
    if (fetchRef.current) return;
    fetchRef.current = true;
    fetchEbook();
  }, []);

  useEffect(() => {
    sessionStorage.setItem(
      "ebook",
      JSON.stringify({
        display: isData.display,
        recommended_ebook: isData.recommended_ebook,
        page: page,
      }),
    );
  }, [page, isData]);

  const pageDictionary =
    (isDictionary === "English"
      ? isData?.display?.[0]?.english_page
      : isData?.display?.[0]?.arab_page) ?? {};

  const totalPages = !isLoading ? Object.keys(pageDictionary).length : 1;

  console.log(totalPages);

  useEffect(() => {
    let temp: string = "";
    let node: ReactNode[] = [];
    for (let i = 0; i < 11; i++) {
      if (i <= 5) {
        if (page > 5 && i < 2) {
          if (i == 0) {
            temp = "1";
          } else {
            temp = "...";
          }
        } else if (page - 5 + i < 0) {
          temp = "";
        } else {
          temp = (page - 5 + i + 1).toString();
        }
      } else if (totalPages > page + 6) {
        if (i == 9) {
          temp = "...";
        } else if (i == 10) {
          temp = totalPages.toString();
        } else {
          temp = (page - 5 + i + 1).toString();
        }
      } else {
        if (page - 5 + i < 0) {
          temp = "";
        } else if (page - 5 + i >= totalPages) {
          temp = "";
        } else {
          temp = (page - 5 + i + 1).toString();
        }
      }
      let func = () => {};
      let value = Number(temp);
      if (temp != "..." && temp != "") {
        func = () => {
          setPage(value - 1);
        };
      }
      if (page - 5 + i != page) {
        node.push(
          <p
            key={i}
            className={`w-10 text-center text-gray text-[1rem] tracking-min-2 ${temp != "..." && "cursor-pointer"} select-none`}
            onClick={() => {
              func();
            }}
          >
            {temp}
          </p>,
        );
      } else {
        node.push(
          <p
            key={i}
            className="w-10 text-center text-dark-primary text-[1.5rem] tracking-min-2 font-medium select-none"
          >
            {temp}
          </p>,
        );
      }
    }
    setPageNumber(node);
  }, [page, totalPages]);

  const formatDate = (dateString: string | Date | undefined | null): string => {
    if (!dateString) return "";

    const date = new Date(dateString);

    if (isNaN(date.getTime())) return "";

    const day = date.getDate();
    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const month = monthNames[date.getMonth()];
    const year = date.getFullYear();

    return `${day} ${month} ${year}`;
  };

  const handlePickEBook = async (id: number) => {
    try {
      const res = await fetch(`api/ebook?id=${id}`);
      if (!res.ok) {
        setIsloading(false);
        throw new Error("Failed Fetch lesson-list");
      }
      const data = await res.json();

      const initialData = {
        display: data.groupByDisplay,
        recommended_ebook: data.recommended_ebook,
        page: 0,
      };

      sessionStorage.setItem("profile", JSON.stringify(data.profile));
      sessionStorage.setItem("ebook", JSON.stringify(initialData));

      setIsProfile(data.profile);
      setIsData(initialData);
      setPage(0);
      setIsloading(false);
    } catch (error) {
      console.log(error);
      setIsloading(false);
    }
  };

  return (
    <div className="flex flex-col gap-12 items-center">
      <Header active={5} profileData={isProfile}></Header>
      {/* element */}
      <div className="flex gap-2 h-200">
        {/* left */}
        <div className="flex flex-col gap-2 w-225.5">
          {/* top */}
          <div className="p-6 gap-12 rounded-3xl bg-white-gray flex flex-col">
            {isLoading ? (
              // --- SKELETON LOADING ---
              <div className="flex gap-6 animate-pulse">
                {/* Cover Skeleton */}
                <div className="w-77.75 h-110 rounded-lg bg-gray-300 shrink-0" />
                {/* Text Skeleton */}
                <div className="flex-1 flex flex-col gap-4 h-110">
                  <div className="h-10 bg-gray-300 rounded w-3/4" />
                  <div className="flex flex-col gap-2">
                    <div className="h-4 bg-gray-200 rounded w-full" />
                    <div className="h-4 bg-gray-200 rounded w-full" />
                    <div className="h-4 bg-gray-200 rounded w-5/6" />
                    <div className="h-4 bg-gray-200 rounded w-2/3" />
                  </div>
                </div>
              </div>
            ) : !isData.display || isData.display.length === 0 ? (
              // --- KONDISI KALAU DATA KOSONG / NULL ---
              <div className="flex justify-center items-center w-full h-110">
                <p className="text-gray text-base font-medium">
                  {isDictionary === "Arab"
                    ? "البيانات غير متوفرة"
                    : "Data Unavailable"}
                </p>
              </div>
            ) : (
              // --- ACTUAL CONTENT ---
              <>
                <div className="flex gap-6">
                  {/* cover */}
                  <div className="w-77.75 h-110 rounded-lg overflow-hidden relative shrink-0">
                    <Image
                      src={
                        isData.display?.[0]?.image ||
                        "/Image/bookplaceholder.webp"
                      }
                      blurDataURL={
                        isData.display?.[0]?.image ||
                        "/Image/bookplaceholder.webp"
                      }
                      placeholder="blur"
                      alt="book_cover"
                      fill
                      className="object-cover"
                    />
                  </div>
                  {/* text */}
                  <div className="flex-1 flex flex-col gap-3 h-110 relative min-w-0">
                    <h2 className="text-text text-4xl/c-120 tracking-min-2 font-medium">
                      {isDictionary === "English"
                        ? isData.display?.[0]?.english_title
                        : isData.display?.[0]?.arab_title}
                    </h2>
                    <p className="text-gray text-sm/c-120 tracking-min-2 font-normal whitespace-pre-line overflow-y-auto leading-normal">
                      {isDictionary === "English"
                        ? isData.display?.[0]?.english_page?.[page + 1]
                        : isData.display?.[0]?.arab_page?.[page + 1]}
                    </p>
                    <div className="absolute bottom-0 w-full h-8 bg-[linear-gradient(180deg,rgba(218,224,218,0.00)_0%,rgba(245,245,245,0.50)_100%)] pointer-events-none"></div>
                  </div>
                </div>
              </>
            )}

            <div className="flex gap-3 py-3 bg-white rounded-xl items-center justify-center">
              {pageNumber}
            </div>
          </div>
          {/* bottom */}
          <ContentBox title={t("ebook.recommended_ebook.title")}>
            <div className="flex gap-2">
              {isLoading ? (
                // --- SKELETON LOADING ---
                Array.from({ length: 4 }).map((_, i) => (
                  <div
                    key={i}
                    className="flex flex-1 min-w-0 rounded-[0.875rem] bg-white-gray p-1.5 items-center gap-2.5 animate-pulse"
                  >
                    <div className="w-16.25 h-22.75 rounded-lg bg-gray-300 shrink-0" />
                    <div className="flex-1 flex flex-col gap-2 min-w-0">
                      <div className="h-4 bg-gray-300 rounded w-full" />
                      <div className="h-3 bg-gray-200 rounded w-2/3" />
                    </div>
                  </div>
                ))
              ) : !isData.recommended_ebook ||
                isData.recommended_ebook.length === 0 ? (
                // --- KONDISI KALAU DATA KOSONG / NULL ---
                <div className="flex justify-center items-center w-full py-6">
                  <p className="text-gray text-sm font-medium">
                    {isDictionary === "Arab"
                      ? "البيانات غير متوفرة"
                      : "Data Unavailable"}
                  </p>
                </div>
              ) : (
                // --- ACTUAL CONTENT ---
                (isData.recommended_ebook || []).map((val: any, i: number) => {
                  return (
                    <div
                      onClick={() => handlePickEBook(val.id)}
                      className="flex flex-1 min-w-0 rounded-[0.875rem] bg-white-gray p-1.5 items-center gap-2.5 cursor-pointer hover:bg-slate-200"
                      key={i}
                    >
                      {/* image */}
                      <div className="w-16.25 h-22.75 rounded-lg overflow-hidden relative shrink-0">
                        <Image
                          src={val.image || "./Image/bookplaceholder.webp"}
                          blurDataURL={
                            val.image || "./Image/bookplaceholder.webp"
                          }
                          placeholder="blur"
                          alt="ebook_cover"
                          fill
                        />
                      </div>

                      {/* right */}
                      <div className="flex-1 flex flex-col gap-2 min-w-0">
                        <h3 className="text-text text-base/c-120 font-medium tracking-min-2 line-clamp-2">
                          {isDictionary === "Arab"
                            ? val.arab_title
                            : val.english_title}
                        </h3>
                        <p className="text-gray text-xs/c-120 font-normal tracking-min-2 line-clamp-2">
                          {isDictionary === "Arab"
                            ? val.arab_author
                            : val.english_author}
                        </p>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </ContentBox>
        </div>
        {/* right */}
        <div className="flex flex-col gap-2 w-108.5 self-stretch min-h-0">
          {/* top */}
          <ContentBox title={t("ebook.about_ebook.title")}>
            {isLoading ? (
              // --- SKELETON LOADING ---
              <div className="flex flex-col gap-6 animate-pulse">
                <div className="flex gap-6 items-start">
                  {/* Cover Skeleton */}
                  <div className="w-29.25 h-41.5 rounded-lg bg-gray-300 shrink-0" />
                  {/* Detail Skeleton */}
                  <div className="flex flex-col gap-6 flex-1 min-w-0">
                    <div className="flex flex-col gap-2">
                      <div className="h-5 bg-gray-300 rounded w-full" />
                      <div className="h-4 bg-gray-200 rounded w-full" />
                      <div className="h-4 bg-gray-200 rounded w-3/4" />
                    </div>
                    <div className="flex flex-col gap-2">
                      <div className="h-4 bg-gray-200 rounded w-1/2" />
                      <div className="h-4 bg-gray-200 rounded w-1/3" />
                      <div className="h-4 bg-gray-200 rounded w-2/5" />
                    </div>
                  </div>
                </div>
                {/* Button Skeleton */}
                <div className="w-full h-12 bg-gray-300 rounded-xl" />
              </div>
            ) : !isData.display || isData.display.length === 0 ? (
              // --- KONDISI KALAU DATA KOSONG / NULL ---
              <div className="flex justify-center items-center w-full py-12">
                <p className="text-gray text-base font-medium">
                  {isDictionary === "Arab"
                    ? "البيانات غير متوفرة"
                    : "Data Unavailable"}
                </p>
              </div>
            ) : (
              // --- ACTUAL CONTENT ---
              <>
                <div className="flex gap-6 items-start">
                  {/* image */}
                  <div className="relative w-29.25 h-41.5 rounded-lg overflow-hidden shrink-0">
                    <Image
                      src={
                        isData.display?.[0]?.image ||
                        "/Image/bookplaceholder.webp"
                      }
                      blurDataURL={
                        isData.display?.[0]?.image ||
                        "/Image/bookplaceholder.webp"
                      }
                      fill
                      alt="book_thumbnail"
                    />
                  </div>
                  {/* detail */}
                  <div className="flex flex-col gap-6 flex-1 min-w-0">
                    {/* top */}
                    <div className="flex flex-col gap-2">
                      <h3 className="text-text text-base/c-120 line-clamp-2 font-medium tracking-min-2">
                        {isDictionary === "English"
                          ? isData.display?.[0]?.english_title
                          : isData.display?.[0]?.arab_title}
                      </h3>
                      <p className="text-gray text-[0.875rem] line-clamp-3 font-normal tracking-min-2">
                        {isDictionary === "English"
                          ? isData.display?.[0]?.english_desc
                          : isData.display?.[0]?.arab_desc}
                      </p>
                    </div>
                    {/* bottom */}
                    <div className="flex flex-col gap-2">
                      {/* author */}
                      <div className="flex gap-1 items-center">
                        <div>
                          <svg
                            width="16"
                            height="16"
                            viewBox="0 0 16 16"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            className="min-w-0"
                          >
                            <path
                              d="M7.99984 7.99999C9.4665 7.99999 10.6665 6.79999 10.6665 5.33332C10.6665 3.86666 9.4665 2.66666 7.99984 2.66666C6.53317 2.66666 5.33317 3.86666 5.33317 5.33332C5.33317 6.79999 6.53317 7.99999 7.99984 7.99999ZM7.99984 9.33332C6.19984 9.33332 2.6665 10.2 2.6665 12V13.3333H13.3332V12C13.3332 10.2 9.79984 9.33332 7.99984 9.33332Z"
                              fill="#41403B"
                            />
                          </svg>
                        </div>
                        <p className="text-gray text-xs/c-120 tracking-min-2 font-normal truncate">
                          {isDictionary === "English"
                            ? isData.display?.[0]?.english_author
                            : isData.display?.[0]?.arab_author}
                        </p>
                      </div>
                      {/* page */}
                      <div className="flex gap-1 items-center">
                        <div>
                          <svg
                            width="16"
                            height="16"
                            viewBox="0 0 16 16"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M10 2H3.33333C2.97971 2 2.64057 2.14048 2.39052 2.39052C2.14048 2.64057 2 2.97971 2 3.33333V12.6667C2 13.0203 2.14048 13.3594 2.39052 13.6095C2.64057 13.8595 2.97971 14 3.33333 14H10C10.1751 14 10.3485 13.9655 10.5102 13.8985C10.672 13.8315 10.819 13.7333 10.9428 13.6095C11.0666 13.4857 11.1648 13.3387 11.2318 13.1769C11.2988 13.0151 11.3333 12.8418 11.3333 12.6667V3.33333C11.3333 3.15824 11.2988 2.98486 11.2318 2.82309C11.1648 2.66132 11.0666 2.51434 10.9428 2.39052C10.819 2.26671 10.672 2.1685 10.5102 2.10149C10.3485 2.03449 10.1751 2 10 2ZM14 4V12C14 12.1768 13.9298 12.3464 13.8047 12.4714C13.6797 12.5964 13.5101 12.6667 13.3333 12.6667H12.6667V3.33333H13.3333C13.5101 3.33333 13.6797 3.40357 13.8047 3.5286C13.9298 3.65362 14 3.82319 14 4Z"
                              fill="#41403B"
                            />
                          </svg>
                        </div>
                        <p className="text-gray text-xs/c-120 tracking-min-2 font-normal truncate">
                          {isData.display?.[0]?.chapter?.length || 0}{" "}
                          {t("ebook.about_ebook.pages")}
                        </p>
                      </div>
                      {/* date */}
                      <div className="flex gap-1 items-center">
                        <div>
                          <svg
                            width="16"
                            height="16"
                            viewBox="0 0 16 16"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M12 2.66667H11.3333V2C11.3333 1.82321 11.2631 1.65366 11.138 1.52866C11.013 1.40366 10.8435 1.33344 10.6667 1.33344C10.4899 1.33344 10.3203 1.40366 10.1953 1.52866C10.0703 1.65366 10 1.82321 10 2V2.66667H6V2C5.99997 1.82321 5.92972 1.65366 5.8047 1.52866C5.67968 1.40366 5.51013 1.33344 5.33333 1.33344C5.15654 1.33344 4.98699 1.40366 4.86196 1.52866C4.73694 1.65366 4.66669 1.82321 4.66667 2V2.66667H4C3.46957 2.66667 2.96086 2.87738 2.58579 3.25245C2.21071 3.62753 2 4.13623 2 4.66667V12.6667C2 13.1971 2.21071 13.7058 2.58579 14.0809C2.96086 14.456 3.46957 14.6667 4 14.6667H12C12.5304 14.6667 13.0391 14.456 13.4142 14.0809C13.7893 13.7058 14 13.1971 14 12.6667V4.66667C14 4.13623 13.7893 3.62753 13.4142 3.25245C13.0391 2.87738 12.5304 2.66667 12 2.66667ZM5.33333 11.3333C5.20148 11.3333 5.07259 11.2942 4.96295 11.221C4.85332 11.1477 4.76787 11.0436 4.71741 10.9218C4.66696 10.8 4.65375 10.6659 4.67948 10.5366C4.7052 10.4073 4.76869 10.2885 4.86193 10.1953C4.95516 10.102 5.07395 10.0385 5.20327 10.0128C5.33259 9.98709 5.46664 10.0003 5.58846 10.0507C5.71027 10.1012 5.81439 10.1867 5.88765 10.2963C5.9609 10.4059 6 10.5348 6 10.6667C6 10.8435 5.92976 11.013 5.80474 11.1381C5.67971 11.2631 5.51014 11.3333 5.33333 11.3333ZM10.6667 11.3333H8C7.82321 11.3333 7.65366 11.2631 7.52866 11.138C7.40366 11.013 7.33344 10.8435 7.33344 10.6667C7.33344 10.4899 7.40366 10.3203 7.52866 10.1953C7.65366 10.0703 7.82321 10 8 10H10.6667C10.8435 10 11.013 10.0703 11.138 10.1953C11.263 10.3203 11.3332 10.4899 11.3332 10.6667C11.3332 10.8435 11.263 11.013 11.138 11.138C11.013 11.2631 10.8435 11.3333 10.6667 11.3333ZM12.6667 7.33333H3.33333V4.66667C3.33333 4.48986 3.40357 4.32029 3.5286 4.19526C3.65362 4.07024 3.82319 4 4 4H4.66667V4.66667C4.66669 4.84346 4.73694 5.013 4.86196 5.138C4.98699 5.26301 5.15654 5.33323 5.33333 5.33323C5.51013 5.33323 5.67968 5.26301 5.8047 5.138C5.92972 5.013 5.99997 4.84346 6 4.66667V4H10V4.66667C10 4.84346 10.0703 5.013 10.1953 5.138C10.3203 5.26301 10.4899 5.33323 10.6667 5.33323C10.8435 5.33323 11.013 5.26301 11.138 5.138C11.2631 5.013 11.3333 4.84346 11.3333 4.66667V4H12C12.1768 4 12.3464 4.07024 12.4714 4.19526C12.5964 4.32029 12.6667 4.48986 12.6667 4.66667V7.33333Z"
                              fill="#41403B"
                            />
                          </svg>
                        </div>
                        <p className="text-gray text-xs/c-120 tracking-min-2 font-normal truncate">
                          {formatDate(isData.display?.[0]?.created_at)}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <button
                  className="w-full py-3 bg-primary justify-center rounded-xl
        text-white text-[1rem] font-medium tracking-min-2
        hover:-translate-y-1.5 hover:bg-dark-primary/80 duration-400 ease-[cubic-bezier(0.37,0.4,0.16,1)]"
                >
                  {t("ebook.about_ebook.button")}
                </button>
              </>
            )}
          </ContentBox>
          {/* bottom */}
          <ContentBox
            title={t("ebook.table_of_content.title")}
            style={{ minHeight: "0" }}
          >
            <div className="flex flex-col gap-2 overflow-y-auto p-1">
              {isLoading ? (
                // --- SKELETON LOADING ---
                Array.from({ length: 5 }).map((_, i) => (
                  <div
                    key={i}
                    className="p-3 gap-6 items-center flex rounded-2xl bg-white-gray animate-pulse"
                  >
                    <div className="w-22.5 h-4 bg-gray-300 rounded" />
                    <div className="flex-1 h-4 bg-gray-300 rounded" />
                    <div className="w-6 h-4 bg-gray-300 rounded" />
                  </div>
                ))
              ) : !isData.display?.[0]?.chapter ||
                isData.display[0].chapter.length === 0 ? (
                // --- KONDISI KALAU DATA KOSONG / NULL ---
                <div className="flex justify-center items-center w-full py-8">
                  <p className="text-gray text-base font-medium">
                    {isDictionary === "Arab"
                      ? "البيانات غير متوفرة"
                      : "Data Unavailable"}
                  </p>
                </div>
              ) : (
                // --- ACTUAL CONTENT ---
                (isData.display?.[0]?.chapter || []).map(
                  (val: any, i: number) => {
                    return (
                      <div
                        className="p-3 gap-6 text-text text-[1rem] tracking-min-2 flex cursor-pointer rounded-2xl hover:px-6 hover:scale-102 hover:translate-y-[-1%] hover:bg-[rgba(0,0,0,0.1)] duration-200"
                        key={i}
                        onClick={() => {
                          setPage(val.english_page_number - 1);
                        }}
                      >
                        <h4 className="w-22.5">
                          {isDictionary === "Arab"
                            ? val.arab_chapter_tag
                            : val.english_chapter_tag}
                        </h4>
                        <h4 className="flex-1 truncate">
                          {isDictionary === "Arab"
                            ? val.arab_chapter_title
                            : val.english_chapter_title}
                        </h4>
                        <h4 className="font-medium">
                          {isDictionary === "Arab"
                            ? val.arab_page_number
                            : val.english_page_number}
                        </h4>
                      </div>
                    );
                  },
                )
              )}
            </div>
          </ContentBox>
        </div>
      </div>
      {/* navbar left */}
      <LeftNavbar state={5} />
    </div>
  );
};

export default page;
