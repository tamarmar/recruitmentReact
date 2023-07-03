// import { configureStore } from "@reduxjs/toolkit";
// import jobReducer from "../Redux/jobReducer";

// export const store = configureStore({
//     reducer: {
//         job: jobReducer
//     },
//     middleware: [],
// });

// export type AppDispatch = typeof store.dispatch;
// export type RootState = ReturnType<typeof store.getState>;
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import rootReducer from '../Redux/Reducer';

const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));

export default store;


