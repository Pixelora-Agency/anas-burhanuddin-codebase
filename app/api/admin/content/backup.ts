import { getPrisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const prisma = getPrisma();
  // const profile = await verifySession(request, true);
  // if (!profile || profile.success === 0)
  //   return NextResponse.json({ success: false }, { status: 404 });
  // if (profile.success == -1)
  //   return NextResponse.json({ success: false }, { status: 500 });

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
      val !== "lesson" &&
        val !== "article" &&
        val !== "lecture" &&
        val !== "fatwa" &&
        val !== "ebook" &&
        val !== "soundstream" &&
        val !== "livestream";
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
  const view = viewParams as
    | null
    | "0-100"
    | "101-500"
    | "501-1000"
    | "1001-2000"
    | "2001-5000"
    | ">5000";

  const SQLconditionChecking = (statusVar: string, viewVar: null | string) => {
    //! ERROR
    if ((!statusVar && status) || (!viewVar && view))
      throw new Error("VARIABLE IS NOT DEFINED");
    if (!status && !sort && !view) throw new Error("NO PARAMS DEFINED");

    //VARIABLE
    let base = "WHERE ";

    //STATUS
    status === "published"
      ? (base += `${statusVar} >= UTC_TIMESTAMP`)
      : status === "scheduled"
        ? (base += `${statusVar} < UTC_TIMESTAMP`)
        : "";

    //VIEW
    if (view !== null) {
      if (status !== null) {
        base += ` AND `;
      }
      if (view !== ">5000") {
        base += `${viewVar} > 5000`;
      } else {
        const [min, max] = view.split("-");
        base += `${viewVar} >= ${min} AND ${viewVar} <= ${max}`;
      }
    }
    return base;
  };

  // FETCHING
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
    FROM (
${
  typeParamsArr.has("lesson") &&
  `SELECT
        id,
        image,
        english_title,
        arab_title,
        time_start AS date,
        CONCAT(time_start,"-",time_end) AS time,
        visitor,
        NULL AS questioner,
        'lesson' AS type
      FROM Lessons
      ${SQLconditionChecking("time_start", "visitor")}

      UNION ALL`
}

      ${
        typeParamsArr.has("article") &&
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
      FROM Article
      ${SQLconditionChecking("created_at", "visitor")}

      UNION ALL`
      }

      ${
        typeParamsArr.has("lecture") &&
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
      FROM Lecture
      ${SQLconditionChecking("created_at", "visitor")}

      UNION ALL`
      }

      ${
        typeParamsArr.has("fatwa") &&
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
      FROM Fatwa
      ${SQLconditionChecking("created_at", "visitor")}

      UNION ALL`
      }

      ${
        typeParamsArr.has("ebook") &&
        `SELECT
        id,
        image,
        english_title,
        arab_title,
        created_at AS date,
        NULL AS time,
        'No Data' AS visitor,
        NULL AS questioner,
        'ebook' AS type
      FROM EBook
      ${SQLconditionChecking("created_at", null)}

      UNION ALL`
      }

      ${
        typeParamsArr.has("soundstream") &&
        `SELECT
        id,
        image,
        english_title,
        arab_title,
        created_at AS date,
        NULL AS time,
        'No Data' AS visitor,
        NULL AS questioner,
        'soundstream' AS type
      FROM Live
      WHERE type = 'sound'
      ${SQLconditionChecking("date", null) ? SQLconditionChecking("date", null) + ` AND type = "sound"` : `WHERE type = "sound"`}

      UNION ALL`
      }

      ${
        typeParamsArr.has("livestream") &&
        `SELECT
        id,
        image,
        english_title,
        arab_title,
        date,
        NULL AS time,
        'No Data' AS visitor,
        NULL AS questioner,
        'livestream' AS type
      FROM Live
      ${
        SQLconditionChecking("date", null)
          ? SQLconditionChecking("date", null) + ` AND type = "video"`
          : `WHERE type = "video"`
      }`
      }
    ) AS content
      
      ${searchParams && `WHERE english_title LIKE ${searchParams} OR arab_title LIKE ${searchParams}`}
      ORDER BY date ${sort === "newest" ? "ASC" : "DESC"},type ASC, id ASC
      LIMIT 10 OFFSET ${pagination}
      `;
  return data;
}
