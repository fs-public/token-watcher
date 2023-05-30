import React, { ReactNode } from "react"
import { SortState } from "../types/types"
import { Icon } from "@iconify/react"

interface ColumnSortableProps {
  state: SortState
  children?: ReactNode
  sortHandler: () => void
}

const ColumnSortable = ({ state, children, sortHandler }: ColumnSortableProps) => {
  return (
    <div onClick={sortHandler} className="cursor-pointer whitespace-nowrap" role="button" tabIndex={0}>
      {children}
      <div className="inline">
        <Icon
          icon="ant-design:arrow-down-outlined"
          className={`ml-0.5 sm:ml-2 inline w-3 mt-1 bottom-0 ${state === SortState.DESC && "text-highlight"}`}
        />
        <Icon
          icon="ant-design:arrow-down-outlined"
          className={`-ml-1 inline w-3 mb-1 top-0 rotate-180 ${state === SortState.ASC && "text-highlight"}`}
        />
      </div>
    </div>
  )
}

export default ColumnSortable
