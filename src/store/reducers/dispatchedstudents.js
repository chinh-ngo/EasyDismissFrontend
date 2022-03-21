import {createSlice, PayloadAction} from '@reduxjs/toolkit';

const initialState = {
    dispatchedstudents: [
        {
            id: 1,
            firstName: 'Student 1',
            lastName: 'Last',
            classroom: '5D',
            homeroomTeacher: 'Black',
            barcodeNumber: '134612323212'
        },
        {
            id: 2,
            firstName: 'Student 2',
            lastName: 'Last',
            classroom: '3A',
            homeroomTeacher: 'Black',
            barcodeNumber: '135145415432'
        },
        {
            id: 3,
            firstName: 'Student 3',
            lastName: 'Last',
            classroom: '2B',
            homeroomTeacher: 'Black',
            barcodeNumber: '134654737532'
        },
        {
            id: 4,
            firstName: 'Student 4',
            lastName: 'Last',
            classroom: 'K1',
            homeroomTeacher: 'Black',
            barcodeNumber: '753354415432'
        }
    ],
    dropdownOpen: null
};

export const dispatchedstudentsSlice = createSlice({
    name: 'dispatchedstudents',
    initialState,
    reducers: {
        loadStudents: (state, {payload}) => {
            state.dispatchedstudents = payload;
        },
        deleteStudent: (state, action: PayloadAction<Object>) => {
            state.dispatchedstudents.shift(item => item.id == action.payload.id);
        },
        createStudent: (state, action: PayloadAction<Object>) => {
            state.dispatchedstudents.push(action.payload);
        },
        updateStudent: (state, action: PayloadAction<Object>) => {
            state.dispatchedstudents.shift(item => item.id == action.payload.id);
            state.dispatchedstudents.push(action.payload);
        },
        generateBarcode: (state, action: PayloadAction<Object>) => {
            
        }
    }
});

export const {loadStudents, deleteStudent, createStudent, updateStudent, generateBarcode} = dispatchedstudentsSlice.actions;
export default dispatchedstudentsSlice.reducer;
