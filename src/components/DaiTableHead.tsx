import React from "react";
import {
    ColumnKeysFilterable,
    ColumnKeysSortable,
    SortState,
} from "../types/types";
import ColumnFilterable from "../components/ColumnFilterable";
import ColumnSortable from "./ColumnSortable";

interface DaiTableHeadProps {
    sortField: ColumnKeysSortable;
    sortOrder: SortState;
    sortHandler: (sortField: ColumnKeysSortable) => void;
    filterHandler: (filterField: ColumnKeysFilterable, newRule: string) => void;
}

const DaiTableHead = ({
    sortField,
    sortOrder,
    sortHandler,
    filterHandler,
}: DaiTableHeadProps) => {
    return (
        <thead className="border-b">
            <tr>
                <th className="p-1 md:p-4 justify-center">Transaction Hash</th>
                <th className="p-1 md:p-4 justify-center">
                    <ColumnSortable
                        state={
                            "timestamp" === sortField
                                ? sortOrder
                                : SortState.INACTIVE
                        }
                        sortHandler={() => sortHandler("timestamp")}
                    >
                        Timestamp
                        {` (UTC+${Math.round(
                            new Date().getTimezoneOffset() / -60
                        )})`.replace("+-", "-")}
                    </ColumnSortable>
                </th>
                <th className="p-1 md:p-4 md:whitespace-nowrap justify-center text-right">
                    <ColumnSortable
                        state={
                            "amount" === sortField
                                ? sortOrder
                                : SortState.INACTIVE
                        }
                        sortHandler={() => sortHandler("amount")}
                    >
                        Amount
                    </ColumnSortable>
                </th>
                <th className="p-1 md:p-4 md:whitespace-nowrap justify-center">
                    <ColumnFilterable
                        fieldKey="from"
                        filterHandler={filterHandler}
                    >
                        Sender
                    </ColumnFilterable>
                </th>
                <th className="p-1 md:p-4 md:whitespace-nowrap justify-center">
                    <ColumnFilterable
                        fieldKey="to"
                        filterHandler={filterHandler}
                    >
                        Recipient
                    </ColumnFilterable>
                </th>
            </tr>
        </thead>
    );
};

export default DaiTableHead;
