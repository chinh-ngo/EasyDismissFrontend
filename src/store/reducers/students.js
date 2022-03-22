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
        },
        {
            id: 5,
            firstName: 'Student 5',
            lastName: 'Last',
            classroom: 'K3',
            homeroomTeacher: 'Blacks',
            barcodeNumber: '332323235432'
        },
        {
            id: 6,
            firstName: 'Student 6',
            lastName: 'Last',
            classroom: 'K6',
            homeroomTeacher: 'Mr F',
            barcodeNumber: '999986235432'
        },
        {
            id: 7,
            firstName: 'Student 7',
            lastName: 'Last',
            classroom: 'K3',
            homeroomTeacher: 'FFFF',
            barcodeNumber: '2356574235432'
        },
        {
            id: 8,
            firstName: 'Student 8',
            lastName: 'Last',
            classroom: 'G3',
            homeroomTeacher: 'White',
            barcodeNumber: '3698542135432'
        },
        {
            id: 9,
            firstName: 'Student 9',
            lastName: 'Last',
            classroom: 'K7',
            homeroomTeacher: 'Blacks',
            barcodeNumber: '3323259884532'
        },
        {
            id: 10,
            firstName: 'Student 10',
            lastName: 'Last',
            classroom: 'K3',
            homeroomTeacher: 'Blacks',
            barcodeNumber: '772323235432'
        },
        {
            id: 11,
            firstName: 'Student 11',
            lastName: 'Last',
            classroom: 'K3',
            homeroomTeacher: 'Blacks',
            barcodeNumber: '882323235432'
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
