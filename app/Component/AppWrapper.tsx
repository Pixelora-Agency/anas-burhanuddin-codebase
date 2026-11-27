"use client";

import { usePathname } from "next/navigation";
import Footer from "./Footer";

export default function AppWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const isErrorRoute =
    pathname.startsWith("/error") ||
    pathname.startsWith("/login") ||
    pathname.startsWith("/register");

  if (isErrorRoute) {
    return <>{children}</>;
  }

  return (
    <>
      <div className="flex-1">{children}</div>
      <Footer />
    </>
  );
}
