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

  try {
    const [recommended_article, newest_article, popular_article] =
      await Promise.all([
        prisma.$queryRaw`
                SELECT     
                    id,       
                    image,
                    english_title,
                    english_description,
                    arab_title,
                    arab_description
                FROM "Article"
                ORDER BY RANDOM()
                LIMIT 1
            `,
        prisma.article.findMany({
          orderBy: {
            created_at: "desc",
          },
          take: 5,
          skip: paginationSkips.newest,
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
                    image,
                    english_title,
                    arab_title,
                    created_at,
                    duration,
                    CAST(visitor * 3 + read_time * 5 AS DOUBLE PRECISION) AS score
                FROM "Article"
                ORDER BY score DESC
                LIMIT 5
                OFFSET ${paginationSkips.popular}
            `,
      ]);
    return NextResponse.json({
      recommended_article,
      newest_article,
      popular_article,
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
