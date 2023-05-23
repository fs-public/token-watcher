import React, { ReactNode } from "react";
import { SortState } from "../types/types";
import SorterIcon from "../assets/sort_default.svg";
import SorterIconDescending from "../assets/sort_descending.svg";
import SorterIconAscending from "../assets/sort_ascending.svg";

const Icons = [SorterIcon, SorterIconDescending, SorterIconAscending];

interface ColumnSortableProps {
    state: SortState;
    children?: ReactNode;
    sortHandler: () => void;
}

const ColumnSortable = ({
    state,
    children,
    sortHandler,
}: ColumnSortableProps) => {
    return (
        <div onClick={sortHandler} className="cursor-pointer" tabIndex={0}>
            {children}
            <img src={Icons[state]} alt="Sort" className="basic-icon" />
        </div>
    );
};

export default ColumnSortable;
