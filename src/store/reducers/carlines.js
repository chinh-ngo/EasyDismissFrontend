import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    carlines: [
        {
            id: 1,
            name: 'CarLine1',
            isActive: "InActive",
            
        },
        {
            id: 2,
            name: 'CarLine2',
            isActive: "Active",
        },
        {
            id: 3,
            name: 'CarLine3',
            isActive: "InActive",
        },
        {
            id: 4,
            name: 'CarLine4',
            isActive: "Active",
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
        },
        deleteCarline: (state, action: PayloadAction<Object>) => {
            state.carlines = state.carlines.filter(item => item.id !== action.payload.id);
        },
        createCarline: (state, action: PayloadAction<Object>) => {
            state.carlines.push(action.payload);
        },
        updateCarline: (state, action: PayloadAction<Object>) => {
            state.carlines.forEach(carline => {
                if(carline.id == action.payload.id)
                    {
                        carline.name = action.payload.name;
                        carline.isActive = action.payload.isActive;
                    }
            })
        }
    }
});

export const {loadCarlines, deleteCarline, createCarline, updateCarline} = carlinesSlice.actions;
export default carlinesSlice.reducer;
