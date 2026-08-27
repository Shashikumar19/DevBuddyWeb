import { createSlice } from "@reduxjs/toolkit";

const requestSlice = new createSlice({
    name:'requests',
    initialState:null,
    reducers:{
        addRequests :(state,action)=>{
            return action.payload;
        },
        removeRequests :(state,action)=>{
            const newArray = state.filter((item) => item._id != action?.payload?._id)
            return newArray;
        }
    }
})

export const {addRequests,removeRequests} = requestSlice.actions;
export default requestSlice.reducer;