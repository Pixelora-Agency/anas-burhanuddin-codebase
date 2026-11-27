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
    const verification = await prisma.registerVerification.findUnique({
      where: {
        hash_token: result.data,
      },
      select: {
        email: true,
        name: true,
        pass: true,
        expires_at: true,
      },
    });

    if (!verification || verification.expires_at <= new Date()) {
      return NextResponse.json({ success: false }, { status: 400 });
    }

    const { name, email, pass } = verification;

    let id: string | null = null;

    await prisma.$transaction(async (prisma) => {
      const user = await prisma.user.create({
        data: {
          name,
          photo: "/Placeholder/profile_image.jpeg",
          email,
          pass: pass,
        },
        select: {
          id: true,
        },
      });

      if (!user) {
        throw new Error("USER NOT FOUND");
      }

      id = user.id;

      if (id === null) {
        throw new Error("ID IS NULL");
      }

      await prisma.registerVerification.delete({
        where: {
          hash_token: result.data,
        },
      });
    });

    const url = new URL("/login", process.env.WEBSITE_URL);
    const response = NextResponse.redirect(url);
    return response;
  } catch (err) {
    console.error(err);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
