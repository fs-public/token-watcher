import { create } from "zustand"
import Web3 from "web3"
import { ColumnKeysFilterable, ColumnKeysSortable, SortState } from "../types/types"

interface ApplicationState {
  fromFilter: string
  toFilter: string
  emitterFromBlock: number
  sortField: ColumnKeysSortable
  sortOrder: SortState
  setFilter: (fieldKey: ColumnKeysFilterable, filterRule: string) => void
  setEmitterFromBlock: (block: number) => void
  sortClicked: (column: ColumnKeysSortable) => void
}

export const useApplicationStore = create<ApplicationState>((set) => ({
  fromFilter: "",
  toFilter: "",
  emitterFromBlock: 0,
  sortField: "timestamp",
  sortOrder: SortState.DESC,

  setFilter: (fieldKey: ColumnKeysFilterable, filterRule: string) => {
    // Testing of filterRule expected to be done by caller already.
    // For good measure and reusability lets put it here as well
    if (filterRule !== "" && !Web3.utils.isAddress(filterRule)) {
      throw new Error("Specified address is not a valid address.")
    }

    if (fieldKey === "from") set({ fromFilter: filterRule })
    else if (fieldKey === "to") set({ toFilter: filterRule })
  },

  setEmitterFromBlock: (block: number) => set({ emitterFromBlock: block }),

  sortClicked: (column: ColumnKeysSortable) =>
    set((state) => ({
      sortField: column,
      sortOrder: state.sortField === column && state.sortOrder === SortState.DESC ? SortState.ASC : SortState.DESC,
    })),
}))

export default useApplicationStore
