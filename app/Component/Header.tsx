"use client";
import { useDictionary } from "@/provider/useDictionary";
import Link from "next/link";
import { useEffect, useState } from "react";
import NavMenu from "./NavMenu";
import Select from "./Select";
import SvgImg from "./SvgImg";
interface data {
  active: number;
  isLoading?: boolean;
  profileData: {
    name: string;
    status: string;
    photo: string;
  };
}

const Header = ({ active, profileData, isLoading }: data) => {
  const { isDictionary, setDictionary, t } = useDictionary();

  const valueIndex = isDictionary === "Arab" ? 1 : 0;
  const [isSelect, setIsSelect] = useState<number>(valueIndex);
  const navMenuList = [
    { label: t("navbar.home"), val: "Home" },
    { label: t("navbar.lesson"), val: "Lessons" },
    { label: t("navbar.article"), val: "Article" },
    { label: t("navbar.lectures"), val: "Lectures" },
    { label: t("navbar.fatwa"), val: "Fatwa" },
    { label: t("navbar.e_book"), val: "E-Book" },
    { label: t("navbar.live"), val: "Live" },
  ];

  const getCookieValue = (name: string) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);

    if (parts.length === 2) {
      return parts.pop()?.split(";").shift();
    }
    return null;
  };

  useEffect(() => {
    const getProfile = sessionStorage.getItem("profile");
    if (!getProfile) {
      sessionStorage.clear();
      return;
    }
  }, []);

  const handleSelected = (value: number) => {
    setIsSelect(value);
    setDictionary(value === 0 ? "English" : "Arab");
  };

  return (
    <div className="flex justify-between items-center self-stretch z-1000">
      {/* Logo */}
      <div className="flex gap-2 items-center cursor-pointer select-none">
        <SvgImg size={5} src="/Image/logo.svg" alt="Anas Burhanuddin Logo" />
        <p className="text-2xl font-medium tracking-min-4">Anas Burhanuddin</p>
      </div>
      {/* Navbar */}
      <div className="gap-6 flex items-center">
        {navMenuList.map((val, i) => {
          let states = false;
          if (active == i) {
            states = true;
          }
          return (
            <Link
              href={`/${val.val.replaceAll("-", "").toLowerCase()}`}
              key={i}
            >
              <NavMenu text={val.label} active={states}></NavMenu>
            </Link>
          );
        })}
      </div>
      {/* Profile */}
      <div className="flex gap-6 items-center">
        {/* selection */}
        <Select
          option={["English", "Arab"]}
          selected={isSelect}
          setIsSelect={handleSelected}
        ></Select>
        <div className="flex gap-3 items-center">
          {/* profile image */}
          <div className="overflow-hidden rounded-full shadow-lg">
            <SvgImg
              size={3.75}
              src={profileData?.photo ?? "/Placeholder/profile_image.jpeg"}
              alt="Profile Photo"
              usrSlct
            ></SvgImg>
          </div>
          {/* profile name */}
          <div className="flex flex-col">
            {!isLoading ? (
              <p className="w-35 text-[1rem] font-medium text-ellipsis overflow-hidden tracking-min-2 whitespace-nowrap">
                {profileData?.name ? profileData.name : "Guest"}
              </p>
            ) : (
              <div className="w-30 h-5 bg-slate-300/70 blur-xs animate-pulse"></div>
            )}
            {!isLoading ? (
              <p className="w-35 text-[0.75rem] text-gray font-normal text-ellipsis overflow-hidden tracking-min-2 whitespace-nowrap">
                {profileData?.status ? profileData.status : ""}
              </p>
            ) : (
              <div className="w-20 h-2 bg-slate-300/70 blur-xs animate-pulse"></div>
            )}
          </div>
        </div>
        {/* chevron */}
        <SvgImg
          size={1}
          src="/Icon/Chevron down.svg"
          alt="Arrow Down"
          usrSlct
        ></SvgImg>
      </div>
    </div>
  );
};

export default Header;
