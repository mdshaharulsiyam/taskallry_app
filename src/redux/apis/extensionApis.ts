import { baseApi } from "../baseApi";

export interface ExtensionRequest {
  createdAt: string;
  currentDate: string;
  extensionEvidence: any[];
  extensionReason: string;
  reason: string;
  rejectDetails: string;
  reject_evidence: string;
  requestFrom: {
    name: string
    profile_image: string
    _id: string
  };
  requestTo: {
    name: string
    profile_image: string
    _id: string
  };
  requestToModel: string;
  requestedDateTime: string;
  requestedFromModel: string;
  reviewedRequestAt: string | null;
  status: string;
  task: string;
  updatedAt: string;
  type: "extension"
  __v: number;
  _id: string;
}


export interface CreateExtensionRequest {
  taskId: string;
  newDate: string;
  reason?: string;
}

interface CreateExtensionResponse {
  success: boolean;
  message: string;
  data: ExtensionRequest;
}

interface GetExtensionsByTaskResponse {
  success: boolean;
  data: ExtensionRequest[];
}

interface UpdateExtensionResponse {
  success: boolean;
  message: string;
  data?: ExtensionRequest;
}

interface DeleteExtensionResponse {
  success: boolean;
  message: string;
}

interface MakeDisputeResponse {
  success: boolean;
  message: string;
}

export const extensionApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createExtensionRequest: builder.mutation<
      CreateExtensionResponse,
      CreateExtensionRequest
    >({
      query: (body) => ({
        url: "/extension-request/create",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Extension", "Task"],
    }),

    getExtensionsByTask: builder.query<GetExtensionsByTaskResponse, string>({
      query: (taskId) => ({
        url: `/extension-request/byTask/${taskId}`,
        method: "GET",
      }),
      providesTags: ["Extension"],
    }),

    deleteExtensionRequest: builder.mutation<DeleteExtensionResponse, string>({
      query: (id) => ({
        url: `/extension-request/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Extension", "Task"],
    }),

    acceptRejectExtensionRequest: builder.mutation({
      query: ({ id, body }) => ({
        url: `/extension-request/accept-reject/${id}`,
        method: "PATCH",
        body: body
      }),
      invalidatesTags: ["Extension", "Task"],
    }),

    makeExtensionDispute: builder.mutation<MakeDisputeResponse, string>({
      query: (id) => ({
        url: `/extension-request/make-dispute-for-admin/${id}`,
        method: "POST",
      }),
      invalidatesTags: ["Extension", "Task"],
    }),

  }),
});

export const {
  useCreateExtensionRequestMutation,
  useGetExtensionsByTaskQuery,
  useDeleteExtensionRequestMutation,
  useAcceptRejectExtensionRequestMutation,
  useMakeExtensionDisputeMutation,
} = extensionApi;
