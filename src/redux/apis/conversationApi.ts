import { baseApi } from "../baseApi";

export interface Conversation {
  _id: string;
  lastMessage: {
    _id: string;
    text: string;
    imageUrl: string[];
    videoUrl: string[];
    pdfUrl: string[];
    msgByUserId: string;
    msgByUserModel: string;
    seen: boolean;
    conversationId: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
  };
  createdAt: string;
  updatedAt: string;
  userData: {
    _id: string;
    name: string;
    profile_image: string;
    email: string;
  };
  unseenMsg: number;
}

interface GetChatListResponse {
  success: boolean;
  message?: string;
  data: {
    meta: {
      page: number;
      limit: number;
      total: number;
      totalPage: number;
    };
    data: Conversation[];
  };
}

interface CreateConversationRequest {
  receiverId: string;
  [key: string]: any;
}

interface CreateConversationResponse {
  success: boolean;
  message?: string;

}

interface UploadConversationFileResponse {
  success: boolean;
  message?: string;
  url?: string;
}

export const conversationApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getChatList: builder.query<
      GetChatListResponse,
      { page?: number; limit?: number } | void
    >({
      query: (params) => {
        const { page = 1, limit = 10 } = params || {};
        return {
          url: "/conversation/get-chat-list",
          method: "GET",
          params: { page, limit },
        };
      },
      providesTags: ["Conversation"],
    }),

    createConversation: builder.mutation<
      CreateConversationResponse,
      CreateConversationRequest
    >({
      query: (body) => ({
        url: "/conversation/create-conversation",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Conversation"],
    }),

    uploadConversationFile: builder.mutation<
      UploadConversationFileResponse,
      FormData
    >({
      query: (formData) => ({
        url: "/file/upload-conversation",
        method: "POST",
        body: formData,
      }),
    }),
  }),
});

export const {
  useGetChatListQuery,
  useCreateConversationMutation,
  useUploadConversationFileMutation,
} = conversationApi;
