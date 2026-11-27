"use client";
import { useDictionary } from "@/provider/useDictionary";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import ContentBox from "../Component/ContentBox";
import GreenElement from "../Component/GreenElement";
import Header from "../Component/Header";
import LeftNavbar from "../Component/LeftNavbar";

const page = () => {
  const router = useRouter();
  const [isData, setIsData] = useState<any>({});
  const [isProfile, setIsProfile] = useState<any>({});
  const [isEmptyPopular, setIsEmptyPopular] = useState<boolean>(false);
  const [isEmptyNewest, setIsEmptyNewest] = useState<boolean>(false);
  const [isLoading, setIsloading] = useState<boolean>(true);
  const [isLoadingPo, setIsLoadingPo] = useState<boolean>(false);
  const [isLoadingNe, setIsLoadingNe] = useState<boolean>(false);
  const popularContainer = useRef<HTMLDivElement>(null);
  const newestContainer = useRef<HTMLDivElement>(null);
  const popularRef = useRef(0);
  const newestRef = useRef(0);

  const fetchArticle = async () => {
    const hasData = sessionStorage.getItem("article");
    const hasProfile = sessionStorage.getItem("profile");

    if (hasData) {
      try {
        const parsed = JSON.parse(hasData);
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
        popularRef.current = parsed.popularRef ?? 0;
        newestRef.current = parsed.newestRef ?? 0;

        setIsEmptyPopular(false);
        setIsEmptyNewest(false);
        setIsloading(false);
        return;
      } catch (e) {
        console.log("Error parsing session storage", e);
      }
    }

    try {
      const res = await fetch("api/article-list");
      if (!res.ok) {
        setIsEmptyNewest(true);
        setIsEmptyPopular(true);
        setIsloading(false);
        throw new Error("Failed Fetch article-list");
      }
      const data = await res.json();
      popularRef.current = 1;
      newestRef.current = 1;

      const initialData = {
        recommended_article: data.recommended_article,
        newest_article: data.newest_article,
        popular_article: data.popular_article,
      };

      sessionStorage.setItem("profile", JSON.stringify(data.profile));
      sessionStorage.setItem("article", JSON.stringify(initialData));

      setIsProfile(data.profile);
      setIsData(initialData);
      setIsloading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchPopularLesson = async () => {
    setIsLoadingPo(true);
    try {
      const res = await fetch(`api/article-list?popular=${popularRef.current}`);
      if (!res.ok) throw new Error("Failed Fetch Article-List");
      const data = await res.json();
      if (data.popular_article.length <= 0) return setIsEmptyPopular(true);
      popularRef.current += 1;
      setIsData((prev: any) => {
        const oldList: any[] = prev?.popular_article ?? [];
        const incoming: any[] = data.popular_article ?? [];
        const seen = new Set(oldList.map((l) => l.id));
        const fresh = incoming.filter((l) => !seen.has(l.id));
        return { ...prev, popular_article: [...oldList, ...fresh] };
      });
    } catch (error) {
      console.log(error || "FAILED TO FETCH POPULAR ARTICLE");
    } finally {
      setIsLoadingPo(false);
    }
  };

  const handleRouting = (id: number) => router.push(`/article/${id}`);

  const fetchNewestLesson = async () => {
    setIsLoadingNe(true);
    try {
      const res = await fetch(`api/article-list?newest=${newestRef.current}`);
      if (!res.ok) throw new Error("Failed Fetch Article-List");
      const data = await res.json();
      if (data.newest_article.length <= 0) return setIsEmptyNewest(true);
      newestRef.current += 1;
      setIsData((prev: any) => {
        const oldList: any[] = prev?.newest_article ?? [];
        const incoming: any[] = data.newest_article ?? [];
        const seen = new Set(oldList.map((l) => l.id));
        const fresh = incoming.filter((l) => !seen.has(l.id));
        return { ...prev, newest_article: [...oldList, ...fresh] };
      });
    } catch (error) {
      console.log(error || "FAILED TO FETCH NEWEST Article");
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
    if (!isData.popular_article || !isData.newest_article) return;
    sessionStorage.setItem(
      "article",
      JSON.stringify({
        recommended_article: isData.recommended_article,
        popular_article: isData.popular_article,
        newest_article: isData.newest_article,
        popularRef: popularRef.current,
        newestRef: newestRef.current,
      }),
    );
  }, [isData, popularRef, newestRef]);

  useEffect(() => {
    fetchArticle();
  }, []);

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

  const numberToDuration = (second: number) => {
    if (second % 60 == 0) {
      return second / 60 + " " + t("article.time");
    } else {
      return (
        Math.floor(second / 60) +
        " " +
        t("article.time") +
        " " +
        (second % 60) +
        " " +
        t("article.second")
      );
    }
  };

  const { t, isDictionary } = useDictionary();
  return (
    <div className="flex flex-col gap-12 items-center">
      <Header active={2} profileData={isProfile}></Header>
      {/* element */}
      <div className="flex flex-col gap-2">
        {/* top */}
        <div className="flex gap-2 items-start">
          {/* content 1 */}
          <div className="flex flex-col p-6 gap-12 flex-1">
            {/* text */}
            <div className="flex flex-col gap-3">
              <h1 className="text-5xl/c-120 tracking-min-4 font-medium text-text">
                {t("article.title")}
              </h1>
              <p className="font-normal text-[1.5rem]/[130%] text-gray tracking-min-2">
                {t("article.description1")}
              </p>
            </div>
            <div className="p-5 gap-3 flex-1 items-center bg-white rounded-2xl border border-[rgba(0,0,0,0.20)] flex">
              <Image
                src={"/Icon/Search.svg"}
                alt="search icon"
                width={24}
                height={24}
              />
              <input
                type="text"
                className="text-[1.125rem] font-regular text-text tracking-min-2 outline-none flex-1"
                placeholder={t("article.search")}
              ></input>
            </div>
          </div>
          {/* content 2 */}
          <GreenElement
            title={
              isDictionary === "Arab"
                ? isData.recommended_article?.[0]?.arab_title
                : isData.recommended_article?.[0]?.english_title
            }
            tag={t("article.recommended_article.title")}
            width={45.1875}
            button={t("article.recommended_article.button")}
            description={
              isDictionary === "Arab"
                ? isData.recommended_article?.[0]?.arab_description
                : isData.recommended_article?.[0]?.english_description
            }
            routing={`article/${isData.recommended_article?.[0]?.id}`}
            image={
              isData.recommended_article?.[0]?.image ||
              "/Placeholder/event_image.png"
            }
            imgWidth={21.25}
            style={{ flex: 1 }}
            isLoading={isLoading}
          />
        </div>
        {/* bottom */}
        <div className="flex gap-2">
          {/* newest article */}
          <ContentBox title={t("article.newest_article.title")}>
            <div
              ref={newestContainer}
              onScroll={handleScrollNewest}
              className="flex flex-col gap-4 min-w-[28rem]  w-full max-h-[28rem] overflow-y-auto px-3 py-2"
            >
              {isLoading
                ? Array.from({ length: 3 }).map((_, i) => (
                    <div
                      key={`skeleton-${i}`}
                      className="flex items-center gap-6 p-2 rounded-2xl animate-pulse w-full"
                    >
                      {/* Skeleton Image */}
                      <div className="rounded-2xl w-31 h-31 bg-gray-200 shrink-0" />

                      {/* Skeleton Information */}
                      <div className="flex flex-col gap-6 flex-1">
                        {/* Skeleton Title & Description */}
                        <div className="flex flex-col gap-3">
                          <div className="h-4 bg-gray-200 rounded-md w-3/4" />
                          <div className="h-3 bg-gray-200 rounded-md w-full" />
                          <div className="h-3 bg-gray-200 rounded-md w-2/3" />
                        </div>

                        {/* Skeleton Minor Info (Date & Duration) */}
                        <div className="flex gap-6">
                          <div className="h-3 bg-gray-200 rounded-md w-32" />
                          <div className="h-3 bg-gray-200 rounded-md w-26" />
                        </div>
                      </div>
                    </div>
                  ))
                : (isData.newest_article || []).map((val: any, i: any) => {
                    return (
                      <div
                        className="flex items-center gap-6 p-2 px-2 rounded-2xl hover:scale-102 hover:translate-y-[-1%] hover:bg-[rgba(0,0,0,0.1)] duration-200 cursor-pointer"
                        key={i}
                        onClick={() => handleRouting(val.id)}
                      >
                        {/* image */}
                        <div className="rounded-2xl w-31 h-31 relative overflow-hidden shrink-0">
                          <Image
                            src={val.image || "/Placeholder/event_image.png"}
                            alt="article_image"
                            fill
                            className="object-cover"
                          />
                        </div>
                        {/* article information */}
                        <div className="flex flex-col gap-6">
                          {/* title description */}
                          <div className="flex flex-col gap-3">
                            <h3 className="text-text text-[1rem] font-medium tracking-min-2 truncate w-75.5">
                              {isDictionary === "Arab"
                                ? val.arab_title
                                : val.english_title}
                            </h3>
                            <p className="text-gray text-[0.75rem] font-normal tracking-min-2 w-75.5 line-clamp-2">
                              {isDictionary === "Arab"
                                ? val.arab_description
                                : val.english_description}
                            </p>
                          </div>
                          {/* minor info */}
                          <div className="flex gap-6">
                            {/* date */}
                            <div className="flex gap-1 items-center">
                              <svg
                                width="14"
                                height="14"
                                viewBox="0 0 14 14"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M9.33333 1.16669V3.50002M4.66667 1.16669V3.50002M1.75 5.83335H12.25M2.91667 2.33335H11.0833C11.7277 2.33335 12.25 2.85569 12.25 3.50002V11.6667C12.25 12.311 11.7277 12.8334 11.0833 12.8334H2.91667C2.27233 12.8334 1.75 12.311 1.75 11.6667V3.50002C1.75 2.85569 2.27233 2.33335 2.91667 2.33335Z"
                                  stroke="#41403B"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                              <p className="text-gray text-[0.75rem] font-normal tracking-min-2">
                                {formatDate(val.created_at)}
                              </p>
                            </div>
                            {/* duration */}
                            <div className="flex gap-1 items-center">
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
                                    stroke="gray"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                </g>
                                <defs>
                                  <clipPath id="clip0_41_512">
                                    <rect width="16" height="16" fill="gray" />
                                  </clipPath>
                                </defs>
                              </svg>
                              <p className="text-gray text-[0.75rem] font-normal tracking-min-2">
                                {numberToDuration(val.duration)}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
              {isLoadingNe && (
                <div className="flex w-full items-center justify-center py-6">
                  <div className="w-8 h-8 border-4 border-primary border-t-dark-primary rounded-full animate-spin"></div>
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
          {/* popular article */}
          <ContentBox title={t("article.popular_article.title")}>
            <div
              ref={popularContainer}
              onScroll={handleScrollPopular}
              className="flex flex-col gap-4 min-w-[28rem] w-full max-h-[28rem] overflow-y-auto px-3 py-2"
            >
              {isLoading
                ? // Tampilkan Skeleton sebanyak 5 buah saat sedang loading
                  Array.from({ length: 4 }).map((_, i) => (
                    <div
                      key={`popular-skeleton-${i}`}
                      className="flex items-center gap-6 p-2 rounded-2xl animate-pulse"
                    >
                      {/* Skeleton Nomor Urut */}
                      <div className="w-6 h-6 rounded-lg bg-gray-200 shrink-0" />

                      {/* Skeleton Image */}
                      <div className="rounded-2xl w-21 h-21 bg-gray-200 shrink-0" />

                      {/* Skeleton Information */}
                      <div className="flex flex-col gap-3 flex-1">
                        {/* Skeleton Title */}
                        <div className="h-4 bg-gray-200 rounded-md w-3/4" />

                        {/* Skeleton Minor Info (Date & Duration) */}
                        <div className="flex gap-6">
                          <div className="h-3 bg-gray-200 rounded-md w-24" />
                          <div className="h-3 bg-gray-200 rounded-md w-16" />
                        </div>
                      </div>
                    </div>
                  ))
                : // Tampilkan data asli jika isLoading false
                  (isData.popular_article || []).map((val: any, i: number) => {
                    return (
                      <div
                        className="flex items-center gap-6 p-2 rounded-2xl hover:scale-102 hover:translate-y-[-1%] hover:bg-[rgba(0,0,0,0.1)] duration-200 cursor-pointer"
                        key={i}
                        onClick={() => handleRouting(val.id)}
                      >
                        <div
                          className="w-6 h-6 rounded-lg flex items-center justify-center
                          text-[0.75rem] text-white tracking-min-2 font-normal text-center select-none shrink-0"
                          style={{
                            color: i > 2 ? "var(--text) !important" : "",
                            background:
                              i == 0
                                ? "var(--primary)"
                                : i == 1
                                  ? "color-mix(in srgb, var(--primary) 80%, transparent)"
                                  : i == 2
                                    ? "color-mix(in srgb, var(--primary) 60%, transparent)"
                                    : "var(--Cloud, #DAE0DA)",
                          }}
                        >
                          {i + 1}
                        </div>
                        {/* image */}
                        <div className="rounded-2xl w-21 h-21 relative overflow-hidden shrink-0">
                          <Image
                            src={val.image || "/Placeholder/event_image.png"}
                            alt="article_image"
                            fill
                            className="object-cover"
                          />
                        </div>
                        {/* article information */}
                        <div className="flex flex-col gap-2">
                          {/* title */}
                          <h3 className="text-text text-[1rem] font-medium tracking-min-2 truncate w-75.5">
                            {isDictionary === "Arab"
                              ? val.arab_title
                              : val.english_title}
                          </h3>
                          {/* minor info */}
                          <div className="flex gap-6">
                            {/* date */}
                            <div className="flex gap-1 items-center">
                              <svg
                                width="14"
                                height="14"
                                viewBox="0 0 14 14"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M9.33333 1.16669V3.50002M4.66667 1.16669V3.50002M1.75 5.83335H12.25M2.91667 2.33335H11.0833C11.7277 2.33335 12.25 2.85569 12.25 3.50002V11.6667C12.25 12.311 11.7277 12.8334 11.0833 12.8334H2.91667C2.27233 12.8334 1.75 12.311 1.75 11.6667V3.50002C1.75 2.85569 2.27233 2.33335 2.91667 2.33335Z"
                                  stroke="#41403B"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                              <p className="text-gray text-[0.75rem] font-normal tracking-min-2">
                                {formatDate(val.created_at)}
                              </p>
                            </div>
                            {/* duration */}
                            <div className="flex gap-1 items-center">
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
                                    stroke="gray"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                </g>
                                <defs>
                                  <clipPath id="clip0_41_512">
                                    <rect width="16" height="16" fill="gray" />
                                  </clipPath>
                                </defs>
                              </svg>
                              <p className="text-gray text-[0.75rem] font-normal tracking-min-2">
                                {numberToDuration(val.duration)}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
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
          {/* CTA & newsletter */}
          <div className="flex-1 flex flex-col gap-2">
            {/* send article */}
            <div className="flex flex-col gap-6 p-6 rounded-3xl bg-primary/10 flex-1">
              <h2 className="text-[1.4375rem]/[140%] text-secondary font-medium tracking-min-2">
                {t("article.newsletter.card1.title")}
              </h2>
              <p className="text-[1rem]/[140%] tracking-min-2 text-secondary font-normal">
                {t("article.newsletter.card1.description")}
              </p>
              <button
                className="font-medium text-[1rem] text-white flex gap-2.5
              p-[0.75rem_1rem] rounded-xl bg-primary self-start items-center cursor-pointer hover:brightness-75 duration-300"
              >
                {t("article.newsletter.card1.button")}
                <svg
                  width="12"
                  height="8"
                  viewBox="0 0 12 8"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M0.5 3.18198C0.223858 3.18198 0 3.40583 0 3.68198C0 3.95812 0.223858 4.18198 0.5 4.18198V3.68198V3.18198ZM11.8536 4.03553C12.0488 3.84027 12.0488 3.52369 11.8536 3.32842L8.67157 0.146442C8.47631 -0.0488198 8.15973 -0.0488198 7.96447 0.146442C7.7692 0.341705 7.7692 0.658287 7.96447 0.853549L10.7929 3.68198L7.96447 6.5104C7.7692 6.70567 7.7692 7.02225 7.96447 7.21751C8.15973 7.41277 8.47631 7.41277 8.67157 7.21751L11.8536 4.03553ZM0.5 3.68198V4.18198H11.5V3.68198V3.18198H0.5V3.68198Z"
                    fill="white"
                  />
                </svg>
              </button>
            </div>
            {/* newsletter */}
            <div className="flex flex-col p-6 bg-white gap-6 flex-1 rounded-3xl">
              <h2 className="text-[1.4375rem]/[140%] text-secondary font-medium tracking-min-2">
                {t("article.newsletter.card2.title")}
              </h2>
              <p className="text-[1rem]/[140%] tracking-min-2 text-secondary font-normal">
                {t("article.newsletter.card2.description")}
              </p>
              {/* send */}
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder={t("article.newsletter.card2.input")}
                  className="flex-1 p-3 border border-[rgba(0,0,0,0.20)] font-medium tracking-min-2 text-text text-[0.75rem] rounded-lg"
                ></input>
                <button className="bg-primary rounded-lg w-10.25 h-10.25 flex items-center justify-center">
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 18 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M16.5 1.5L8.25 9.75M8.25 9.75L1.5 6.75L16.5 1.5L11.25 16.5L8.25 9.75Z"
                      stroke="white"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* navbar left */}
      <LeftNavbar state={2} />
    </div>
  );
};

export default page;
