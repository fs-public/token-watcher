import { useEffect } from "react"
import Web3 from "web3"
import { EventData } from "web3-eth-contract/types"
import useWeb3 from "./useWeb3"
import { daiTransferFromEvent } from "../models/DaiTransfer"
import DaiAbi from "../abi/dai.json"
import { DAI_ADDRESS, RPC_ENDPOINT_WSS } from "../constants"
import useApplicationStore from "../store/useApplicationStore"
import useDataStore from "../store/useDataStore"

const useDaiEventListener = () => {
  const { web3 } = useWeb3()

  const fromFilter = useApplicationStore((state) => state.fromFilter)
  const toFilter = useApplicationStore((state) => state.toFilter)

  const isFetching = useDataStore((state) => state.isFetching)
  const emitterFromBlock = useDataStore((state) => state.emitterFromBlock)

  const addEntry = useDataStore((state) => state.addEntry)

  useEffect(() => {
    const newEventCallback = async (e: EventData) => {
      let d = daiTransferFromEvent(e)

      if (
        (fromFilter !== "" && d.from.toLowerCase() !== fromFilter.toLowerCase()) ||
        (toFilter !== "" && d.to.toLowerCase() !== toFilter.toLowerCase())
      ) {
        return
      }

      let block = null
      for (let i = 0; i < 5; i++) {
        block = await web3.eth.getBlock(e.blockNumber, false)
        if (block === null) {
          // for unfinalized blocks
          await new Promise((resolve) => setTimeout(resolve, 2000))
        } else break // Block probably dropped, dropping event.
      }

      if (block !== null) {
        d.timestamp = Number(block.timestamp)
        addEntry(d)
      }
    }

    if (emitterFromBlock <= 1 || isFetching) {
      return // no starting before first fetch finished
    }

    const web3_ws = new Web3(RPC_ENDPOINT_WSS)
    const dai_ws = new web3_ws.eth.Contract(DaiAbi, DAI_ADDRESS)

    let emitter: any
    let connectedId: string

    let isMounted = true

    emitter = dai_ws.events
      .Transfer({ fromBlock: emitterFromBlock })
      .on("data", (event: EventData) => newEventCallback(event))
      .on("connected", (str: string) => {
        connectedId = str
        if (!isMounted) {
          emitter.options.requestManager.removeSubscription(connectedId)
        }
      })
      .on("error", (err: string) => {
        throw new Error("[EventListener] Emitter error: " + err)
      })

    return () => {
      isMounted = false
      if (emitter !== undefined) {
        emitter.options.requestManager.removeSubscription(connectedId)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFetching, emitterFromBlock])
}

export default useDaiEventListener
