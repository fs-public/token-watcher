import React, { useState } from "react"
import { getEtherscanTxLink, getEtherscanAddressLink, fireTimeout } from "../utils"
import { Icon } from "@iconify/react"

const EtherscanLink = ({ hex }: { hex: string }) => {
  const [success, setSuccess] = useState(false)

  const etherscanLink = hex.length === 66 ? getEtherscanTxLink(hex) : getEtherscanAddressLink(hex)

  const copy = () => {
    navigator.clipboard
      .writeText(hex)
      .then(() => fireTimeout(setSuccess, true, false))
      .catch((e) => {
        throw new Error(`Error writing to clipboard: ${e.reason}`)
      })
  }

  return (
    <div className="flex items-center justify-center">
      <a
        href={etherscanLink}
        target="_blank"
        rel="noreferrer noopener"
        className="text-highlight w-[6ch] sm:w-[8ch] md:w-[12ch] lg:w-[16ch] whitespace-nowrap block overflow-ellipsis overflow-hidden"
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
