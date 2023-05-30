import { create } from "zustand"
import DaiTransfer, { compareDaiTransfers } from "../models/DaiTransfer"

interface DataState {
  data: DaiTransfer[]
  setData: (transfers: DaiTransfer[]) => void
  addEntry: (transfer: DaiTransfer) => void
}

const useDataStore = create<DataState>((set) => ({
  data: [],
  setData: (transfers: DaiTransfer[]) => set({ data: transfers }),
  addEntry: (transfer: DaiTransfer) =>
    set((state) => {
      if (state.data.some((row) => compareDaiTransfers(row, transfer))) return {}
      else return { data: [...state.data, transfer] }
    }),
}))

export default useDataStore
