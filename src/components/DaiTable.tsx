import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { ColumnKeysSortable, ColumnKeysFilterable } from "../types/types";
import DaiTableBody from "./DaiTableBody";
import DaiTableHead from "./DaiTableHead";
import useDaiData from "../hooks/useDaiData";
import { setFilter, sortClicked } from "../state/ApplicationSlice";
import { RootState } from "../state/store";
import LoadingIcon from "../assets/loading.svg";

const DaiTable = () => {
    const { sortField, sortOrder } = useSelector(
        (state: RootState) => state.application
    );
    const { data, loading } = useDaiData();

    const dispatch = useDispatch();

    const sortHandler = (fieldClicked: ColumnKeysSortable) => {
        dispatch(sortClicked(fieldClicked));
    };

    const filterHandler = (
        fieldKey: ColumnKeysFilterable,
        filterRule: string
    ) => {
        dispatch(setFilter({ fieldKey, filterRule }));
    };

    return (
        <table className="table-auto w-full md:w-4/5 xl:w-3/5 min-w-[450px] main-table text-center flex-none">
            <DaiTableHead
                {...{ sortField, sortOrder, sortHandler, filterHandler }}
            />

            {loading ? (
                <tbody>
                    <tr className="bg-opacity-30 bg-gray-100">
                        <td className="px-1 md:px-4 py-5 flex flex-col items-center">
                            <img
                                src={LoadingIcon}
                                alt="Loading..."
                                width={48}
                                className=""
                            />
                        </td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                </tbody>
            ) : (
                <DaiTableBody {...{ data, sortField, sortOrder }} />
            )}
        </table>
    );
};

export default DaiTable;
