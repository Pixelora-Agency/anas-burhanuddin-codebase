"use client";

import {
  ArrowDownUp,
  ArrowUpDown,
  ChevronLeft,
  ChevronRight,
} from "@/public/Icon/Icon";
import React, { useMemo, useState } from "react";
import SvgImg from "./SvgImg";

export interface Column<T> {
  header: string;
  accessor: keyof T | ((row: T) => React.ReactNode);
  accessorKey?: string | keyof T;
  sortKey?: keyof T;
  sortable?: boolean;
}

interface TableProps<T> {
  data: T[];
  columns: Column<T>[];
  isSearch?: boolean;
  isFilter?: (keyof T)[];
  isPagination?: boolean;
  isSort?: boolean;
  itemsPerPage?: number;
  isLoading?: boolean;
  customTable?: {
    totalPages: number;
    totalData: number;
    handlePagination: (page: number) => void;
  };
}

function paginationRender(currentPages: number, totalPages: number) {
  if (totalPages <= 5) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  const pages: (number | string)[] = [];

  if (currentPages <= 3) {
    pages.push(1, 2, 3, 4, "...", totalPages);
  } else if (currentPages > totalPages - 3) {
    pages.push(
      1,
      "...",
      totalPages - 3,
      totalPages - 2,
      totalPages - 1,
      totalPages,
    );
  } else {
    pages.push(
      1,
      "...",
      currentPages - 1,
      currentPages,
      currentPages + 1,
      "...",
      totalPages,
    );
  }

  return pages;
}

export function Table<T extends Record<string, any>>({
  data,
  columns,
  isSearch = true,
  isFilter = [],
  isPagination = true,
  isSort = true,
  itemsPerPage = 10,
  isLoading = false,
  customTable,
}: TableProps<T>) {
  const [searchData, setSearchData] = useState<any>("");
  const [filterValues, setFilterValues] = useState<Record<keyof T, string>>(
    {} as Record<keyof T, string>,
  );
  const [sortField, setSortField] = useState<keyof T | null>(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [currentPage, setCurrentPage] = useState<number>(1);

  const capitalizeFirstLetter = (val: string) => {
    if (!val) return "";
    return val.charAt(0).toUpperCase() + val.slice(1).toLowerCase();
  };

  const filteredByColumn = useMemo(() => {
    return data.filter((row) => {
      return Object.entries(filterValues).every(([key, val]) => {
        if (!val) return true;
        return String(row[key]) === val;
      });
    });
  }, [filterValues, data]);

  const searchedData = useMemo(() => {
    if (!isSearch || !searchData) return filteredByColumn;
    return filteredByColumn.filter((row) =>
      Object.values(row).some((val) =>
        String(val).toLowerCase().includes(searchData.toLowerCase()),
      ),
    );
  }, [searchData, filteredByColumn, isSearch]);

  const sortedData = useMemo(() => {
    if (!sortField || !isSort) return searchedData;
    return [...searchedData].sort((a, b) => {
      if (a[sortField] < b[sortField]) return sortOrder === "asc" ? -1 : 1;
      if (a[sortField] > b[sortField]) return sortOrder === "asc" ? 1 : -1;
      return 0;
    });
  }, [sortField, searchedData, isSort, sortOrder]);

  const paginatedData = useMemo(() => {
    if (!isPagination) return sortedData;
    if (customTable) {
      return sortedData;
    }
    const start = (currentPage - 1) * itemsPerPage;
    return sortedData.slice(start, start + itemsPerPage);
  }, [isPagination, sortedData, currentPage, itemsPerPage]);

  const totalPages = !customTable
    ? Math.ceil(sortedData.length / itemsPerPage)
    : customTable.totalPages;
  const paginationNumbering = paginationRender(currentPage, totalPages);

  const handleSort = (field: keyof T) => {
    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  };

  return (
    <div className="w-full flex flex-col space-y-4 bg-white p-4 rounded-xl">
      {(isSearch || isFilter?.length > 0) && (
        <div className="flex flex-col sm:flex-row items-center justify-between flex-wrap gap-3 p-3 rounded-xl shadow-sm border border-gray-100">
          {/* Search Input */}
          <div className="relative flex items-center gap-4 w-full sm:w-auto">
            <div className="absolute left-3 top-1/2 -translate-y-1/2">
              <SvgImg src="/Icon/Search.svg" size={1.2} alt="search icon" />
            </div>
            <input
              type="text"
              placeholder="Search"
              className="w-full sm:w-64 text-text pl-9 pr-4 py-2 border border-gray-300 rounded-2xl shadow-sm focus:outline-none focus:ring-1 focus:ring-dark-green"
              value={searchData}
              onChange={(e) => {
                setSearchData(e.target.value);
                setCurrentPage(1);
              }}
            />
          </div>

          {/* Filter Selectors */}
          <div className="flex items-center gap-2 w-full sm:w-auto flex-wrap">
            {isFilter.map((colKey) => {
              const uniqueValues = Array.from(
                new Set(data.map((item) => String(item[colKey]))),
              );

              return (
                <select
                  key={String(colKey)}
                  value={filterValues[String(colKey)] || ""}
                  onChange={(e) => {
                    setFilterValues({
                      ...filterValues,
                      [String(colKey)]: e.target.value,
                    });
                    setCurrentPage(1);
                  }}
                  className="w-full sm:w-auto text-sm text-text p-2.5 border border-gray-300 rounded-2xl shadow-sm focus:outline-none focus:ring-1 focus:ring-dark-green"
                >
                  <option value="">
                    All {capitalizeFirstLetter(String(colKey))}
                  </option>
                  {uniqueValues.map((val, idx) => (
                    <option key={idx} value={val}>
                      {val}
                    </option>
                  ))}
                </select>
              );
            })}
          </div>
        </div>
      )}
      <div className="overflow-x-auto border border-slate-100 rounded-lg bg-white p-2 shadow-sm ">
        <table className="w-full max-w-full border-collapse text-left text-sm">
          <thead className="rounded-xl text-white text-sm ">
            <tr>
              {columns.map((col, i) => (
                <th
                  className={`px-4 py-3 ${
                    i === 0
                      ? "rounded-tl-xl rounded-bl-xl"
                      : i === columns.length - 1
                        ? "rounded-tr-xl rounded-br-xl"
                        : ""
                  } bg-dark-green font-medium`}
                  key={i}
                >
                  {isSort &&
                  (typeof col.accessor === "string" || col.accessorKey) ? (
                    <button
                      onClick={() =>
                        handleSort((col.accessorKey || col.accessor) as keyof T)
                      }
                      className=" flex items-center gap-1 hover:text-slate-300/70 font medium cursor-pointer"
                    >
                      {col.header}

                      {sortField ===
                        (col.accessorKey ||
                          (typeof col.accessor === "string"
                            ? col.accessor
                            : null)) &&
                        (sortOrder === "asc" ? (
                          <ArrowUpDown className="w-4 h-4" />
                        ) : (
                          <ArrowDownUp className="w-4 h-4" />
                        ))}
                    </button>
                  ) : (
                    col.header
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {isLoading ? (
              Array.from({ length: 5 }).map((_, rowIndex) => (
                <tr key={rowIndex} className="animate-pulse border-b">
                  {columns.map((_, colIndex) => (
                    <td key={colIndex} className="py-4 px-4">
                      <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                    </td>
                  ))}
                </tr>
              ))
            ) : paginatedData.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length}
                  className="px-4 py-3 text-center text-gray-500"
                >
                  No data available
                </td>
              </tr>
            ) : (
              paginatedData.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {columns.map((col, colIndex) => (
                    <td className="px-4 py-3" key={colIndex}>
                      {typeof col.accessor === "function"
                        ? col.accessor(row)
                        : String(row[col.accessor as keyof T])}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="flex justify-between items-center text-sm">
        <span className="text-text font-semibold">
          Showing {currentPage} of{" "}
          {customTable ? customTable.totalData : totalPages} result
        </span>
        <div className="flex gap-2">
          <button
            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            disabled={currentPage === 1}
            className=" disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 cursor-pointer"
          >
            <ChevronLeft />
          </button>
          {paginationNumbering.map((item, i) => {
            const isDots = typeof item !== "number";
            return (
              <div
                key={i}
                onClick={() => {
                  if (isDots) return;

                  customTable?.handlePagination(item);
                  setCurrentPage(item);
                }}
                className={`flex items-center justify-center w-4 text-center ${item !== currentPage ? "text-[#41403B] text-lg font-semibold " : "bg-[#0E3E2C] px-2 py-1 w-7 rounded-md text-white text-lg font-semibold"} tracking-[-0.32px] leading-[120%] ${isDots ? "" : "cursor-pointer"}`}
              >
                {item}
              </div>
            );
          })}
          <button
            onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
            disabled={currentPage === totalPages}
            className=" disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 cursor-pointer"
          >
            <ChevronRight />
          </button>
        </div>
      </div>
    </div>
  );
}
