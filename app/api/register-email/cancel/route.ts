import { getPrisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import z from "zod";

export async function GET(request: NextRequest) {
  const prisma = getPrisma();
  const token = request.nextUrl.searchParams.get("token");
  const result = z.string().length(64).safeParse(token);
  if (!result.success) {
    return NextResponse.json({ success: false }, { status: 400 });
  }

  try {
    const verification = await prisma.registerVerification.delete({
      where: {
        hash_token: result.data,
      },
      select: {
        expires_at: true,
      },
    });

    if (!verification) {
      return NextResponse.json({ success: false }, { status: 400 });
    }

    if (!process.env.WEBSITE_URL) {
      throw new Error("WEBSITE_URL IS MISSING");
    }
    return NextResponse.redirect(process.env.WEBSITE_URL);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
