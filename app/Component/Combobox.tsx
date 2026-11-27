"use client";

import { ChevronDown, ChevronUp } from "@/public/Icon/Icon";
import { useEffect, useRef, useState } from "react";

interface OptionProps {
  value: string;
  label: string;
}

interface SelectProps {
  option: OptionProps[];
  isSelected: string | string[];
  setIsSelected: (val: any) => void;
  isCombobox?: boolean;
  placeHolder: string;
}

export const Combobox = ({
  option,
  isSelected,
  setIsSelected,
  isCombobox = false,
  placeHolder,
}: SelectProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Handler khusus untuk pilih/batal pilih di mode multi-select
  const handleSelectMulti = (val: string) => {
    const currentSelected = Array.isArray(isSelected) ? isSelected : [];
    if (currentSelected.includes(val)) {
      // Kalau sudah ada, hapus (unselect)
      setIsSelected(currentSelected.filter((item) => item !== val));
    } else {
      // Kalau belum ada, tambahkan
      setIsSelected([...currentSelected, val]);
    }
  };

  const removeBadge = (e: React.MouseEvent, valToRemove: string) => {
    e.stopPropagation(); // Biar dropdown nggak ikutan ke-buka/tutup
    if (Array.isArray(isSelected)) {
      setIsSelected(isSelected.filter((item) => item !== valToRemove));
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Input AREA */}
      <div
        onClick={() => setIsOpen(!isOpen)}
        className=" w-full max-w-[10rem] min-w-[10rem] min-h-[42px] flex items-center justify-between gap-1.5 p-2 border border-gray-300 rounded-2xl cursor-pointer bg-white focus-within:ring-1 focus-within:ring-dark-green"
      >
        {/* FILL DIV */}
        <div className="flex items-center flex-nowrap gap-1.5 flex-1 overflow-x-auto">
          {isCombobox ? (
            Array.isArray(isSelected) && isSelected.length > 0 ? (
              isSelected.map((item, idx) => (
                <span
                  key={idx}
                  className="flex items-center gap-1 bg-gray-100 text-text text-xs px-2.5 py-1 rounded-full border border-gray-200"
                >
                  {item}
                  <span
                    onClick={(e) => removeBadge(e, item)}
                    className="hover:text-red-500 font-bold ml-1 cursor-pointer"
                  >
                    ×
                  </span>
                </span>
              ))
            ) : (
              <span className="text-gray-400 text-sm px-1">{placeHolder}</span>
            )
          ) : (
            <span
              className={`text-sm px-1 ${!isSelected ? "text-gray-400" : "text-text"}`}
            >
              {typeof isSelected === "string" && isSelected
                ? option.find((item) => item.value === isSelected)?.label
                : placeHolder}
            </span>
          )}
        </div>

        {/* Chevron Icon */}
        <div className="text-gray-500 px-1">
          {isOpen ? (
            <ChevronUp className="w-4 h-4" />
          ) : (
            <ChevronDown className="w-4 h-4" />
          )}
        </div>
      </div>

      {/* Dropdown Option */}
      {isOpen && (
        <div className="absolute top-full left-0 w-full mt-1 bg-white border border-gray-300 rounded-2xl shadow-sm z-50 max-h-80 overflow-y-auto">
          {option.map((item, i) => {
            const isChecked = isCombobox
              ? Array.isArray(isSelected) && isSelected.includes(item.value)
              : isSelected === item.value;

            return (
              <div
                key={i}
                className={`p-2.5 cursor-pointer transition-all duration-200 flex items-center justify-between hover:bg-dark-green hover:text-white ${
                  isChecked ? "bg-emerald-50 text-dark-green font-medium" : ""
                }`}
                onClick={() => {
                  if (isCombobox) {
                    handleSelectMulti(item.value);
                  } else {
                    setIsSelected(item.value);
                    setIsOpen(false);
                  }
                }}
              >
                <span>{item.label}</span>
                {isCombobox && isChecked && <span className="text-xs">✓</span>}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

Combobox.displayName = "Combobox";
