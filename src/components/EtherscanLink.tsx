import React, { useState } from "react"
import { getEtherscanTxLink, getEtherscanAddressLink, fireTimeout } from "../utils"
import { Icon } from "@iconify/react"

interface EtherscanLinkProps {
  hex: string
  type: "tx" | "address"
}

const EtherscanLink = ({ hex, type }: EtherscanLinkProps) => {
  const [success, setSuccess] = useState(false)

  const etherscanLink = type === "tx" ? getEtherscanTxLink(hex) : getEtherscanAddressLink(hex)

  const copy = () => {
    navigator.clipboard.writeText(hex).then(
      () => fireTimeout(setSuccess, true, false),
      () => {
        throw new Error("Error writing to clipboard.")
      }
    )
  }

  return (
    <div className="flex items-center justify-center">
      <a
        href={etherscanLink}
        target="_blank"
        rel="noreferrer noopener"
        className="text-blue-600 w-[6ch] md:w-[12ch] whitespace-nowrap block overflow-ellipsis overflow-hidden"
      >
        {hex}
      </a>
      <Icon
        icon={success ? "ant-design:check-outlined" : "ant-design:copy-outlined"}
        role="button"
        onClick={copy}
        className="basic-icon cursor-pointer"
      />
    </div>
  )
}

export default EtherscanLink
