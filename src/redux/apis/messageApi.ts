import { baseApi } from "../baseApi";

export interface MessageItem {
  _id: string;
  text: string;
  imageUrl: string[];
  videoUrl: string[];
  pdfUrl: string[];
  msgByUserId: {
    name: string
    profile_image: string
    _id: string
  };
  msgByUserModel: string;
  seen: boolean;
  conversationId: string;
  createdAt: string;
  updatedAt: string;
  userDetails: {
    _id: string;
    name: string;
    profile_image: string;
    email: string;
  };
  isMyMessage: boolean;
}

interface GetMessagesResponse {
  success: boolean;
  message: string;
  data: {
    meta: {
      page: number;
      limit: number;
      total: number;
      totalPages: number;
    };
    result: MessageItem[];
  };
}

export const messageApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getMessages: builder.query<
      GetMessagesResponse,
      { conversationId: string; page?: number; limit?: number }
    >({
      query: ({ conversationId, page = 1, limit = 10 }) => ({
        url: `/message/get-messages/${conversationId}`,
        method: "GET",
        params: { page, limit },
      }),
      providesTags: ["Message"],
    }),
  }),
});

export const { useGetMessagesQuery } = messageApi;
