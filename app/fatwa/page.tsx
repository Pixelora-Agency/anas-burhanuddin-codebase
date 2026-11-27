"use client";
import { useDictionary } from "@/provider/useDictionary";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import ContentBox from "../Component/ContentBox";
import GreenElement from "../Component/GreenElement";
import Header from "../Component/Header";
import LeftNavbar from "../Component/LeftNavbar";

const dataFetch = {
  profile: {
    name: "Muhammad Rizki",
    status: "Ustad",
    photo: "/Placeholder/profile_image.jpeg",
  },
  recommended_fatwa: {
    id: 1,
    translation: {
      English: {
        title: "Ruling on Sleeping After Fajr Prayer",
        description:
          "Explains the ruling on sleeping after the Fajr (dawn) prayer and the recommended etiquettes and practices for the morning.",
      },
      Arab: {
        title: "حكم النوم بعد صلاة الفجر",
        description:
          "يشرح حكم النوم بعد صلاة الفجر والآداب المستحبة في وقت الصباح",
      },
    },
    image: "/Placeholder/event_image.png",
  },
  newest_fatwa: [
    {
      id: 1,
      translation: {
        English: {
          title: "The Beauty of Forgiveness in Islam",
          date: "14 May 2024",
        },
        Arab: {
          title: "جمال العفو في الإسلام",
          date: "14 مايو 2024",
        },
      },
      questioner: "Ust. Abdul Salam",
      image: "/Placeholder/event_image.png",
      read_time: 180,
    },
    {
      id: 2,
      translation: {
        English: {
          title: "The Beauty of Forgiveness in Islam",
          date: "14 May 2024",
        },
        Arab: {
          title: "جمال العفو في الإسلام",
          date: "14 مايو 2024",
        },
      },
      questioner: "Ust. Abdul Salam",
      image: "/Placeholder/event_image.png",
      read_time: 190,
    },
    {
      id: 3,
      translation: {
        English: {
          title: "The Beauty of Forgiveness in Islam",
          date: "14 May 2024",
        },
        Arab: {
          title: "جمال العفو في الإسلام",
          date: "14 مايو 2024",
        },
      },
      questioner: "Ust. Abdul Salam",
      image: "/Placeholder/event_image.png",
      read_time: 742,
    },
    {
      id: 4,
      translation: {
        English: {
          title: "The Beauty of Forgiveness in Islam",
          date: "14 May 2024",
        },
        Arab: {
          title: "جمال العفو في الإسلام",
          date: "14 مايو 2024",
        },
      },
      questioner: "Ust. Abdul Salam",
      image: "/Placeholder/event_image.png",
      read_time: 190,
    },
    {
      id: 5,
      translation: {
        English: {
          title: "The Beauty of Forgiveness in Islam",
          date: "14 May 2024",
        },
        Arab: {
          title: "جمال العفو في الإسلام",
          date: "14 مايو 2024",
        },
      },
      questioner: "Ust. Abdul Salam",
      image: "/Placeholder/event_image.png",
      read_time: 742,
    },
  ],
};

const page = () => {
  const { t, isDictionary } = useDictionary();
  const hasData = sessionStorage.getItem("fatwa");
  const hasProfile = sessionStorage.getItem("profile");
  const [isData, setIsData] = useState<any>({});
  const [isProfile, setIsProfile] = useState<any>({});
  const [isEmptyNewest, setIsEmptyNewest] = useState<boolean>(false);
  const [isLoading, setIsloading] = useState<boolean>(true);
  const [isLoadingNe, setIsLoadingNe] = useState<boolean>(false);

  const newestContainer = useRef<HTMLDivElement>(null);
  const newestRef = useRef(0);
  const fetchedRef = useRef(false);

  const fetchFatwa = async () => {
    if (hasData && hasData !== "undefined" && hasData !== "null") {
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

        newestRef.current = parsed.newestRef ?? 0;

        setIsEmptyNewest(false);
        setIsloading(false);
        return;
      } catch (e) {
        console.log("Error parsing session storage", e);
      }
    }

    try {
      const res = await fetch("api/fatwa-list");
      if (!res.ok) {
        setIsEmptyNewest(true);
        setIsloading(false);
        throw new Error("Failed Fetch fatwa-list");
      }
      const data = await res.json();
      newestRef.current = 1;

      const initialData = {
        newest_fatwa: data.newest_fatwa,
        popular_fatwa: data.popular_fatwa,
        newestRef: newestRef.current,
      };

      sessionStorage.setItem("profile", JSON.stringify(data.profile));
      sessionStorage.setItem("fatwa", JSON.stringify(initialData));

      setIsProfile(data.profile);
      setIsData(initialData);
      setIsloading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchNewestFatwa = async () => {
    setIsLoadingNe(true);
    try {
      const res = await fetch(`api/fatwa-list?newest=${newestRef.current}`);
      if (!res.ok) throw new Error("Failed Fetch fatwa-List");
      const data = await res.json();
      if (data.newest_fatwa.length <= 0) return setIsEmptyNewest(true);
      newestRef.current += 1;
      setIsData((prev: any) => {
        const oldList: any[] = prev?.newest_fatwa ?? [];
        const incoming: any[] = data.newest_fatwa ?? [];
        const seen = new Set(oldList.map((l) => l.id));
        const fresh = incoming.filter((l) => !seen.has(l.id));
        return { ...prev, newest_fatwa: [...oldList, ...fresh] };
      });
    } catch (error) {
      console.log(error || "FAILED TO FETCH NEWEST Article");
    } finally {
      setIsLoadingNe(false);
    }
  };

  const handleScrollNewest = () => {
    if (!newestContainer.current) return;
    if (isEmptyNewest) return;

    const { scrollTop, scrollHeight, clientHeight } = newestContainer.current;
    const isAtBottom = scrollTop + clientHeight >= scrollHeight - 10;
    if (isAtBottom && !isLoadingNe && !isEmptyNewest) {
      setIsLoadingNe(true);
      fetchNewestFatwa();
    }
  };

  useEffect(() => {
    if (!isData.popular_fatwa || !isData.newest_fatwa) return;
    sessionStorage.setItem(
      "fatwa",
      JSON.stringify({
        newest_fatwa: isData.newest_fatwa,
        popular_fatwa: isData.popular_fatwa,
        newestRef: newestRef.current,
      }),
    );
  }, [isData, newestRef]);

  useEffect(() => {
    if (!fetchedRef) return;
    fetchedRef.current = true;
    fetchFatwa();
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
      return second / 60 + "" + t("fatwa.time");
    } else {
      return (
        Math.floor(second / 60) +
        " " +
        t("fatwa.time") +
        " " +
        (second % 60) +
        " " +
        t("fatwa.second")
      );
    }
  };
  return (
    <div className="flex flex-col gap-12 items-center">
      <Header active={4} profileData={isProfile}></Header>
      {/* element */}
      <div className="flex gap-2 max-w-[90lvw]">
        {/* left */}
        <div className="flex flex-col gap-2 flex-1 min-w-0">
          {/* content 1 */}
          <div className="flex flex-col p-6 gap-12">
            {/* text */}
            <div className="flex flex-col gap-3">
              <h1 className="text-5xl/c-120 tracking-min-4 font-medium text-text w-118.25">
                {t("fatwa.title")}
              </h1>
              <p className="font-normal text-[1.5rem]/[130%] text-gray tracking-min-2 w-118.25 max-w-full">
                {t("fatwa.description1")}
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
                placeholder={t("fatwa.search")}
              ></input>
            </div>
          </div>
          {/* newest fatwa */}
          <ContentBox title={t("fatwa.newest_fatwa.title")} style={{ flex: 1 }}>
            <div
              ref={newestContainer}
              onScroll={handleScrollNewest}
              className="flex flex-col gap-4 md:max-h-[28rem] overflow-x-hidden px-2 w-full min-w-0 overflow-y-auto"
            >
              {isLoading
                ? // Skeleton Loading State untuk Newest Fatwa
                  Array.from({ length: 4 }).map((_, i) => (
                    <div
                      key={`fatwa-skeleton-${i}`}
                      className="flex gap-8 items-center p-2 rounded-2xl animate-pulse w-full"
                    >
                      {/* Skeleton Image */}
                      <div className="w-38 h-21.25 rounded-2xl bg-gray-200 shrink-0" />

                      {/* Skeleton Info */}
                      <div className="flex flex-col gap-3 flex-1 min-w-0 pr-4">
                        {/* Skeleton Title */}
                        <div className="h-4 bg-gray-200 rounded-md w-1/2" />

                        {/* Skeleton Minor Info */}
                        <div className="flex gap-20">
                          <div className="h-3 bg-gray-200 rounded-md w-28" />
                          <div className="h-3 bg-gray-200 rounded-md w-24" />
                          <div className="h-3 bg-gray-200 rounded-md w-16" />
                        </div>
                      </div>
                    </div>
                  ))
                : // Actual Data Mapping State
                  (isData.newest_fatwa || []).map((val: any, i: number) => {
                    return (
                      <div
                        className="flex flex-col md:flex-row gap-6 items-center p-2 w-full min-w-0 cursor-pointer rounded-2xl hover:scale-102 hover:translate-y-[-1%] hover:bg-[rgba(0,0,0,0.1)] duration-200"
                        key={i}
                      >
                        {/* image */}
                        <div className="w-38 h-21.25 rounded-2xl relative overflow-hidden shrink-0">
                          <Image
                            src={val.image || "/Placeholder/event_image.png"}
                            fill
                            alt="Fatwa Image"
                            className="object-cover"
                          />
                        </div>
                        {/* info */}
                        <div className="flex flex-col gap-3 flex-1 min-w-0 pr-4">
                          {/* title description */}
                          <h3 className="text-text text-[1rem] font-medium tracking-min-2 truncate">
                            {isDictionary === "English"
                              ? val.english_title
                              : val.arab_title}
                          </h3>
                          {/* minor info */}
                          <div className="flex gap-6 min-w-0">
                            <p className="text-gray text-[0.75rem] font-normal tracking-min-2 flex-1 min-w-0 truncate">
                              {val.questioner}
                            </p>

                            {/* date */}
                            <div className="flex gap-1 items-center shrink-0">
                              {/* svg tanggal tetap, tambah className="shrink-0" */}
                              <p className="text-gray text-[0.75rem] font-normal tracking-min-2 whitespace-nowrap">
                                {formatDate(val.created_at)}
                              </p>
                            </div>

                            <div className="flex gap-1 items-center shrink-0">
                              <svg
                                width="16"
                                height="16"
                                viewBox="0 0 16 16"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                className="shrink-0"
                              >
                                <path
                                  d="M7.99998 3.99999V7.99999L10.6666 9.33333M14.6666 7.99999C14.6666 11.6819 11.6819 14.6667 7.99998 14.6667C4.31808 14.6667 1.33331 11.6819 1.33331 7.99999C1.33331 4.3181 4.31808 1.33333 7.99998 1.33333C11.6819 1.33333 14.6666 4.3181 14.6666 7.99999Z"
                                  stroke="gray"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                              <p className="text-gray text-[0.75rem] font-normal tracking-min-2 whitespace-nowrap">
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
                  <div className="w-8 h-8 border-4 border-primary border-t-primary rounded-full animate-spin"></div>
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
        {/* right */}
        <div className="flex flex-col gap-2 shrink-0 w-132.75">
          {/* content 1 */}
          <GreenElement
            title={
              isDictionary === "Arab"
                ? isData.popular_fatwa?.[0]?.arab_title
                : isData.popular_fatwa?.[0]?.english_title
            }
            image={
              isData.popular_fatwa?.[0]?.image || "/Placeholder/event_image.png"
            }
            button={t("fatwa.popular.button")}
            description={
              isDictionary === "Arab"
                ? isData.popular_fatwa?.[0]?.arab_desc
                : isData.popular_fatwa?.[0]?.english_desc
            }
            width={33.1875}
            imgWidth={14}
            tag={t("fatwa.popular.tag")}
            className="min-h-[21rem]"
            isLoading={isLoading}
          />
          {/* content 2 */}
          <div className="flex gap-6 p-[1.5rem_2.5rem_1.5rem_1.5rem] rounded-3xl h-full bg-primary/10">
            {/* text */}
            <div className="flex flex-col gap-6 flex-1 min-w-0">
              <h2 className="text-[1.4375rem]/[140%] text-secondary font-medium tracking-min-2">
                {t("fatwa.send_lectures.title")}
              </h2>
              <p className="text-[1rem]/[140%] tracking-min-2 text-secondary font-normal">
                {t("fatwa.send_lectures.description")}
              </p>
              <button
                className="font-medium text-[1rem] text-white flex gap-2.5
              p-[0.75rem_1rem] rounded-xl bg-primary self-start items-center cursor-pointer hover:brightness-75 duration-300"
              >
                {t("fatwa.send_lectures.button")}
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
            {/* image */}
            <div className="w-42.5 h-55.25 relative flex-none">
              <Image
                src={"/Image/FAQ.png"}
                blurDataURL={"/Image/FAQ.png"}
                alt="FAQ Illustration"
                fill
              />
            </div>
          </div>
          {/* content 3 */}
        </div>
      </div>
      {/* navbar left */}
      <LeftNavbar state={4} />
    </div>
  );
};

export default page;
