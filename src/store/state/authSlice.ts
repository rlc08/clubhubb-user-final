import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
 

// Define a type for the slice state
interface AuthState {
  clubId:string;
  clubName:string;
  clubUsername:string;  
}

// Define the initial state using that type
const initialState: AuthState = {
  clubId:"",
  clubName:"",
  clubUsername:"",
}

export const authSlice = createSlice({
  name: 'auth',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setClub:(state,action:PayloadAction<{clubId:string;clubName:string;clubUsername:string}>)=>{
        state.clubId=action.payload.clubId;
        state.clubName=action.payload.clubName;
        state.clubUsername=action.payload.clubUsername
         }
   
  },
})

export const{setClub} =authSlice.actions;  

export default authSlice.reducer