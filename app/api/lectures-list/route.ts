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

  const [special_lectures, today_schedule, newest_lectures, popular_lectures] =
    await Promise.all([
      prisma.$queryRaw`
            SELECT
                id,
                image,
                english_title,
                arab_title
            FROM "Lectures"
            ORDER BY RANDOM()
            LIMIT 1
        `,
      prisma.lectures.findMany({
        where: {
          created_at: {
            gte: new Date(new Date().setHours(0, 0, 0, 0)),
            lt: new Date(new Date().setHours(0, 0, 0, 0) + 3600000 * 24),
          },
        },
        orderBy: {
          created_at: "desc",
        },
        select: {
          id: true,
          image: true,
          english_title: true,
          arab_title: true,
          created_at: true,
          duration: true,
        },
      }),
      prisma.lectures.findMany({
        take: 5,
        skip: paginationSkips.newest,
        orderBy: {
          created_at: "desc",
        },
        select: {
          id: true,
          image: true,
          english_title: true,
          english_description: true,
          arab_title: true,
          arab_description: true,
          created_at: true,
          duration: true,
        },
      }),
      prisma.$queryRaw`
            SELECT
                id,
                english_title,
                arab_title,
                created_at,
                duration,
                CAST(visitor*3 AS DOUBLE PRECISION) AS score
            FROM "Lectures"
            ORDER BY score DESC
            LIMIT 5 OFFSET ${paginationSkips.popular}
        `,
    ]);

  return NextResponse.json({
    special_lectures,
    today_schedule,
    newest_lectures,
    popular_lectures,
  });
}
