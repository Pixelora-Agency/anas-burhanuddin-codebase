import { Prisma } from "@/app/generated/prisma/client";
import { verifySession } from "@/lib/auth";
import { getPrisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const prisma = getPrisma();
  const profile = await verifySession(request, true);

  const params = request.nextUrl.searchParams;
  const pagination = params.get("pagination");
  const typeParams = params.get("type");
  const statusParams = params.get("status");
  const sortParams = params.get("sort");
  const viewParams = params.get("view");
  const searchParams: string | null = params.get("search");

  if (typeParams) {
    const typeParamsArr = Array.from(new Set(typeParams.split(".")));
    const error = typeParamsArr.every((val) => {
      return (
        val !== "lesson" &&
        val !== "article" &&
        val !== "lecture" &&
        val !== "fatwa" &&
        val !== "ebook" &&
        val !== "soundstream" &&
        val !== "livestream"
      );
    });
    if (error) {
      return NextResponse.json({ success: false }, { status: 400 });
    }
  }

  if (
    !params ||
    !pagination ||
    (statusParams &&
      statusParams !== "published" &&
      statusParams !== "scheduled") ||
    (sortParams && sortParams !== "latest" && sortParams !== "newest") ||
    (viewParams &&
      viewParams !== "" &&
      viewParams !== "0-100" &&
      viewParams !== "101-500" &&
      viewParams !== "501-1000" &&
      viewParams !== "1001-2000" &&
      viewParams !== "2001-5000" &&
      viewParams !== ">5000")
  ) {
    return NextResponse.json({ success: false }, { status: 400 });
  }

  const status = statusParams as null | "published" | "scheduled";
  const sort = sortParams as null | "latest" | "newest";
  const view =
    viewParams && viewParams !== ""
      ? (viewParams as
          | "0-100"
          | "101-500"
          | "501-1000"
          | "1001-2000"
          | "2001-5000"
          | ">5000")
      : null;

  const SQLconditionChecking = (statusVar: string, viewVar: null | string) => {
    if (!statusVar && status) throw new Error("VARIABLE IS NOT DEFINED");
    if (!status && !sort && !view) throw new Error("NO PARAMS DEFINED");

    let base = "WHERE ";

    // UBAH: UTC_TIMESTAMP diganti NOW() untuk PostgreSQL
    status === "published"
      ? (base += `${statusVar} <= NOW()`)
      : status === "scheduled"
        ? (base += `${statusVar} > NOW()`)
        : "";

    if (view !== null) {
      if (base !== "WHERE ") {
        base += ` AND `;
      } else {
        base = "WHERE ";
      }

      if (viewVar !== null) {
        if (view === ">5000") {
          base += `${viewVar} > 5000`;
        } else {
          const [min, max] = view.split("-");
          base += `${viewVar} >= ${min} AND ${viewVar} <= ${max}`;
        }
      } else {
        const [min, max] = view.split("-");
        if (Number(min) === 0) {
          base += `1 = 1`;
        } else {
          base += `1 = 0`;
        }
      }
    }

    // Jika base hanya berisi "WHERE ", kosongkan agar tidak error syntax
    return base === "WHERE " ? "" : base;
  };

  const typeParamsArr = new Set(
    typeParams
      ? typeParams.split(".")
      : [
          "lesson",
          "article",
          "lecture",
          "fatwa",
          "ebook",
          "soundstream",
          "livestream",
        ],
  );

  const subQueries: string[] = [];

  // Gunakan nama tabel sesuai case database/prisma (biasanya huruf kecil di postgresql, misal "Lessons" atau "lessons")
  if (typeParamsArr.has("lesson")) {
    subQueries.push(
      `SELECT 
      id, 
      image, 
      english_title, 
      arab_title, 
      time_start AS date, 
      CONCAT(time_start, '-', time_end) AS time, 
      visitor, 
      NULL AS questioner, 
      'lesson' AS type 
      FROM "Lessons" ${SQLconditionChecking("time_start", "visitor")}`,
    );
  }

  if (typeParamsArr.has("article")) {
    subQueries.push(
      `SELECT 
      id, 
      image, 
      english_title, 
      arab_title, 
      created_at AS date, 
      NULL AS time, 
      visitor, 
      NULL AS questioner, 
      'article' AS type 
      FROM "Article" ${SQLconditionChecking("created_at", "visitor")}`,
    );
  }

  if (typeParamsArr.has("lecture")) {
    subQueries.push(
      `SELECT 
      id, 
      image, 
      english_title, 
      arab_title, 
      created_at AS date, 
      NULL AS time, 
      visitor, 
      NULL AS questioner, 
      'lecture' AS type 
      FROM "Lectures" ${SQLconditionChecking("created_at", "visitor")}`,
    );
  }

  if (typeParamsArr.has("fatwa")) {
    subQueries.push(
      `SELECT 
      id, 
      image, 
      english_title, 
      arab_title, 
      created_at AS date, 
      NULL AS time, 
      visitor, 
      questioner, 
      'fatwa' AS type 
      FROM "Fatwa" ${SQLconditionChecking("created_at", "visitor")}`,
    );
  }

  if (typeParamsArr.has("ebook")) {
    subQueries.push(
      `SELECT 
      id, 
      image, 
      english_title, 
      arab_title, 
      created_at AS date, 
      NULL AS time, 
      0 AS visitor, 
      NULL AS questioner, 
      'ebook' AS type 
      FROM "EBook" ${SQLconditionChecking("created_at", null)}`,
    );
  }

  if (typeParamsArr.has("soundstream")) {
    const cond = SQLconditionChecking("date", null);
    const where = cond ? `${cond} AND type = 'sound'` : `WHERE type = 'sound'`;
    subQueries.push(
      `SELECT 
      id, 
      image, 
      english_title, 
      arab_title, 
      date AS date, 
      NULL AS time, 
      0 AS visitor, 
      NULL AS questioner, 
      'soundstream' AS type 
      FROM "Live" 
      ${where}`,
    );
  }

  if (typeParamsArr.has("livestream")) {
    const cond = SQLconditionChecking("date", null);
    const where = cond ? `${cond} AND type = 'video'` : `WHERE type = 'video'`;
    subQueries.push(
      `SELECT 
      id, 
      image, 
      english_title, 
      arab_title, 
      date AS date, 
      NULL AS time, 
      0 AS visitor, 
      NULL AS questioner, 
      'livestream' AS type 
      FROM "Live" 
      ${where}`,
    );
  }

  if (subQueries.length === 0) {
    return NextResponse.json({ success: false }, { status: 400 });
  }

  const combinedQuery = `${subQueries.join(" UNION ALL ")}`;
  const keyword = `%${searchParams || ""}%`;

  // Gunakan Prisma.sql untuk keamanan pencarian (mencegah SQL Injection)
  const countQuery = Prisma.sql`
    SELECT COUNT(*) as total 
    FROM (${Prisma.sql([combinedQuery])}) AS content 
    ${searchParams ? Prisma.sql`WHERE english_title ILIKE ${keyword} OR arab_title ILIKE ${keyword}` : Prisma.sql``}
  `;

  const totalResult = await prisma.$queryRaw<[{ total: bigint }]>(countQuery);
  const totalData = Number(totalResult[0]?.total || 0);

  const data = await prisma.$queryRaw<
    {
      id: number;
      english_title: string;
      arab_title: string;
      date: string | Date;
      image: string;
      type:
        | "lesson"
        | "article"
        | "lecture"
        | "fatwa"
        | "ebook"
        | "soundstream"
        | "livestream";
      visitor: number | "No Data";
      questioner: string | null;
      time: string;
    }[]
  >`
    SELECT * FROM (
      ${Prisma.sql([combinedQuery])}
    ) AS content
    ${searchParams ? Prisma.sql`WHERE english_title ILIKE ${keyword} OR arab_title ILIKE ${keyword}` : Prisma.sql``}
    ORDER BY date ${sort === "newest" ? Prisma.sql`ASC` : Prisma.sql`DESC`}, type ASC, id ASC
    LIMIT 10 OFFSET ${Number(pagination)}
  `;

  return NextResponse.json({
    success: true,
    data,
    total: totalData,
    totalPages: Math.ceil(totalData / 10),
  });
}
