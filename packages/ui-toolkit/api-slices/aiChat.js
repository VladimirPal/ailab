import { createEntityAdapter } from '@reduxjs/toolkit';
import { aiLabBaseApi } from "./ailabBaseApi";

const messagesAdapter = createEntityAdapter();
export const initialMessagesState = messagesAdapter.getInitialState();

const aiChatApi = aiLabBaseApi.injectEndpoints({
  endpoints: (builder) => ({
    getMessages: builder.query({
      query: () => ({
        url: '/api/chat/messages',
        method: 'GET',
      }),
      transformResponse: (response) => {
        return messagesAdapter.setAll(initialMessagesState, response.messages);
      },
    }),
    sendMessage: builder.mutation({
      query: ({ body }) => ({
        url: '/api/chat/send',
        method: 'POST',
        body,
      }),
      async onQueryStarted({ body }, { dispatch, queryFulfilled }) {
        log.tmp("onQueryStarted");
        const patchResult = dispatch(
          aiChatApi.util.updateQueryData('getMessages', undefined, (draft) => {
            messagesAdapter.setOne(draft, { id: 'current', text: body.message });
          })
        );
        try {
          const { data } = await queryFulfilled
          log.tmp({ data });
          dispatch(
            aiChatApi.util.updateQueryData('getMessages', undefined, (draft) => {
              messagesAdapter.removeOne(draft, 'current');
              messagesAdapter.addMany(draft, [data.requestMessage, data.responseMessage]);
            })
          );
        } catch (err) {
          log.error(err);
          patchResult.undo();
        }
      },
    }),
  }),
});

export const {
  useGetMessagesQuery,
  useSendMessageMutation,
} = aiChatApi;

export default aiChatApi;
