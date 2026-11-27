import { CSSProperties, ReactNode } from "react";

interface data {
  style?: CSSProperties;
  children: ReactNode;
  title?: string;
  className?: string;
}

const ContentBox = ({ style, children, className, title }: data) => {
  return (
    <div
      className={`p-6 flex flex-col gap-6 rounded-3xl ${className} bg-white`}
      style={style}
    >
      <h2 className="w-full text-text text-xl/c-120 tracking-min-2 font-medium">
        {title}
      </h2>
      {children}
    </div>
  );
};

export default ContentBox;
