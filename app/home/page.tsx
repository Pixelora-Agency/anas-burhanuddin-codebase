"use client";

import { useDictionary } from "@/provider/useDictionary";
import { ChevronLeft, ChevronRight } from "@/public/Icon/Icon";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import ContentBox from "../Component/ContentBox";
import Header from "../Component/Header";
import LeftNavbar from "../Component/LeftNavbar";
import WorshipSchedule from "../Component/WorshipSchedule";

const page = () => {
  const dataFetch = {
    profile: {
      name: "Muhammad Rizki",
      status: "Ustad",
      photo: "/Placeholder/profile_image.jpeg",
      joined: "2026-06-12",
      bio: "Passionate about sharing Islamic knowledge with wisdom and sincerity, he has devoted his life to teaching the Qur'an and Sunnah. His lectures encourage believers to grow in faith, character, and understanding.",
    },
    selected_verse: {
      title: `كلمة فضيلة الشيخ "رحمه الله تعالى" بمناسبة إنشاء الموقع`,
      verse:
        "إنَّ الحمدَ للهِ، نحمدُه ونستعينُه ونستغفرُه، ونعوذُ باللهِ من شرورِ أنفسِنا، ومن سيِّئاتِ أعمالِنا، من يهدِه اللهُ فلا مضلَّ له، ومن يُضلِل فلا هاديَ له، وأشهدُ أن لا إلهَ إلا اللهُ وحدَه لا شريكَ له، وأشهدُ أنَّ محمدًا عبدُه ورسولُه.إنَّ الحمدَ للهِ، نحمدُه ونستعينُه ونستغفرُه، ونعوذُ باللهِ من شرورِ أنفسِنا، ومن سيِّئاتِ أعمالِنا، من يهدِه اللهُ فلا مضلَّ له، ومن يُضلِل فلا هاديَ له، وأشهدُ أن لا إلهَ إلا اللهُ وحدَه لا شريكَ له، وأشهدُ أنَّ محمدًا عبدُه ورسولُهإنَّ الحمدَ للهِ، نحمدُه ونستعينُه ونستغفرُه، ونعوذُ باللهِ من شرورِ أنفسِنا، ومن سيِّئاتِ أعمالِنا، من يهدِه اللهُ فلا مضلَّ له، ومن يُضلِل فلا هاديَ له، وأشهدُ أن لا إلهَ إلا اللهُ وحدَه لا شريكَ له، وأشهدُ أنَّ محمدًا عبدُه ورسولُه.إنَّ الحمدَ للهِ، نحمدُه ونستعينُه ونستغفرُه، ونعوذُ باللهِ من شرورِ أنفسِنا، ومن سيِّئاتِ أعمالِنا، من يهدِه اللهُ فلا مضلَّ له، ومن يُضلِل فلا هاديَ له، وأشهدُ أن لا إلهَ إلا اللهُ وحدَه لا شريكَ له، وأشهدُ أنَّ محمدًا عبدُه ورسولُهإنَّ الحمدَ للهِ، نحمدُه ونستعينُه ونستغفرُه، ونعوذُ باللهِ من شرورِ أنفسِنا، ومن سيِّئاتِ أعمالِنا، من يهدِه اللهُ فلا مضلَّ له، ومن يُضلِل فلا هاديَ له، وأشهدُ أن لا إلهَ إلا اللهُ وحدَه لا شريكَ له، وأشهدُ أنَّ محمدًا عبدُه ورسولُه.إنَّ الحمدَ للهِ، نحمدُه ونستعينُه ونستغفرُه، ونعوذُ باللهِ من شرورِ أنفسِنا، ومن سيِّئاتِ أعمالِنا، من يهدِه اللهُ فلا مضلَّ له، ومن يُضلِل فلا هاديَ له، وأشهدُ أن لا إلهَ إلا اللهُ وحدَه لا شريكَ له، وأشهدُ أنَّ محمدًا عبدُه ورسولُهإنَّ الحمدَ للهِ، نحمدُه ونستعينُه ونستغفرُه، ونعوذُ باللهِ من شرورِ أنفسِنا، ومن سيِّئاتِ أعمالِنا، من يهدِه اللهُ فلا مضلَّ له، ومن يُضلِل فلا هاديَ له، وأشهدُ أن لا إلهَ إلا اللهُ وحدَه لا شريكَ له، وأشهدُ أنَّ محمدًا عبدُه ورسولُه.إنَّ الحمدَ للهِ، نحمدُه ونستعينُه ونستغفرُه، ونعوذُ باللهِ من شرورِ أنفسِنا، ومن سيِّئاتِ أعمالِنا، من يهدِه اللهُ فلا مضلَّ له، ومن يُضلِل فلا هاديَ له، وأشهدُ أن لا إلهَ إلا اللهُ وحدَه لا شريكَ له، وأشهدُ أنَّ محمدًا عبدُه ورسولُهإنَّ الحمدَ للهِ، نحمدُه ونستعينُه ونستغفرُه، ونعوذُ باللهِ من شرورِ أنفسِنا، ومن سيِّئاتِ أعمالِنا، من يهدِه اللهُ فلا مضلَّ له، ومن يُضلِل فلا هاديَ له، وأشهدُ أن لا إلهَ إلا اللهُ وحدَه لا شريكَ له، وأشهدُ أنَّ محمدًا عبدُه ورسولُه.إنَّ الحمدَ للهِ، نحمدُه ونستعينُه ونستغفرُه، ونعوذُ باللهِ من شرورِ أنفسِنا، ومن سيِّئاتِ أعمالِنا، من يهدِه اللهُ فلا مضلَّ له، ومن يُضلِل فلا هاديَ له، وأشهدُ أن لا إلهَ إلا اللهُ وحدَه لا شريكَ له، وأشهدُ أنَّ محمدًا عبدُه ورسولُهإنَّ الحمدَ للهِ، نحمدُه ونستعينُه ونستغفرُه، ونعوذُ باللهِ من شرورِ أنفسِنا، ومن سيِّئاتِ أعمالِنا، من يهدِه اللهُ فلا مضلَّ له، ومن يُضلِل فلا هاديَ له، وأشهدُ أن لا إلهَ إلا اللهُ وحدَه لا شريكَ له، وأشهدُ أنَّ محمدًا عبدُه ورسولُه.إنَّ الحمدَ للهِ، نحمدُه ونستعينُه ونستغفرُه، ونعوذُ باللهِ من شرورِ أنفسِنا، ومن سيِّئاتِ أعمالِنا، من يهدِه اللهُ فلا مضلَّ له، ومن يُضلِل فلا هاديَ له، وأشهدُ أن لا إلهَ إلا اللهُ وحدَه لا شريكَ له، وأشهدُ أنَّ محمدًا عبدُه ورسولُهإنَّ الحمدَ للهِ، نحمدُه ونستعينُه ونستغفرُه، ونعوذُ باللهِ من شرورِ أنفسِنا، ومن سيِّئاتِ أعمالِنا، من يهدِه اللهُ فلا مضلَّ له، ومن يُضلِل فلا هاديَ له، وأشهدُ أن لا إلهَ إلا اللهُ وحدَه لا شريكَ له، وأشهدُ أنَّ محمدًا عبدُه ورسولُه.إنَّ الحمدَ للهِ، نحمدُه ونستعينُه ونستغفرُه، ونعوذُ باللهِ من شرورِ أنفسِنا، ومن سيِّئاتِ أعمالِنا، من يهدِه اللهُ فلا مضلَّ له، ومن يُضلِل فلا هاديَ له، وأشهدُ أن لا إلهَ إلا اللهُ وحدَه لا شريكَ له، وأشهدُ أنَّ محمدًا عبدُه ورسولُهإنَّ الحمدَ للهِ، نحمدُه ونستعينُه ونستغفرُه، ونعوذُ باللهِ من شرورِ أنفسِنا، ومن سيِّئاتِ أعمالِنا، من يهدِه اللهُ فلا مضلَّ له، ومن يُضلِل فلا هاديَ له، وأشهدُ أن لا إلهَ إلا اللهُ وحدَه لا شريكَ له، وأشهدُ أنَّ محمدًا عبدُه ورسولُه.إنَّ الحمدَ للهِ، نحمدُه ونستعينُه ونستغفرُه، ونعوذُ باللهِ من شرورِ أنفسِنا، ومن سيِّئاتِ أعمالِنا، من يهدِه اللهُ فلا مضلَّ له، ومن يُضلِل فلا هاديَ له، وأشهدُ أن لا إلهَ إلا اللهُ وحدَه لا شريكَ له، وأشهدُ أنَّ محمدًا عبدُه ورسولُهإنَّ الحمدَ للهِ، نحمدُه ونستعينُه ونستغفرُه، ونعوذُ باللهِ من شرورِ أنفسِنا، ومن سيِّئاتِ أعمالِنا، من يهدِه اللهُ فلا مضلَّ له، ومن يُضلِل فلا هاديَ له، وأشهدُ أن لا إلهَ إلا اللهُ وحدَه لا شريكَ له، وأشهدُ أنَّ محمدًا عبدُه ورسولُه.إنَّ الحمدَ للهِ، نحمدُه ونستعينُه ونستغفرُه، ونعوذُ باللهِ من شرورِ أنفسِنا، ومن سيِّئاتِ أعمالِنا، من يهدِه اللهُ فلا مضلَّ له، ومن يُضلِل فلا هاديَ له، وأشهدُ أن لا إلهَ إلا اللهُ وحدَه لا شريكَ له، وأشهدُ أنَّ محمدًا عبدُه ورسولُهإنَّ الحمدَ للهِ، نحمدُه ونستعينُه ونستغفرُه، ونعوذُ باللهِ من شرورِ أنفسِنا، ومن سيِّئاتِ أعمالِنا، من يهدِه اللهُ فلا مضلَّ له، ومن يُضلِل فلا هاديَ له، وأشهدُ أن لا إلهَ إلا اللهُ وحدَه لا شريكَ له، وأشهدُ أنَّ محمدًا عبدُه ورسولُه.إنَّ الحمدَ للهِ، نحمدُه ونستعينُه ونستغفرُه، ونعوذُ باللهِ من شرورِ أنفسِنا، ومن سيِّئاتِ أعمالِنا، من يهدِه اللهُ فلا مضلَّ له، ومن يُضلِل فلا هاديَ له، وأشهدُ أن لا إلهَ إلا اللهُ وحدَه لا شريكَ له، وأشهدُ أنَّ محمدًا عبدُه ورسولُهإنَّ الحمدَ للهِ، نحمدُه ونستعينُه ونستغفرُه، ونعوذُ باللهِ من شرورِ أنفسِنا، ومن سيِّئاتِ أعمالِنا، من يهدِه اللهُ فلا مضلَّ له، ومن يُضلِل فلا هاديَ له، وأشهدُ أن لا إلهَ إلا اللهُ وحدَه لا شريكَ له، وأشهدُ أنَّ محمدًا عبدُه ورسولُه.إنَّ الحمدَ للهِ، نحمدُه ونستعينُه ونستغفرُه، ونعوذُ باللهِ من شرورِ أنفسِنا، ومن سيِّئاتِ أعمالِنا، من يهدِه اللهُ فلا مضلَّ له، ومن يُضلِل فلا هاديَ له، وأشهدُ أن لا إلهَ إلا اللهُ وحدَه لا شريكَ له، وأشهدُ أنَّ محمدًا عبدُه ورسولُهإنَّ الحمدَ للهِ، نحمدُه ونستعينُه ونستغفرُه، ونعوذُ باللهِ من شرورِ أنفسِنا، ومن سيِّئاتِ أعمالِنا، من يهدِه اللهُ فلا مضلَّ له، ومن يُضلِل فلا هاديَ له، وأشهدُ أن لا إلهَ إلا اللهُ وحدَه لا شريكَ له، وأشهدُ أنَّ محمدًا عبدُه ورسولُه.إنَّ الحمدَ للهِ، نحمدُه ونستعينُه ونستغفرُه، ونعوذُ باللهِ من شرورِ أنفسِنا، ومن سيِّئاتِ أعمالِنا، من يهدِه اللهُ فلا مضلَّ له، ومن يُضلِل فلا هاديَ له، وأشهدُ أن لا إلهَ إلا اللهُ وحدَه لا شريكَ له، وأشهدُ أنَّ محمدًا عبدُه ورسولُهإنَّ الحمدَ للهِ، نحمدُه ونستعينُه ونستغفرُه، ونعوذُ باللهِ من شرورِ أنفسِنا، ومن سيِّئاتِ أعمالِنا، من يهدِه اللهُ فلا مضلَّ له، ومن يُضلِل فلا هاديَ له، وأشهدُ أن لا إلهَ إلا اللهُ وحدَه لا شريكَ له، وأشهدُ أنَّ محمدًا عبدُه ورسولُه.إنَّ الحمدَ للهِ، نحمدُه ونستعينُه ونستغفرُه، ونعوذُ باللهِ من شرورِ أنفسِنا، ومن سيِّئاتِ أعمالِنا، من يهدِه اللهُ فلا مضلَّ له، ومن يُضلِل فلا هاديَ له، وأشهدُ أن لا إلهَ إلا اللهُ وحدَه لا شريكَ له، وأشهدُ أنَّ محمدًا عبدُه ورسولُهإنَّ الحمدَ للهِ، نحمدُه ونستعينُه ونستغفرُه، ونعوذُ باللهِ من شرورِ أنفسِنا، ومن سيِّئاتِ أعمالِنا، من يهدِه اللهُ فلا مضلَّ له، ومن يُضلِل فلا هاديَ له، وأشهدُ أن لا إلهَ إلا اللهُ وحدَه لا شريكَ له، وأشهدُ أنَّ محمدًا عبدُه ورسولُه.إنَّ الحمدَ للهِ، نحمدُه ونستعينُه ونستغفرُه، ونعوذُ باللهِ من شرورِ أنفسِنا، ومن سيِّئاتِ أعمالِنا، من يهدِه اللهُ فلا مضلَّ له، ومن يُضلِل فلا هاديَ له، وأشهدُ أن لا إلهَ إلا اللهُ وحدَه لا شريكَ له، وأشهدُ أنَّ محمدًا عبدُه ورسولُه.",
    },
    worship_schedule: [
      {
        id: 1,
        image: "/Placeholder/event_image.png",
        english_title: "Pray Together",
        arab_title: "Pray Together",
        speaker: "Ust. Abdul Karim",
        time_start: "2026-08-24T16:00:00.000Z",
        time_end: "2026-08-24T17:00:00.000Z",
      },
      {
        id: 2,
        image: "/Placeholder/event_image.png",
        english_title: "Pray Together",
        arab_title: "Pray Together",
        speaker: "Ust. Abdul Karim",
        time_start: "2026-08-24T20:00:00.000Z",
        time_end: "2026-08-24T22:00:00.000Z",
      },
      {
        id: 3,
        image: "/Placeholder/event_image.png",
        english_title: "Pray Together",
        arab_title: "Pray Together",
        speaker: "Ust. Abdul Karim",
        time_start: "2026-08-25T20:00:00.000Z",
        time_end: "2026-08-25T22:00:00.000Z",
      },
      {
        id: 4,
        image: "/Placeholder/event_image.png",
        english_title: "Pray Together",
        arab_title: "Pray Together",
        speaker: "Ust. Abdul Karim",
        time_start: "2026-08-26T20:00:00.000Z",
        time_end: "2026-08-26T22:00:00.000Z",
      },
      {
        id: 5,
        image: "/Placeholder/event_image.png",
        english_title: "Pray Together",
        arab_title: "Pray Together",
        speaker: "Ust. Abdul Karim",
        time_start: "2026-08-27T20:00:00.000Z",
        time_end: "2026-08-27T22:00:00.000Z",
      },
      {
        id: 6,
        image: "/Placeholder/event_image.png",
        english_title: "The Art of Islamic Calligraphy",
        arab_title: "The Art of Islamic Calligraphy",
        speaker: "Ust. Abdul Karim",
        time_start: "2026-08-28T14:51:00.000Z",
        time_end: "2026-08-28T16:30:00.000Z",
      },
      {
        id: 7,
        image: "/Placeholder/event_image.png",
        english_title: "Pray Together",
        arab_title: "Pray Together",
        speaker: "Ust. Abdul Karim",
        time_start: "2026-08-28T18:00:00.000Z",
        time_end: "2026-08-28T22:00:00.000Z",
      },
      {
        id: 8,
        image: "/Placeholder/event_image.png",
        english_title: "Pray Together",
        arab_title: "Pray Together",
        speaker: "Ust. Abdul Karim",
        time_start: "2026-08-29T20:00:00.000Z",
        time_end: "2026-08-29T22:00:00.000Z",
      },
      {
        id: 9,
        image: "/Placeholder/event_image.png",
        english_title: "Pray Together",
        arab_title: "Pray Together",
        speaker: "Ust. Abdul Karim",
        time_start: "2026-08-30T20:00:00.000Z",
        time_end: "2026-08-30T22:00:00.000Z",
      },
      {
        id: 10,
        image: "/Placeholder/event_image.png",
        english_title: "Q&A with the Scholar",
        arab_title: "Q&A with the Scholar",
        speaker: "Ust. Abdul Karim",
        time_start: "2026-09-01T10:00:00.000Z",
        time_end: "2026-09-01T22:20:00.000Z",
      },
      {
        id: 11,
        image: "/Placeholder/event_image.png",
        english_title: "The Art of Islamic Calligraphy",
        arab_title: "The Art of Islamic Calligraphy",
        speaker: "Ust. Abdul Karim",
        time_start: "2026-09-05T20:11:00.000Z",
        time_end: "2026-09-05T22:15:00.000Z",
      },
      {
        id: 13,
        image: "/Placeholder/event_image.png",
        english_title: "Ramadan Iftar Gathering",
        arab_title: "Ramadan Iftar Gathering",
        speaker: "Ust. Abdul Karim",
        time_start: "2026-09-02T20:00:00.000Z",
        time_end: "2026-09-02T23:00:00.000Z",
      },
      {
        id: 14,
        image: "/Placeholder/event_image.png",
        english_title: "We have Allah",
        arab_title: "We have Allah",
        speaker: "Ust. Abdul Karim",
        time_start: "2026-09-02T10:00:00.000Z",
        time_end: "2026-09-02T11:00:00.000Z",
      },
    ],
  };

  const dataLoop = {
    mobile_screen: [
      "onboarding 1.png",
      "login.png",
      "Home.png",
      "Lesson.png",
      "Article.png",
      "Lectures.png",
      "Fatwa.png",
      "E-book.png",
      "Live stream.png",
    ],
    recommended_activity: [
      {
        icon: "/Icon/quran.svg",
        title: "Al-Quran",
      },
      {
        icon: "/Icon/scroll.svg",
        title: "Hadits",
      },
      {
        icon: "/Icon/pray.svg",
        title: "Daily Pray",
      },
      {
        icon: "/Icon/story.svg",
        title: "Stories",
      },
    ],
  };

  const date = new Date();
  const textRef = useRef<HTMLParagraphElement>(null);
  const [isData, setIsData] = useState<any>({});
  const [isProfile, setIsProfile] = useState<any>({});
  const [readMoreButton, setReadMoreButton] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [sentencePopup, setSentencePopup] = useState<boolean>(false);
  const [tick, setTick] = useState<number>(0);
  const currentTime = `${String(date.getHours()).padStart(2, "0")}.${String(date.getMinutes()).padStart(2, "0")}`;
  const { isDictionary } = useDictionary();
  const [selectedDay, setSelectedDay] = useState<string>(
    new Date().toISOString().split("T")[0],
  );
  const isFetched = useRef(false);

  const fetchData = async () => {
    // if (isFetched.current) return;
    // isFetched.current = true;

    const hasData = sessionStorage.getItem("home");
    const hasProfile = sessionStorage.getItem("profile");
    if (!hasData) {
      try {
        setIsLoading(true);
        const res = await fetch("/api/home");
        const result = await res.json();
        sessionStorage.setItem("profile", JSON.stringify(result.profile));
        sessionStorage.setItem(
          "home",
          JSON.stringify({
            selected_verse: result.selected_verse,
            worship_schedule: result.worship_schedule,
          }),
        );

        setIsProfile(result.profile);
        setIsData({
          selected_verse: result.selected_verse,
          worship_schedule: result.worship_schedule,
        });
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
    } else {
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
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const getWorshipSchedule = (currentDay: string) => {
    const centerDate = new Date(currentDay);
    let dayNames = [];
    if (isDictionary === "English") {
      dayNames = ["Sun", "Mon", "Tue", "Web", "Thu", "Fri", "Sat"];
    } else {
      dayNames = [
        "الأحد",
        "الإثنين",
        "الثلاثاء",
        "الأربعاء",
        "الخميس",
        "الجمعة",
        "السبت",
      ];
    }

    const daysArray = [];

    for (let i = -3; i <= 3; i++) {
      const targetDate = new Date(centerDate);
      targetDate.setDate(centerDate.getDate() + i);

      const year = targetDate.getFullYear();
      const month = String(targetDate.getMonth() + 1).padStart(2, "0");
      const day = String(targetDate.getDate()).padStart(2, "0");

      const fullDate = `${year}-${month}-${day}`;

      daysArray.push({
        dateObj: targetDate,
        dayName: dayNames[targetDate.getDay()],
        getDate: targetDate.getDate(),
        fullDate: fullDate,
        isCenter: i === 0,
      });
    }
    return daysArray;
  };

  const handlePrevDay = () => {
    const d = new Date(selectedDay);
    d.setDate(d.getDate() - 1);
    setSelectedDay(d.toISOString().split("T")[0]);
  };

  const handleNextDay = () => {
    const d = new Date(selectedDay);
    d.setDate(d.getDate() + 1);
    setSelectedDay(d.toISOString().split("T")[0]);
  };

  const formatTimeToHoursMinutes = (isoString: string) => {
    const date = new Date(isoString);

    const hours = String(date.getUTCHours()).padStart(2, "0");
    const minutes = String(date.getUTCMinutes()).padStart(2, "0");

    return hours + "." + minutes;
  };

  const RenderWorshipSchedule = getWorshipSchedule(selectedDay);

  const visibleDateString = RenderWorshipSchedule.map((d) => d.fullDate);

  const filteringDatafetch = (isData?.worship_schedule || []).filter(
    (item: any) => {
      const eventDateOnly = item.time_start.split("T")[0];
      return visibleDateString.includes(eventDateOnly);
    },
  );

  const checkHasEvent: boolean = filteringDatafetch.some((item: any) => {
    const eventDateOnly = item.time_start.split("T")[0];
    return eventDateOnly === selectedDay;
  });

  const checkHasUpcoming: boolean = filteringDatafetch.some((item: any) => {
    const eventDateOnly = item.time_start.split("T")[0];
    return eventDateOnly === new Date().toISOString().split("T")[0];
  });

  const thisTime =
    selectedDay !== new Date().toISOString().split("T")[0]
      ? "00.00"
      : currentTime;

  const getNewSchedule = filteringDatafetch.filter(
    (item: any) =>
      new Date(item.time_end).toISOString().split("T")[0] ===
      selectedDay.split("T")[0],
  );

  const getTimeSchedule = getNewSchedule.filter(
    (item: any) => formatTimeToHoursMinutes(item.time_end) >= thisTime,
  );

  const getNewUpComing = (isData?.worship_schedule || []).filter(
    (item: any) => {
      const start = new Date(item.time_start).toISOString().split("T")[0];
      const now = new Date().toISOString().split("T")[0];
      if (start === now) return item;
    },
  );

  const getEventsUpcoming = getNewUpComing.find(
    (item: any) => formatTimeToHoursMinutes(item.time_start) >= currentTime,
  );

  console.log(isProfile);
  useEffect(() => {
    setTimeout(() => {
      if (tick == dataLoop.mobile_screen.length) {
        setTick(0);
        setTimeout(() => setTick(1), 100);
      } else {
        setTick(tick + 1);
      }
    }, 3000);
  }, [tick]);

  useEffect(() => {
    document.body.style.overflow = sentencePopup ? "hidden" : "auto";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [sentencePopup]);

  useEffect(() => {
    if (!textRef.current) return;
    setReadMoreButton(textRef.current.scrollHeight > 210);
  }, [dataFetch.selected_verse.verse]);

  // DICOMMENT dulu takut ingin dipakai nanti
  // const dayList = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  // const day = date.getDay();

  // let realDate = date.getDay() === 0 ? 6 : date.getDay() - 1;
  // const firstDay = date.getDate() - day + (day === 0 ? -6 : 1);
  // const monday = new Date(date.setDate(firstDay));
  // let worshipSchedule = [];
  // for (let i = 0; i < 7; i++) {
  //   const targetDate = new Date(monday);
  //   targetDate.setDate(monday.getDate() + i);

  //   const getDate = targetDate.getDate();

  //   worshipSchedule.push(getDate);
  // }

  const dateOperation = (
    start: string | undefined,
    end: string | undefined,
  ) => {
    if (!start || !end) return "0 Min";
    const timeStart =
      Number(start.substring(0, 1)) * 60 + Number(start.substring(3, 4));
    const timeEnd =
      Number(end.substring(0, 1)) * 60 + Number(end.substring(3, 4));
    return timeEnd - timeStart;
  };

  return (
    <div className="flex flex-col gap-12 items-center">
      <Header active={0} profileData={isProfile} isLoading={isLoading}></Header>
      <div className="flex justify-between h-full items-center w-350">
        {/* Left */}
        <div className="flex flex-1 justify-start min-w-0 gap-12 mr-20 mask-[linear-gradient(to_right,transparent_0%,white_20%,white_80%,transparent_100%)]">
          {/* phone loop */}
          <div
            className="w-80 h-[43.4545rem] rounded-2xl overflow-hidden relative shrink-0 ease-[cubic-bezier(0.37,0.4,0.16,1)]"
            style={{
              marginLeft: -11.5 - tick * 23 + "rem",
              transition: tick != 0 ? ".8s" : "",
            }}
          >
            <Image
              src={
                "/Image/MobileScreen/" +
                dataLoop.mobile_screen[dataLoop.mobile_screen.length - 1]
              }
              blurDataURL={
                "/Image/MobileScreen/" +
                dataLoop.mobile_screen[dataLoop.mobile_screen.length - 1]
              }
              placeholder="blur"
              fill
              alt={dataLoop.mobile_screen[
                dataLoop.mobile_screen.length - 1
              ].replaceAll(".png", "")}
              className="object-cover object-top"
            />
          </div>
          {dataLoop.mobile_screen.map((val, i) => {
            return (
              <div
                className="w-[20rem] h-[43.4545rem] rounded-2xl overflow-hidden relative shrink-0"
                key={i}
              >
                <Image
                  src={"/Image/MobileScreen/" + val}
                  blurDataURL={"/Image/MobileScreen/" + val}
                  placeholder="blur"
                  fill
                  alt={val.replaceAll(".png", "")}
                  className="object-cover object-top"
                />
              </div>
            );
          })}
          <div className="w-80 h-[43.4545rem] rounded-2xl overflow-hidden relative shrink-0">
            <Image
              src={"/Image/MobileScreen/" + dataLoop.mobile_screen[0]}
              blurDataURL={"/Image/MobileScreen/" + dataLoop.mobile_screen[0]}
              placeholder="blur"
              fill
              alt={dataLoop.mobile_screen[0].replaceAll(".png", "")}
              className="object-cover object-top"
            />
          </div>
          <div className="w-80 h-[43.4545rem] rounded-2xl overflow-hidden relative shrink-0">
            <Image
              src={"/Image/MobileScreen/" + dataLoop.mobile_screen[1]}
              blurDataURL={"/Image/MobileScreen/" + dataLoop.mobile_screen[1]}
              placeholder="blur"
              fill
              alt={dataLoop.mobile_screen[0].replaceAll(".png", "")}
              className="object-cover object-top"
            />
          </div>
        </div>
        {/* Right */}
        <div className="flex flex-col gap-2 top-4 z-1">
          <div className="grid w-153 h-100.5 gap-2 grid-rows-6 grid-cols-2 grid-flow-row">
            {/* today spiritual */}
            <div
              style={{
                gridRow: "6 span",
                gridColumn: "1 span",
                boxShadow: "0 4px 20px 0 rgba(0, 0, 0, 0.05)",
                backdropFilter: "blur(10px)",
                background:"var(--primary)",
                  // "linear-gradient(126deg, var(--primary) 80.01%, var(--dark-primary) 88.99%)",
                color: "white",
                borderRadius: "1.5rem",
                display: "flex",
                flexDirection: "column",
                padding: "1.5rem",
                gap: "3rem",
              }}
            >
              <h2 className="w-full text-xl/c-120 tracking-min-2 font-medium text-white">
                Syeikh Sentence
              </h2>
              <div className="flex flex-col items-center gap-6 flex-1 min-h-0">
                {!isLoading ? (
                  <h2 className="w-full text-2xl/c-120 tracking-min-2 font-medium text-white text-center">
                    {isData.selected_verse?.title}
                  </h2>
                ) : (
                  <div className="absolute inset-0 bg-black/40 backdrop-blur-xs rounded-[1.5rem] flex items-center justify-center z-10 transition-all">
                    <div className="flex items-center gap-2 text-white font-medium">
                      <svg
                        className="animate-spin h-6 w-6 text-white"
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
                  </div>
                )}

                {(isData.selected_verse || []).length <= 0 && (
                  <h2 className="text-slate-100">Data Is Unvailable</h2>
                )}
                <p
                  ref={textRef}
                  className="w-full text-[1rem]/[160%] tracking-min-2 font-normal text-white text-center
                flex-1 overflow-y-hidden min-h-0"
                >
                  <span>{isData.selected_verse?.verse}</span>
                </p>
                {readMoreButton && isData.selected_verse?.verse && (
                  <div
                    className="absolute bottom-0 w-full h-24 rounded-b-3xl flex items-center justify-center
                  bg-[linear-gradient(to_bottom,transparent,var(--dark-green))]"
                  >
                    <button
                      className="bg-[rgba(255,255,255,0.8)] text-dark-green font-medium text-[0.8rem]
                    rounded-xl p-[0.5rem_1rem] backdrop-blur-[3px] hover:brightness-75 duration-400 cursor-pointer"
                      onClick={() => {
                        setSentencePopup(true);
                      }}
                    >
                      Read More
                    </button>
                  </div>
                )}
              </div>
            </div>
            {/* my profile */}
            <ContentBox
              style={{
                gridRow: "4 span",
                gridColumn: "1 span",
                boxShadow: "0 4px 20px 0 rgba(0, 0, 0, 0.05)",
                backdropFilter: "blur(10px)",
                background: "rgba(255, 255, 255, 0.70)",
              }}
              title="My Profile"
            >
              {isLoading ? (
                // 1. Kondisi saat masih loading
                <div>
                  <div className="flex gap-2.5 items-center">
                    <div className="w-[76px] h-[76px] rounded-full bg-slate-300/70 blur-xs animate-pulse" />
                    <div className="flex flex-col flex-1 min-w-0">
                      <div className="w-30 h-5 bg-slate-300/70 blur-xs animate-pulse"></div>
                    </div>
                  </div>
                  <div className="flex gap-4.5 justify-start mt-4">
                    <div className="flex flex-col gap-1">
                      <h3 className="text-[0.75rem] blur-xs text-gray font-medium tracking-min-2">
                        Joined From
                      </h3>
                      <div className="w-20 h-5 bg-slate-300/70 blur-xs animate-pulse"></div>
                    </div>
                    <div className="flex flex-col gap-1 flex-1 min-w-0">
                      <h3 className="text-[0.75rem] text-gray blur-xs font-medium tracking-min-2">
                        Bio
                      </h3>
                      <div className="w-34 h-12 bg-slate-300/70 blur-xs animate-pulse"></div>
                    </div>
                  </div>
                </div>
              ) : isProfile?.name !== undefined ? (
                <div>
                  {/* photo & name */}
                  <div className="flex gap-2.5 items-center">
                    <Image
                      src={
                        isProfile?.photo
                          ? isProfile.photo
                          : "/Placeholder/placeholder-image.jpg"
                      }
                      alt="Profile Picture"
                      width={76}
                      height={76}
                      blurDataURL={
                        isProfile?.photo
                          ? isProfile.photo
                          : "/Placeholder/placeholder-image.jpg"
                      }
                      placeholder="blur"
                      className="rounded-full"
                    />
                    <div className="flex flex-col flex-1 min-w-0">
                      <h2 className="truncate text-text text-ellipsis whitespace-nowrap overflow-hidden text-[1rem] font-medium">
                        {isProfile.name}
                      </h2>
                    </div>
                  </div>
                  {/* joined & bio */}
                  <div className="flex gap-4.5 justify-start mt-4">
                    <div className="flex flex-col gap-1">
                      <h3 className="text-[0.75rem] text-gray font-medium tracking-min-2">
                        Joined From
                      </h3>
                      <h2 className="text-[1rem] font-medium tracking-min-2 text-dark-green">
                        {new Date(isProfile.created_at)
                          .toLocaleDateString()
                          .replace(/-/g, "/")}
                      </h2>
                    </div>
                    <div className="flex flex-col gap-1 flex-1 min-w-0">
                      <h3 className="text-[0.75rem] text-gray font-medium tracking-min-2">
                        Bio
                      </h3>
                      <h2 className="text-[0.625rem]/[120%] font-regular tracking-min-2 text-dark-green line-clamp-4">
                        {isProfile.bio}
                      </h2>
                    </div>
                  </div>
                </div>
              ) : (
                // 3. Kondisi saat loading selesai TAPI datanya bener-bener kosong / nggak ada
                <div className="flex items-center justify-center h-full">
                  <p className="text-gray text-sm/c-120 tracking-min-2 font-regular">
                    No Profile Found
                  </p>
                </div>
              )}
            </ContentBox>
            {/* upcoming worship */}
            <div className="flex p-6 bg-[rgba(255,255,255,0.70)] backdrop-blur-[10px] shadow-[0_4px_20px_0_rgba(0,0,0,0.05)] row-span-2 gap-3 items-center rounded-3xl">
              <div className="border-2 border-secondary h-full rounded-full"></div>
              <div
                className={`${checkHasUpcoming ? "justify-between" : "gap-3"} flex flex-col  flex-1 h-full`}
              >
                <h2 className="w-full text-text text-xl/c-120 tracking-min-2 font-medium">
                  {isDictionary === "Arab"
                    ? "الحدث القادم"
                    : "Upcoming Worship"}
                </h2>
                {checkHasUpcoming ? (
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="text-gray text-sm/c-120 tracking-min-2 font-regular">
                        {isDictionary === "Arab"
                          ? getEventsUpcoming?.arab_title || "لا يوجد حدث"
                          : getEventsUpcoming?.english_title || "No Event"}
                      </h3>
                      <h2 className="text-dark-green text-2xl/c-120 font-medium tracking-min-2 font-regular">
                        {getEventsUpcoming?.time_start
                          ? formatTimeToHoursMinutes(
                              getEventsUpcoming.time_start,
                            )
                          : "00.00"}
                      </h2>
                    </div>
                    <h2>
                      {getEventsUpcoming?.time_start &&
                        dateOperation("00.00", "00.00")}
                    </h2>
                  </div>
                ) : (
                  <div className="flex items-center">
                    <h3 className="text-gray text-sm/c-120 tracking-min-2 font-regular">
                      {isDictionary === "Arab"
                        ? getEventsUpcoming?.arab_title || "لا يوجد حدث"
                        : getEventsUpcoming?.english_title || "No Event"}
                    </h3>
                  </div>
                )}
              </div>
            </div>
          </div>
          {/* worship schedule */}
          <ContentBox
            style={{
              boxShadow: "0 4px 20px 0 rgba(0, 0, 0, 0.05)",
              backdropFilter: "blur(10px)",
              background: "rgba(255, 255, 255, 0.70)",
            }}
            title="Worship Schedule"
          >
            <div className="flex gap-2 items-center transition-all duration-200">
              <button
                onClick={handlePrevDay}
                className="h-11 w-5 hover:bg-slate-300/40 transition-all duration-200 cursor-pointer rounded-lg"
              >
                <ChevronLeft />
              </button>
              {RenderWorshipSchedule.map((val, i) => {
                let type = val.isCenter;
                const hasEvent: boolean = filteringDatafetch.some(
                  (item: any) => item.time_start.split("T")[0] === val.fullDate,
                );
                return (
                  <div
                    key={i}
                    onClick={() => {
                      setSelectedDay(val.fullDate);
                    }}
                    className="cursor-pointer hover:bg-slate-200/60 transition-all duration-200 rounded-xl"
                  >
                    <WorshipSchedule
                      key={i}
                      date={val.getDate}
                      day={val.dayName}
                      type={type}
                      hasEvent={hasEvent}
                    />
                  </div>
                );
              })}
              <button
                onClick={handleNextDay}
                className="h-11 w-5 hover:bg-slate-300/40 transition-all duration-200 cursor-pointer rounded-lg"
              >
                <ChevronRight />
              </button>
            </div>
            {checkHasEvent ? (
              <div className="flex justify-between">
                <Image
                  src={
                    getTimeSchedule[0]?.image || "/Placeholder/event_image.png"
                  }
                  alt="Event Thumbnail"
                  width={92}
                  height={92}
                  className="rounded-xl"
                />
                <div className="flex flex-col justify-center">
                  <h3 className="w-50 text-text text-xl/c-120 tracking-min-2 font-medium">
                    {isDictionary === "Arab"
                      ? getTimeSchedule[0]?.arab_title || "لا يوجد حدث"
                      : getTimeSchedule[0]?.english_title || "No Event"}
                  </h3>
                  <h4 className="w-50 text-gray text-base/c-120 font-normal tracking-min-2">
                    {getTimeSchedule[0]?.speaker || "No Speaker"}
                  </h4>
                </div>
                <div className="border border-gray w-px"></div>
                <div className="flex flex-col justify-center">
                  <h4 className="w-45 text-gray text-base/c-120 font-normal tracking-min-2">
                    {date.toLocaleDateString("en-US", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </h4>
                  <h3 className="w-45 text-text text-xl/c-120 tracking-min-2 font-medium">
                    {getTimeSchedule[0]?.time_start &&
                      getTimeSchedule[0]?.time_end &&
                      formatTimeToHoursMinutes(getTimeSchedule[0]?.time_start) +
                        " - " +
                        formatTimeToHoursMinutes(getTimeSchedule[0]?.time_end)}
                    {!getTimeSchedule[0]?.time_start &&
                      !getTimeSchedule[0]?.time_end &&
                      "00:00 - 00:00"}
                  </h3>
                </div>
              </div>
            ) : (
              <div className="w-full h-full flex justify-center items-center mt-2">
                <h3 className="w-full text-text text-xl/c-120 tracking-min-2 font-medium text-center">
                  {isDictionary === "Arab" ? "لا يوجد حدث" : "No Event"}
                </h3>
              </div>
            )}
          </ContentBox>
        </div>
      </div>
      {/* navbar left */}
      <LeftNavbar state={0} />
      {/* popup */}
      {sentencePopup && (
        <>
          <div
            className="fixed w-full h-full bg-[rgba(0,0,0,0.7)] z-1001 top-0 left-0"
            onClick={() => setSentencePopup(false)}
          ></div>
          <div className="absolute bg-white rounded-2xl max-w-[80vw] max-h-[80vh] md:w-200 p-6 flex flex-col gap-6 items-center min-h-0 z-1002 left-[50%] top-[50%] translate-[-50%]">
            <h2 className="text-dark-green text-[2.5rem]/[120%] font-medium text-center">
              {isData.selected_verse?.title}
            </h2>
            <p className="text-text text-[1.2rem]/[160%] font-normal text-center flex-1 overflow-y-auto">
              {isData.selected_verse?.verse}
            </p>
          </div>
        </>
      )}
    </div>
  );
};

export default page;
