import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Web3 from "web3";
import {
    ColumnKeysFilterable,
    ColumnKeysSortable,
    SortState,
} from "../types/types";

interface ApplicationState {
    fromFilter: string;
    toFilter: string;
    emitterFromBlock: number;
    sortField: ColumnKeysSortable;
    sortOrder: SortState;
}

const initialState: ApplicationState = {
    fromFilter: "",
    toFilter: "",
    emitterFromBlock: 0,
    sortField: "timestamp",
    sortOrder: SortState.DESC,
};

export const applicationSlice = createSlice({
    name: "application",
    initialState,
    reducers: {
        setFilter: (
            state,
            action: PayloadAction<{
                fieldKey: ColumnKeysFilterable;
                filterRule: string;
            }>
        ) => {
            // Testing of filterRule expected to be done by caller already.
            // For good measure and reusability lets put it here as well
            if (
                action.payload.filterRule !== "" &&
                !Web3.utils.isAddress(action.payload.filterRule)
            ) {
                throw new Error("Specified address is not a valid address.");
            }

            if (action.payload.fieldKey === "from")
                state.fromFilter = action.payload.filterRule;
            else if (action.payload.fieldKey === "to")
                state.toFilter = action.payload.filterRule;
        },
        setToFilter: (state, action: PayloadAction<string>) => {
            state.toFilter = action.payload;
        },
        setEmitterFromBlock: (state, action: PayloadAction<number>) => {
            state.emitterFromBlock = action.payload;
        },
        sortClicked: (state, action: PayloadAction<ColumnKeysSortable>) => {
            let newOrder =
                action.payload === state.sortField
                    ? state.sortOrder === SortState.DESC
                        ? SortState.ASC // clicked same field, currently DESC => ASC
                        : SortState.DESC // clicked same field, currently ASC => DESC
                    : SortState.DESC; // clicked different field => start with DESC

            state.sortField = action.payload;
            state.sortOrder = newOrder;
        },
    },
});

export const { setFilter, setEmitterFromBlock, sortClicked } =
    applicationSlice.actions;

export default applicationSlice.reducer;
