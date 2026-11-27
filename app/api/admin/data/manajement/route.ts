import { verifySession } from "@/lib/auth";
import { getPrisma } from "@/lib/prisma";
import { parseISO, startOfDay, subDays } from "date-fns";
import { formatInTimeZone, fromZonedTime } from "date-fns-tz";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const prisma = getPrisma();
  const profile = await verifySession(request, false);
  const dateLocal = request.headers.get("Request-Timezone");

  if (!dateLocal) {
    return NextResponse.json({ success: false }, { status: 401 });
  }

  try {
    new Intl.DateTimeFormat("en-US", {
      timeZone: dateLocal,
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ success: false }, { status: 401 });
  }

  if (!profile || profile.success === 0)
    return NextResponse.json({ success: false }, { status: 404 });
  if (profile.success == -1)
    return NextResponse.json({ success: false }, { status: 500 });

  const now = new Date();
  const nowLocal = parseISO(formatInTimeZone(now, dateLocal, "yyyy-MM-dd"));
  const firstWeek = subDays(nowLocal, 7);
  const firstWeekUTC = fromZonedTime(startOfDay(firstWeek), dateLocal);

  const [
    lessons_count,
    lessons_this_week,
    articles_count,
    articles_this_week,
    lectures_count,
    lectures_this_week,
    fatwas_count,
    fatwas_this_week,
    ebooks_count,
    ebooks_this_week,
    livestreams_count,
    livestreams_this_week,
  ] = await Promise.all([
    prisma.lessons.count(),
    prisma.lessons.count({
      where: {
        time_start: {
          gte: firstWeekUTC,
        },
      },
    }),
    prisma.article.count(),
    prisma.article.count({
      where: {
        created_at: {
          gte: firstWeekUTC,
        },
      },
    }),
    prisma.lectures.count(),
    prisma.lectures.count({
      where: {
        created_at: {
          gte: firstWeekUTC,
        },
      },
    }),
    prisma.fatwa.count(),
    prisma.fatwa.count({
      where: {
        created_at: {
          gte: firstWeekUTC,
        },
      },
    }),
    prisma.eBook.count(),
    prisma.eBook.count({
      where: {
        created_at: {
          gte: firstWeekUTC,
        },
      },
    }),
    prisma.live.count(),
    prisma.live.count({
      where: {
        date: {
          gte: firstWeekUTC,
        },
      },
    }),
  ]);

  return NextResponse.json({
    success: true,
    lessons_count,
    lessons_this_week,
    articles_count,
    articles_this_week,
    lectures_count,
    lectures_this_week,
    fatwas_count,
    fatwas_this_week,
    ebooks_count,
    ebooks_this_week,
    livestreams_count,
    livestreams_this_week,
  });
}
