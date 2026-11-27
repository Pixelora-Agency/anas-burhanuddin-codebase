import { getPrisma } from "@/lib/prisma";
import crypto from "crypto";
import { NextRequest, NextResponse } from "next/server";
import z from "zod";

export async function GET(request: NextRequest) {
  const prisma = getPrisma();
  if (!process.env.WEBSITE_URL) {
    return NextResponse.json(
      { success: false, message: "WEBSITE URL MISSING" },
      { status: 500 },
    );
  }

  const token = request.nextUrl.searchParams.get("token");
  const result = z.string().length(64).safeParse(token);
  console.log("SAMPE SINI 2");

  console.log("token:", result);

  if (!result.success) {
    return NextResponse.json({ success: false }, { status: 400 });
  }

  console.log("SAMPE SINI 3");
  try {
    const tokenData = await prisma.loginVerification.findUnique({
      where: {
        hash_token: result.data,
      },
      select: {
        user_id: true,
      },
    });

    if (!tokenData) {
      return NextResponse.json({ success: false }, { status: 401 });
    }

    const randStr = crypto.randomBytes(32);
    const sessionId = crypto.createHash("sha256").update(randStr).digest("hex");
    const expires_at = new Date(Number(new Date()) + 7 * 24 * 3600 * 1000);

    await Promise.all([
      prisma.loginVerification.delete({
        where: {
          hash_token: result.data,
        },
        select: {
          user_id: true,
        },
      }),

      prisma.session.create({
        data: {
          user_id: tokenData.user_id,
          hash_token: sessionId,
          expires_at: expires_at,
        },
      }),
    ]);

    const response = NextResponse.redirect(new URL(process.env.WEBSITE_URL));

    response.cookies.set("sessionID", sessionId, {
      httpOnly: true,
      maxAge: 7 * 24 * 3600,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
    });

    return response;
  } catch (err) {
    console.error(err);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
