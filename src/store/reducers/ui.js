import {createSlice} from '@reduxjs/toolkit';
import {calculateWindowSize} from '../../utils/helpers';

const initialState = {
    isSidebarCollapsed: false,
    screenSize: calculateWindowSize(window.innerWidth),
    confirmDialog: {
        id: 'initial-id',
        type: 'confirm',
        title: 'Are you sure?',
        message: 'Are you sure to proceed with this operation?',
        noLabel: 'No',
        yesLabel: 'Yes, Go ahead',
        showModal: false,
        cancelAction: null,
        confirmAction: null
    }
};

export const uiSlice = createSlice({
    name: 'ui',
    initialState,
    reducers: {
        toggleSidebarMenu: (state) => {
            state.isSidebarCollapsed = !state.isSidebarCollapsed;
        },
        setWindowSize: (state, {payload}) => {
            state.screenSize = payload;
        },
        // confirmDialog
        showConfirmDialog: (state, {payload}) => {
            return {
                ...state,
                confirmDialog: {
                    ...state.confirmDialog,
                    showModal: true,
                    ...payload
                }
            };
        },
        hideConfirmDialog: (state) => {
            state.confirmDialog = initialState.confirmDialog;
        }
    }
});

export const {
    toggleSidebarMenu,
    setWindowSize,
    showConfirmDialog,
    hideConfirmDialog
} = uiSlice.actions;
export default uiSlice.reducer;
