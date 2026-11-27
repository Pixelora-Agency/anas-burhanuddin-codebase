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

  const paramVid = searchParams.get("pagination-vid");
  const paramSound = searchParams.get("pagination-sound");

  const paginationSkipsVideo = {
    popular: searchParams.get("pagination-vid")
      ? Number(searchParams.get("pagination-vid")) * 21
      : 0,
  };
  const paginationSkipsSound = {
    popular: searchParams.get("pagination-sound")
      ? Number(searchParams.get("pagination-sound")) * 21
      : 0,
  };

  let display_live = null;
  let sound_live = null;

  if (paramVid !== null)
    display_live = await prisma.live.findMany({
      take: 21,
      where: {
        type: "Video",
      },
      orderBy: {
        date: "desc",
      },
      skip: paginationSkipsVideo.popular,
    });

  if (paramSound !== null)
    sound_live = await prisma.live.findMany({
      take: 21,
      where: {
        type: "Sound",
      },
      orderBy: {
        date: "desc",
      },
      skip: paginationSkipsSound.popular,
    });

  return NextResponse.json({
    profile,
    display_live: display_live ? display_live : null,
    sound_live: display_live ? sound_live : null,
  });
}
