import React from "react"
import DaiTableBody from "./DaiTableBody"
import DaiTableHead from "./DaiTableHead"
import { Icon } from "@iconify/react"
import useDataStore from "../../store/useDataStore"
import useDaiData from "../../hooks/useDaiData"

const DaiTable = () => {
  const isFetching = useDataStore((state) => state.isFetching)

  useDaiData()

  return (
    <>
      <table className="table-auto w-full md:w-4/5 max-w-[1000px] text-center flex-none">
        <DaiTableHead />
        <DaiTableBody />
      </table>
      {isFetching && (
        <div className="w-full flex justify-center py-5">
          <Icon icon="ant-design:loading-outlined" width={48} className="animate-[rotating_1s_linear_infinite]" />
        </div>
      )}
    </>
  )
}

export default DaiTable
