import React from "react"

export const getEtherscanTxLink = (hash: string) => {
  return "https://etherscan.io/tx/" + hash
}

export const getEtherscanAddressLink = (address: string) => {
  return "https://etherscan.io/address/" + address
}

export const fireTimeout = <T,>(
  accessor: React.Dispatch<React.SetStateAction<T>>,
  initialValue: T,
  finalValue: T,
  timeout: number = 2000
) => {
  accessor(initialValue)
  new Promise((resolve) => setTimeout(resolve, timeout)).then(() => accessor(finalValue))
}

export const displayNumber = (x: number, { shorthand = false, decimals = 2 }): string => {
  const processor = (y: number) =>
    y.toLocaleString(undefined, {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    })

  if (!shorthand) return processor(x)
  else {
    if (x < 1_000) {
      return processor(x)
    } else if (x < 1_000_000) {
      return processor(x / 1_000) + "k"
    } else {
      return processor(x / 1_000_000) + "M"
    }
  }
}
