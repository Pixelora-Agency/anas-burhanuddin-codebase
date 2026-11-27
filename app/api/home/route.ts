import { verifySession } from "@/lib/auth";
import { getPrisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const prisma = getPrisma();
  const profile = await verifySession(request, false);
  if (!profile) return NextResponse.json({ success: false }, { status: 404 });
  if (profile.success == -1)
    return NextResponse.json({ success: false }, { status: 500 });

  const now = new Date();
  now.setHours(0, 0, 0, 0);
  const realDay = now.getDay() == 0 ? 7 : now.getDay() - 1;
  const start = Number(now) - realDay * 1000 * 3600 * 24;

  const [selected_verse, worship_schedule] = await Promise.all([
    prisma.verse.findFirst(),
    prisma.worshipSchedule.findMany({
      where: {
        time_start: {
          gte: new Date(start),
        },
      },
    }),
  ]);

  return NextResponse.json({
    success: true,
    profile,
    selected_verse,
    worship_schedule,
  });
}
