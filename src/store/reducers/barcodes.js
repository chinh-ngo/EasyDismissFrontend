import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    carlines: [
        {
            id: 1,
            name: 'CarLine1',
            isActive: true,
            
        },
        {
            id: 2,
            name: 'CarLine2',
            isActive: false,
        },
        {
            id: 3,
            name: 'CarLine3',
            isActive: true,
        },
        {
            id: 4,
            name: 'CarLine3',
            isActive: false,
        }
    ],
    dropdownOpen: null
};

export const carlinesSlice = createSlice({
    name: 'carlines',
    initialState,
    reducers: {
        loadCarlines: (state, {payload}) => {
            state.carlines = payload;
        }
    }
});

export const {loadCarlines} = carlinesSlice.actions;
export default carlinesSlice.reducer;
