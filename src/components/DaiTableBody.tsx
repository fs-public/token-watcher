import React from "react";
import { ColumnKeysSortable, SortState } from "../types/types";
import EtherscanLink from "../components/EtherscanLink";
import { displayNumber } from "../utils";
import DaiTransfer from "../models/DaiTransfer";

interface DaiTableBodyProps {
    data: DaiTransfer[];
    sortField: ColumnKeysSortable;
    sortOrder: SortState;
}

const DaiTableBody = ({ data, sortField, sortOrder }: DaiTableBodyProps) => {
    let displayData = [...data];

    if (displayData.length >= 2) {
        let direction = sortOrder === SortState.DESC ? -1 : 1;

        displayData.sort((a, b) => direction * (a[sortField] - b[sortField]));
    }

    const now = new Date().getTime() / 1000;

    return (
        <tbody>
            {displayData.map((row, id) => {
                let isNew = now - row.timestamp <= 10;
                return (
                    <tr
                        key={id}
                        className={`border-b bg-opacity-30 hover:bg-gray-100 ${
                            id % 2 === 0 && "bg-gray-100 "
                        } `}
                        style={
                            isNew
                                ? {
                                      animation: "fadeIn 2s ease 1",
                                  }
                                : {}
                        }
                    >
                        <td className="px-1 md:px-4 py-5 ">
                            <EtherscanLink hex={row.hash} type="tx" />
                        </td>
                        <td className="px-1 md:px-4 py-5">
                            {new Date(
                                row.timestamp! * 1000
                            ).toLocaleDateString()}
                            <br />
                            {new Date(
                                row.timestamp! * 1000
                            ).toLocaleTimeString()}
                        </td>
                        <td className="px-1 md:px-4 py-5">
                            <div className="flex items-center justify-end">
                                {isNew && (
                                    <span className="text-red-500 mr-1 text-lg">
                                        &#x2022;
                                    </span>
                                )}
                                <span className="max-md:hidden">
                                    {displayNumber(row.amount, {
                                        shorthand: false,
                                    })}
                                </span>
                                <span className="md:hidden">
                                    {displayNumber(row.amount, {
                                        shorthand: true,
                                    })}
                                </span>
                                <img
                                    src="/dai.png"
                                    alt="Dai"
                                    className="basic-icon"
                                />
                            </div>
                        </td>
                        <td className="px-1 md:px-4 py-5">
                            <EtherscanLink hex={row.from} type="address" />
                        </td>
                        <td className="px-1 md:px-4 py-5">
                            <EtherscanLink hex={row.to} type="address" />
                        </td>
                    </tr>
                );
            })}
        </tbody>
    );
};

export default DaiTableBody;
