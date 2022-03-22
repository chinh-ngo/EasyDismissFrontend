import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    staffs: [
        {
            id: 1,
            firstName: 'Staff 1',
            lastName: 'Last',
            email: 'staff1@gmail.com',
            role: 'Room1'
            
        },
        {
            id: 2,
            firstName: 'Staff 2',
            lastName: 'Last',
            email: 'staff2@gmail.com',
            role: 'Room2'
        },
        {
            id: 3,
            firstName: 'Staff 3',
            lastName: 'Last',
            email: 'staff3@gmail.com',
            role: 'Room3'
        },
        {
            id: 4,
            firstName: 'Staff 4',
            lastName: 'Last',
            email: 'staff4@gmail.com',
            role: 'Room4'
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
            state.staffs = state.staffs.filter(item => item.id !== action.payload.id);
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
