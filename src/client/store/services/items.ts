import { fetchBaseQuery, TypedUseQuery, createApi } from "@reduxjs/toolkit/query/react";
import { Item, ItemsParams } from "../reducers/items";

export const itemsAPI = createApi({
    reducerPath: 'itemsAPI',
    baseQuery: fetchBaseQuery({baseUrl: '/api/items', headers: {'Authorization': 'Bearer ' + localStorage.getItem('token')}}),
    tagTypes: ['Post'],
    endpoints: (build) => ({
        fetchItems: build.query<Item[], ItemsParams>({
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
    })
});

export const { useFetchItemsQuery, useCreateItemMutation } = itemsAPI;