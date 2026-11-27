"use client";
import ContentBox from "@/app/Component/ContentBox";
import Header from "@/app/Component/Header";
import LeftNavbar from "@/app/Component/LeftNavbar";
import SvgImg from "@/app/Component/SvgImg";
import { useDictionary } from "@/provider/useDictionary";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";

interface detailViewProps {
  id: string;
}

const dataFetch = {
  profile: {
    name: "Muhammad Rizki",
    status: "Ustad",
    photo: "/Placeholder/profile_image.jpeg",
  },
  item: {
    id: 1,
    title: "The Beauty Of Forgiveness In Islam",
    photo: "/Placeholder/profile_image.jpeg",
    banner: "/Image/banner1.webp",
    name: "Ust Ridzki",
    created_at: "12 Januari 2020",
    text: "In Islam, forgiveness is not merely a passive act of pardoning someone who has wronged you, but a profound spiritual state that reflects the divine mercy of Allah, serving as a pillar of personal peace and social harmony. At its core, forgiving others when one has the power to retaliate is celebrated in the Quran and Hadith as a noble virtue that elevates the human soul, bridging the gap between human frailty and spiritual excellence. When a believer chooses to let go of anger, resentment, and the desire for vengeance, they are actively embodying the beautiful attribute of Al-Afw (the Pardoner) and Al-Ghaffar (the Perpetual Forgiver), recognizing that true strength lies in self-mastery rather than destructive retribution. This practice is deeply transformative, liberating the heart from the heavy burden of grudges and replacing toxic animosity with compassion, empathy, and emotional clarity. Furthermore, the Quran repeatedly encourages believers to practice forgiveness even in the face of grave injustice, promising immense spiritual rewards and divine love, as seen in verses that describe the righteous as those who suppress their anger and pardon people. In the context of community and interpersonal relationships, forgiveness acts as a social adhesive, repairing broken bonds, neutralizing cycles of revenge, and fostering an environment of mutual respect, healing, and reconciliation. It teaches us that human relationships are inherently imperfect, and that patience coupled with pardoning is the only sustainable way to maintain brotherhood and sisterhood. By forgiving others, a person also opens the door to receiving Allah's own boundless forgiveness, creating a reciprocal cycle of grace that purifies intentions and heals societal fractures from the ground up. Ultimately, the beauty of forgiveness in Islam lies in its dual capacity to transform the inner landscape of the individual into a sanctuary of tranquility while simultaneously building a compassionate, resilient, and unified community rooted in peace. In Islam, forgiveness is not merely a passive act of pardoning someone who has wronged you, but a profound spiritual state that reflects the divine mercy of Allah, serving as a pillar of personal peace and social harmony. At its core, forgiving others when one has the power to retaliate is celebrated in the Quran and Hadith as a noble virtue that elevates the human soul, bridging the gap between human frailty and spiritual excellence. When a believer chooses to let go of anger, resentment, and the desire for vengeance, they are actively embodying the beautiful attribute of Al-Afw (the Pardoner) and Al-Ghaffar (the Perpetual Forgiver), recognizing that true strength lies in self-mastery rather than destructive retribution. This practice is deeply transformative, liberating the heart from the heavy burden of grudges and replacing toxic animosity with compassion, empathy, and emotional clarity. Furthermore, the Quran repeatedly encourages believers to practice forgiveness even in the face of grave injustice, promising immense spiritual rewards and divine love, as seen in verses that describe the righteous as those who suppress their anger and pardon people. In the context of community and interpersonal relationships, forgiveness acts as a social adhesive, repairing broken bonds, neutralizing cycles of revenge, and fostering an environment of mutual respect, healing, and reconciliation. It teaches us that human relationships are inherently imperfect, and that patience coupled with pardoning is the only sustainable way to maintain brotherhood and sisterhood. By forgiving others, a person also opens the door to receiving Allah's own boundless forgiveness, creating a reciprocal cycle of grace that purifies intentions and heals societal fractures from the ground up. Ultimately, the beauty of forgiveness in Islam lies in its dual capacity to transform the inner landscape of the individual into a sanctuary of tranquility while simultaneously building a compassionate, resilient, and unified community rooted in peace.",
  },
  popular_article: [
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
      image: "/Placeholder/event_image.png",
      read_time: 180,
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
      image: "/Placeholder/event_image.png",
      read_time: 180,
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
      image: "/Placeholder/event_image.png",
      read_time: 180,
    },
  ],
  newest_article: [
    {
      id: 1,
      translation: {
        English: {
          title: "The Beauty of Forgiveness in Islam",
          description:
            "Forgiving does not mean being weak, but shows strength of heart and courage.",
          date: "14 May 2024",
        },
        Arab: {
          title: "جمال العفو في الإسلام",
          description: "العفو لا يعني الضعف، بل يظهر قوة القلب والشجاعة",
          date: "14 مايو 2024",
        },
      },
      image: "/Placeholder/event_image.png",
      read_time: 180,
    },
    {
      id: 2,
      translation: {
        English: {
          title: "The Beauty of Forgiveness in Islam",
          description:
            "Forgiving does not mean being weak, but shows strength of heart and courage.",
          date: "14 May 2024",
        },
        Arab: {
          title: "جمال العفو في الإسلام",
          description: "العفو لا يعني الضعف، بل يظهر قوة القلب والشجاعة",
          date: "14 مايو 2024",
        },
      },
      image: "/Placeholder/event_image.png",
      read_time: 180,
    },
    {
      id: 3,
      translation: {
        English: {
          title: "The Beauty of Forgiveness in Islam",
          description:
            "Forgiving does not mean being weak, but shows strength of heart and courage.",
          date: "14 May 2024",
        },
        Arab: {
          title: "جمال العفو في الإسلام",
          description: "العفو لا يعني الضعف، بل يظهر قوة القلب والشجاعة",
          date: "14 مايو 2024",
        },
      },
      image: "/Placeholder/event_image.png",
      read_time: 180,
    },
  ],
  comments: [
    {
      id: 1,
      name: "Lionel Mehmed",
      comment: "The Article its wonderfull, when i read it it makes me cry....",
      image: "/Placeholder/profile_image.jpeg",
      created_at: "20 August 2026, 11:03",
      comment_time: 180,
    },
    {
      id: 2,
      name: "Cristiano Altair",
      comment: "When i look the article make me want SIUUUUUUUU",
      image: "/Placeholder/profile_image.jpeg",
      created_at: "30 August 2026, 10:53",
      comment_time: 190,
    },
    {
      id: 3,
      name: "Siti Rahma",
      comment:
        "This really opened my eyes. Thank you for sharing such a deep perspective!",
      image: "/Placeholder/profile_image.jpeg",
      created_at: "31 August 2026, 10:43",
      comment_time: 200,
    },
    {
      id: 4,
      name: "Budi Santoso",
      comment:
        "Very informative and straight to the point. Bookmarked for later!",
      image: "/Placeholder/profile_image.jpeg",
      created_at: "31 August 2026, 10:28",
      comment_time: 215,
    },
    {
      id: 5,
      name: "Jessica Wijaya",
      comment:
        "I totally agree with the second point. It happened to me last week too.",
      image: "/Placeholder/profile_image.jpeg",
      created_at: "31 August 2026, 10:03",
      comment_time: 240,
    },
    {
      id: 6,
      name: "Ahmad Fauzi",
      comment:
        "Wait, is there going to be a part two for this? Would love to read more.",
      image: "/Placeholder/profile_image.jpeg",
      created_at: "31 August 2026, 09:03",
      comment_time: 300,
    },
    {
      id: 7,
      name: "Dewi Lestari",
      comment:
        "The writing style is so soothing. Made my morning coffee even better.",
      image: "/Placeholder/profile_image.jpeg",
      created_at: "31 August 2026, 08:13",
      comment_time: 350,
    },
    {
      id: 8,
      name: "Kevin Pratama",
      comment:
        "Not gonna lie, I was skeptical at first, but this actually makes a lot of sense.",
      image: "/Placeholder/profile_image.jpeg",
      created_at: "31 August 2026, 07:03",
      comment_time: 420,
    },
    {
      id: 9,
      name: "Rina Kusuma",
      comment:
        "Sending this to all my friends right now. Everyone needs to read this.",
      image: "/Placeholder/profile_image.jpeg",
      created_at: "31 August 2026, 06:03",
      comment_time: 480,
    },
    {
      id: 10,
      name: "Michael Chen",
      comment: "Absolute masterpiece of an article. Keep up the great work!",
      image: "/Placeholder/profile_image.jpeg",
      created_at: "31 August 2026, 05:33",
      comment_time: 510,
    },
    {
      id: 11,
      name: "Sarah Jenkins",
      comment:
        "Such an inspiring read! I've shared it on my social media channels.",
      image: "/Placeholder/profile_image.jpeg",
      created_at: "31 August 2026, 04:53",
      comment_time: 550,
    },
    {
      id: 12,
      name: "Eko Prasetyo",
      comment:
        "Mantap sekali artikelnya, sangat membantu untuk pemula seperti saya.",
      image: "/Placeholder/profile_image.jpeg",
      created_at: "31 August 2026, 04:03",
      comment_time: 600,
    },
    {
      id: 13,
      name: "Clara Tan",
      comment:
        "I had a completely different view before reading this, now I'm rethinking everything.",
      image: "/Placeholder/profile_image.jpeg",
      created_at: "31 August 2026, 03:23",
      comment_time: 640,
    },
    {
      id: 14,
      name: "Dimas Anggara",
      comment: "Short, concise, and packed with valuable information. Love it!",
      image: "/Placeholder/profile_image.jpeg",
      created_at: "31 August 2026, 02:23",
      comment_time: 700,
    },
    {
      id: 15,
      name: "Linda Permata",
      comment: "Can you make a detailed tutorial on this topic next? Please!",
      image: "/Placeholder/profile_image.jpeg",
      created_at: "31 August 2026, 01:33",
      comment_time: 750,
    },
    {
      id: 16,
      name: "Rizky Ramadhan",
      comment: "Extremely well-researched. Kudos to the author for the effort.",
      image: "/Placeholder/profile_image.jpeg",
      created_at: "31 August 2026, 00:33",
      comment_time: 810,
    },
    {
      id: 17,
      name: "Maya Susanti",
      comment:
        "This made my day so much better. Thanks for writing this piece.",
      image: "/Placeholder/profile_image.jpeg",
      created_at: "30 August 2026, 23:43",
      comment_time: 860,
    },
    {
      id: 18,
      name: "Alex Turner",
      comment:
        "Brilliant insights! Saving this to my favorites list right now.",
      image: "/Placeholder/profile_image.jpeg",
      created_at: "30 August 2026, 22:43",
      comment_time: 920,
    },
    {
      id: 19,
      name: "Putri Utami",
      comment:
        "Penjelasannya sangat rapi dan mudah dipahami. Terima kasih infonya!",
      image: "/Placeholder/profile_image.jpeg",
      created_at: "30 August 2026, 21:43",
      comment_time: 980,
    },
    {
      id: 20,
      name: "David Beckham",
      comment: "Top-tier content as always. Looking forward to the next post!",
      image: "/Placeholder/profile_image.jpeg",
      created_at: "30 August 2026, 20:33",
      comment_time: 1050,
    },
  ],
};

function paginationComment(
  currentPages: number,
  totalPages: number,
  maxVisible = 5,
) {
  if (totalPages <= maxVisible) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  const pages: (number | string)[] = [];

  if (currentPages <= 3) {
    pages.push(1, 2, 3, 4, "...", totalPages);
  } else if (currentPages >= totalPages - 2) {
    pages.push(
      1,
      "...",
      totalPages - 3,
      totalPages - 2,
      totalPages - 1,
      totalPages,
    );
  } else {
    pages.push(
      1,
      "...",
      currentPages - 1,
      currentPages,
      currentPages + 1,
      "...",
      totalPages,
    );
  }

  return pages;
}

export default function DetailViewPage({ id }: detailViewProps) {
  const { t, isDictionary } = useDictionary();
  const router = useRouter();
  const [isCurrentPage, setIsCurrentPage] = useState<number>(1);
  const [isComment, setIsComment] = useState<any>(dataFetch.comments);
  const [addComment, setAddComment] = useState<string>("");
  const [isLoadingComment, setIsLoadingComment] = useState<boolean>(false);
  const [isData, setIsData] = useState<any>({});
  const [isProfile, setIsProfile] = useState<any>({});
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const fetchRef = useRef(false);
  const orderBydata = isComment.sort(
    (a: any, b: any) => a.comment_time - b.comment_time,
  );
  const itemPage = 3;

  const startIndex = (isCurrentPage - 1) * itemPage;
  const currentData = orderBydata.slice(startIndex, startIndex + itemPage);
  const totalPages = Math.ceil(orderBydata.length / itemPage);
  const paginationNumbering = paginationComment(isCurrentPage, totalPages);

  const numberToDuration = (second: number) => {
    if (second <= 60) return "Just second ago";
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

  const handleRouting = (id: number) => router.push(`/article/${id}`);

  const handleAddComment = (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      setIsLoadingComment(true);
      const now = new Date();
      const data = {
        id: isComment.length + 1,
        name: dataFetch.profile.name,
        comment: addComment,
        image: dataFetch.profile.photo,
        created_at: now,
        comment_time: 1,
      };
      setIsComment((prev: any) => [data, ...prev]);
    } catch (error) {
      alert(error);
    } finally {
      setTimeout(() => {
        setAddComment("");
        setIsLoadingComment(false);
      }, 3000);
    }
  };
  const fetchDetailArticle = async (getId: string) => {
    const hasData = sessionStorage.getItem("detailarticle");
    const hasProfile = sessionStorage.getItem("profile");
    let check;

    if (hasData) {
      const data = JSON.parse(hasData);
      check = data.article.id == getId;
    }

    if (check) {
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

        setIsLoading(false);
        return;
      } catch (e) {
        console.log("Error parsing session storage", e);
      }
    }

    try {
      const res = await fetch(`/api/article?id=${getId}`);
      if (!res.ok) {
        setIsLoading(false);
        throw new Error("Failed Fetch article-list");
      }
      const data = await res.json();

      const initialData = {
        article: data.article,
        newest_article: data.newest_article,
        popular_article: data.popular_article,
      };

      sessionStorage.setItem("profile", JSON.stringify(data.profile));
      sessionStorage.setItem("detailarticle", JSON.stringify(initialData));

      setIsProfile(data.profile);
      setIsData(initialData);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchDetailArticle(id);
  }, [id]);

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

  return (
    <div className="flex flex-col gap-2 items-center">
      <Header active={2} profileData={isProfile}></Header>
      <div className="flex md:flex-row flex-col gap-2">
        <div className="flex flex-col gap-2 w-[30rem] max-w-[50rem] overflow-hidden">
          <div className="flex flex-col items-start bg-white-gray gap-4 w-full rounded-xl h-full overflow-hidden">
            {isLoading ? (
              /* --- SKETON LOADING STATE --- */
              <div className="w-full flex flex-col gap-4 animate-pulse">
                {/* Skeleton Banner */}
                <div className="banner rounded-xl w-full h-[250px] bg-slate-300" />

                <div className="flex flex-col justify-start items-start gap-4.5 px-8 w-full">
                  {/* Skeleton Title */}
                  <div className="h-10 bg-slate-300 rounded-md w-3/4" />

                  {/* Skeleton Date */}
                  <div className="flex flex-row gap-[13px] items-center">
                    <div className="h-4 bg-slate-300 rounded w-32" />
                  </div>
                </div>

                {/* Skeleton Content Paragraphs */}
                <div className="relative h-full px-8 pb-8 w-full flex flex-col gap-3">
                  <div className="h-4 bg-slate-300 rounded w-full" />
                  <div className="h-4 bg-slate-300 rounded w-5/6" />
                  <div className="h-4 bg-slate-300 rounded w-4/6" />
                </div>
              </div>
            ) : !isData.article || Object.keys(isData.article).length === 0 ? (
              /* --- DATA KOSONG STATE --- */
              <div className="flex items-center justify-center w-full h-[350px] px-8 text-center">
                <p className="text-xl font-medium text-gray/70">
                  {isDictionary === "Arab"
                    ? "البيانات غير متوفرة"
                    : "Data Unavailable"}
                </p>
              </div>
            ) : (
              /* --- REAL CONTENT --- */
              <>
                <div className="banner rounded-xl w-full p-0 m-0 overflow-hidden">
                  <Image
                    src={isData.article?.image || "/Image/banner1.webp"}
                    alt={
                      isDictionary === "Arab"
                        ? isData.article?.arab_title
                        : isData.article?.english_title
                    }
                    width={1200}
                    height={600}
                    className="w-full h-[250px] object-cover rounded-xl"
                  />
                </div>
                <div className="flex flex-col justify-start items-start gap-4.5 px-8">
                  <h1 className="font-bold text-4xl tracking-[-0.72px] leading-[120%] text-text">
                    {isDictionary === "Arab"
                      ? isData.article?.arab_title
                      : isData.article?.english_title}
                  </h1>
                  <div className="flex flex-row gap-[13px] items-center">
                    <div className="flex flex-col gap-2 ">
                      <div className="flex items-center gap-1">
                        <SvgImg
                          size={1.2}
                          src="/Icon/calendar.svg"
                          alt="Calendar"
                          usrSlct
                        ></SvgImg>
                        <span className="text-[14px] font-bold leading-[120%] tracking-[-0.28px] text-gray/90">
                          {formatDate(isData.article?.created_at)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="relative max-h-[36.2rem] h-full px-8 pb-8 w-full">
                  <div className="h-full overflow-y-auto pr-2">
                    <p className="text-justify mb-4">
                      {isDictionary === "Arab"
                        ? isData.article?.arab_content
                        : isData.article?.english_content}
                    </p>
                  </div>
                  <div className="pointer-events-none absolute bottom-4 left-0 right-0 h-16 bg-gradient-to-t from-white-gray to-transparent" />
                </div>
              </>
            )}
          </div>
          <div className="relative flex flex-col bg-white rounded-3xl p-6 items-start gap-6 justify-end self-start w-full">
            {isLoading ||
              (isLoadingComment && (
                <div className="absolute inset-0 bg-black/40 backdrop-blur-xs rounded-xl flex items-center justify-center z-10 transition-all">
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
              ))}
            <h2 className="text-dark-green font-semibold leading-[120%] tracking-[-0.4px] text-[20px]">
              Comments
            </h2>
            <div className="flex flex-col gap-6 w-full">
              {currentData.map((item: any, i: number) => {
                return (
                  <div className="flex flex-col gap-0" key={item.id}>
                    <div className="flex flex-row gap-[13px] items-center">
                      <Image
                        src={item.image}
                        alt={item.name}
                        width={40}
                        height={40}
                        className={`obtain-cover rounded-[100%] border border-slate-300/90 ${isLoadingComment ? "animate-pulse blur-md" : ""}`}
                      />
                      <p
                        className={`text-md font-bold leading-[120%] tracking-[-0.72px] text-text ${isLoadingComment ? "animate-pulse blur-md" : ""}`}
                      >
                        {item.name}
                      </p>
                      <div
                        className={`flex gap-1 items-center ${isLoadingComment ? "animate-pulse blur-md" : ""}`}
                      >
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
                        <p
                          className={`text-gray text-[0.75rem] font-normal tracking-min-2 ${isLoadingComment ? "animate-pulse blur-md" : ""}`}
                        >
                          {numberToDuration(item.comment_time)}
                        </p>
                      </div>
                    </div>
                    <div
                      className={`flex flex-col ml-13 text-text text-sm leading-tight ${isLoadingComment ? "animate-pulse blur-md" : ""}`}
                    >
                      <p className="break-all">{item.comment}</p>
                    </div>
                  </div>
                );
              })}
              <div
                className={`flex items-center justify-center mt-2 gap-4 ${isLoadingComment ? "animate-pulse blur-md" : ""}`}
              >
                {paginationNumbering.map((item, i) => {
                  const isDots = typeof item !== "number";
                  return (
                    <div
                      key={i}
                      onClick={() => {
                        if (isDots) return;
                        setIsCurrentPage(item);
                      }}
                      className={`${item !== isCurrentPage ? "text-[#41403B] text-sm font-semibold " : "text-[#0E3E2C] text-lg font-bold"} tracking-[-0.32px] leading-[120%] ${isDots ? "" : "cursor-pointer"}`}
                    >
                      {item}
                    </div>
                  );
                })}
              </div>

              <div className="flex flex-col mt-4 item-center w-full gap-2">
                <form onSubmit={handleAddComment}>
                  <textarea
                    className="w-full p-3 h-30 border border-slate-300/80 rounded-xl shadow-xs focus:outline-dark-green resize-none transition duration-200"
                    name="comment"
                    id=""
                    value={addComment}
                    onChange={(e) => setAddComment(e.target.value)}
                    placeholder="Your Comments"
                    required
                    disabled={isLoadingComment}
                  ></textarea>
                  <div className="flex justify-end items-center">
                    <button
                      type="submit"
                      disabled={isLoadingComment}
                      className="bg-dark-green text-white h-8 rounded-lg flex items-center justify-center p-5 hover:bg-dark-green/60 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isLoadingComment ? "Loading..." : "Post"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        <div className="sticky top-4 flex flex-col gap-2 self-start">
          <div className="flex flex-col bg-white max-h-[calc(100vh-2rem)] overflow-y-auto border border-slate-200 rounded-xl shadow-xs">
            {/* popular article */}
            <ContentBox title={"Popular Article"}>
              <div className="flex flex-col gap-4">
                {isLoading ? (
                  /* --- SKELTON LOADING STATE (Bikin 3-4 baris tiruan list) --- */
                  <div className="flex flex-col gap-3 w-full animate-pulse">
                    {[1, 2, 3].map((_, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-6 p-2 rounded-2xl w-full"
                      >
                        {/* Skeleton Nomor urut */}
                        <div className="w-6 h-6 rounded-lg bg-slate-300 shrink-0" />
                        {/* Skeleton Thumbnail Gambar */}
                        <div className="rounded-2xl w-21 h-21 bg-slate-300 shrink-0" />
                        {/* Skeleton Teks */}
                        <div className="flex flex-col gap-2 flex-1">
                          <div className="h-5 bg-slate-300 rounded w-3/4" />
                          <div className="flex gap-6">
                            <div className="h-3 bg-slate-300 rounded w-20" />
                            <div className="h-3 bg-slate-300 rounded w-16" />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : !isData.popular_article ||
                  isData.popular_article.length === 0 ? (
                  /* --- DATA KOSONG STATE --- */
                  <div className="flex items-center justify-center w-full py-8 text-center">
                    <p className="text-base font-medium text-gray/70">
                      {isDictionary === "Arab"
                        ? "البيانات غير متوفرة"
                        : "Data Unavailable"}
                    </p>
                  </div>
                ) : (
                  /* --- REAL CONTENT LIST --- */
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
                  })
                )}
              </div>
            </ContentBox>
            {/* newest article */}
            <ContentBox title={"Newest Article"}>
              <div className="flex flex-col gap-4">
                {isLoading ? (
                  /* --- SKELETON LOADING STATE --- */
                  <div className="flex flex-col gap-4 w-full animate-pulse">
                    {[1, 2, 3].map((_, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-6 p-2 px-2 rounded-2xl w-full"
                      >
                        {/* Skeleton Thumbnail Gambar (w-31 h-31) */}
                        <div className="rounded-2xl w-31 h-31 bg-slate-300 shrink-0" />
                        {/* Skeleton Konten Teks */}
                        <div className="flex flex-col gap-3 flex-1">
                          <div className="flex flex-col gap-2">
                            <div className="h-5 bg-slate-300 rounded w-3/4" />
                            <div className="h-4 bg-slate-300 rounded w-full" />
                          </div>
                          <div className="flex gap-6">
                            <div className="h-3 bg-slate-300 rounded w-20" />
                            <div className="h-3 bg-slate-300 rounded w-16" />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : !isData.newest_article ||
                  isData.newest_article.length === 0 ? (
                  /* --- DATA KOSONG STATE --- */
                  <div className="flex items-center justify-center w-full py-8 text-center">
                    <p className="text-base font-medium text-gray/70">
                      {isDictionary === "Arab"
                        ? "البيانات غير متوفرة"
                        : "Data Unavailable"}
                    </p>
                  </div>
                ) : (
                  /* --- REAL CONTENT LIST --- */
                  (isData.newest_article || []).map((val: any, i: any) => {
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
                  })
                )}
              </div>
            </ContentBox>
          </div>
          <div className="top-[20rem] flex">
            {/* newsletter */}
            <div className="flex flex-col p-6 bg-white gap-6 flex-1 rounded-3xl">
              <h2 className="text-[1.4375rem]/[140%] text-dark-green font-medium tracking-min-2">
                {`Newstletter`}
              </h2>
              <p className="text-[1rem]/[140%] tracking-min-2 text-dark-green font-normal">
                {`Get the latest articles delivered to your inbox every week.`}
              </p>
              {/* send */}
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder={`Enter your email`}
                  className="flex-1 p-3 border border-[rgba(0,0,0,0.20)] font-medium tracking-min-2 text-text text-[0.75rem] rounded-lg"
                ></input>
                <button className="bg-dark-green rounded-lg w-10.25 h-10.25 flex items-center justify-center">
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

      <LeftNavbar state={2} />
    </div>
  );
}
