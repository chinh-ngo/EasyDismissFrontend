import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    rooms: [
        {
            id: 1,
            name: 'Room1',
            description: 'Room1',
            
        },
        {
            id: 2,
            name: 'Room2',
            description: 'Room2',
        },
        {
            id: 3,
            name: 'Room3',
            description: 'Room3',
        },
        {
            id: 4,
            name: 'Room4',
            description: 'Room4',
        }
    ],
    dropdownOpen: null
};

export const roomsSlice = createSlice({
    name: 'rooms',
    initialState,
    reducers: {
        loadRooms: (state, {payload}) => {
            state.rooms = payload;
        },
        deleteRoom: (state, action: PayloadAction<Object>) => {
            state.rooms.shift(item => item.id == action.payload.id);
        },
        createRoom: (state, action: PayloadAction<Object>) => {
            state.rooms.push(action.payload);
        },
        updateRoom: (state, action: PayloadAction<Object>) => {
            state.rooms.shift(item => item.id = action.payload.id);
            state.rooms.push(action.payload);
        }

    }
});

export const {loadRooms, deleteRoom, createRoom, updateRoom} = roomsSlice.actions;
export default roomsSlice.reducer;
