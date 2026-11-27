import { PrismaClient } from "@/app/generated/prisma/client";
import { getCloudflareContext } from "@opennextjs/cloudflare";
import { PrismaPg } from "@prisma/adapter-pg";

export function getPrisma() {
  const { env } = getCloudflareContext();
  const adapter = new PrismaPg({
    connectionString: env.HYPERDRIVE.connectionString,
  });
  return new PrismaClient({ adapter });
}
