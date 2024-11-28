import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type Item = {
    id: number,
    pic: string,
    author: string,
    header: string,
    text: string,
    likes?: number,
    isLiked?: boolean | null,
}

export type ItemsData = {
    amount: number,
    data: Item[],
}

export type ItemsParams = {
    start: string,
    limit: string,
    sort: string,
    login: string,
    updated: string,
};

type Items = {
    params: ItemsParams,
}

const initialState: Items = {
    params: {
        start: '0',
        limit: '2',
        sort: 'likes',
        login: '',
        updated: '1',
    },
}

export const itemsSlice = createSlice({
    name: 'items',
    initialState,
    reducers: {
        setParams(state, action: PayloadAction<ItemsParams>) {
            state.params = action.payload;
        },
    }
});

const { actions, reducer } = itemsSlice;

// export individual action creator functions
export const { setParams } = actions;

// often the reducer is a default export, but that doesn't matter
export default reducer;