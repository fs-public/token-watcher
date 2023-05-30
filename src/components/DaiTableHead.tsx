import React from "react"
import { ColumnKeysFilterable, ColumnKeysSortable, SortState } from "../types/types"
import ColumnFilterable from "../components/ColumnFilterable"
import ColumnSortable from "./ColumnSortable"
import { useDispatch, useSelector } from "react-redux"
import { setFilter, sortClicked } from "../state/ApplicationSlice"
import { RootState } from "../state/store"

const DaiTableHead = () => {
  const { sortField, sortOrder } = useSelector((state: RootState) => state.application)

  const dispatch = useDispatch()

  const sortHandler = (fieldClicked: ColumnKeysSortable) => {
    dispatch(sortClicked(fieldClicked))
  }

  const filterHandler = (fieldKey: ColumnKeysFilterable, filterRule: string) => {
    dispatch(setFilter({ fieldKey, filterRule }))
  }

  return (
    <thead className="border-b">
      <tr>
        <th className="p-1 md:p-4 justify-center">Transaction Hash</th>
        <th className="p-1 md:p-4 justify-center">
          <ColumnSortable
            state={"timestamp" === sortField ? sortOrder : SortState.INACTIVE}
            sortHandler={() => sortHandler("timestamp")}
          >
            Timestamp
          </ColumnSortable>
        </th>
        <th className="p-1 md:p-4 justify-center text-right">
          <ColumnSortable
            state={"amount" === sortField ? sortOrder : SortState.INACTIVE}
            sortHandler={() => sortHandler("amount")}
          >
            Amount
          </ColumnSortable>
        </th>
        <th className="p-1 md:p-4 justify-center">
          <ColumnFilterable fieldKey="from" filterHandler={filterHandler}>
            Sender
          </ColumnFilterable>
        </th>
        <th className="p-1 md:p-4 justify-center">
          <ColumnFilterable fieldKey="to" filterHandler={filterHandler}>
            Recipient
          </ColumnFilterable>
        </th>
      </tr>
    </thead>
  )
}

export default DaiTableHead
