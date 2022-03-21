import {configureStore} from '@reduxjs/toolkit';

import {authSlice} from './reducers/auth';
import {studentsSlice} from './reducers/students';
import {uiSlice} from './reducers/ui';
import {staffsSlice} from './reducers/staff';
import {roomsSlice} from './reducers/rooms';
import {carlinesSlice} from './reducers/carlines';
import {barcodesSlice} from './reducers/barcodes';
import {dispatchedstudentsSlice} from './reducers/dispatchedstudents';

const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
        ui: uiSlice.reducer,
        students: studentsSlice.reducer,
        staffs: staffsSlice.reducer,
        rooms: roomsSlice.reducer,
        carlines: carlinesSlice.reducer,
        dispatchedstudents: dispatchedstudentsSlice.reducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({serializableCheck: false})
});

export default store;
