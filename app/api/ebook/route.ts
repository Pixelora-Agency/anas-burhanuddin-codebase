import { verifySession } from "@/lib/auth";
import { getPrisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const prisma = getPrisma();
  const { searchParams } = new URL(request.url);

  const searchSlug = searchParams.get("id");

  const profile = await verifySession(request, false);

  if (!profile) return NextResponse.json({ success: false }, { status: 404 });
  if (profile.success == -1)
    return NextResponse.json({ success: false }, { status: 500 });
  const ebookId =
    searchSlug && !isNaN(Number(searchSlug)) ? Number(searchSlug) : null;
  const [display, recommended_ebook] = await Promise.all([
    ebookId
      ? (prisma.$queryRaw`
          SELECT 
                e.*, 
                ec.*
            FROM "EBook" e
            LEFT JOIN "EbookChapter" ec ON ec.ebook_id = e.id
            WHERE e.id = ${ebookId}
      ` as Promise<any[]>)
      : (prisma.$queryRaw`
        SELECT
            e.*,
            ec.*
        FROM (
          SELECT *
          FROM "EBook"
          ORDER BY RANDOM()
          LIMIT 1
        ) e
        LEFT JOIN "EbookChapter" ec
            ON ec.ebook_id = e.id
      ` as Promise<any[]>),
    prisma.$queryRaw`
            SELECT
                id,
                image,
                english_title,
                english_author,
                arab_title,
                arab_author
            FROM "EBook"
            ORDER BY RANDOM()
            LIMIT 4       
        ` as Promise<any[]>,
  ]);

  const groupByDisplay =
    display.length > 0
      ? [
          {
            id: display[0].ebook_id || display[0].id,
            english_title: display[0].english_title,
            english_desc: display[0].english_desc,
            english_author: display[0].english_author,
            english_page: display[0].english_page,
            arab_title: display[0].arab_title,
            arab_desc: display[0].arab_desc,
            arab_author: display[0].arab_author,
            arab_page: display[0].arab_page,
            created_at: display[0].created_at,
            image: display[0].image,
            chapter: display
              .filter(
                (item) =>
                  item.id !== null && item.english_chapter_title !== null,
              )
              .map((item) => ({
                chapter_id: item.id,
                english_chapter_tag: item.english_chapter_tag,
                english_chapter_title: item.english_chapter_title,
                english_page_number: item.english_page_number,
                arab_chapter_tag: item.arab_chapter_tag,
                arab_chapter_title: item.arab_chapter_title,
                arab_page_number: item.arab_page_number,
              })),
          },
        ]
      : [];
  return NextResponse.json({ profile, groupByDisplay, recommended_ebook });
}
