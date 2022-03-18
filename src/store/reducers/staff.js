import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    staffs: [
        {
            id: 1,
            firstName: 'Staff 1',
            lastName: 'Last',
            
        },
        {
            id: 2,
            firstName: 'Staff 2',
            lastName: 'Last',
        },
        {
            id: 3,
            firstName: 'Staff 3',
            lastName: 'Last',
        },
        {
            id: 4,
            firstName: 'Staff 4',
            lastName: 'Last',
        }
    ],
    dropdownOpen: null
};

export const staffsSlice = createSlice({
    name: 'staffs',
    initialState,
    reducers: {
        loadStaffs: (state, {payload}) => {
            state.staffs = payload;
        },
        deleteStaff: (state, action: PayloadAction<Object>) => {
            state.staffs.shift(item => item.id == action.payload.id);
        },
        createStaff: (state, action: PayloadAction<Object>) => {
            state.staffs.push(action.payload);
        },
        updateStaff: (state, action: PayloadAction<Object>) => {
            state.staff.shift(item => item.id = action.payload.id);
            state.staff.push(action.payload);
        }
    }
});

export const {loadStaffs, deleteStaff, createStaff, updateStaff} = staffsSlice.actions;
export default staffsSlice.reducer;
