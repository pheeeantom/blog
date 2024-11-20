import { fetchBaseQuery, TypedUseQuery, createApi, TypedUseMutation } from "@reduxjs/toolkit/query/react";
import { Item, ItemsParams } from "../reducers/items";
import { User } from "../reducers/users";
import _ from 'lodash';

export const usersAPI = createApi({
    reducerPath: 'usersAPI',
    baseQuery: fetchBaseQuery({
        baseUrl: '',
        prepareHeaders: (headers) => {
            console.log(localStorage.getItem('token'));
            headers.set('Authorization', 'Bearer ' + localStorage.getItem('token'));
            return headers;
        }
    }),
    //tagTypes: ['Post'],
    endpoints: (build) => ({
        login: build.mutation<{
            id: number,
            login: string,
            token: string,
        }, {
            login: string, password: string
        }>({
            query: (body) => ({
                url: `/api/auth`,
                method: 'POST',
                body,
            }),
            //invalidatesTags: ['Post']
        }),
        registration: build.mutation<{
            id: number,
            login: string,
            password: string
        }, {
            login: string
        }>({
            query: (body) => ({
                url: `/api/registrate`,
                method: 'POST',
                body,
            }),
            //invalidatesTags: ['Post']
        }),
        fetchUser: build.query<User, number>({
            query: (changeId) => `/user`,
            //providesTags: result => ['Post'],
        })
    })
});

export const { useLoginMutation, useRegistrationMutation, useFetchUserQuery } = usersAPI;