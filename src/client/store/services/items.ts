import { fetchBaseQuery, TypedUseQuery, createApi } from "@reduxjs/toolkit/query/react";
import { Item, ItemsData, ItemsParams } from "../reducers/items";

//ВЫЗЫВАЕТСЯ ЕДИНСТВЕННЫ РАЗ!!!
//baseQuery: fetchBaseQuery({baseUrl: '/api/items', headers: {'Authorization': 'Bearer ' + localStorage.getItem('token')}}),

//let prev = 0;

export const itemsAPI = createApi({
    reducerPath: 'itemsAPI',
    baseQuery: fetchBaseQuery({
        baseUrl: '/api/items',
        prepareHeaders: (headers, {getState}) => {
            console.log(getState());
            console.log(localStorage.getItem('token'));
            //if ((getState() as any).usersReducer.changedLocalStorage !== prev) {
            headers.set('Authorization', 'Bearer ' + localStorage.getItem('token'));
            //}
            //prev = (getState() as any).usersReducer.changedLocalStorage;
            return headers;
        }
    }),
    tagTypes: ['Post'],
    endpoints: (build) => ({
        fetchItems: build.query<ItemsData, ItemsParams>({
            query: (params) => `?${new URLSearchParams(params)}`,
            providesTags: result => ['Post'],
        }),
        createItem: build.mutation<Item, FormData>({
            query: (body) => ({
                url: `/create`,
                method: 'POST',
                body,
            }),
            invalidatesTags: ['Post'],
        }),
        like: build.mutation<void, {
            id: number,
        }>({
            query: (body) => ({
                url: `/like`,
                method: 'POST',
                body,
            }),
            invalidatesTags: ['Post'],
        }),
    })
});

export const { useFetchItemsQuery, useCreateItemMutation, useLikeMutation } = itemsAPI;