import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    isLoggedIn: !!localStorage.getItem('token'),
    token: localStorage.getItem('token'),
    currentUser: {
        firstName: '',
        lastName: '',
        fullName: '',
        email: '',
        picture: null,
        settings: {
            startPage: '/'
        }
    }
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loginUser: (state, {payload}) => {
            localStorage.setItem('token', payload);
            state.isLoggedIn = true;
            state.token = payload;
        },
        logoutUser: (state) => {
            localStorage.removeItem('token');
            state.currentUser = {};
            state.isLoggedIn = false;
            state.token = null;
        },
        loadUser: (state, {payload}) => {
            state.currentUser = payload;
        }
    }
});

export const {loadUser, loginUser, logoutUser} = authSlice.actions;
export default authSlice.reducer;
