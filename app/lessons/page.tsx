"use client";
import { useDictionary } from "@/provider/useDictionary";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import ContentBox from "../Component/ContentBox";
import Header from "../Component/Header";
import LeftNavbar from "../Component/LeftNavbar";

const page = () => {
  const { t, isDictionary } = useDictionary();
  const check = 10;

  const dataLoop = {
    categories: {
      English: [
        { label: "Aqeedah", value: "aqidah" },
        { label: "Hadith", value: "hadits" },
        { label: "Fiqh", value: "fiqih" },
        { label: "Tafsir", value: "tafsir" },
        { label: "Ethics", value: "akhlak" },
        { label: "Arabic", value: "bahasa_arab" },
      ],
      Arab: [
        { label: "العقيدة", value: "aqidah" },
        { label: "الحديث", value: "hadits" },
        { label: "الفقه", value: "fiqih" },
        { label: "التفسير", value: "tafsir" },
        { label: "الأخلاق", value: "akhlak" },
        { label: "اللغة العربية", value: "bahasa_arab" },
      ],
    },
  };

  const [isData, setIsData] = useState<any>({});
  const [isProfile, setIsProfile] = useState<any>({});
  const [isLoadingPo, setIsLoadingPo] = useState<boolean>(false);
  const [isLoadingNe, setIsLoadingNe] = useState<boolean>(false);
  const [isLoading, setIsloading] = useState<boolean>(true);
  const [isEmptyPopular, setIsEmpytPopular] = useState<boolean>(false);
  const [isEmptyNewest, setIsEmpytNewest] = useState<boolean>(false);
  const popularRef = useRef(0);
  const newestRef = useRef(0);
  const popularContainer = useRef<HTMLDivElement>(null);
  const newestContainer = useRef<HTMLDivElement>(null);

  const fetchPopularLesson = async () => {
    setIsLoadingPo(true);
    try {
      const res = await fetch(`api/lessons-list?popular=${popularRef.current}`);
      if (!res.ok) throw new Error("Failed Fetch Lesson-List");
      const data = await res.json();
      if (data.popular_lessons.length <= 0) return setIsEmpytPopular(true);
      popularRef.current += 1;
      setIsData((prev: any) => {
        const oldList: any[] = prev?.popular_lessons ?? [];
        const incoming: any[] = data.popular_lessons ?? [];
        const seen = new Set(oldList.map((l) => l.id));
        const fresh = incoming.filter((l) => !seen.has(l.id));
        return { ...prev, popular_lessons: [...oldList, ...fresh] };
      });
    } catch (error) {
      console.log(error || "FAILED TO FETCH POPULAR LESSONS");
    } finally {
      setIsLoadingPo(false);
    }
  };

  const fetchNewestLesson = async () => {
    setIsLoadingNe(true);
    try {
      const res = await fetch(`api/lessons-list?newest=${newestRef.current}`);
      if (!res.ok) throw new Error("Failed Fetch Lesson-List");
      const data = await res.json();
      if (data.newest_lessons.length <= 0) return setIsEmpytNewest(true);
      newestRef.current += 1;
      setIsData((prev: any) => {
        const oldList: any[] = prev?.newest_lessons ?? [];
        const incoming: any[] = data.newest_lessons ?? [];
        const seen = new Set(oldList.map((l) => l.id));
        const fresh = incoming.filter((l) => !seen.has(l.id));
        return { ...prev, newest_lessons: [...oldList, ...fresh] };
      });
    } catch (error) {
      console.log(error || "FAILED TO FETCH NEWEST LESSONS");
    } finally {
      setIsLoadingNe(false);
    }
  };

  const handleScrollPopular = () => {
    if (!popularContainer.current) return;
    if (isEmptyPopular) return;

    const { scrollTop, scrollHeight, clientHeight } = popularContainer.current;
    const isAtBottom = scrollTop + clientHeight >= scrollHeight - 1;
    if (isAtBottom && !isLoadingPo && !isEmptyPopular) {
      fetchPopularLesson();
    }
  };

  const handleScrollNewest = () => {
    if (!newestContainer.current) return;
    if (isEmptyNewest) return;

    const { scrollTop, scrollHeight, clientHeight } = newestContainer.current;
    const isAtBottom = scrollTop + clientHeight >= scrollHeight - 1;
    if (isAtBottom && !isLoadingNe && !isEmptyNewest) {
      fetchNewestLesson();
    }
  };

  useEffect(() => {
    if (!isData.popular_lessons || !isData.newest_lessons) return;
    sessionStorage.setItem(
      "lessons",
      JSON.stringify({
        learning_summary: isData.learning_summary,
        today_learning: isData.today_learning,
        popular_lessons: isData.popular_lessons,
        newest_lessons: isData.newest_lessons,
        popularRef: popularRef.current,
        newestRef: newestRef.current,
      }),
    );
  }, [isData, isEmptyPopular, popularRef, newestRef, isEmptyNewest]);

  const fetchLesson = async () => {
    const hasData = sessionStorage.getItem("lessons");
    const hasProfile = sessionStorage.getItem("profile");

    if (hasData) {
      try {
        const parsed = JSON.parse(hasData);
        if (parsed.popular_lessons && parsed.popular_lessons.length > 0) {
          if (
            hasProfile &&
            hasProfile !== "undefined" &&
            hasProfile !== "null"
          ) {
            setIsProfile(JSON.parse(hasProfile));
          } else {
            setIsProfile({});
          }

          if (hasData && hasData !== "undefined" && hasData !== "null") {
            setIsData(JSON.parse(hasData));
          } else {
            setIsData({});
          }
          popularRef.current = parsed.popularRef ?? 0;
          newestRef.current = parsed.newestRef ?? 0;

          setIsEmpytPopular(false);
          setIsEmpytNewest(false);
          setIsloading(false);
          return;
        }
      } catch (e) {
        setIsloading(false);
        console.log("Error parsing session storage", e);
      }
    }

    try {
      const res = await fetch("api/lessons-list");
      if (!res.ok) {
        setIsEmpytNewest(true);
        setIsEmpytPopular(true);
        setIsloading(false);
        throw new Error("Failed Fetch lesson-list");
      }
      const data = await res.json();
      popularRef.current = 1;
      newestRef.current = 1;

      const initialData = {
        learning_summary: data.learning_summary,
        today_learning: data.today_learning,
        popular_lessons: data.popular_lessons,
        newest_lessons: data.newest_lessons,
        popularRef: popularRef.current,
        newestRef: newestRef.current,
      };

      sessionStorage.setItem("profile", JSON.stringify(data.profile));
      sessionStorage.setItem("lessons", JSON.stringify(initialData));

      setIsProfile(data.profile);
      setIsData(initialData);
      setIsloading(false);
    } catch (error) {
      console.log(error);
      setIsloading(false);
    }
  };

  useEffect(() => {
    fetchLesson();
  }, []);

  const formatDatetoHour = (dateString: string) => {
    const date = new Date(dateString);
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    return `${hours}.${minutes}`;
  };

  const Progress = () => {
    const total = isData?.learning_summary?.total || 0;
    const done = isData?.leaning_summary?.done || 0;
    const CIRCUMFERENCE = 351.86;
    const percentage = total > 0 ? Math.min(done / total, 1) : 0;
    const strokeDashoffset = CIRCUMFERENCE - CIRCUMFERENCE * percentage;

    return { CIRCUMFERENCE, strokeDashoffset };
  };

  const { CIRCUMFERENCE, strokeDashoffset } = Progress();

  return (
    <div className="flex flex-col gap-12 items-center">
      <Header active={1} profileData={isProfile}></Header>
      <div
        className="inline-grid gap-2 grid-rows-[repeat(2,fit-content(100%))]
        grid-cols-[fit-content(100%)_minmax(0,1fr)] grid-flow-row max-w-full w-400"
      >
        {/* left image */}
        <div className="flex flex-col p-6 gap-3">
          <h1 className="text-5xl/c-120 tracking-min-4 font-medium text-text">
            {t("lessons.title")}
          </h1>
          <p className="font-normal text-[1.5rem]/[130%] text-gray tracking-min-2">
            {t("lessons.description1")}
            <br></br>
            {t("lessons.description2")}
          </p>
          <Image
            src={"/Image/lessons_image.png"}
            alt="Lessons"
            width={544}
            height={386}
          />
        </div>
        {/* grid data */}
        <div
          className="grid gap-2.5 grid-cols-2 grid-rows-[fit-content(100%)_minmax(0,1fr)]
        grid-flow-rows self-stretch justify-self-stretch"
        >
          {/* learning summary */}
          <ContentBox
            title={t("lessons.learning_summary.title")}
            style={{
              alignSelf: "stretch",
              gridRow: "span 1",
              gridColumn: "span 1",
              justifySelf: "stretch",
            }}
          >
            {/* data */}
            <div className="flex gap-6 items-center">
              {/* progress */}
              <div className="relative w-32 h-32 flex items-center justify-center shrink-0">
                <svg
                  width="128"
                  height="128"
                  viewBox="0 0 128 128"
                  className="absolute"
                >
                  <circle
                    cx="64"
                    cy="64"
                    r="56"
                    fill="none"
                    stroke="rgba(65, 64, 59, 0.20)"
                    strokeWidth="16"
                  />
                  <circle
                    cx="64"
                    cy="64"
                    r="56"
                    fill="none"
                    stroke="#E0CA5F" // atau "white", "#0E3E2C", dll.
                    strokeWidth="16"
                    strokeLinecap="round"
                    strokeDasharray={CIRCUMFERENCE}
                    strokeDashoffset={strokeDashoffset}
                    transform="rotate(-90 64 64)"
                  />
                </svg>
                <div className="flex flex-col justify-center items-center z-10 text-center">
                  <h3 className="text-[1.5rem] font-medium text-text tracking-min-2">
                    {isData?.learning_summary?.total || 0}
                  </h3>
                  <h4 className="text-[0.9375rem] font-medium text-gray tracking-min-2">
                    {t("lessons.title")}
                  </h4>
                </div>
              </div>
              {/* information */}
              <div className="flex flex-col gap-2 flex-1">
                {/* top */}
                <div className="flex justify-between flex-1">
                  {/* left */}
                  <div className="flex gap-2 items-center">
                    {/* yellow circle */}
                    <div className="w-2 h-2 rounded-full bg-yellow"></div>
                    <h3 className="text-left tracking-min-2 text-text text-[1rem] font-medium">
                      {t("lessons.learning_summary.done")}
                    </h3>
                  </div>
                  <h3 className="text-right tracking-min-2 text-text text-[1rem] font-medium">
                    {isData?.learning_summary?.done ?? 0}
                  </h3>
                </div>
                {/* bottom */}
                <div className="flex justify-between flex-1">
                  {/* left */}
                  <div className="flex gap-2 items-center">
                    {/* gray circle */}
                    <div className="w-2 h-2 rounded-full bg-[rgba(65,64,59,0.20)]"></div>
                    <h3 className="text-left tracking-min-2 text-text text-[1rem] font-medium">
                      {t("lessons.learning_summary.not_completed")}
                    </h3>
                  </div>
                  <h3 className="text-right tracking-min-2 text-text text-[1rem] font-medium">
                    {(isData?.learning_summary?.total ?? 0) -
                      (isData?.learning_summary?.done ?? 0)}
                  </h3>
                </div>
              </div>
            </div>
            {/* cta */}
            <div className="p-3 flex flex-col items-start gap-2.5 text-secondary bg-[rgba(14,62,44,0.10)] rounded-xl">
              {/* text */}
              <div>
                <h4 className="text-[0.625rem] font-medium tracking-min-2">
                  {t("lessons.learning_summary.card1.paragraph1")}
                </h4>
                <h3 className="text-[1.125rem] font-medium tracking-min-2">
                  {t("lessons.learning_summary.card1.paragraph2")}
                </h3>
              </div>
              {/* button */}
              <button
                className="rounded-md bg-dark-primary flex p-[0.375rem_0.75rem] gap-1
              text-white text-[0.875rem] tracking-min-2 font-normal cursor-pointer hover:brightness-75 duration-200"
              >
                {t("lessons.learning_summary.card1.button")}
                <Image
                  src={"/Icon/Chevron down.svg"}
                  alt="Arrow"
                  width={12}
                  height={12}
                  className="invert-100 -rotate-90"
                />
              </button>
            </div>
          </ContentBox>
          {/* todays learning schedule */}
          <ContentBox
            title={t("lessons.today_learning.title")}
            style={{
              background:
                "linear-gradient(180deg,var(--Cloud,rgba(218,224,218,0.70)) 0%,rgba(255,255,255,0.70) 100%)",
            }}
          >
            <div className="flex flex-col gap-1">
              {!isLoading ? (
                (isData.today_learning || []).map((val: any, i: number) => {
                  return (
                    <div
                      className="bg-primary px-6 py-4 flex gap-1 rounded-2xl items-start"
                      key={i}
                    >
                      {/* inside left */}
                      <div className="flex-1 flex flex-col items-start gap-2">
                        {/* time */}
                        <div className="flex gap-1.5 items-center">
                          <svg
                            width="16"
                            height="16"
                            viewBox="0 0 16 16"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <g clipPath="url(#clip0_41_512)">
                              <path
                                d="M7.99998 3.99999V7.99999L10.6666 9.33333M14.6666 7.99999C14.6666 11.6819 11.6819 14.6667 7.99998 14.6667C4.31808 14.6667 1.33331 11.6819 1.33331 7.99999C1.33331 4.3181 4.31808 1.33333 7.99998 1.33333C11.6819 1.33333 14.6666 4.3181 14.6666 7.99999Z"
                                stroke="white"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </g>
                            <defs>
                              <clipPath id="clip0_41_512">
                                <rect width="16" height="16" fill="white" />
                              </clipPath>
                            </defs>
                          </svg>
                          <h4 className="text-white text-[0.75rem] font-normal tracking-min-2">
                            {formatDatetoHour(val.time_start) +
                              " - " +
                              formatDatetoHour(val.time_end)}
                          </h4>
                        </div>
                        {/* title */}
                        <div className="flex flex-col gap-1">
                          <h3 className="text-white text-[1rem] font-medium tracking-min-2 truncate">
                            {isDictionary === "Arab"
                              ? val.arab_title
                              : val.english_title}
                          </h3>
                          <h4 className="text-white text-[0.75rem] font-normal tracking-min-2 truncate">
                            {t("lessons.today_learning.type") +
                              " : " +
                              (isDictionary === "Arab"
                                ? val.arab_chapter
                                : val.english_chapter)}
                          </h4>
                        </div>
                        {/* button */}
                        <button className="p-[0.375rem_0.75rem] bg-white rounded-md text-secondary text-[0.75rem] font-normal tracking-min-2 flex cursor-pointer hover:brightness-75 duration-200">
                          {t("lessons.today_learning.button")}
                          <Image
                            src={"/Icon/Chevron down.svg"}
                            alt="Arrow"
                            width={12}
                            height={12}
                            className="-rotate-90"
                          />
                        </button>
                      </div>
                      {/* type */}
                      <div className="p-[0.375rem_0.75rem] bg-[rgba(255,255,255,0.10)] rounded-md">
                        <h4 className="text-white text-[0.75rem] font-normal tracking-min-2">
                          {val.category}
                        </h4>
                      </div>
                    </div>
                  );
                })
              ) : (
                // SKELETON LOADING
                <>
                  {[1, 2].map((_, i) => (
                    <div
                      key={i}
                      className="bg-primary px-6 py-4 flex gap-1 rounded-2xl items-start animate-pulse"
                    >
                      <div className="flex-1 flex flex-col items-start gap-3 py-1">
                        <div className="h-3 w-28 bg-white/20 rounded"></div>
                        <div className="flex flex-col gap-2 w-full">
                          <div className="h-5 w-3/4 bg-white/20 rounded"></div>
                          <div className="h-3 w-1/2 bg-white/20 rounded"></div>
                        </div>
                        <div className="h-7 w-24 bg-white/20 rounded-md mt-1"></div>
                      </div>
                      <div className="h-6 w-16 bg-white/10 rounded-md"></div>
                    </div>
                  ))}
                </>
              )}
              {(isData.today_learning || []).length <= 0 && (
                <div className="py-6 text-center text-gray text-sm">
                  {isDictionary === "Arab"
                    ? "لا توجد بيانات متاحة"
                    : "No data available"}
                </div>
              )}
            </div>
          </ContentBox>
          {/* categories */}
          <ContentBox
            title={t("lessons.categories.title")}
            style={{ gridRow: "span 1", gridColumn: "span 2" }}
          >
            <div className="flex gap-1">
              {dataLoop.categories[isDictionary].map((val, i) => {
                return (
                  <div
                    className="flex flex-col items-center py-4.5 gap-4 flex-1 bg-[rgba(14,62,44,0.10)] rounded-2xl"
                    key={i}
                  >
                    {i < 5 ? (
                      <Image
                        src={`/Icon/${val.value}.svg`}
                        alt={val.label}
                        width={33}
                        height={33}
                        style={{
                          filter:
                            "brightness(0) saturate(100%) invert(29%) sepia(0%) saturate(0%) hue-rotate(150deg) brightness(95%) contrast(92%)",
                        }}
                      />
                    ) : (
                      <div className="h-8.25 flex">
                        <h3 className="text-[1.5rem] text-secondary font-medium tracking-min-2">
                          عربي
                        </h3>
                      </div>
                    )}
                    <h3 className="text-[1rem] text-secondary font-medium tracking-min-2">
                      {val.label}
                    </h3>
                  </div>
                );
              })}
            </div>
          </ContentBox>
        </div>
        {/* popular lessons */}
        <ContentBox
          title={t("lessons.popular_lessons.title")}
          className=" max-h-[26rem]"
        >
          <div
            ref={popularContainer}
            className="flex flex-col gap-4 overflow-y-scroll"
            onScroll={handleScrollPopular}
          >
            {!isLoading ? (
              (isData.popular_lessons || []).map((val: any, i: number) => {
                return (
                  <div className="gap-8 flex items-center" key={i}>
                    {/* left */}
                    <div className="flex gap-4 items-center flex-1">
                      {/* image */}
                      <div className="w-20.75 h-20.75 rounded-2xl overflow-hidden">
                        <Image
                          src={val.image || null}
                          alt="Popular Lessons Image"
                          width={83}
                          height={83}
                          className="object-cover aspect-square"
                        />
                      </div>
                      {/* information */}
                      <div className="flex flex-col flex-1 gap-2">
                        {/* title */}
                        <h3 className="text-[1.25rem] flex-1 text-text font-medium tracking-min-2 truncate">
                          {isDictionary === "Arab"
                            ? val.arab_title
                            : val.english_title}
                        </h3>
                        {/* book */}
                        <h4 className="text-[1rem] flex-1 text-gray font-normal tracking-min-2 truncate">
                          {isDictionary === "Arab"
                            ? val.arab_chapter
                            : val.english_chapter}
                        </h4>
                        {/* bar */}
                        <div className="flex gap-2 flex-1 items-center">
                          <div
                            className={`h-1 flex-1 rounded-full`}
                            style={{
                              background: `linear-gradient(90deg, var(--Dark_Green, #0E3E2C) ${(val.progress ?? 0) * 100}%, var(--Cloud, #DAE0DA) ${(val.progress ?? 0) * 100}%)`,
                            }}
                          ></div>

                          <h4 className="text-[1rem] text-gray font-medium tracking-min-2 truncate">
                            {(val.progress ?? 0) * 100 + "%"}
                          </h4>
                        </div>
                      </div>
                    </div>
                    {/* play */}
                    <div
                      className="w-12.5 h-12.5 rounded-xl bg-[rgba(14,62,44,0.10)] border border-dark-primary
        flex justify-center items-center select-none cursor-pointer"
                    >
                      <Image
                        src={"/Icon/play-video.svg"}
                        alt="play-video-icon"
                        width={18}
                        height={18}
                        style={{
                          filter:
                            "brightness(0) saturate(100%) invert(29%) sepia(0%) saturate(0%) hue-rotate(150deg) brightness(95%) contrast(92%)",
                        }}
                      />
                    </div>
                  </div>
                );
              })
            ) : (
              // SKELETON LOADING
              <>
                {[1, 2, 3, 4, 5].map((_, i) => (
                  <div
                    className="gap-8 flex items-center animate-pulse"
                    key={i}
                  >
                    <div className="flex gap-4 items-center flex-1">
                      <div className="w-20.75 h-20.75 rounded-2xl bg-gray-200 shrink-0"></div>
                      <div className="flex flex-col flex-1 gap-2.5">
                        <div className="h-5 w-3/4 bg-gray-200 rounded"></div>
                        <div className="h-4 w-1/2 bg-gray-200 rounded"></div>
                        <div className="h-3 w-full bg-gray-200 rounded-full"></div>
                      </div>
                    </div>
                    <div className="w-12.5 h-12.5 rounded-xl bg-gray-200 shrink-0"></div>
                  </div>
                ))}
              </>
            )}
            {isLoadingPo && (
              <div className="flex w-full items-center justify-center py-6">
                <div className="w-8 h-8 border-4 border-primary border-t-dark-primary rounded-full animate-spin"></div>
              </div>
            )}
            {isEmptyPopular && (
              <div className="py-6 text-center text-gray text-sm">
                {isDictionary === "Arab"
                  ? "لا توجد بيانات متاحة"
                  : "No data available"}
              </div>
            )}
          </div>
        </ContentBox>
        {/* newest lessons */}
        <ContentBox
          title={t("lessons.newest_lessons.title")}
          className=" max-h-[26rem]"
        >
          <div
            ref={newestContainer}
            onScroll={handleScrollNewest}
            className="flex flex-col gap-4 overflow-y-scroll"
          >
            {!isLoading ? (
              (isData.newest_lessons || []).map((val: any, i: number) => {
                return (
                  // main
                  <div className="flex gap-12" key={i}>
                    {/* left */}
                    <div className="flex gap-4 flex-1">
                      {/* image */}
                      <div className="w-20.75 h-20.75 rounded-2xl overflow-hidden">
                        <Image
                          src={val.image || null}
                          alt="Newest Lessons Image"
                          width={83}
                          height={83}
                          className="object-cover aspect-square"
                        />
                      </div>
                      {/* basic information */}
                      <div className="flex flex-col justify-between flex-1">
                        <h3 className="w-full text-text text-xl/c-120 tracking-min-2 font-medium truncate">
                          {isDictionary === "Arab"
                            ? val.arab_title
                            : val.english_title}
                        </h3>
                        <h4 className="text-[1rem] text-gray font-normal tracking-min-2 truncate">
                          {t("lessons.newest_lessons.type") +
                            " : " +
                            (isDictionary === "Arab"
                              ? val.arab_chapter
                              : val.english_chapter)}
                        </h4>
                        <h4 className="text-[1rem] text-gray font-normal tracking-min-2 truncate">
                          {val.author}
                        </h4>
                      </div>
                    </div>
                    {/* time */}
                    <div className="flex gap-2 items-center">
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="#4b4b4b"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g clipPath="url(#clip0_41_512)">
                          <path
                            d="M7.99998 3.99999V7.99999L10.6666 9.33333M14.6666 7.99999C14.6666 11.6819 11.6819 14.6667 7.99998 14.6667C4.31808 14.6667 1.33331 11.6819 1.33331 7.99999C1.33331 4.3181 4.31808 1.33333 7.99998 1.33333C11.6819 1.33333 14.6666 4.3181 14.6666 7.99999Z"
                            stroke="white"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </g>
                        <defs>
                          <clipPath id="clip0_41_512">
                            <rect width="16" height="16" fill="#0E3E2C" />
                          </clipPath>
                        </defs>
                      </svg>
                      <p className="font-normal text-text text-[1rem] tracking-min-2">
                        {(val.read_time ?? 0) +
                          " " +
                          t("lessons.newest_lessons.time")}
                      </p>
                    </div>
                    {/* new */}
                    <div
                      className="font-normal text-text text-[1rem] tracking-min-2
        bg-[rgba(14,62,44,0.10)] p-[0.5rem_1rem] rounded-lg self-center"
                    >
                      {t("lessons.newest_lessons.badge")}
                    </div>
                    {/* play */}
                    <div
                      className="w-12.5 h-12.5 rounded-xl bg-[rgba(14,62,44,0.10)] border border-dark-primary
          flex justify-center items-center select-none cursor-pointer self-center"
                    >
                      <Image
                        src={"/Icon/play-video.svg"}
                        alt="play-video-icon"
                        width={18}
                        height={18}
                        style={{
                          filter:
                            "brightness(0) saturate(100%) invert(29%) sepia(0%) saturate(0%) hue-rotate(150deg) brightness(95%) contrast(92%)",
                        }}
                      />
                    </div>
                  </div>
                );
              })
            ) : (
              <>
                {[1, 2, 3, 4, 5].map((_, i) => (
                  <div
                    className="flex gap-12 items-center animate-pulse"
                    key={i}
                  >
                    <div className="flex gap-4 flex-1 items-center">
                      <div className="w-20.75 h-20.75 rounded-2xl bg-gray-200 shrink-0"></div>
                      <div className="flex flex-col justify-between flex-1 gap-2.5">
                        <div className="h-5 w-3/4 bg-gray-200 rounded"></div>
                        <div className="h-4 w-1/2 bg-gray-200 rounded"></div>
                        <div className="h-4 w-1/3 bg-gray-200 rounded"></div>
                      </div>
                    </div>
                    <div className="h-4 w-20 bg-gray-200 rounded"></div>
                    <div className="h-10 w-20 bg-gray-200 rounded-lg"></div>
                    <div className="w-12.5 h-12.5 rounded-xl bg-gray-200 shrink-0"></div>
                  </div>
                ))}
              </>
            )}
            {isLoadingNe && (
              <div className="flex w-full items-center justify-center py-6">
                <div className="w-8 h-8 border-4 border-primary border-t-dark-green rounded-full animate-spin"></div>
              </div>
            )}
            {isEmptyNewest && (
              <div className="py-6 text-center text-gray text-sm">
                {isDictionary === "Arab"
                  ? "لا توجد بيانات متاحة"
                  : "No data available"}
              </div>
            )}
          </div>
        </ContentBox>
      </div>
      {/* navbar left */}
      <LeftNavbar state={1} />
    </div>
  );
};

export default page;
