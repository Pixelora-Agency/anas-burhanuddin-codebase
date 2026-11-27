import { getPrisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import { NextRequest, NextResponse } from "next/server";
import z from "zod";

const registerSchema = z.object({
  name: z.string().trim().min(1).max(128),
  email: z.email(),
  pass: z
    .string()
    .trim()
    .min(8)
    .max(32)
    .regex(/[A-Z]/, "Uppercase Missing")
    .regex(/[a-z]/, "Lowercase Missing")
    .regex(/[0-9]/, "Number Missing")
    .regex(/[^A-Za-z0-9]/, "Symbol Missing"),
  confirm_pass: z
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
  const body = await request.json();
  if (
    !z.safeParse(registerSchema, body).success ||
    body.confirm_pass !== body.pass
  ) {
    console.log(z.safeParse(registerSchema, body).error);
    return NextResponse.json({ success: false }, { status: 400 });
  }
  try {
    const { name, email, pass } = body;

    const pass_hash = await bcrypt.hash(pass, 12);
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
        subject: "Register Confirmation",
        htmlContent: `<h2 style="margin:0">Register Confirmation</h2>
          <p>Click the button below to continue your registration at <a href="${baseUrl}">${baseUrl}</a></p>
          <a href="${baseUrl}/api/register-email/cancel?token=${token}" style="border-radius:10px;padding:1rem;color:black;background:rgba(0,0,0,0.1)">No, That's Not Me</a>
          <a href="${baseUrl}/api/register-email/confirm?token=${token}" style="border-radius:10px;padding:1rem;color:white;background:#0e3e2c">Yes, Sign Me In</a>`,
      }),
    });

    if (!res.ok) {
      console.error("MAIL FAIL", res.status, await res.text());
      return NextResponse.json({ success: false }, { status: 502 });
    }

    const now = new Date();
    now.setSeconds(now.getSeconds() - (now.getSeconds() % 5), 0);
    const expiresAt = new Date(now.getTime() + 5 * 60 * 1000);

    await prisma.registerVerification.create({
      data: {
        name,
        email,
        pass: pass_hash,
        hash_token: token,
        expires_at: expiresAt,
      },
    });

    return NextResponse.json({ success: true, email: `${email}` });
  } catch (err: any) {
    console.error("REGISTER ERROR:", err.code, err.meta, err.cause);
    return NextResponse.json({ success: false }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
