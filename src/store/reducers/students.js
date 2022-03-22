import {createSlice, PayloadAction} from '@reduxjs/toolkit';

const initialState = {
    students: [
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

export const studentsSlice = createSlice({
    name: 'students',
    initialState,
    reducers: {
        loadStudents: (state, {payload}) => {
            state.students = payload;
        },
        deleteStudent: (state, action: PayloadAction<Object>) => {
            state.students = state.students.filter(item => item.id !== action.payload.id);
        },
        createStudent: (state, action: PayloadAction<Object>) => {
            state.students.push(action.payload);
        },
        updateStudent: (state, action: PayloadAction<Object>) => {
            state.students.shift(item => item.id == action.payload.id);
            state.students.push(action.payload);
        },
        generateBarcode: (state, action: PayloadAction<Object>) => {   
            state.students.forEach(student => {
                if(student.id === action.payload.id) 
                    student.barcodeNumber = action.payload.barcodeNumber;
                });
            }
    }
});

export const {loadStudents, deleteStudent, createStudent, updateStudent, generateBarcode} = studentsSlice.actions;
export default studentsSlice.reducer;
