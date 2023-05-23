import React, { useState, ReactNode } from "react";
import Web3 from "web3";
import { ColumnKeysFilterable } from "../types/types";
import { fireTimeout } from "../utils";
import FilterIcon from "../assets/filter.svg";
import FilterActiveIcon from "../assets/filter_active.svg";

interface FilterProps {
    fieldKey: ColumnKeysFilterable;
    children?: ReactNode;
    filterHandler: (fieldKey: ColumnKeysFilterable, filterRule: string) => void;
}

const Filter = ({ fieldKey, children, filterHandler }: FilterProps) => {
    const [filterActive, setFilterActive] = useState(false);
    const [invalidInput, setInvalidInput] = useState(false);
    const [inputValue, setInputValue] = useState("");

    const handler = (e: React.FormEvent<HTMLInputElement>) => {
        setInputValue((e.currentTarget as HTMLInputElement).value);
    };

    const applyFilter = (e: React.MouseEvent) => {
        if (filterActive || inputValue === "") {
            // clear filter
            setFilterActive(false);
            setInputValue("");
            filterHandler(fieldKey, "");
        } else {
            // try to apply filter
            if (Web3.utils.isAddress(inputValue)) {
                setFilterActive(true);
                filterHandler(fieldKey, inputValue);
                (e.target as HTMLButtonElement).blur();
            } else {
                fireTimeout(setInvalidInput, true, false);
            }
        }
    };

    return (
        <div className="relative group" tabIndex={0}>
            <div
                className="cursor-pointer"
                onClick={() =>
                    document.getElementById("filter_input_" + fieldKey)?.focus()
                }
            >
                {children}
                <img
                    src={filterActive ? FilterActiveIcon : FilterIcon}
                    alt="Filter"
                    className="basic-icon"
                />
            </div>
            <div
                className="absolute w-auto p-2 m-2 min-w-max flex flex-col items-center
                rounded-xl shadow-md bg-pink-200 opacity-100 z-10
                transition-all duration-200 scale-0 group-focus-within:scale-100
                left:0 origin-top-left max-xl:right-0 max-xl:origin-top-right"
            >
                <input
                    id={"filter_input_" + fieldKey}
                    type="text"
                    placeholder="Address filter"
                    value={inputValue}
                    onChange={handler}
                    className="rounded-md px-1 py-1 m-1 w-40 md:w-60 font-normal"
                />
                <button
                    onClick={(e) => applyFilter(e)}
                    className="text-white bg-gray-700
                    rounded-xl w-2/3 mt-2 m-1
                    active:ring-2 active:outline-none active:ring-pink-400"
                >
                    {filterActive
                        ? "Clear"
                        : invalidInput
                        ? "Invalid!"
                        : "Apply"}
                </button>
            </div>
        </div>
    );
};

export default Filter;
