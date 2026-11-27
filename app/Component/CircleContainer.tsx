import React, { ReactNode } from "react";

interface data {
  bg: string;
  pad: number;
  clname?: string;
  styling?: object;
}

const CircleContainer = ({
  children,
  data,
}: {
  children: ReactNode;
  data: data;
}) => {
  const styling =
    " rounded-full inline-flex justify-center align-center " + data.clname;

  return (
    <div
      style={{
        backgroundColor: data.bg,
        padding: data.pad + "rem",
        ...data.styling,
      }}
      className={styling}
    >
      {children}
    </div>
  );
};

export default CircleContainer;
