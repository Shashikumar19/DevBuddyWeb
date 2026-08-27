import { createSlice } from "@reduxjs/toolkit";

const createAuthSlice = new createSlice({
    name:'clearauth',
    initialState:null,
    reducers:{
        clearAuthData:(state,action) =>{
             return 
        }
    }
})
export const {clearAuthData} =createAuthSlice.actions;
export default createAuthSlice.reducer;