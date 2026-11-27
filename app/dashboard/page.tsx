"use client";

import { useDictionary } from "@/provider/useDictionary";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { DiagramCharts, PieCharts } from "../Component/Chart";
import Header from "../Component/Header";
import LeftNavbar from "../Component/LeftNavbar";

const dataFetch = {
  profile: {
    name: "Muhammad Rizki",
    status: "Ustad",
    photo: "/Placeholder/profile_image.jpeg",
  },
};

const card = [
  {
    alt: "lessons",
    size_width: 5.3,
    size_height: 5,
    src: "/Icon/navbar/lessons",
    translation: {
      English: "Lessons",
      Arab: "دروس",
    },
    total: 354,
    wow: 5,
  },
  {
    alt: "article",
    size_width: 5.3,
    size_height: 5,
    src: "/Icon/navbar/article",
    translation: {
      English: "Article",
      Arab: "مقالات",
    },
    total: 200,
    wow: -8,
  },
  {
    alt: "lectures",
    size_width: 5.2,
    size_height: 5,
    src: "/Icon/navbar/lectures",
    translation: {
      English: "Lectures",
      Arab: "محاضرات",
    },
    total: 1000,
    wow: -13,
  },
  {
    alt: "fatwa",
    size_width: 5.3,
    size_height: 5,
    src: "/Icon/navbar/fatwa",
    translation: {
      English: "Fatwa",
      Arab: "فتوى",
    },
    total: 523,
    wow: -10,
  },
  {
    alt: "e-book",
    size_width: 4.9,
    size_height: 5,
    src: "/Icon/navbar/e-book",
    translation: {
      English: "E-Book",
      Arab: "كتاب إلكتروني",
    },
    total: 123,
    wow: 60,
  },
  {
    alt: "live",
    size_width: 4.6,
    size_height: 5,
    src: "/Icon/navbar/live",
    translation: {
      English: "Live",
      Arab: "بث مباشر",
    },
    total: 50,
    wow: 25,
  },
];

const DiagramData = [
  { name: "Jan", Users: 1000, NewUsers: 400, ActiveUsers: 600 },
  { name: "Feb", Users: 1400, NewUsers: 800, ActiveUsers: 500 },
  { name: "Mar", Users: 1500, NewUsers: 600, ActiveUsers: 900 },
  { name: "Apr", Users: 1200, NewUsers: 1000, ActiveUsers: 1100 },
  { name: "May", Users: 1100, NewUsers: 1200, ActiveUsers: 1000 },
  { name: "Jun", Users: 1800, NewUsers: 1500, ActiveUsers: 1200 },
  { name: "Jul", Users: 2100, NewUsers: 1700, ActiveUsers: 1400 },
  { name: "Aug", Users: 2300, NewUsers: 2000, ActiveUsers: 1700 },
];

const contentData = [
  { name: "Lessons", value: 120 },
  { name: "Articles", value: 165 },
  { name: "Lectures", value: 200 },
  { name: "Fatwa", value: 295 },
  { name: "E-Books", value: 110 },
  { name: "Live streams", value: 184 },
];

const COLORS = [
  "#EF4444",
  "#F97316",
  "#EAB308",
  "#10B981",
  "#06B6D4",
  "#8B5CF6",
];

const page = () => {
  const route = useRouter();
  const { isDictionary, t } = useDictionary();
  const [isData, setIsData] = useState<any>({});
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isProfile, setIsProfile] = useState<any>({});

  const card = [
    {
      alt: "lessons",
      size_width: 5.3,
      size_height: 5,
      src: "/Icon/navbar/lessons",
      translation: {
        English: "Lessons",
        Arab: "دروس",
      },
      total: isData.lessons_count ?? 0,
      wow: isData.lessons_this_week ?? 0,
    },
    {
      alt: "article",
      size_width: 5.3,
      size_height: 5,
      src: "/Icon/navbar/article",
      translation: {
        English: "Article",
        Arab: "مقالات",
      },
      total: isData.articles_count ?? 0,
      wow: isData.articles_this_week ?? 0,
    },
    {
      alt: "lectures",
      size_width: 5.2,
      size_height: 5,
      src: "/Icon/navbar/lectures",
      translation: {
        English: "Lectures",
        Arab: "محاضرات",
      },
      total: isData.lectures_count ?? 0,
      wow: isData.lectures_this_week ?? 0,
    },
    {
      alt: "fatwa",
      size_width: 5.3,
      size_height: 5,
      src: "/Icon/navbar/fatwa",
      translation: {
        English: "Fatwa",
        Arab: "فتوى",
      },
      total: isData.fatwas_count ?? 0,
      wow: isData.fatwas_this_week ?? 0,
    },
    {
      alt: "e-book",
      size_width: 4.9,
      size_height: 5,
      src: "/Icon/navbar/e-book",
      translation: {
        English: "E-Book",
        Arab: "كتاب إلكتروني",
      },
      total: isData.ebooks_count ?? 0,
      wow: isData.ebooks_this_week ?? 0,
    },
    {
      alt: "live",
      size_width: 4.6,
      size_height: 5,
      src: "/Icon/navbar/live",
      translation: {
        English: "Live",
        Arab: "بث مباشر",
      },
      total: isData.livestreams_count ?? 0,
      wow: isData.livestreams_this_week ?? 0,
    },
  ];

  const contentData = [
    { name: "Lessons", value: isData.lessons_count ?? 0 },
    { name: "Articles", value: isData.articles_count ?? 0 },
    { name: "Lectures", value: isData.lectures_count ?? 0 },
    { name: "Fatwa", value: isData.fatwas_count ?? 0 },
    { name: "E-Books", value: isData.ebooks_count ?? 0 },
    { name: "Live streams", value: isData.livestreams ?? 0 },
  ];

  const cardChunk = (array: any[], chunks: number) => {
    const result = [];

    for (let i = 0; i < array.length; i += chunks) {
      result.push(array.slice(i, chunks + i));
    }

    return result;
  };

  const cardfetch = cardChunk(card, 3);


  const fetchDashboard = async () => {
    const hasData = sessionStorage.getItem("dashboard");
    const hasProfile = sessionStorage.getItem("profile");

    if (hasData) {
      try {
        if (hasProfile && hasProfile !== "undefined" && hasProfile !== "null") {
          setIsProfile(JSON.parse(hasProfile));
        } else {
          setIsProfile({});
          route.push("/login");
        }

        if (hasData && hasData !== "undefined" && hasData !== "null") {
          setIsData(JSON.parse(hasData));
        } else {
          setIsData({});
        }
        setIsLoading(false);
        return;
      } catch (e) {
        setIsLoading(false);
        console.log("Error parsing session storage", e);
      }
    }

    const res = await fetch("api/admin/data/dashboard", {
      headers: {
        "Request-Timezone": Intl.DateTimeFormat().resolvedOptions().timeZone,
      },
    });
    if (!res.ok) {
      setIsLoading(false);
     console.log("SOMETHING-WRONG");
     const check = isProfile === null || Object.keys(isProfile).length === 0;

      if (check) {
        route.push("/login");
      }
    }

    const data = await res.json();

    const { success, ...dashboardData } = data;

    sessionStorage.setItem("dashboard", JSON.stringify(dashboardData));
    setIsData(dashboardData);
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  const totalValue = contentData.reduce((acc, curr) => acc + curr.value, 0);

  return (
    <div className="flex flex-col gap-12 items-center">
      <Header active={7} profileData={isProfile}></Header>
      <div className="flex flex-col gap-5 max-w-[90lvw] w-7xl">
        {/* top */}
        <div className="flex gap-2 md:mb-10">
          {/* left */}
          <div className="flex flex-col gap-12 items-start w-full">
            {/* text */}
            <div className="flex flex-col gap-3 w-full">
              <h1 className="text-5xl/c-120 tracking-min-4 font-medium text-text md:text-start text-center">
                {t("dashboard.title")}
              </h1>
              <p className="font-normal text-[1.5rem]/[130%] text-gray tracking-min-2 max-w-full md:text-start text-center">
                {t("dashboard.description")}
              </p>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-10 rounded-[24px] w-[100%] px-5 py-2 md:px-20 md:py-10">
          {cardfetch.map((item, i) => (
            <div key={i} className="flex md:flex-row flex-col gap-[60px]">
              {isLoading ? (
                // --- KONDISI LOADING (SKELETON) ---
                <>
                  {/* Kartu Skeleton 1 */}
                  <div className="flex flex-col md:flex-row md:justify-start justify-center items-center md:items-start gap-3 bg-[#F5F5F5] p-6 rounded-3xl shadow-lg flex-1 animate-pulse">
                    {/* Kotak Skeleton untuk Gambar */}
                    <div className="w-12 h-12 bg-gray-300 rounded-md" />
                    <div className="flex flex-col gap-2 self-stretch items-center md:items-start w-full">
                      {/* Skeleton untuk Judul (h3) */}
                      <div className="h-8 bg-gray-300 rounded-md w-3/4" />
                      <div className="flex items-center w-full justify-center md:justify-start gap-2">
                        {/* Skeleton untuk Total Angka */}
                        <div className="h-10 bg-gray-300 rounded-md w-24" />
                        <div className="flex flex-col items-start gap-1">
                          {/* Skeleton untuk Badge (WoW) */}
                          <div className="h-4 bg-gray-300 rounded-full w-10" />
                          {/* Skeleton untuk teks "this week" */}
                          <div className="h-3 bg-gray-300 rounded-md w-14" />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Kartu Skeleton 2 */}
                  <div className="flex flex-col md:flex-row md:justify-start justify-center items-center md:items-start gap-3 bg-[#F5F5F5] p-6 rounded-3xl shadow-lg flex-1 animate-pulse">
                    <div className="w-12 h-12 bg-gray-300 rounded-md" />
                    <div className="flex flex-col gap-2 self-stretch items-center md:items-start w-full">
                      <div className="h-8 bg-gray-300 rounded-md w-3/4" />
                      <div className="flex items-center w-full justify-center md:justify-start gap-2">
                        <div className="h-10 bg-gray-300 rounded-md w-24" />
                        <div className="flex flex-col items-start gap-1">
                          <div className="h-4 bg-gray-300 rounded-full w-10" />
                          <div className="h-3 bg-gray-300 rounded-md w-14" />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Kartu Skeleton 3 */}
                  <div className="flex flex-col md:flex-row md:justify-start justify-center items-center md:items-start gap-3 bg-[#F5F5F5] p-6 rounded-3xl shadow-lg flex-1 animate-pulse">
                    <div className="w-12 h-12 bg-gray-300 rounded-md" />
                    <div className="flex flex-col gap-2 self-stretch items-center md:items-start w-full">
                      <div className="h-8 bg-gray-300 rounded-md w-3/4" />
                      <div className="flex items-center w-full justify-center md:justify-start gap-2">
                        <div className="h-10 bg-gray-300 rounded-md w-24" />
                        <div className="flex flex-col items-start gap-1">
                          <div className="h-4 bg-gray-300 rounded-full w-10" />
                          <div className="h-3 bg-gray-300 rounded-md w-14" />
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                // --- KONDISI DATA ASLI ---
                <>
                  {/* Kartu 1 */}
                  <div className="flex flex-col md:flex-row md:justify-start justify-center items-center md:items-start gap-3 bg-[#F5F5F5] p-6 rounded-3xl shadow-lg flex-1 hover:scale-105 duration-200 transition-all cursor-pointer">
                    <Image
                      src={item[0]?.src + ".svg"}
                      alt={item[0]?.alt || "icon"}
                      width={16 * (item[0]?.size_width || 2)}
                      height={16 * (item[0]?.size_height || 2)}
                    />
                    <div className="flex flex-col gap-1 self-stretch items-start">
                      <h3 className="text-3xl text-text text-center md:text-start leading-[120%] tracking-min-2 font-semibold">
                        {item[0]?.translation[isDictionary]}
                      </h3>
                      <div className="flex items-center w-full justify-center gap-2">
                        <p className="font-normal text-4xl text-text text-center md:text-start tracking-min-2 leading-[120%]">
                          {item[0]?.total}
                        </p>
                        <div className="flex flex-col items-start gap-1">
                          <div
                            className={`${(item[0]?.wow ?? 0) > 0 ? "bg-[#20bf6b]/20 border-[#20bf6b] border-[1px] text-dark-green" : "bg-red-400/20 border-[#ef4444] border-[1px] text-red-600"} rounded-full px-1 text-[10px]`}
                          >
                            {(item[0]?.wow ?? 0) > 0 ? "+" : ""} {item[0]?.wow}
                          </div>
                          <p className="text-text text-center text-xs md:text-start font-semibold tracking-tight leading-[120%]">
                            this week
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Kartu 2 */}
                  <div className="flex md:flex-row flex-col md:justify-start justify-center items-center md:items-start gap-3 bg-[#F5F5F5] p-6 rounded-3xl shadow-lg flex-1 hover:scale-105 duration-200 transition-all cursor-pointer">
                    <Image
                      src={item[1]?.src + ".svg"}
                      alt={item[1]?.alt || "icon"}
                      width={16 * (item[1]?.size_width || 2)}
                      height={16 * (item[1]?.size_height || 2)}
                    />
                    <div className="flex flex-col gap-1 self-stretch items-start">
                      <h3 className="text-3xl text-text text-center md:text-start leading-[120%] tracking-min-2 font-semibold">
                        {item[1]?.translation[isDictionary]}
                      </h3>
                      <div className="flex w-full justify-center items-center gap-2">
                        <p className="font-normal text-4xl text-text text-center md:text-start tracking-min-2 leading-[120%]">
                          {item[1]?.total}
                        </p>
                        <div className="flex flex-col items-start gap-1">
                          <div
                            className={`${(item[1]?.wow ?? 0) > 0 ? "bg-[#20bf6b]/20 border-[#20bf6b] border-[1px] text-dark-green" : "bg-red-400/20 border-[#ef4444] border-[1px] text-red-600"} rounded-full px-1 text-[10px]`}
                          >
                            {(item[1]?.wow ?? 0) > 0 ? "+" : ""} {item[1]?.wow}
                          </div>
                          <p className="text-text text-center text-xs md:text-start font-semibold tracking-tight leading-[120%]">
                            this week
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Kartu 3 */}
                  <div className="flex md:flex-row md:justify-start justify-center items-center md:items-start flex-col gap-3 bg-[#F5F5F5] p-6 rounded-3xl shadow-lg flex-1 hover:scale-105 duration-200 transition-all cursor-pointer">
                    <Image
                      src={item[2]?.src + ".svg"}
                      alt={item[2]?.alt || "icon"}
                      width={16 * (item[2]?.size_width || 2)}
                      height={16 * (item[2]?.size_height || 2)}
                    />
                    <div className="flex flex-col gap-1 self-stretch items-start">
                      <h3 className="text-3xl text-text text-center md:text-start leading-[120%] tracking-min-2 font-semibold">
                        {item[2]?.translation[isDictionary]}
                      </h3>
                      <div className="flex w-full justify-center items-center gap-2">
                        <p className="font-normal text-4xl text-text text-center md:text-start tracking-min-2 leading-[120%]">
                          {item[2]?.total}
                        </p>
                        <div className="flex flex-col items-start gap-1">
                          <div
                            className={`${(item[2]?.wow ?? 0) > 0 ? "bg-[#20bf6b]/20 border-[#20bf6b] border-[1px] text-dark-green" : "bg-red-400/20 border-[#ef4444] border-[1px] text-red-600"} rounded-full px-1 text-[10px]`}
                          >
                            {(item[2]?.wow ?? 0) > 0 ? "+" : ""} {item[2]?.wow}
                          </div>
                          <p className="text-text text-center text-xs md:text-start font-semibold tracking-tight leading-[120%]">
                            this week
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
        <div className="flex flex-col md:flex-row items-center gap-10 w-full mt-2 md:mt-0">
          <div className="flex flex-col h-[35rem] gap-[75px] bg-gradient-to-br from-[#0f291c] to-[#1b4332] border border-[#2d6a4f]/40 px-9 py-16 self-stretch rounded-3xl items-start shadow-sm flex-1">
            <div>
              <h3 className="text-white text-4xl leading-[120%] tracking-[0.72px] font-semibold">
                Platform Overview
              </h3>
              <span className="text-lg text-white/80 tracking-[-0.7px]">
                Real-time analytics tracking total, new, and active users
              </span>
            </div>
            <div className="flex flex-col md:flex-row self-stretch gap-[30px]">
              <div className="flex gap-2 items-center">
                <div className="w-5 h-5 rounded-full bg-[#38bdf8]"></div>
                <p className="text-white text-2xl leading-normal">Users</p>
              </div>
              <div className="flex gap-2 items-center">
                <div className="w-5 h-5 rounded-full bg-[#a3e635]"></div>
                <p className="text-white text-2xl leading-normal">New Users</p>
              </div>
              <div className="flex gap-2 items-center">
                <div className="w-5 h-5 rounded-full bg-[#fbbf24]"></div>
                <p className="text-white text-2xl leading-normal">
                  Active Users
                </p>
              </div>
            </div>
            <DiagramCharts data={DiagramData} />
          </div>
          <div className="flex flex-col h-[35rem] gap-[50px] bg-gradient-to-br from-[#F5F5F5] to-white border border-emerald-900/10 px-9 py-16 self-stretch rounded-3xl items-start shadow-sm flex-1">
            <div>
              <h3 className="text-text text-4xl leading-[120%] tracking-[0.72px] font-semibold">
                Content Summary
              </h3>
              <span className="text-lg text-text/80 tracking-[-0.7px]">
                Percentage share of active content types on the platform
              </span>
            </div>

            <div className="flex items-center gap-5 w-full">
              <PieCharts data={contentData} total={totalValue} color={COLORS} />
              <div className="flex flex-col gap-3">
                {isLoading ? (
                  // --- KONDISI LOADING (SKELETON) ---
                  <>
                    {[1, 2, 3, 4].map((_, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between gap-4 py-1.5 px-2 rounded-lg animate-pulse"
                      >
                        <div className="flex items-center gap-2.5">
                          {/* Skeleton untuk Bullet/Dot Color */}
                          <div className="w-3.5 h-3.5 rounded-full shrink-0 bg-gray-300"></div>
                          {/* Skeleton untuk Nama Item */}
                          <div className="h-6 bg-gray-300 rounded-md w-28"></div>
                        </div>
                        {/* Skeleton untuk Persentase */}
                        <div className="h-5 bg-gray-300 rounded-md w-12"></div>
                      </div>
                    ))}
                  </>
                ) : (
                  // --- KONDISI DATA ASLI ---
                  contentData.map((item: any, index: number) => (
                    <div
                      key={index}
                      className="flex items-center justify-between gap-4 py-1.5 px-2 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      <div className="flex items-center gap-2.5">
                        <div
                          className="w-3.5 h-3.5 rounded-full shrink-0 shadow-sm"
                          style={{ backgroundColor: COLORS[index] }}
                        ></div>
                        <span className="text-gray-700 text-2xl font-medium">
                          {item.name}
                        </span>
                      </div>
                      <span className="text-gray-900 text-md font-semibold">
                        {totalValue
                          ? ((item.value / totalValue) * 100).toFixed(1)
                          : 0}
                        %
                      </span>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <LeftNavbar state={7} />
    </div>
  );
};

export default page;
