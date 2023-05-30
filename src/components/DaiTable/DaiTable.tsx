import React from "react"
import DaiTableBody from "./DaiTableBody"
import DaiTableHead from "./DaiTableHead"
import useDaiData from "../../hooks/useDaiData"
import { Icon } from "@iconify/react"

const DaiTable = () => {
  const { loading } = useDaiData()

  return (
    <>
      <table className="table-auto w-full md:w-4/5 max-w-[1000px] min-h-[300px] text-center flex-none">
        <DaiTableHead />
        <DaiTableBody />
      </table>
      {loading && (
        <div className="w-full flex justify-center py-5">
          <Icon icon="ant-design:loading-outlined" width={48} className="animate-[rotating_1s_linear_infinite]" />
        </div>
      )}
    </>
  )
}

export default DaiTable
