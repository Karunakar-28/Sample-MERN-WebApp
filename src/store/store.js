import {configureStore} from '@reduxjs/toolkit';
import userLoginSlice from './slices/userLoginSlice';

//creating store
export const store = configureStore({
    reducer:{
        userLogin:userLoginSlice
    }
})