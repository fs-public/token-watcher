import React, { ReactNode } from "react";
import { SortState } from "../types/types";
import { Icon } from "@iconify/react";

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
        <div
            onClick={sortHandler}
            className="cursor-pointer"
            role="button"
            tabIndex={0}
        >
            {children}
            <Icon
                icon="ant-design:arrow-down-outlined"
                className={`ml-2 inline w-3 mt-1 bottom-0 ${
                    state === SortState.DESC && "text-blue-600"
                }`}
            />
            <Icon
                icon="ant-design:arrow-down-outlined"
                className={`-ml-1 inline w-3 mb-1 top-0 rotate-180 ${
                    state === SortState.ASC && "text-blue-600"
                }`}
            />
        </div>
    );
};

export default ColumnSortable;
