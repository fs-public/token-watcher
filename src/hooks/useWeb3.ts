import Web3 from "web3"
import { EventData, PastEventOptions } from "web3-eth-contract/types"
import DaiAbi from "../abi/dai.json"
import { DAI_ADDRESS, RPC_ENDPOINT_HTTP } from "../constants"

const useWeb3 = () => {
  const web3 = new Web3(RPC_ENDPOINT_HTTP)
  const dai = new web3.eth.Contract(DaiAbi, DAI_ADDRESS)

  // Handles Infura-specific RPC behavior for large-batch queries
  const getInitialEventsInfura = async (
    eventName: string,
    options: PastEventOptions,
    desiredEntries: number,
    latestBlock: number,
    firstGuess: number
  ) => {
    let events: EventData[] = []

    const getEventsRecursive = async (
      start: number,
      middle: number,
      end: number // must always return good result
    ) => {
      if (end - start === 1) return // the binary search degraded

      let tooManyResults = false
      try {
        options.fromBlock = middle
        events = await dai.getPastEvents(eventName, options)
      } catch (e: any) {
        if (!e.message.toLowerCase().includes("10000 results")) {
          throw e
        } else {
          tooManyResults = true
        }
      }

      // if we have to continue
      if ((middle === 0 && !tooManyResults) || events.length >= desiredEntries) {
        return // we have good results, either cannot add more or found a block span with enough txs
      } else {
        if (tooManyResults) {
          await getEventsRecursive(middle, Math.ceil((middle + end) / 2), end)
        } else {
          await getEventsRecursive(start, Math.ceil((start + middle) / 2), middle)
        }
      }
    } // end getEventsRecursive()

    await getEventsRecursive(0, firstGuess, latestBlock)
    return events
  }

  return {
    web3,
    dai,
    getInitialEventsInfura,
  }
}

export default useWeb3
