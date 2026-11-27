import Image from "next/image";
import Link from "next/link";

interface data {
  state: number;
}

const LeftNavbar = ({ state }: data) => {
  const navbar = [
    {
      alt: "home",
      size_width: 1,
      size_height: 1,
      src: "/Icon/navbar/home",
    },
    {
      alt: "lessons",
      size_width: 0.875,
      size_height: 1,
      src: "/Icon/navbar/lessons",
    },
    {
      alt: "article",
      size_width: 1.125,
      size_height: 1.125,
      src: "/Icon/navbar/article",
    },
    {
      alt: "lectures",
      size_width: 1.5,
      size_height: 1.5,
      src: "/Icon/navbar/lectures",
    },
    {
      alt: "fatwa",
      size_width: 0.9375,
      size_height: 1.125,
      src: "/Icon/navbar/fatwa",
    },
    {
      alt: "e-book",
      size_width: 0.875,
      size_height: 1.125,
      src: "/Icon/navbar/e-book",
    },
    {
      alt: "live",
      size_width: 1.25,
      size_height: 1.125,
      src: "/Icon/navbar/live",
    },
  ];

  return (
    <div className="flex flex-col p-1 gap-1 bg-[rgba(255,255,255,0.50)] fixed z-100 left-8.5 rounded-full backdrop-blur-[3px] top-[50%] translate-[-50%] cursor-pointer select-none">
      {navbar.map((val, i) => {
        return (
          <Link href={`/${val.alt.replaceAll("-", "").toLowerCase()}`} key={i}>
            <div
              className="flex justify-center items-center w-9 h-9 rounded-full"
              style={{ background: state == i ? "var(--primary)" : "" }}
            >
              <Image
                src={state == i ? val.src + "-white.svg" : val.src + ".svg"}
                alt={val.alt}
                width={16 * val.size_width}
                height={16 * val.size_height}
              />
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default LeftNavbar;
