import { verifySession } from "@/lib/auth";
import { getPrisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const prisma = getPrisma();
  const profile = await verifySession(request, false);

  if (!profile) return NextResponse.json({ success: false }, { status: 404 });
  if (profile.success == -1)
    return NextResponse.json({ success: false }, { status: 500 });

  const searchParams = request.nextUrl.searchParams;
  const paginationSkips = {
    popular: searchParams.get("popular")
      ? Number(searchParams.get("popular")) * 5
      : 0,
    newest: searchParams.get("newest")
      ? Number(searchParams.get("newest")) * 5
      : 0,
  };

  const [
    lessons_total,
    lessons_done,
    today_learning,
    popular_lessons,
    newest_lessons,
  ] = await Promise.all([
    prisma.lessons.count(),
    profile.success === 1
      ? prisma.userLessons.count({
          where: {
            user_id: profile.id,
          },
        })
      : 0,
    prisma.lessons.findMany({
      take: 2,
      where: {
        time_end: {
          lt: new Date(),
        },
      },
      orderBy: {
        time_start: "desc",
      },
      select: {
        id: true,
        english_title: true,
        english_chapter: true,
        arab_title: true,
        arab_chapter: true,
        category: true,
        time_start: true,
        time_end: true,
        image: true,
      },
    }),
    prisma.$queryRaw`
    SELECT
      l.id,
      l.english_title,
      l.english_chapter,
      l.arab_title,
      l.arab_chapter,
      l.image,
      CAST(COALESCE(ul.progress, 0) AS DOUBLE PRECISION) AS progress,
      CAST((l.visitor * 3 + l.read_time * 5) AS DOUBLE PRECISION) AS score
    FROM "Lessons" l
    LEFT JOIN "UserLessons" ul
      ON ul.lessons_id = l.id
      AND ul.user_id = ${profile.success === 1 ? profile.id : null}
    ORDER BY score DESC
    LIMIT 5
    OFFSET ${paginationSkips.popular}`,
    prisma.lessons.findMany({
      orderBy: {
        time_start: "desc",
      },
      take: 5,
      skip: paginationSkips.newest,
      select: {
        id: true,
        image: true,
        english_title: true,
        english_chapter: true,
        arab_title: true,
        author: true,
        read_time: true,
      },
    }),
  ]);

  return NextResponse.json({
    success: true,
    profile,
    learning_summary: {
      total: lessons_total,
      done: lessons_done,
    },
    today_learning,
    popular_lessons,
    newest_lessons,
  });
}
