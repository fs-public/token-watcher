import { useState, useEffect } from "react"
import { PastEventOptions } from "web3-eth-contract/types"
import { BlockHeader } from "web3-eth/types"
import { useDispatch, useSelector } from "react-redux"
import { DESIRED_NUMBER_OF_ENTRIES } from "../constants"
import useWeb3 from "./useWeb3"
import useDaiEventListener from "./useDaiEventListener"
import DaiTransfer, { daiTransferFromEvent } from "../models/DaiTransfer"
import { setData } from "../state/DaiTransfersSlice"
import { setEmitterFromBlock } from "../state/ApplicationSlice"
import { RootState } from "../state/store"

const useDaiData = () => {
  const data = useSelector((state: RootState) => state.daiTransfers.data)

  const { fromFilter, toFilter } = useSelector((state: RootState) => state.application)

  const [loading, setLoading] = useState(true)

  const { web3, getInitialEventsInfura } = useWeb3()

  const dispatch = useDispatch()

  useDaiEventListener()

  const fetchTransfers = async (latestBlock: number): Promise<DaiTransfer[]> => {
    try {
      const filtering = fromFilter !== "" || toFilter !== ""
      // if true, we expect just a few results
      // but might overflow for CEX addresses and similar
      // Lets do a binary search then for the "fromBlock"

      let options: PastEventOptions = {
        fromBlock: 0,
        toBlock: latestBlock,
        filter: {
          src: fromFilter,
          dst: toFilter,
        },
      }

      let events = await getInitialEventsInfura(
        "Transfer",
        options,
        DESIRED_NUMBER_OF_ENTRIES,
        latestBlock,
        filtering ? 0 : latestBlock - 2000
      ) // sorted by default from oldest to most recent

      let _data: DaiTransfer[] = []

      for (let i = 0; i < events.length; i++) {
        _data.push(daiTransferFromEvent(events[events.length - 1 - i]))
        if (_data.length >= DESIRED_NUMBER_OF_ENTRIES) break
      }

      let uniqueBlocknumbers: number[] = _data
        .map((row) => row.blockNumber)
        .filter((blockNumber, i, arr) => arr.indexOf(blockNumber) === i)

      let promises: Promise<BlockHeader>[] = uniqueBlocknumbers.map((blockNumber: number) =>
        web3.eth.getBlock(blockNumber, false)
      )

      await Promise.allSettled(promises)

      for (let j = 0; j < uniqueBlocknumbers.length; j++) {
        let timestamp = Number((await promises[j]).timestamp)
        for (let i = 0; i < _data.length; i++) {
          if (_data[i].blockNumber === uniqueBlocknumbers[j]) {
            _data[i].timestamp = timestamp
          }
        }
      }

      return _data
    } catch (err) {
      alert(err)
    }

    return []
  }

  useEffect(() => {
    setLoading(true)

    let isMounted = true

    ;(async () => {
      const latestBlock = await web3.eth.getBlockNumber()

      let _data = await fetchTransfers(latestBlock)
      if (isMounted) {
        dispatch(setData(_data))
        dispatch(setEmitterFromBlock(latestBlock + 1))
      }

      setLoading(false)
    })()

    return () => {
      isMounted = false
    }

    // eslint-disable-next-line
  }, [fromFilter, toFilter])

  return {
    data,
    loading,
  }
}

export default useDaiData
