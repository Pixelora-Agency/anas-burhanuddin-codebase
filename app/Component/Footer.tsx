"use client";
import { useDictionary } from "@/provider/useDictionary";
import Link from "next/link";
import SvgImg from "./SvgImg";

const Footer = () => {
  const { t } = useDictionary();
  return (
    <footer className="w-full py-20 flex flex-col justify-center gap-2">
      {/* top */}
      <div className="flex gap-24 justify-center">
        {/* logo */}
        <div className="flex select-none">
          <SvgImg size={14} src="/Image/logo.svg" alt="Anas Burhanuddin Logo" />
        </div>
        {/* text */}
        <div className="flex flex-col items-center">
          <h1 className="text-white font-medium text-[3rem]">
            فضيلة الشيخ الدكتور
          </h1>
          <h1 className="text-white font-medium text-[4rem]">
            إبراهيم عامر الرحيلي
          </h1>
        </div>
        {/* menu */}
        <div className="w-48 grid grid-rows-4 grid-cols-2 text-white">
          <Link href={"/home"}>
            <h3 className="cursor-pointer">{t("navbar.home")}</h3>
          </Link>
          <Link href={"/about"}>
            <h3 className="cursor-pointer">{t("navbar.about")}</h3>
          </Link>
          <Link href={"/lessons"}>
            <h3 className="cursor-pointer">{t("navbar.lesson")}</h3>
          </Link>
          <Link href={"/article"}>
            <h3 className="cursor-pointer">{t("navbar.article")}</h3>
          </Link>
          <Link href={"/lectures"}>
            <h3 className="cursor-pointer">{t("navbar.lectures")}</h3>
          </Link>
          <Link href={"/fatwa"}>
            <h3 className="cursor-pointer">{t("navbar.fatwa")}</h3>
          </Link>
          <Link href={"/ebook"}>
            <h3 className="cursor-pointer">{t("navbar.e_book")}</h3>
          </Link>
          <Link href={"/live"}>
            <h3 className="cursor-pointer">{t("navbar.live")}</h3>
          </Link>
        </div>
      </div>
      {/* bottom */}
      <div className="flex gap-4 justify-center items-center">
        {/* wa */}
        <Link
          href="wa.me/966583088912?text=اشتراك"
          className="cursor-pointer p-3 border border-white rounded-full
          hover:bg-black duration-300 hover:scale-90"
        >
          <div className="w-7 h-7 flex items-center justify-center overflow-hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 1280 1280"
              fill="white"
              width="42"
              height="42"
              className="shrink-0"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M1021.7,610c-15.5-195.2-180.7-349.7-381.6-349.7c-197.7,0-361.4,150.4-380,342.7c-1.6,12.3-2.5,24-2.5,36.3
                  c0,83.1,27.2,160.8,73,222.7l-47.4,141.2l146.6-46.4c60.7,39.5,132.7,62.9,210.4,62.9l0,0c210.7,0,382.2-170.9,382.2-380.3
                  C1022.4,630.2,1022.4,620.1,1021.7,610z M863.5,792.6c-9.5,26.5-55.3,51.2-75.2,52.8c-20.2,1.6-20.2,16.4-134.2-27.8
                  c-113.4-44.2-184.8-159.2-190.1-166.8c-3.8-5.4-28.5-37.3-39.5-76.8c-3.8-11.7-6.3-25-6.3-37.3c0-61.6,29.1-105.5,91-105.5
                  c6,0,15.5-3.8,24.6,18.6c9.5,21.8,31.9,76.8,34.1,82.1c3.1,5.4,4.7,11.7,0.9,19.3c-11.4,23.1-42.3,42.3-32.5,60.6
                  c6,10.7,28.8,46.4,61.9,76.1c42.6,37.9,78.3,49.6,90,55c23.4,11.7,47.4-27.8,58.7-45.8c7.9-11.7,14.8-9.2,25.9-6.3
                  c0,0.3,92.9,42.3,96.6,49C872.7,744.5,872.7,767,863.5,792.6z"
              />
            </svg>
          </div>
        </Link>
        {/* youtube */}
        <Link
          href="https://www.youtube.com/channel/UCBc5AoNVZ4dIz-WFJogM-Ww"
          className="cursor-pointer p-3 border border-white rounded-full
          hover:bg-black duration-300 hover:scale-90"
        >
          <svg
            id="Layer_2"
            data-name="Layer 2"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 197.15 138.11"
            fill="#fff"
            width="28"
            height="28"
          >
            <g id="Layer_1-2" data-name="Layer 1">
              <path
                className="cls-1"
                d="M192.98,21.6c-2.3-8.5-8.79-15.12-17.43-17.43C160.29,0,98.5,0,98.5,0c0,0-61.64,0-76.9,4.18C13.1,6.48,6.48,13.11,4.03,21.6,0,36.87,0,68.98,0,68.98c0,0,0,32.11,4.03,47.52,2.45,8.35,9.07,15.12,17.57,17.43,15.27,4.18,76.9,4.18,76.9,4.18,0,0,61.78,0,77.05-4.18,8.64-2.3,15.12-9.07,17.43-17.43,4.18-15.41,4.18-47.52,4.18-47.52,0,0,0-32.11-4.18-47.38ZM78.92,98.65v-59.19l51.12,29.52-51.12,29.67Z"
              />
            </g>
          </svg>
        </Link>
        {/* facebook */}
        <Link
          href="https://www.facebook.com/rehyili"
          className="cursor-pointer p-3 border border-white rounded-full
          hover:bg-black duration-300 hover:scale-90"
        >
          <svg
            version="1.1"
            id="Layer_2_00000082332129806877074630000009218431424116545420_"
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            viewBox="0 0 164 163"
            width="28"
            height="28"
            fill="white"
          >
            <g>
              <path
                className="st0"
                d="M121.8,95.3l5.7-31.1H94.2v-11c0-16.4,6.5-22.8,23.2-22.8c5.2,0,9.4,0.1,11.8,0.4V2.5C124.6,1.3,113.5,0,107,0
		              C72.9,0,57.2,16.1,57.2,50.7v13.4H36.1v31.1h21.1V163h37V95.3H121.8z"
              />
            </g>
          </svg>
        </Link>
        {/* x */}
        <Link
          href="https://twitter.com/rehyli"
          className="cursor-pointer p-3 border border-white rounded-full
          hover:bg-black duration-300 hover:scale-90"
        >
          <svg
            version="1.1"
            id="svg5"
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            viewBox="0 0 1668.6 1221.2"
            fill="white"
            width="28"
            height="28"
          >
            <g>
              <path
                className="st0"
                d="M1425.4,1.1h-113.9l-408,440.8L573.9,1.1H186.3l502.9,672.4l-506,546.7H297l443-478.6l357.9,478.6h387.6
		              L954.4,509.9L1425.4,1.1z M1318.1,1136.2h-178L353.8,85h178L1318.1,1136.2z"
              />
            </g>
          </svg>
        </Link>
        {/* telegram */}
        <Link
          href="https://t.me/rehyli"
          className="cursor-pointer p-3 border border-white rounded-full
          hover:bg-black duration-300 hover:scale-90"
        >
          <div className="w-7 h-7 flex items-center justify-center overflow-hidden">
            <svg
              id="Layer_1"
              data-name="Layer 1"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 1000 1000"
              width="42"
              height="42"
              fill="white"
              className="shrink-0"
            >
              <g id="Artboard">
                <path
                  id="Path-3"
                  className="cls-1"
                  d="M226.33,494.72c145.76-63.51,242.96-105.37,291.59-125.6,138.86-57.75,167.71-67.79,186.51-68.12,4.14-.07,13.38.95,19.38,5.81,5.06,4.1,6.45,9.65,7.12,13.54s1.5,12.76.84,19.68c-7.52,79.06-40.08,270.92-56.65,359.47-7.01,37.47-20.81,50.03-34.17,51.26-29.04,2.67-51.08-19.19-79.21-37.62-44.01-28.85-68.87-46.8-111.58-74.95-49.37-32.53-17.36-50.41,10.77-79.63,7.36-7.65,135.3-124.01,137.77-134.57.31-1.32.6-6.24-2.33-8.84s-7.24-1.71-10.35-1c-4.41,1-74.71,47.47-210.9,139.4-19.95,13.7-38.03,20.38-54.22,20.03-17.85-.39-52.19-10.09-77.72-18.39-31.31-10.18-56.2-15.56-54.03-32.85,1.13-9,13.53-18.21,37.2-27.62Z"
                />
              </g>
            </svg>
          </div>
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
