"use client";

import { useDictionary } from "@/provider/useDictionary";
import { Pencil } from "@/public/Icon/Icon";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Combobox } from "../Component/Combobox";
import Header from "../Component/Header";
import LeftNavbar from "../Component/LeftNavbar";
import SvgImg from "../Component/SvgImg";
import { Table } from "../Component/Table";

export type Lecture = {
  id: number;
  english_title: string;
  arab_title: string;
  date: string | Date;
  image: string;
  type:
    | "lesson"
    | "article"
    | "lecture"
    | "fatwa"
    | "ebook"
    | "soundstream"
    | "livestream";
  visitor: number | "No Data";
  questioner: string | null;
  time: string | null;
};

const dataFetch = {
  profile: {
    name: "Muhammad Rizki",
    status: "Ustad",
    photo: "/Placeholder/profile_image.jpeg",
  },
};

const optionView = [
  {
    value: "",
    label: "All",
  },
  {
    value: "0-100",
    label: "0-100",
  },
  {
    value: "101-500",
    label: "101-500",
  },
  {
    value: "501-1000",
    label: "501-1000",
  },
  {
    value: "1001-2000",
    label: "1001-2000",
  },
  {
    value: "2001-5000",
    label: "2001-5000",
  },
  {
    value: ">5000",
    label: ">5000",
  },
];

const optionStatus = [
  {
    value: "published",
    label: "Published",
  },
  {
    value: "scheduled",
    label: "Scheduled",
  },
];

const optionSort = [
  {
    value: "newest",
    label: "Newest",
  },
  {
    value: "latest",
    label: "Latest",
  },
];
const optionType = [
  {
    value: "lesson",
    label: "Lessons",
  },
  {
    value: "article",
    label: "Articles",
  },
  {
    value: "lecture",
    label: "Lectures",
  },
  {
    value: "fatwa",
    label: "Fatwa",
  },
  {
    value: "ebook",
    label: "E-Books",
  },
  {
    value: "livestream",
    label: "Live Stream",
  },
  {
    value: "soundstream",
    label: "Sound Stream",
  },
];

const LabelType = {
  lesson: "Lessons",
  article: "Articles",
  lecture: "Lectures",
  fatwa: "Fatwa",
  ebook: "E-Books",
  livestream: "Live Stream",
  soundstream: "Sound Stream",
};

const card = [
  {
    alt: "lessons",
    size_width: 3,
    size_height: 3,
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
    size_width: 3,
    size_height: 3,
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
    size_width: 3,
    size_height: 3,
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
    size_width: 3,
    size_height: 3,
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
    size_width: 3,
    size_height: 2.5,
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
    size_width: 3,
    size_height: 2.5,
    src: "/Icon/navbar/live",
    translation: {
      English: "Live",
      Arab: "بث مباشر",
    },
    total: 50,
    wow: 25,
  },
];

const iconMap = {
  lessons: {
    alt: "lessons",
    size_width: 3,
    size_height: 3,
    src: "/Icon/navbar/lessons",
  },
  articles: {
    alt: "article",
    size_width: 3,
    size_height: 3,
    src: "/Icon/navbar/article",
  },
  lectures: {
    alt: "lectures",
    size_width: 3,
    size_height: 3,
    src: "/Icon/navbar/lectures",
  },
  fatwa: {
    alt: "fatwa",
    size_width: 3,
    size_height: 3,
    src: "/Icon/navbar/fatwa",
  },
  ebook: {
    alt: "e-book",
    size_width: 3,
    size_height: 2.5,
    src: "/Icon/navbar/e-book",
  },
  livestream: {
    alt: "live-stream",
    size_width: 3,
    size_height: 2.5,
    src: "/Icon/navbar/live",
  },
  soundstream: {
    alt: "sound-stream",
    size_width: 3,
    size_height: 2.5,
    src: "/Icon/navbar/live",
  },
};

export const lectureColumns = [
  {
    header: "Title",
    accessor: (row: Lecture) => {
      if (!row) return null;
      return (
        <div className="flex items-center gap-3 min-w-[280px]">
          <Image
            src={row.image}
            alt={row.english_title}
            width={48}
            height={48}
            className="w-12 h-12 rounded-lg object-cover flex-shrink-0"
          />
          <div className="flex flex-col">
            <span className="font-medium text-slate-900 line-clamp-1">
              {row.english_title}
            </span>
          </div>
        </div>
      );
    },
    accessorKey: "english_title",
  },
  {
    header: "Type",
    accessor: (row: Lecture) => {
      if (!row) return null;
      const key = row.type
        .toLowerCase()
        .replace(/[\s-]/g, "") as keyof typeof iconMap;
      const currentIcon = iconMap[key] || iconMap["lessons"];

      return (
        <div className="flex justify-start items-center gap-2 min-w-[100px] px-5 py-1.5 rounded-full bg-[#DAE1DA]">
          <Image
            src={currentIcon.src + ".svg"}
            alt={currentIcon.alt}
            width={currentIcon.size_width}
            height={currentIcon.size_height}
            className="w-6 h-6"
          />
          <span className="text-sm text-slate-700 font-medium">
            {LabelType[row.type]}
          </span>
        </div>
      );
    },
    accessorKey: "type",
  },
  {
    header: "Author",
    accessor: (row: Lecture) => {
      if (!row) return null;
      return (
        <div className="flex items-center gap-2 min-w-[150px]">
          <div className="w-7 h-7 rounded-full bg-emerald-800 text-white flex items-center justify-center text-xs font-bold">
            U
          </div>
          <span className="text-sm text-slate-700 font-medium">
            Ust. Khalid Basalamah
          </span>
        </div>
      );
    },
  },
  {
    header: "Status",
    accessor: (row: Lecture) => {
      if (!row) return null;
      const isPublished = new Date(row.date) <= new Date();
      return (
        <span
          className={`px-3 py-1 rounded-full text-white text-xs font-medium ${isPublished ? "bg-dark-green" : "bg-[#41403B]"}`}
        >
          {isPublished ? "Published" : "Scheduled"}
        </span>
      );
    },
  },
  {
    header: "Date",
    accessor: (row: Lecture) => {
      if (!row) return null;
      const formattedDate = new Date(row.date).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      });
      const formattedTime = new Date(row.date).toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
      });

      return (
        <div className="flex flex-col text-xs text-slate-600 min-w-[110px]">
          <span className="font-medium">{formattedDate}</span>
          <span className="text-slate-400">{formattedTime}</span>
        </div>
      );
    },
    accessorKey: "created_at",
  },
  {
    header: "Views",
    accessor: (row: Lecture) => {
      if (!row) return null;
      return (
        <span className="text-sm font-medium text-slate-700">
          {row.visitor !== "No Data" ? row.visitor?.toLocaleString() : "-"}
        </span>
      );
    },
    accessorKey: "visitor",
  },
  {
    header: "Edit",
    accessor: (row: Lecture) => (
      <button className="p-2 rounded-lg bg-emerald-50 hover:bg-emerald-100 cursor-pointer text-emerald-800 transition-colors">
        <Pencil className="w-5 h-5" />
      </button>
    ),
  },
];

const page = () => {
  const route = useRouter();
  const { isDictionary, t } = useDictionary();
  const [selectedType, setSelectedType] = useState<string[]>([]);
  const [selectedStatus, setSelectedStatus] = useState<string>("");
  const [selectedView, setSelectedView] = useState<string>("");
  const [selectedSort, setSelectedSort] = useState<string>("");
  const [isData, setIsData] = useState<Lecture[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [page, setPage] = useState<number>(0);
  const [isTotalPage, setIsTotalPage] = useState<number>(0);
  const [isTotalData, setIsTotalData] = useState<number>(0);
  const [isProfile, setIsProfile] = useState<any>({});
  const handlePageChage = (curentPagination: number) => {
    const offset = (curentPagination - 1) * 10;
    fetchAllData(
      offset,
      selectedType,
      selectedSort,
      selectedStatus,
      selectedView,
    );
  };

  const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleSearch = (value: string) => {
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }
    searchTimeoutRef.current = setTimeout(() => {
      fetchAllData(
        0,
        selectedType,
        selectedSort,
        selectedStatus,
        selectedView,
        value,
      );
    }, 500);
  };

  useEffect(() => {
    if (!dataFetch.profile) {
      route.push("/Login");
    }
  }, []);

  console.log(isData);

  const fetchAllData = async (
    currentPage?: number,
    currentType?: string[],
    currentSort?: string,
    currentStatus?: string,
    currentView?: string,
    currentSearch?: string,
  ) => {
    const params = new URLSearchParams(window.location.search);
    if (!params.get("status") && !params.get("sort") && !params.get("view")) {
      params.set("pagination", String(currentPage ?? 0));
      params.set(
        "sort",
        currentSort?.toLowerCase() || selectedSort.toLowerCase() || "latest",
      );
      params.set(
        "status",
        currentStatus?.toLowerCase() ||
          selectedStatus.toLowerCase() ||
          "published",
      );
      params.set("view", currentView || selectedView || "");
    }

    if (currentType && currentType.length > 0) {
      params.set("type", currentType.join("."));
    }

    if (currentSearch) {
      params.set("search", currentSearch);
    }

    try {
      setIsLoading(true);
      const res = await fetch("/api/admin/content?" + params);
      const hasProfile = sessionStorage.getItem("profile");
       if (hasProfile && hasProfile !== "undefined" && hasProfile !== "null") {
          setIsProfile(JSON.parse(hasProfile));
        } else {
          setIsProfile({});
          route.push('/login');
        }
      if (res.ok) {
        const result = await res.json();
        setIsData(result.data);
        setIsTotalPage(result.totalPages);
        setIsTotalData(result.total);
      }

     

      
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAllData(
      page,
      selectedType,
      selectedSort,
      selectedStatus,
      selectedView,
    );
  }, [page, selectedType, selectedSort, selectedStatus, selectedView]);

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
                {t("content_management.title")}
              </h1>
              <p className="font-normal text-[1.5rem]/[130%] text-gray tracking-min-2 max-w-full md:text-start text-center">
                {t("content_management.description")}
              </p>
            </div>
          </div>
        </div>
        {/* <div className="flex gap-10 rounded-[24px] w-[100%] px-5 py-2 md:px-20 md:py-10">
          {card.map((item, i) => (
            <div key={i} className="flex md:flex-row flex-col gap-[60px]">
              <div className="w-[9.5rem] flex flex-col md:justify-start justify-center items-center gap-3 bg-[#F5F5F5] p-6 rounded-3xl shadow-lg flex-1 hover:scale-105 duration-200 transtition-all cursor-pointer ">
                <Image
                  src={item?.src + ".svg"}
                  alt={item?.alt}
                  width={16 * item?.size_width}
                  height={16 * item?.size_height}
                />
                <div className="flex flex-col gap-1 self-stretch item-start ">
                  <h3 className="text-xl text-text text-center  leading-[120%] text-text tracking-min-4 font-semibold">
                    {item?.translation[isDictionary]}
                  </h3>
                </div>
              </div>
            </div>
          ))}
        </div> */}
        <div className="flex justify-between items-center w-full rounded-xl bg-white p-5 ">
          <div className="relative flex items-center gap-4 w-full sm:w-auto">
            <div className="absolute left-3 top-1/2 -translate-y-1/2">
              <SvgImg src="/Icon/Search.svg" size={1.2} alt="search icon" />
            </div>
            <input
              type="text"
              placeholder="Search"
              onChange={(e) => handleSearch(e.target.value)}
              className="w-full sm:w-64 text-text pl-9 pr-4 py-2 border border-gray-300 rounded-2xl focus:outline-none focus:ring-1 focus:ring-dark-green"
            />
          </div>

          <div className="flex item-center gap-3 flex-nowrap">
            <Combobox
              option={optionType}
              isSelected={selectedType}
              setIsSelected={setSelectedType}
              placeHolder="Filter by type"
              isCombobox={true}
            />
            <Combobox
              option={optionSort}
              isSelected={selectedSort}
              setIsSelected={setSelectedSort}
              placeHolder="Filter by status"
            />
            <Combobox
              option={optionStatus}
              isSelected={selectedStatus}
              setIsSelected={setSelectedStatus}
              placeHolder="Filter by status"
            />
            <Combobox
              option={optionView}
              isSelected={selectedView}
              setIsSelected={setSelectedView}
              placeHolder="Filter by view"
            />
          </div>
        </div>
        <div className="flex flex-col md:flex-row items-center gap-10 w-full mt-2 md:mt-0">
          <Table
            data={isData}
            columns={lectureColumns}
            isSearch={false}
            isSort={false}
            isLoading={isLoading}
            customTable={{
              totalPages: isTotalPage,
              totalData: isTotalData,
              handlePagination: handlePageChage,
            }}
          />
        </div>
      </div>

      <LeftNavbar state={7} />
    </div>
  );
};

export default page;
