import React, { useEffect, useState } from "react"
import { SortState } from "../types/types"
import EtherscanLink from "../components/EtherscanLink"
import { displayNumber } from "../utils"
import { useSelector } from "react-redux"
import { RootState } from "../state/store"
import useDaiData from "../hooks/useDaiData"

const DaiTableBody = () => {
  const { sortField, sortOrder } = useSelector((state: RootState) => state.application)
  const { data } = useDaiData()

  const [displayData, setDisplayData] = useState(data)

  useEffect(() => {
    const _displayData = [...data]

    if (_displayData.length >= 2) {
      let direction = sortOrder === SortState.DESC ? -1 : 1
      _displayData.sort((a, b) => direction * (a[sortField] - b[sortField]))
    }

    setDisplayData(_displayData)
  }, [data, sortField, sortOrder])

  const now = new Date().getTime() / 1000

  return (
    <tbody>
      {displayData.map((row, id) => {
        let isNew = now - row.timestamp <= 10
        return (
          <tr
            key={id}
            className={`border-b bg-opacity-30 hover:bg-gray-light
                                    ${id % 2 === 0 && "bg-gray-light"}
                                    ${isNew && "animate-[fadeIn_2s_ease]"}`}
          >
            <td className="px-1 md:px-4 py-5 ">
              <EtherscanLink hex={row.hash} />
            </td>
            <td className="px-1 md:px-4 py-5">
              {new Date(row.timestamp! * 1000).toLocaleDateString()}
              <br />
              {new Date(row.timestamp! * 1000).toLocaleTimeString()}
            </td>
            <td className="px-1 md:px-4 py-5">
              <div className="flex items-center justify-end">
                {isNew && <span className="text-red mr-1 text-lg">&#x2022;</span>}
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
                <img src="/dai.png" alt="Dai" className="basic-icon" />
              </div>
            </td>
            <td className="px-1 md:px-4 py-5">
              <EtherscanLink hex={row.from} />
            </td>
            <td className="px-1 md:px-4 py-5">
              <EtherscanLink hex={row.to} />
            </td>
          </tr>
        )
      })}
    </tbody>
  )
}

export default DaiTableBody
