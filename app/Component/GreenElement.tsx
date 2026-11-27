import Image from "next/image";
import { useRouter } from "next/navigation";
import { CSSProperties, ReactNode } from "react";

interface data {
  width: number;
  tag: ReactNode;
  title: string;
  description?: string;
  button: string;
  image: string;
  imgWidth: number;
  style?: CSSProperties;
  routing?: string;
  isLoading?: boolean;
  className?: string;
}

const GreenElement = ({
  width,
  tag,
  title,
  description,
  button,
  image,
  imgWidth,
  style,
  routing,
  isLoading,
  className,
}: data) => {
  const router = useRouter();

  if (isLoading) {
    return (
      <div
        style={{ width: width + "rem", ...style }}
        className="flex gap-3 p-2 rounded-3xl  bg-[linear-gradient(95deg,var(--primary)_0.35%,var(--dark-primary)_99.65%)] animate-pulse"
      >
        {/* Left Skeleton */}
        <div className="p-4 flex flex-col flex-1 gap-7.5">
          {/* Tag Skeleton */}
          <div className="w-20 h-6 rounded-full bg-white/20 self-start" />

          {/* Title Skeleton */}
          <div className="flex flex-col gap-2">
            <div className="h-7 w-3/4 rounded-md bg-white/20" />
            <div className="h-7 w-1/2 rounded-md bg-white/20" />
          </div>

          {/* Description Skeleton */}
          <div className="flex flex-col gap-2">
            <div className="h-5 w-full rounded-md bg-white/10" />
            <div className="h-5 w-4/5 rounded-md bg-white/10" />
          </div>

          {/* Button Skeleton */}
          <div className="w-32 h-11 bg-white/20 rounded-xl self-start" />
        </div>

        {/* Right Image Skeleton */}
        <div
          className="rounded-2xl overflow-hidden self-stretch bg-white/10 min-h-[12rem]"
          style={{ width: imgWidth + "rem" }}
        />
      </div>
    );
  }
  return (
    <div
      style={{ width: width + "rem", ...style }}
      className={`flex gap-3 p-2 rounded-3xl  min-h-[15rem] ${className} ${!title && "items-center justify-center"}
    bg-[linear-gradient(95deg,var(--primary)_0.35%,var(--dark-primary)_99.65%)]`}
    >
      {title ? (
        <>
          <div className="p-4 flex flex-col flex-1 gap-7.5">
            {/* tag */}
            <div className="p-[0.25rem_0.5rem] rounded-full bg-[rgba(255,255,255,0.10)] text-[0.75rem] font-regular text-white tracking-min-2 self-start">
              {tag}
            </div>
            {/* title */}
            <h2 className="text-[1.75rem]/[120%] text-white font-medium tracking-min-2">
              {title}
            </h2>
            {/* description */}
            {description && (
              <p className="text-xl/c-120 text-white font-light tracking-min-2">
                {description}
              </p>
            )}
            {/* button */}

            <button
              onClick={() => router.push(routing || "")}
              className="p-[0.75rem_1rem] bg-white rounded-xl gap-2.5 flex self-start items-center cursor-pointer hover:bg-white/70"
            >
              {button}
              <Image
                src={"/Icon/arrow.svg"}
                alt="arrowIcon"
                blurDataURL="/Icon/arrow.svg"
                placeholder="blur"
                width={11}
                height={7}
              />
            </button>
          </div>
          <div
            className="rounded-2xl overflow-hidden self-stretch relative"
            style={{ width: imgWidth + "rem" }}
          >
            <Image
              src={image}
              alt="Representative Image"
              blurDataURL={image}
              placeholder="blur"
              className="object-cover"
              fill
            />
          </div>
        </>
      ) : (
        <div className="flex w-full h-full items-center justify-center text-[1.45rem]/[120%] text-white font-medium tracking-min-2 mx-auto">
          No Data Available
        </div>
      )}
    </div>
  );
};

export default GreenElement;
