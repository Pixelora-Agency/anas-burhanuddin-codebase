import {
  LessonsCategory,
  LiveStatus,
  LiveType,
} from "@/app/generated/prisma/client";
import { getPrisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const prisma = getPrisma();
  const types = [
    "lesson",
    "article",
    "lecture",
    "fatwa",
    "ebook",
    "soundstream",
    "livestream",
  ];

  const lessonsData = [];
  const articleData = [];
  const lectureData = [];
  const fatwaData = [];
  const ebookData = [];
  const liveData = [];

  const categories = Object.values(LessonsCategory);
  const statuses = Object.values(LiveStatus);

  for (let i = 1; i <= 10; i++) {
    const randomVisitor = Math.floor(Math.random() * 6000);
    const randomImage = "/Placeholder/event_image.png";

    // Masukkan data ke MINGGU/MASING-MASING tabel secara langsung di tiap iterasi
    lessonsData.push({
      image: randomImage,
      category: categories[i % categories.length],
      english_title: `Sample Content ${i} (lesson)`,
      english_chapter: `Chapter ${i}`,
      english_content: `English content for lesson ${i}...`,
      arab_title: `محتوى تجريبي رقم ${i}`,
      arab_chapter: `الفصل ${i}`,
      arab_content: `محتوى الدرس باللغة العربية رقم ${i}...`,
      author: `Author ${i}`,
      time_start: new Date(Date.now() - 86400000 * i),
      time_end: new Date(Date.now() - 86400000 * i + 3600000),
      visitor: randomVisitor,
      read_time: 10,
    });

    articleData.push({
      image: randomImage,
      english_title: `Sample Content ${i} (article)`,
      english_description: `Description for article ${i}`,
      english_content: `Content for article ${i}...`,
      arab_title: `محتوى تجريبي رقم ${i}`,
      arab_description: `وصف المقال رقم ${i}`,
      arab_content: `محتوى المقال باللغة العربية رقم ${i}...`,
      created_at: new Date(Date.now() - i * 3600000),
      duration: 5,
      visitor: randomVisitor,
      read_time: 5,
    });

    lectureData.push({
      image: randomImage,
      english_title: `Sample Content ${i} (lecture)`,
      english_description: `Description for lecture ${i}`,
      arab_title: `محتوى تجريبي رقم ${i}`,
      arab_description: `وصف المحاضرة رقم ${i}`,
      created_at: new Date(Date.now() - i * 7200000),
      duration: 30,
      visitor: randomVisitor,
    });

    fatwaData.push({
      image: randomImage,
      english_title: `Sample Content ${i} (fatwa)`,
      english_desc: `Desc fatwa ${i}`,
      english_content: `Content fatwa ${i}...`,
      arab_title: `محتوى تجريبي رقم ${i}`,
      arab_desc: `وصف الفتوى رقم ${i}`,
      arab_content: `محتوى الفتوى باللغة العربية رقم ${i}...`,
      questioner: `Questioner Name ${i}`,
      created_at: new Date(Date.now() - i * 1000000),
      visitor: randomVisitor,
      read_time: 7,
      duration: 10,
    });

    ebookData.push({
      image: randomImage,
      english_title: `Sample Content ${i} (ebook)`,
      english_desc: `Desc ebook ${i}`,
      english_author: `Author Ebook ${i}`,
      english_page: { total: 100 },
      arab_title: `محتوى تجريبي رقم ${i}`,
      arab_desc: `وصف الكتاب رقم ${i}`,
      arab_author: `مؤلف الكتاب ${i}`,
      arab_page: { total: 100 },
      created_at: new Date(Date.now() - i * 5000000),
    });

    liveData.push({
      image: randomImage,
      english_title: `Sample Content ${i} (livestream)`,
      arab_title: `محتوى تجريبي رقم ${i}`,
      link: "https://example.com/live",
      status: statuses[0] || "published",
      type: LiveType.Video,
      date: new Date(Date.now() - i * 2000000),
    });
  }

  await Promise.all([
    lessonsData.length > 0 &&
      prisma.lessons.createMany({ data: lessonsData, skipDuplicates: true }),
    articleData.length > 0 &&
      prisma.article.createMany({ data: articleData, skipDuplicates: true }),
    lectureData.length > 0 &&
      prisma.lectures.createMany({ data: lectureData, skipDuplicates: true }),
    fatwaData.length > 0 &&
      prisma.fatwa.createMany({ data: fatwaData, skipDuplicates: true }),
    ebookData.length > 0 &&
      prisma.eBook.createMany({ data: ebookData, skipDuplicates: true }),
    liveData.length > 0 &&
      prisma.live.createMany({ data: liveData, skipDuplicates: true }),
  ]);

  return NextResponse.json({
    success: true,
    message: "Berhasil memasukkan 50 data dummy sesuai skema database!",
  });
}
