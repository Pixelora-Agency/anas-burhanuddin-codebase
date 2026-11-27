import { NextRequest } from "next/server";
import { getPrisma } from "./prisma";

type VerifyType =
  | { success: 0 }
  | { success: -1 }
  | {
      success: 1;
      id: string;
      name: string;
      photo: string;
      status: string;
      arab_status: string;
      created_at?: Date;
      bio?: string;
      email?: string;
    };

export async function verifySession(
  request: NextRequest,
  userPreference: boolean,
): Promise<VerifyType> {
  const prisma = getPrisma();
  const userSessionID = request.cookies.get("sessionID")?.value;
  console.log("check", userSessionID);
  if (!userSessionID) return { success: 0 };

  if (
    userPreference === null ||
    (userPreference !== false && userPreference !== true)
  )
    return { success: -1 };

  const session = await prisma.session.findUnique({
    where: {
      hash_token: userSessionID,
      expires_at: {
        gt: new Date(),
      },
    },
    select: {
      user: {
        select: {
          id: true,
          name: true,
          photo: true,
          status: true,
          arab_status: true,
          created_at: userPreference === true ? true : false,
          bio: userPreference === true ? true : false,
          email: userPreference === true ? true : false,
        },
      },
    },
  });

  if (!session) return { success: 0 };
  return { success: 1, ...session.user };
}
