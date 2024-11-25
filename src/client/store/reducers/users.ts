import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type User = {
    id: number,
    login: string,
    password: string,
    likes?: number[],
}

type Users = {
    changedLocalStorage: number,
}

const initialState: Users = {
    changedLocalStorage: 1,
}

export const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        setChangedLocalStorage(state, action: PayloadAction<number>) {
            state.changedLocalStorage = action.payload + 1;
        },
    }
});

const { actions, reducer } = usersSlice;

// export individual action creator functions
export const { setChangedLocalStorage } = actions;

// often the reducer is a default export, but that doesn't matter
export default reducer;