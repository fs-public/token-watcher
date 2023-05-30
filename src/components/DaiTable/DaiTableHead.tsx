import React from "react"
import { SortState } from "../../types/types"
import ColumnFilterable from "../../components/ColumnFilterable"
import ColumnSortable from "../ColumnSortable"
import useApplicationStore from "../../store/useApplicationStore"

const DaiTableHead = () => {
  const { sortField, sortOrder, sortClicked, setFilter } = useApplicationStore()

  return (
    <thead className="border-b">
      <tr>
        <th className="p-1 md:p-4 justify-center">Transaction Hash</th>
        <th className="p-1 md:p-4 justify-center">
          <ColumnSortable
            state={"timestamp" === sortField ? sortOrder : SortState.INACTIVE}
            sortHandler={sortClicked.bind(undefined, "timestamp")}
          >
            Timestamp
          </ColumnSortable>
        </th>
        <th className="p-1 md:p-4 justify-center text-right">
          <ColumnSortable
            state={"amount" === sortField ? sortOrder : SortState.INACTIVE}
            sortHandler={sortClicked.bind(undefined, "amount")}
          >
            Amount
          </ColumnSortable>
        </th>
        <th className="p-1 md:p-4 justify-center">
          <ColumnFilterable fieldKey="from" filterHandler={setFilter}>
            Sender
          </ColumnFilterable>
        </th>
        <th className="p-1 md:p-4 justify-center">
          <ColumnFilterable fieldKey="to" filterHandler={setFilter}>
            Recipient
          </ColumnFilterable>
        </th>
      </tr>
    </thead>
  )
}

export default DaiTableHead
