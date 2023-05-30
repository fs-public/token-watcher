import { create } from "zustand"
import DaiTransfer, { compareDaiTransfers } from "../models/DaiTransfer"

interface DataState {
  data: DaiTransfer[]
  emitterFromBlock: number
  isFetching: boolean
  setData: (transfers: DaiTransfer[]) => void
  addEntry: (transfer: DaiTransfer) => void
  setEmitterFromBlock: (block: number) => void
  setIsFetching: (isFetching: boolean) => void
}

const useDataStore = create<DataState>((set) => ({
  data: [],
  emitterFromBlock: 0,
  isFetching: true,

  setData: (transfers: DaiTransfer[]) => set({ data: transfers }),
  addEntry: (transfer: DaiTransfer) =>
    set((state) => {
      if (state.data.some((row) => compareDaiTransfers(row, transfer))) return {}
      else return { data: [...state.data, transfer] }
    }),
  setEmitterFromBlock: (block: number) => set({ emitterFromBlock: block }),
  setIsFetching: (isFetching: boolean) => set({ isFetching }),
}))

export default useDataStore
