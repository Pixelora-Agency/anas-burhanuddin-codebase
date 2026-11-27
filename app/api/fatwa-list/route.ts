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
    newest: searchParams.get("newest")
      ? Number(searchParams.get("newest")) * 5
      : 0,
  };

  const [popular_fatwa, newest_fatwa] = await Promise.all([
    prisma.$queryRaw`
            SELECT
                id,
                image,
                english_title,
                english_desc,
                arab_title,
                arab_desc,
                visitor*3 + read_time*5 AS score
            FROM "Fatwa"
            ORDER BY score DESC
            LIMIT 1
            OFFSET ${paginationSkips.newest}
        `,
    prisma.fatwa.findMany({
      select: {
        image: true,
        english_title: true,
        questioner: true,
        created_at: true,
        duration: true,
        id: true,
      },
      orderBy: {
        created_at: "desc",
      },
      take: 5,
      skip: paginationSkips.newest,
    }),
  ]);

  return NextResponse.json({ popular_fatwa, newest_fatwa });
}
