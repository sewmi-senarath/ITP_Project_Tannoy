import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    machine : [],
    // transaction: []
}

export const machineSlice = createSlice({
    name: 'machine',
    initialState,
    reducers : {
        getMachines: (state) => {
              
        }
    }
})

export const { getMachines } = machineSlice.actions; 
export default machineSlice.reducer;