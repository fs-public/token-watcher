import { configureStore } from "@reduxjs/toolkit"
import applicationReducer from "./ApplicationSlice"
import daiTransfersReducer from "./DaiTransfersSlice"

const store = configureStore({
  reducer: {
    application: applicationReducer,
    daiTransfers: daiTransfersReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store
