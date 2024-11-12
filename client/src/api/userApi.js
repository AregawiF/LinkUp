import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3001', // Use your backend URL here
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('token');
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getUserData: builder.query({
      query: () => '/user/',
    }),

    searchUsers: builder.query({
      query: (searchQuery) => ({
        url: `/users/search`,
        params: { name: searchQuery },
      }),
    }),
    createRoom: builder.mutation({
      query: (roomData) => ({
        url: '/rooms',
        method: 'POST',
        body: roomData,
      }),
    }),

  }),

});

export const { useGetUserDataQuery, useSearchUsersQuery, useCreateRoomMutation  } = userApi;
