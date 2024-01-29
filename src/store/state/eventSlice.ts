import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

// Define a type for the slice state
interface eventState {
  caption:string;
}

// Define the initial state using that type
const initialState: eventState = {
  caption:"",
}

export const eventSlice = createSlice({
  name: 'event',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setEvent:(state,action:PayloadAction<{caption:string}>)=>{
        state.caption=action.payload.caption;
         }
  },
})

export const{setEvent} =eventSlice.actions;  

export default eventSlice.reducer;