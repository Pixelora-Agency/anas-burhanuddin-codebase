import { getPrisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const LoginSchema = z.object({
  email: z.email(),
  password: z
    .string()
    .trim()
    .min(8)
    .max(32)
    .regex(/[A-Z]/, "Uppercase Missing")
    .regex(/[a-z]/, "Lowercase Missing")
    .regex(/[0-9]/, "Number Missing")
    .regex(/[^A-Za-z0-9]/, "Symbol Missing"),
});

export async function POST(request: NextRequest) {
  const prisma = getPrisma();
  const body = LoginSchema.safeParse(await request.json());
  console.log(body);
  if (!body.success) {
    return NextResponse.json({ success: false }, { status: 400 });
  }
  const { email, password } = body.data;

  try {
    const userData = await prisma.user.findUnique({
      where: {
        email: email,
      },
      select: {
        id: true,
        pass: true,
      },
    });
    if (!userData || !(await bcrypt.compare(password, userData.pass))) {
      return NextResponse.json({ success: false }, { status: 401 });
    }

    const randomStr = crypto.randomBytes(32).toString("hex");
    const token = crypto.createHash("sha256").update(randomStr).digest("hex");
    const baseUrl = process.env.WEBSITE_URL!.replace(/\/$/, "");

    const res = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: {
        accept: "application/json",
        "api-key": process.env.BREVO_API_KEY!,
        "content-type": "application/json",
      },
      body: JSON.stringify({
        sender: { name: "Anas Burhanuddin", email: "mrahajay@gmail.com" },
        to: [{ email }],
        subject: "Login Confirmation",
        htmlContent: `
                <h2 style="margin:0">Login Confirmation</h2>
                <br>
                <p style="margin:0">Click button bellow to continue your login process in <a href="${process.env.WEBSITE_URL}">${process.env.WEBSITE_URL}</a>
                </p>
                <br>
                <br>
                <a href="${baseUrl}/api/login-email/cancel?token=${token}" style="border-radius:10px;padding:1rem;width:100%;color:black;background:rgba(0,0,0,0.1)">No, That's Not Me</a>
                <a href="${baseUrl}/api/login-email/confirm?token=${token}" style="border-radius:10px;padding:1rem;width:100%;color:white;background:#0e3e2c">Yes, Sign Me In</a>
                <br>
                <br>
            `,
      }),
    });

    if (!res.ok) {
      console.error("MAIL FAIL", res.status, await res.text());
      return NextResponse.json({ success: false }, { status: 502 });
    }

    const now = new Date();
    now.setSeconds(now.getSeconds() - (now.getSeconds() % 5), 0);
    const expiresAt = new Date(now.getTime() + 5 * 60 * 1000);

    await prisma.loginVerification.create({
      data: {
        user_id: userData.id,
        hash_token: token,
        expires_at: expiresAt,
      },
    });

    return NextResponse.json({ success: true, email });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ success: false }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
