import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

// Define a type for the slice state
interface clubState {
    clubId: string;
}

// Define the initial state using that type
const initialState: clubState = {
    clubId: "",
};

export const clubSlice = createSlice({
    name: "club",
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    reducers: {
        setClub: (state, action: PayloadAction<{ clubId: string }>) => {
            state.clubId = action.payload.clubId;
        },
    },
});

export const { setClub } = clubSlice.actions;

export default clubSlice.reducer;
