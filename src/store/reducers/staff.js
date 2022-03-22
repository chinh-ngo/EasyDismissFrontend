import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    staffs: [
        {
            id: 1,
            firstName: 'Staff 1',
            lastName: 'Last',
            email: 'staff1@gmail.com',
            role: 'teacher'
            
        },
        {
            id: 2,
            firstName: 'Staff 2',
            lastName: 'Last',
            email: 'staff2@gmail.com',
            role: 'admin'
        },
        {
            id: 3,
            firstName: 'Staff 3',
            lastName: 'Last',
            email: 'staff3@gmail.com',
            role: 'staff'
        },
        {
            id: 4,
            firstName: 'Staff 4',
            lastName: 'Last',
            email: 'staff4@gmail.com',
            role: 'teacher'
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
            state.staffs.forEach(staff => {
                if(staff.id == action.payload.id)
                    {
                        staff.firstName = action.payload.firstName;
                        staff.lastName = action.payload.lastName;
                        staff.email = action.payload.email;
                        staff.role = action.payload.role;
                    }
            })
        }
    }
});

export const {loadStaffs, deleteStaff, createStaff, updateStaff} = staffsSlice.actions;
export default staffsSlice.reducer;
