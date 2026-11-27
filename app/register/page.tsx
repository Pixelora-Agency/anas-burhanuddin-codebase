"use client";
import { Checked, Eye, EyeOff } from "@/public/Icon/Icon";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import SvgImg from "../Component/SvgImg";

const page = () => {
  const [isForm, setIsForm] = useState({
    name: "",
    email: "",
    pass: "",
    confirm_pass: "",
  });
  const [showPassword, setShowPassword] = useState<boolean>(true);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  //   REGEX
  const isSame = isForm.pass === isForm.confirm_pass;
  const isLengthValid = isForm.pass.length >= 8;
  const isHasNumber = /\d/.test(isForm.pass);
  const isHasUppercase = /[A-Z]/.test(isForm.pass);
  const isHasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(isForm.pass);

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
    setIsLoading(true);
    try {
      const fetchResult = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(isForm),
      });
      const res = await fetchResult.json();
      if (res.success) {
        alert("Register Success!!, Please verify your email");
        router.push("/login");
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
            href={"/login"}
            className="flex gap-2 items-center cursor-pointer select-none"
          >
            <span className="text-sm font-medium tracking-min-4 text-text leading-[120%] hover:text-slate-600/60">
              Already have an account? Login
            </span>
          </Link>
        </header>
        <div className="flex flex self-stretch items-start justify-center gap-5 ">
          <div className="hidden md:h-[66.6rem] md:flex md:flex-col md:w-[33.7rem] md:items-start md:gap-4 md:bg-cover md:bg-center md:bg-[url('/Image/auth.png')] rounded-xl md:shadow-sx md:text-white p-12">
            <div className="flex flex-col gap-2">
              <h1 className="text-5xl font-bold leading-[120%] tracking-[-1.28px]">
                Start your journey with AI-Rehaili
              </h1>
              <div className="py-11">
                <p className="text-xl font-normal leading-[120%] tracking-[-1.28px]">
                  Create your account to access lessons, articles, lectures, and
                  more to deepen your knowledge and strengthen your faith
                </p>
              </div>
            </div>
            <div className="flex self-stretch items-center rounded-xl gap-5 px-6 py-7 bg-white/20">
              <div className="rounded-full bg-white flex items-center justify-center p-3">
                <SvgImg src="/Icon/book-open.svg" size={4} alt="quran icon" />
              </div>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Phasellus feugiat efficitur laoreet. Nulla dignissim est et
                accumsan placerat
              </p>
            </div>
          </div>
          <div className="flex flex-1 flex-col p-7 md:px-10 md:py-15 w-full gap-[15px] rounded-xl bg-white shadow-xs items-start self-stretch">
            <div className="flex flex-col gap-[10px] w-full md:mb-13">
              <h2 className="text-4xl font-semibold text-text leading-[120%] tracking-[-0.8px]">
                Create your account
              </h2>
              <p className="text-xl font-normal text-text leading-[120%] tracking-[-0.4px]">
                Join AI-Rohaili and begin your spiritual learning journey
              </p>
            </div>
            <form
              onSubmit={handleSubmit}
              className="flex flex-col gap-[27px] w-full"
            >
              <div className="flex flex-col w-full gap-[10px]">
                <label
                  htmlFor="Full Name"
                  className="text-xl font-semibold text-text leading-[120%] tracking-[-0.4px]"
                >
                  Full Name
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
                    id="fullname"
                    name="fullname"
                    placeholder="Enter your full name"
                    value={isForm.name}
                    onChange={(e) =>
                      setIsForm({ ...isForm, name: e.target.value })
                    }
                    className="flex w-full items-center text-xl text-text rounded-xl pl-14 pr-5 py-2.5 bg-white shadow-xs border border-black/20 focus:outline-primary"
                    required
                  />
                </div>
              </div>
              <div className="flex flex-col w-full gap-[10px]">
                <label
                  htmlFor="emailorusername"
                  className="text-xl font-semibold text-text leading-[120%] tracking-[-0.4px]"
                >
                  Email or Username
                </label>
                <div className="relative flex">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2">
                    <SvgImg
                      src="/Icon/mark_email_unread.svg"
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
                    id="emailorusername"
                    name="emailorusername"
                    placeholder="Enter your email or username"
                    value={isForm.email}
                    onChange={(e) =>
                      setIsForm({ ...isForm, email: e.target.value })
                    }
                    className="flex w-full items-center text-xl text-text rounded-xl pl-14 pr-5 py-2.5 bg-white shadow-xs border border-black/20 focus:outline-primary"
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
                  <div className="absolute right-4 top-7 -translate-y-1/2 z-10">
                    <button
                      onClick={() => {
                        setShowPassword((prev) => !prev);
                      }}
                      type="button"
                      className="cursor-pointer"
                    >
                      {showPassword ? (
                        <Eye className="text-text w-5.5 h-5.5 " />
                      ) : (
                        <EyeOff className="text-text w-5.5 h-5.5" />
                      )}
                    </button>
                  </div>
                  <input
                    type={!showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    value={isForm.pass}
                    onChange={(e) => {
                      setIsForm({ ...isForm, pass: e.target.value });
                    }}
                    placeholder="Enter your password"
                    className="flex w-full items-center text-xl text-text rounded-xl pl-14 pr-10 py-2.5 bg-white shadow-xs border border-black/20 focus:outline-primary"
                    required
                  />
                </div>
              </div>
              <div className="flex flex-col w-full gap-[10px]">
                <label
                  htmlFor="Password Confirmation"
                  className="text-xl font-semibold text-text leading-[120%] tracking-[-0.4px]"
                >
                  Confirm Password
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
                  <div className="absolute right-4 top-7 -translate-y-1/2 z-10">
                    <button
                      onClick={() => {
                        setShowConfirmPassword((prev) => !prev);
                      }}
                      type="button"
                      className="cursor-pointer"
                    >
                      {showConfirmPassword ? (
                        <Eye className="text-text w-5.5 h-5.5 " />
                      ) : (
                        <EyeOff className="text-text w-5.5 h-5.5" />
                      )}
                    </button>
                  </div>
                  <input
                    type={!showConfirmPassword ? "text" : "password"}
                    id="passwordconfirmation"
                    value={isForm.confirm_pass}
                    onChange={(e) =>
                      setIsForm({ ...isForm, confirm_pass: e.target.value })
                    }
                    name="passwordconfirmation"
                    placeholder="Confirm your password"
                    className="flex w-full items-center text-xl text-text rounded-xl pl-14 pr-10 py-2.5 bg-white shadow-xs border border-black/20 focus:outline-primary"
                    required
                  />
                </div>
              </div>
              <div className="w-full grid grid-cols-1 md:grid-cols-2 px-6 py-4 md:px-8 md:py-6 gap-x-8 gap-y-3 border rounded-[8px] border-[#DAE0DA] bg-[#F5F5F5]">
                <div className="flex flex-col gap-3">
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <div
                      className={`w-4 h-4 border ${isLengthValid ? "border-primary border-2" : "border-slate-400"} rounded-[4px] flex items-center justify-center transition-colors duration-200`}
                    >
                      <Checked
                        className={`${isLengthValid ? "text-primary" : "text-slate-400"} transition-colors duration-200`}
                        strokeWidth={isLengthValid ? 3 : 2}
                      />
                    </div>
                    <span className="text-text text-sm">
                      At least 8 characters
                    </span>
                  </label>

                  <label className="flex items-center gap-3 cursor-pointer group">
                    <div
                      className={`w-4 h-4 border ${isHasNumber ? "border-primary border-2" : "border-slate-400"} rounded-[4px] flex items-center justify-center transition-colors duration-200`}
                    >
                      <Checked
                        className={`${isHasNumber ? "text-primary" : "text-slate-400"} transition-colors duration-200`}
                        strokeWidth={isHasNumber ? 3 : 2}
                      />
                    </div>
                    <span className="text-text text-sm">Include number</span>
                  </label>
                </div>

                <div className="flex flex-col gap-3">
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <div
                      className={`w-4 h-4 border ${isHasUppercase ? "border-primary border-2" : "border-slate-400"} rounded-[4px] flex items-center justify-center transition-colors duration-200`}
                    >
                      <Checked
                        className={`${isHasUppercase ? "text-primary" : "text-slate-400"} transition-colors duration-200`}
                        strokeWidth={isHasUppercase ? 3 : 2}
                      />
                    </div>
                    <span className="text-text text-sm">
                      Include uppercase letter
                    </span>
                  </label>

                  <label className="flex items-center gap-3 cursor-pointer group">
                    <div
                      className={`w-4 h-4 border ${isHasSpecial ? "border-primary border-2" : "border-slate-400"} rounded-[4px] flex items-center justify-center transition-colors duration-200`}
                    >
                      <Checked
                        className={`${isHasSpecial ? "text-primary" : "text-slate-400"} transition-colors duration-200`}
                        strokeWidth={isHasSpecial ? 3 : 2}
                      />
                    </div>
                    <span className="text-text text-sm">
                      Include special character
                    </span>
                  </label>
                </div>
              </div>
              <div className="w-full">
                <button
                  disabled={
                    !isLengthValid ||
                    !isHasNumber ||
                    !isHasUppercase ||
                    !isHasSpecial ||
                    !isSame ||
                    isLoading
                  }
                  className={`flex w-full items-center justify-center text-xl font-medium tracking-[-0.4px] text-white rounded-xl px-5 py-2.5 shadow-xs transition-all duration-300 cursor-pointer select-none ${
                    !isLengthValid ||
                    !isHasNumber ||
                    !isHasUppercase ||
                    !isHasSpecial ||
                    !isSame ||
                    isLoading
                      ? "bg-primary/50 cursor-not-allowed"
                      : "bg-primary hover:bg-primary/90 hover:scale-101"
                  }`}
                >
                  {isLoading ? "Creating Account..." : "Create Account"}
                </button>
              </div>
            </form>
            <div className="flex w-full items-center gap-2 justify-center">
              <div className="h-px flex-1 bg-black/20"></div>
              <p className="text-sm font-medium text-text leading-[120%] tracking-[-0.4px]">
                or Register With
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
