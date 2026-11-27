"use client";

import { useState } from "react";
import SvgImg from "./SvgImg";

interface data {
  option: string[];
  selected: number;
  setIsSelect: (value: number) => void;
}

const Select = ({ option, selected, setIsSelect }: data) => {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <div className="flex flex-col">
      <div
        className="flex p-[0.62rem_1rem_0.62rem_1.25rem] gap-1 text-[1rem] font-normal bg-[rgba(14,62,44,0.10)] border border-dark-green rounded-lg items-center cursor-pointer"
        onClick={() => {
          setOpen(!open);
        }}
      >
        {option[selected]}
        <SvgImg size={0.875} src="/Icon/Chevron down.svg" usrSlct></SvgImg>
      </div>
      {open && (
        <div className="flex flex-col absolute bg-white mt-14 p-1 rounded-lg gap-2">
          {option.map((val, i) => {
            let style = {};
            if (i == selected) {
              style = {
                background: "rgba(14,62,44,0.10)",
                padding: "0.62rem 1rem",
              };
            }
            return (
              <div
                className="p-[0.3rem_0.6rem] rounded-lg text-[0.8rem] cursor-pointer"
                key={i}
                style={style}
                onClick={() => {
                  setIsSelect(i);
                  setOpen(false);
                }}
              >
                {val}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Select;
