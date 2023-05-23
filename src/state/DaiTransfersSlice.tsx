import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import DaiTransfer, { compareDaiTransfers } from "../models/DaiTransfer";

interface DaiTransfersState {
    data: DaiTransfer[];
}

const initialState: DaiTransfersState = {
    data: [],
};

export const daiTransfersSlice = createSlice({
    name: "daiTransfers",
    initialState,
    reducers: {
        setData: (state, action: PayloadAction<DaiTransfer[]>) => {
            while (state.data.length > 0) state.data.pop();
            for (let d of action.payload) state.data.push(d);
        },
        addEntry: (state, action: PayloadAction<DaiTransfer>) => {
            if (
                state.data.find((row) =>
                    compareDaiTransfers(action.payload, row)
                ) === undefined
            )
                state.data.push(action.payload);
        },
    },
});

export const { setData, addEntry } = daiTransfersSlice.actions;

export default daiTransfersSlice.reducer;
