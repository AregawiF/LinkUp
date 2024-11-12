import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const messageApi = createApi({
  reducerPath: 'messageApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
  endpoints: (builder) => ({
    sendMessage: builder.mutation({
      query: ({ content, roomId }) => ({
        url: '/messages/send',
        method: 'POST',
        body: { content, roomId },
      }),
    }),
    getMessages: builder.query({
      query: (roomId) => `/messages/${roomId}`,
    }),
  }),
});

export const { useSendMessageMutation, useGetMessagesQuery } = messageApi;
