"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import SvgImg from "../Component/SvgImg";

const page = () => {
  const [isForm, setIsForm] = useState({ email: "", password: "" });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  const getCookieValue = (name: string) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);

    if (parts.length === 2) {
      return parts.pop()?.split(";").shift();
    }
    return null;
  };

  useEffect(() => {
    const hasSession = getCookieValue("sessionID");
    if (hasSession) {
      router.push("/home");
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setIsLoading(true);
      const res = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(isForm),
      });

      const data = (await res.json()) as any;
      if (data?.success) {
        alert("Login Successfull, check ur email for verification");
      }
    } catch (error) {
      alert("Error: " + error || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="flex min-h-screen bg-[position:calc(50%+100px)_center] w-full bg-cover bg-[url('/Image/bg-auth.png')] md:bg-[linear-gradient(180deg,#FFF_0%,var(--Cloud,#DAE0DA)_100%)] items-center md:items-start pt-6 px-5 md:px-12 pb-12 justify-center">
      <div className="flex flex-col w-full max-w-[90rem] items-center justify-center gap-12">
        <header className="hidden md:w-full md:flex md:justify-between md:gap-4">
          <div className="flex gap-1 items-center cursor-pointer select-none">
            <SvgImg
              size={6}
              src="/Image/logo.svg"
              alt="Anas Burhanuddin Logo"
            />
            <p className="text-2xl font-medium tracking-min-4 text-text">
              Anas Burhanuddin
            </p>
          </div>
          <Link
            href={"/register"}
            className="flex gap-2 items-center cursor-pointer select-none"
          >
            <span className="text-sm font-medium tracking-min-4 text-text leading-[120%] hover:text-slate-600/60">
              Don't have an account? Register
            </span>
          </Link>
        </header>
        <div className="flex flex self-stretch items-start justify-center gap-5 ">
          <div className="hidden md:h-[48.5rem] md:flex md:flex-col md:w-[33.7rem] md:items-start md:gap-4 md:bg-cover md:bg-center md:bg-[url('/Image/auth.png')] rounded-xl md:shadow-sx md:text-white p-12">
            <div className="flex flex-col gap-2">
              <h1 className="text-5xl font-bold leading-[120%] tracking-[-1.28px]">
                Anas Burhanuddin
              </h1>
              <h3 className="text-4xl font-medium leading-[120%] tracking-[-1.28px]">
                Welcome back to
              </h3>
              <div className="py-11">
                <p className="text-xl font-normal leading-[120%] tracking-[-1.28px]">
                  A place for learning, worship, and deepening
                </p>
              </div>
            </div>
            <div className="flex self-stretch items-center rounded-xl gap-5 px-6 py-7 bg-white/20">
              <div className="rounded-full bg-white flex items-center justify-center p-3">
                <SvgImg src="/Icon/book-open.svg" size={4} alt="quran icon" />
              </div>
              <p>
                Lrem ipsum dolor sit amet, consectetur adipiscing elit.
                Phasellus feugiat efficitur laoreet. Nulla dignissim est et
                accumsan placerat
              </p>
            </div>
          </div>
          <div className="flex flex-1 flex-col p-7 md:px-10 md:py-15 w-full gap-[15px] rounded-xl bg-white shadow-xs items-start self-stretch">
            <div className="flex flex-col gap-[10px] w-full md:mb-13">
              <h2 className="text-4xl font-semibold text-text leading-[120%] tracking-[-0.8px]">
                Login to your account
              </h2>
              <p className="text-xl font-normal text-text leading-[120%] tracking-[-0.4px]">
                Please enter to continue your learning and worship
              </p>
            </div>
            <form
              onSubmit={handleSubmit}
              className="flex flex-col gap-[27px] w-full"
            >
              <div className="flex flex-col w-full gap-[10px]">
                <label
                  htmlFor="Email or Username"
                  className="text-xl font-semibold text-text leading-[120%] tracking-[-0.4px]"
                >
                  Email or Username
                </label>
                <div className="relative flex">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2">
                    <SvgImg
                      src="/Icon/account_circle.svg"
                      size={1.6}
                      alt="Email icon"
                      style={{
                        filter:
                          "brightness(0) saturate(100%) invert(76%) sepia(8%) saturate(568%) hue-rotate(339deg) brightness(91%) contrast(88%)",
                      }}
                    />
                  </div>
                  <input
                    type="text"
                    id="Email or Username"
                    name="email"
                    value={isForm.email}
                    placeholder="Email or Username"
                    className="flex w-full items-center text-xl text-text rounded-xl pl-14 pr-5 py-2.5 bg-white shadow-xs border border-black/20 focus:outline-primary"
                    onChange={(e) =>
                      setIsForm({ ...isForm, email: e.target.value })
                    }
                    required
                  />
                </div>
              </div>
              <div className="flex flex-col w-full gap-[10px]">
                <label
                  htmlFor="Password"
                  className="text-xl font-semibold text-text leading-[120%] tracking-[-0.4px]"
                >
                  Password
                </label>
                <div className="relative flex">
                  <div className="absolute left-5 top-1/2 -translate-y-1/2">
                    <SvgImg
                      src="/Icon/lock.svg"
                      size={1.4}
                      alt="Password icon"
                      style={{
                        filter:
                          "brightness(0) saturate(100%) invert(76%) sepia(8%) saturate(568%) hue-rotate(339deg) brightness(91%) contrast(88%)",
                      }}
                    />
                  </div>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={isForm.password}
                    placeholder="Password"
                    className="flex w-full items-center text-xl text-text rounded-xl pl-14 pr-5 py-2.5 bg-white shadow-xs border border-black/20 focus:outline-primary"
                    onChange={(e) =>
                      setIsForm({ ...isForm, password: e.target.value })
                    }
                    required
                  />
                </div>
                <Link
                  href={""}
                  className="flex justify-end items-center cursor-pointer select-none"
                >
                  <span className="text-sm font-medium tracking-[-0.4px] text-text leading-[120%] hover:text-slate-600/60">
                    Forgot your password?
                  </span>
                </Link>
              </div>
              <div className="w-full mt-5">
                <button
                  type="submit"
                  className={`flex w-full items-center justify-center text-xl font-medium tracking-[-0.4px] text-white rounded-xl px-5 py-2.5 ${!isLoading ? "bg-primary shadow-xs hover:bg-primary/90 hover:scale-101 transition-all duration-300 cursor-pointer select-none" : "bg-primary/50 cursor-not-allowed"}`}
                >
                  {isLoading ? "Logging in..." : "Login"}
                </button>
              </div>
            </form>
            <div className="flex w-full items-center gap-2 justify-center">
              <div className="h-px flex-1 bg-black/20"></div>
              <p className="text-sm font-medium text-text leading-[120%] tracking-[-0.4px]">
                or Login With
              </p>
              <div className="h-px flex-1 bg-black/20"></div>
            </div>
            <div className="flex w-full gap-5 py-[15px]">
              <button className="w-full gap-[10px] flex items-center justify-center text-xl font-medium tracking-[-0.4px] text-text rounded-xl px-5 py-2.5 bg-white border border-[#DAE0DA] shadow-xs hover:bg-slate-200/50 hover:scale-101 transition-all duration-300 cursor-pointer select-none">
                <SvgImg src="/Icon/google.svg" size={1.6} alt="Google icon" />
                <span>Google</span>
              </button>
            </div>
            <div className="flex w-full justify-center mt-5">
              <p className="text-md font-medium text-text text-center leading-[120%] tracking-[-0.32px]">
                By signing in, you agree to our Terms & Conditions and Privacy
                Policy
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default page;
