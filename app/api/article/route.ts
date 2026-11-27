import { verifySession } from "@/lib/auth";
import { getPrisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const prisma = getPrisma();
  const profile = await verifySession(request, false);
  if (!profile) return NextResponse.json({ success: false }, { status: 404 });
  if (profile.success == -1)
    return NextResponse.json({ success: false }, { status: 500 });

  const params = request.nextUrl.searchParams;
  if (
    !params.get("id") ||
    Number(params.get("id")) === null ||
    Number(params.get("id")) === undefined ||
    Number.isNaN(Number(params.get("id")))
  ) {
    return NextResponse.json({ success: false }, { status: 400 });
  }
  try {
    const [article, popular_article, newest_article] = await Promise.all([
      prisma.article.findUnique({
        where: {
          id: Number(params.get("id")),
        },
        select: {
          id: true,
          english_title: true,
          arab_title: true,
          image: true,
          created_at: true,
          english_content: true,
          arab_content: true,
          article_comments: {
            select: {
              user: {
                select: {
                  name: true,
                  photo: true,
                },
              },
              created_at: true,
              comment: true,
            },
          },
        },
      }),
      prisma.$queryRaw`
                SELECT
                    id,
                    image,
                    english_title,
                    english_description,
                    arab_title,
                    arab_description,
                    created_at,
                    duration,
                    CAST(visitor * 3 + read_time * 5 AS DOUBLE PRECISION) AS score
                FROM "Article"
                ORDER BY score DESC
                LIMIT 5
            `,
      prisma.article.findMany({
        orderBy: {
          created_at: "desc",
        },
        take: 3,
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
    ]);
    return NextResponse.json({
      success: true,
      article,
      popular_article,
      newest_article,
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
