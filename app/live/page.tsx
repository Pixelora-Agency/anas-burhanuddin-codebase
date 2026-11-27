"use client";

import { useDictionary } from "@/provider/useDictionary";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import ContentBox from "../Component/ContentBox";
import Header from "../Component/Header";
import LeftNavbar from "../Component/LeftNavbar";

const dataFetch = {
  profile: {
    name: "Muhammad Rizki",
    status: "Ustad",
    photo: "/Placeholder/profile_image.jpeg",
  },
  today_display_live: [
    {
      id: 1,
      translation: {
        English: {
          title: "Definition of Taqwa",
        },
        Arab: {
          title: "تعريف التقوى",
        },
      },
      image: "/Placeholder/event_image.png",
      link: "https://youtube.com",
      status: 1,
      created_at: "2026-09-04T10:00:00.000Z",
    },
    {
      id: 2,
      translation: {
        English: {
          title: "Definition of Taqwa",
        },
        Arab: {
          title: "تعريف التقوى",
        },
      },
      image: "/Placeholder/event_image.png",
      link: "https://youtube.com",
      status: 1,
      created_at: "2026-09-04T10:00:00.000Z",
    },
    {
      id: 3,
      translation: {
        English: {
          title: "Definition of Taqwa",
        },
        Arab: {
          title: "تعريف التقوى",
        },
      },
      image: "/Placeholder/event_image.png",
      link: "https://youtube.com",
      status: 0,
      created_at: "2026-09-04T10:00:00.000Z",
    },
    {
      id: 4,
      translation: {
        English: {
          title: "Definition of Taqwa",
        },
        Arab: {
          title: "تعريف التقوى",
        },
      },
      image: "/Placeholder/event_image.png",
      link: "https://youtube.com",
      status: 2,
      created_at: "2026-09-04T10:00:00.000Z",
    },
    {
      id: 5,
      translation: {
        English: {
          title: "Definition of Taqwa",
        },
        Arab: {
          title: "تعريف التقوى",
        },
      },
      image: "/Placeholder/event_image.png",
      link: "https://youtube.com",
      status: 0,
      created_at: "2026-09-04T10:00:00.000Z",
    },
    {
      id: 6,
      translation: {
        English: {
          title: "Definition of Taqwa",
        },
        Arab: {
          title: "تعريف التقوى",
        },
      },
      image: "/Placeholder/event_image.png",
      link: "https://youtube.com",
      status: 1,
      created_at: "2026-09-04T10:00:00.000Z",
    },
    {
      id: 7,
      translation: {
        English: {
          title: "Definition of Taqwa",
        },
        Arab: {
          title: "تعريف التقوى",
        },
      },
      image: "/Placeholder/event_image.png",
      link: "https://youtube.com",
      status: 1,
      created_at: "2026-09-05T10:00:00.000Z",
    },
    {
      id: 8,
      translation: {
        English: {
          title: "Definition of Taqwa",
        },
        Arab: {
          title: "تعريف التقوى",
        },
      },
      image: "/Placeholder/event_image.png",
      link: "https://youtube.com",
      status: 0,
      created_at: "2026-09-06T10:00:00.000Z",
    },
    {
      id: 9,
      translation: {
        English: {
          title: "Definition of Taqwa",
        },
        Arab: {
          title: "تعريف التقوى",
        },
      },
      image: "/Placeholder/event_image.png",
      link: "https://youtube.com",
      status: 2,
      created_at: "2026-09-04T10:00:00.000Z",
    },
    {
      id: 10,
      translation: {
        English: {
          title: "Definition of Taqwa",
        },
        Arab: {
          title: "تعريف التقوى",
        },
      },
      image: "/Placeholder/event_image.png",
      link: "https://youtube.com",
      status: 0,
      created_at: "2026-09-04T10:00:00.000Z",
    },
  ],
  sound_live: [
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
      image: "/Placeholder/profile_image.jpeg",
      link: "https://mixlr.com/",
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
      image: "/Placeholder/profile_image.jpeg",
      link: "https://mixlr.com/",
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
      image: "/Placeholder/profile_image.jpeg",
      link: "https://mixlr.com/",
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
      image: "/Placeholder/profile_image.jpeg",
      link: "https://mixlr.com/",
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
      image: "/Placeholder/profile_image.jpeg",
      link: "https://mixlr.com/",
    },
    {
      id: 6,
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
      image: "/Placeholder/profile_image.jpeg",
      link: "https://mixlr.com/",
    },
    {
      id: 7,
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
      image: "/Placeholder/profile_image.jpeg",
      link: "https://mixlr.com/",
    },
    {
      id: 8,
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
      image: "/Placeholder/profile_image.jpeg",
      link: "https://mixlr.com/",
    },
    {
      id: 9,
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
      image: "/Placeholder/profile_image.jpeg",
      link: "https://mixlr.com/",
    },
    {
      id: 10,
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
      image: "/Placeholder/profile_image.jpeg",
      link: "https://mixlr.com/",
    },
    {
      id: 11,
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
      image: "/Placeholder/profile_image.jpeg",
      link: "https://mixlr.com/",
    },
  ],
};

interface allLiveSchema {
  image: string;
  status: 0 | 1 | 2;
  link: string;
}

const page = () => {
  const now = new Date();
  const todayString = now.toISOString().split("T")[0];
  const [live, setLive] = useState<number>(0);
  const [isThisLive, setIsThisLive] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isLoadingSo, setIsLoadingSo] = useState<boolean>(false);
  const [isLoadingAllLive, setIsLoadingAllLive] = useState<boolean>(false);
  const [isEmptySound, setIsEmptySound] = useState<boolean>(false);
  const [isEmptyAllLive, setIsEmptyAllLive] = useState<boolean>(false);
  const [isOver, setIsOver] = useState<boolean>(false);
  const [isPageLiveToday, setIsPageLiveToday] = useState<number>(1);
  const [isData, setIsData] = useState<any>({});
  const [isProfile, setIsProfile] = useState<any>({});
  const soundRef = useRef<number>(0);
  const videoRef = useRef<number>(0);
  const soundContainer = useRef<HTMLDivElement>(null);
  const videoContainer = useRef<HTMLDivElement>(null);

  const hasFetched = useRef(false);
  const containerIsThisLiveRef = useRef<HTMLDivElement>(null);

  const { t, isDictionary } = useDictionary();
  const fetchRef = useRef(false);

  const todayLive = (isData.display_live || []).filter((item: any) => {
    const itemDateString = item.date.split("T")[0];
    return itemDateString === todayString;
  });

  const validTodayLive = (isData.display_live || []).filter((item: any) => {
    const itemDateString = item.date.split("T")[0];
    const isToday = itemDateString === todayString;
    const isNotComingSoon = item.status !== "ComingSoon";

    return isToday && isNotComingSoon;
  });

  const [isMain, setIsMain] = useState<any>(null);

  useEffect(() => {
    if (validTodayLive.length > 0) {
      const randomLive =
        validTodayLive[Math.floor(Math.random() * validTodayLive.length)];
      setIsMain(randomLive);
    } else {
      setIsMain(null);
    }
  }, [isData]);

  const fetchLive = async () => {
    const hasData = sessionStorage.getItem("live");
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
        setIsEmptySound(false);
        setIsEmptyAllLive(false);
        setIsLoading(false);
        return;
      } catch (e) {
        setIsLoading(false);
        console.log("Error parsing session storage", e);
      }
    }

    try {
      const res = await fetch(
        `/api/live-stream?pagination-vid=${videoRef.current}&pagination-sound=${soundRef.current}`,
      );
      if (!res.ok) {
        setIsLoading(false);
        throw new Error("Failed Fetch lesson-list");
      }
      const data = await res.json();
      videoRef.current = 1;
      soundRef.current = 1;
      const initialData = {
        sound_live: data.sound_live,
        display_live: data.display_live,
        videoRef: videoRef.current,
        soundRef: soundRef.current,
      };

      sessionStorage.setItem("profile", JSON.stringify(data.profile));
      sessionStorage.setItem("livestream", JSON.stringify(initialData));

      setIsProfile(data.profile);
      setIsData(initialData);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (fetchRef.current) return;
    fetchRef.current = true;
    fetchLive();
  }, []);

  useEffect(() => {
    if (!isData.sound_live || !isData.display_live) return;
    sessionStorage.setItem(
      "livestream",
      JSON.stringify({
        sound_live: isData.sound_live,
        display_live: isData.display_live,
        videoRef: videoRef.current,
        soundRef: soundRef.current,
      }),
    );
  }, [isData, videoRef, soundRef]);

  const fetchSoundStream = async () => {
    setIsLoadingSo(true);
    try {
      const res = await fetch(
        `/api/live-stream?pagination-sound=${soundRef.current}`,
      );
      if (!res.ok) throw new Error("Failed Fetch Sound-Stream");
      const data = await res.json();
      if (data.sound_live === null) return setIsEmptySound(true);
      soundRef.current += 1;
      setIsData((prev: any) => {
        const oldList: any[] = prev?.sound_live ?? [];
        const incoming: any[] = data.sound_live ?? [];
        const seen = new Set(oldList.map((l) => l.id));
        const fresh = incoming.filter((l) => !seen.has(l.id));
        return { ...prev, sound_live: [...oldList, ...fresh] };
      });
    } catch (error) {
      console.log(error || "FAILED TO FETCH Sound Live");
    } finally {
      setIsLoadingSo(false);
    }
  };

  const fetchVideoStream = async () => {
    setIsLoadingAllLive(true);
    try {
      const res = await fetch(
        `/api/live-stream?pagination-vid=${videoRef.current}`,
      );
      if (!res.ok) throw new Error("Failed Fetch Video-Stream");
      const data = await res.json();
      if (data.display_live.length <= 0) return setIsEmptyAllLive(true);
      videoRef.current += 1;
      setIsData((prev: any) => {
        const oldList: any[] = prev?.display_live ?? [];
        const incoming: any[] = data.display_live ?? [];
        const seen = new Set(oldList.map((l) => l.id));
        const fresh = incoming.filter((l) => !seen.has(l.id));
        return { ...prev, display_live: [...oldList, ...fresh] };
      });
    } catch (error) {
      console.log(error || "FAILED TO FETCH Display Live");
    } finally {
      setIsLoadingAllLive(false);
    }
  };

  const handleScrollSound = () => {
    if (!soundContainer.current) return;
    if (isEmptySound) return;

    const { scrollTop, scrollHeight, clientHeight } = soundContainer.current;
    const isAtBottom = scrollTop + clientHeight >= scrollHeight - 1;
    if (isAtBottom && !isLoadingSo && !isEmptySound) {
      fetchSoundStream();
    }
  };

  const handleScrollVideo = () => {
    if (!videoContainer.current) return;
    if (isEmptyAllLive) return;

    const { scrollTop, scrollHeight, clientHeight } = videoContainer.current;
    const isAtBottom = scrollTop + clientHeight >= scrollHeight - 1;
    if (isAtBottom && !isLoadingAllLive && !isEmptyAllLive) {
      fetchVideoStream();
    }
  };

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
        t("live.time") +
        " " +
        (second % 60) +
        " " +
        t("live.second")
      );
    }
  };

  return (
    <div className="flex flex-col gap-12 items-center">
      <Header active={6} profileData={isProfile}></Header>
      {/* element */}
      <div className="flex flex-col gap-2 max-w-[90lvw] w-7xl">
        {/* top */}
        <div className="flex gap-2 h-[33.98438rem]">
          {/* left */}
          <div className="flex flex-col gap-12 items-start">
            {/* text */}
            <div className="flex flex-col gap-3">
              <h1 className="text-5xl/c-120 tracking-min-4 font-medium text-text">
                {t("live.title")}
              </h1>
              <p className="font-normal text-[1.5rem]/[130%] text-gray tracking-min-2 max-w-full">
                {t("live.description")}
              </p>
            </div>
            {/* video */}
            {isLoading ? (
              /* Tampilan Skeleton saat data masih dimuat */
              <div className="h-98.5 aspect-video p-4.5 rounded-2xl relative overflow-hidden bg-gray-200 dark:bg-zinc-800 animate-pulse flex items-center justify-center">
                <div className="w-full h-full bg-gray-300 dark:bg-zinc-700/50 rounded-2xl" />
              </div>
            ) : !isMain ? (
              /* Tampilan jika data mainLive null / kosong / tidak ada jadwal hari ini */
              <div className="h-98.5 aspect-video p-4.5 rounded-2xl relative overflow-hidden flex items-center justify-center border border-dashed border-gray-300 dark:border-zinc-700 bg-gray-50 dark:bg-zinc-900/50">
                <div className="text-center z-1">
                  <h4 className="text-[1.5rem] tracking-min-2 font-medium text-gray-500 dark:text-gray-400 select-none">
                    No Stream today
                  </h4>
                </div>
              </div>
            ) : (
              /* Tampilan normal saat data mainLive tersedia */
              <div
                className="h-98.5 aspect-video p-4.5 rounded-2xl relative overflow-hidden flex items-start cursor-pointer"
                onClick={() => {
                  if (isMain?.link) {
                    window.location.href = isMain.link;
                  }
                }}
              >
                <Image
                  src={isMain?.image || "/Placeholder/event_image.png"}
                  blurDataURL={isMain?.image || "/Placeholder/event_image.png"}
                  alt="live_image"
                  fill
                  placeholder="blur"
                  className="object-cover"
                />
                <div className="bg-[rgba(0,0,0,0.4)] absolute w-full h-full top-0 left-0"></div>
                <div
                  className="p-[0.5rem_1rem] rounded-2xl relative z-1"
                  style={{
                    background:
                      isMain?.status?.toLowerCase() === "live"
                        ? "#ED1D1D"
                        : isMain?.status?.toLowerCase() === "ended"
                          ? "rgba(0,0,0,0.1)"
                          : "black",
                    color:
                      isMain?.status?.toLowerCase() === "ended"
                        ? "var(--text)"
                        : "white",
                  }}
                >
                  <h4 className="text-[1.5rem] tracking-min-2 font-medium select-none">
                    {isMain?.status}
                  </h4>
                </div>
              </div>
            )}
          </div>
          {/* right */}
          <ContentBox
            title={t("live.today_live.title")}
            style={{ flex: 1, minWidth: 0, minHeight: 0 }}
          >
            <div className="flex flex-col gap-2 flex-1 min-h-0 overflow-y-auto">
              {isLoading ? (
                <div className="flex flex-col gap-3">
                  {[1, 2, 3, 4, 5, 6, 7].map((_, i) => (
                    <div
                      key={i}
                      className="flex gap-6 rounded-xl p-[0.75rem_0.75rem_0.75rem_1.5rem] items-center bg-transparent"
                    >
                      {/* Skeleton nomor */}
                      <div className="w-8 h-4 bg-gray-200 dark:bg-zinc-700/50 rounded animate-pulse"></div>

                      {/* Skeleton judul */}
                      <div className="flex gap-2 flex-1 min-w-0 items-center">
                        <div className="w-3 h-3 bg-gray-200 dark:bg-zinc-700/50 rounded-full animate-pulse"></div>
                        <div className="w-3/4 h-4 bg-gray-200 dark:bg-zinc-700/50 rounded animate-pulse"></div>
                      </div>

                      {/* Skeleton status badge */}
                      <div className="w-20 h-6 bg-gray-200 dark:bg-zinc-700/50 rounded-full animate-pulse"></div>
                    </div>
                  ))}
                </div>
              ) : todayLive.length === 0 ? (
                /* Tampilan jika data todayLive kosong / tidak ada jadwal hari ini */
                <div className="flex flex-col items-center justify-center p-8 text-center">
                  <h5 className="font-medium text-gray-500 dark:text-gray-400 text-[1rem] tracking-min-2 select-none">
                    {isDictionary === "Arab" ? "لا توجد بثوث" : "No Stream"}
                  </h5>
                </div>
              ) : (
                /* Tampilan normal saat data sudah ada */
                (todayLive || []).map((val: any, i: number) => {
                  return (
                    <div
                      className="flex gap-6 rounded-xl p-[0.75rem_0.75rem_0.75rem_1.5rem] items-center"
                      style={{
                        background:
                          val.id == isMain?.id ? "var(--dark-green)" : "white",
                        color: val.id == isMain?.id ? "white" : "var(--text)",
                        cursor: val.id != isMain?.id ? "pointer" : "",
                        fontSize: "1rem",
                        letterSpacing: "-2%",
                      }}
                      key={i}
                      onClick={() => setIsMain(val)}
                    >
                      {/* number */}
                      <p className="w-8 font-normal">{i + 1}</p>
                      {/* title */}
                      <div className="flex gap-2 flex-1 min-w-0 items-center">
                        <div>
                          <svg
                            width="8"
                            height="9"
                            viewBox="0 0 8 9"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M7.5 4.33012L0 8.66025L0 -3.33786e-06L7.5 4.33012Z"
                              fill="currentColor"
                            />
                          </svg>
                        </div>
                        <p className="truncate">
                          {isDictionary === "Arab"
                            ? val?.arab_title
                            : val?.english_title}
                        </p>
                      </div>
                      {/* status */}
                      <div
                        className="flex px-4 py-2 rounded-full items-center gap-1"
                        style={{
                          background:
                            val?.status.toLowerCase() == "ended"
                              ? "black"
                              : val?.status.toLowerCase() == "live"
                                ? "#ED1D1D"
                                : "rgba(0,0,0,0.1)",
                          color:
                            val?.status.toLowerCase() === "live" ||
                            val?.status.toLowerCase() === "ended"
                              ? "white"
                              : "var(--text)",
                        }}
                      >
                        {val?.status.toLowerCase() === "live" && (
                          <div className="bg-white w-1 h-1 rounded-full"></div>
                        )}
                        <h5 className="font-semibold tracking-min-2 text-[0.75rem]">
                          {val.status}
                        </h5>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </ContentBox>
        </div>
        {/* bottom */}
        <div className="flex gap-2">
          {/* left */}
          <ContentBox
            title={t("live.sound_live.title")}
            style={{ height: "28.875rem" }}
          >
            <div
              ref={soundContainer}
              onScroll={handleScrollSound}
              className="flex flex-col gap-6 overflow-y-auto relative md:min-w-[29rem]"
            >
              {isLoading ? (
                /* Tampilan Skeleton Loading untuk Sound */
                <div className="flex flex-col gap-4">
                  {[1, 2, 3].map((_, i) => (
                    <div
                      key={i}
                      className="flex gap-6 items-center pl-5 animate-pulse bg-transparent"
                    >
                      {/* Skeleton Image (Menyesuaikan w-13.5 h-13.5 dan rounded-full) */}
                      <div className="w-13.5 h-13.5 rounded-full bg-gray-200 dark:bg-zinc-700/50 shrink-0 shadow-lg" />

                      {/* Skeleton Text (Menyesuaikan flex-col gap-2 dan lebar w-75.5 atau flex-1) */}
                      <div className="flex flex-col gap-2 flex-1">
                        <div className="w-3/4 h-4 bg-gray-200 dark:bg-zinc-700/50 rounded" />
                        <div className="w-1/3 h-3 bg-gray-200 dark:bg-zinc-700/50 rounded" />
                      </div>

                      {/* Skeleton Button (Menyesuaikan w-9 h-9 rounded-xl) */}
                      <div className="rounded-xl w-9 h-9 bg-gray-200 dark:bg-zinc-700/50 shrink-0" />
                    </div>
                  ))}
                </div>
              ) : !isData.sound_live || isData.sound_live.length === 0 ? (
                /* Tampilan jika data sound_live kosong / tidak ada stream */
                <div className="flex flex-col items-center justify-center p-8 text-center">
                  <h5 className="font-medium text-gray-500 dark:text-gray-400 text-[1rem] tracking-min-2 select-none">
                    {isDictionary === "Arab" ? "لا توجد بثوث" : "No Stream"}
                  </h5>
                </div>
              ) : (
                /* Tampilan normal saat data sudah ada */
                (isData.sound_live || []).map((val: any, i: number) => {
                  return (
                    <div
                      className="flex gap-6 items-center pl-5 cursor-pointer hover:scale-95 duration-400"
                      key={i}
                      onClick={() => {
                        if (val?.link) {
                          window.location.href = val.link;
                        }
                      }}
                    >
                      {/* image */}
                      <div className="w-13.5 h-13.5 rounded-full overflow-hidden relative shadow-lg shrink-0">
                        <Image
                          src={val?.image || "/Placeholder/profile_image.jpeg"}
                          blurDataURL={
                            val?.image || "/Placeholder/profile_image.jpeg"
                          }
                          alt={
                            isDictionary === "Arab"
                              ? val?.arab_title
                              : val?.english_title
                          }
                          placeholder="blur"
                          fill
                          className="object-cover"
                        />
                      </div>
                      {/* text */}
                      <div className="flex flex-col gap-2 flex-1 min-w-0">
                        <h3 className="text-[1rem] w-75.5 truncate font-medium text-text tracking-min-2">
                          {isDictionary === "Arab"
                            ? val?.arab_title
                            : val?.english_title}
                        </h3>
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
                          <p className="text-gray text-[0.75rem] tracking-min-2 font-normal">
                            {formatDate(val.date)}
                          </p>
                        </div>
                      </div>
                      {/* button */}
                      <div
                        className="rounded-xl w-9 h-9 bg-[rgba(14,62,44,0.10)] border border-dark-green
          flex justify-center items-center shrink-0"
                      >
                        <svg
                          width="9"
                          height="10"
                          viewBox="0 0 9 10"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M7.5 2.86902C8.83333 3.63882 8.83333 5.56332 7.5 6.33313L3 8.9312C1.66667 9.701 0 8.73875 0 7.19915V2.003C0 0.463397 1.66667 -0.498853 3 0.270947L7.5 2.86902Z"
                            fill="#41403B"
                          />
                        </svg>
                      </div>
                    </div>
                  );
                })
              )}
              {isLoadingSo && (
                <div className="flex w-full items-center justify-center py-6">
                  <div className="w-8 h-8 border-4 border-primary border-t-dark-green rounded-full animate-spin"></div>
                </div>
              )}
              {isEmptySound && (
                <div className="py-6 text-center text-gray text-sm">
                  {isDictionary === "Arab"
                    ? "لا توجد بيانات متاحة"
                    : "No data available"}
                </div>
              )}
            </div>
          </ContentBox>
          {/* right */}
          <ContentBox title={t("live.live_this_day.title")} style={{ flex: 1 }}>
            <div
              ref={videoContainer}
              onScroll={handleScrollVideo}
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 w-full overflow-y-auto max-h-91.5"
            >
              {(isData.display_live || []).map((val: any, i: number) => {
                return (
                  <div
                    key={i}
                    className="h-36.75 p-4.5 rounded-2xl relative w-full overflow-hidden cursor-pointer hover:scale-96 duration-400"
                    onClick={() => {
                      window.location.href = val?.link;
                    }}
                  >
                    <Image
                      src={val?.image || "/Placeholder/profile_image.jpeg"}
                      blurDataURL={
                        val?.image || "/Placeholder/profile_image.jpeg"
                      }
                      placeholder="blur"
                      alt={
                        isDictionary === "Arab"
                          ? val?.arab_title
                          : val?.english_title
                      }
                      fill
                      className="object-cover"
                    />
                    <div className="bg-[rgba(0,0,0,0.4)] absolute top-0 left-0 w-full h-full"></div>
                    <div
                      className="px-4 py-2 rounded-full relative justify-self-start"
                      style={{
                        fontWeight: "medium",
                        background:
                          val?.status.toLowerCase() == "ended"
                            ? "black"
                            : val?.status.toLowerCase() == "live"
                              ? "#ED1D1D"
                              : "#e6e6e6",
                        color:
                          val?.status.toLowerCase() === "live" ||
                          val?.status.toLowerCase() === "ended"
                            ? "white"
                            : "var(--text)",
                      }}
                    >
                      <h4 className="text-[0.75rem]">{val?.status}</h4>
                    </div>
                  </div>
                );
              })}
              {isLoading && (
                <div className="flex items-center justify-center col-span-full h-[22.5rem] gap-2 text-white font-medium">
                  <svg
                    className="animate-spin h-6 w-6 text-dark-green"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                </div>
              )}
              {isEmptyAllLive ? (
                <div className="col-span-3 text-center py-4 text-gray text-sm">
                  {isDictionary === "Arab"
                    ? "لا توجد بيانات متاحة"
                    : "No data available"}
                </div>
              ) : (
                <div className="flex items-center justify-center col-span-full mt-5 gap-2 text-white font-medium">
                  <svg
                    className="animate-spin h-6 w-6 text-dark-green"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                </div>
              )}
            </div>
          </ContentBox>
        </div>
      </div>
      {/* navbar left */}
      <LeftNavbar state={6} />
    </div>
  );
};

export default page;
