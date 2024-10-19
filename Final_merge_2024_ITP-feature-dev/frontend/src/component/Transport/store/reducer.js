import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    transport : [],
  
}

export const transportSlice = createSlice({
    name: 'transport',
    initialState,
    reducers : {
        getTransport: (state) => {
              
        }
    }
})

export const { getTransport } = transportSlice.actions; 
export default transportSlice.reducer;