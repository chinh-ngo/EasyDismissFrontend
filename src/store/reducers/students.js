import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    students: [
        {
            id: 1,
            firstName: 'Student 1',
            lastName: 'Last',
            classroom: '5D',
            homeroomTeacher: 'Black'
        },
        {
            id: 2,
            firstName: 'Student 2',
            lastName: 'Last',
            classroom: '3A',
            homeroomTeacher: 'Black'
        },
        {
            id: 3,
            firstName: 'Student 3',
            lastName: 'Last',
            classroom: '2B',
            homeroomTeacher: 'Black'
        },
        {
            id: 4,
            firstName: 'Student 4',
            lastName: 'Last',
            classroom: 'K1',
            homeroomTeacher: 'Black'
        }
    ],
    dropdownOpen: null
};

export const studentsSlice = createSlice({
    name: 'students',
    initialState,
    reducers: {
        loadStudents: (state, {payload}) => {
            state.students = payload;
        }
    }
});

export const {loadStudents} = studentsSlice.actions;
export default studentsSlice.reducer;
