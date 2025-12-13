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

    acceptExtensionRequest: builder.mutation<UpdateExtensionResponse, string>({
      query: (id) => ({
        url: `/extension-request/acceptRequest/${id}`,
        method: "PATCH",
      }),
      invalidatesTags: ["Extension", "Task"],
    }),

    rejectExtensionRequest: builder.mutation<UpdateExtensionResponse, string>({
      query: (id) => ({
        url: `/extension-request/rejectRequest/${id}`,
        method: "PATCH",
      }),
      invalidatesTags: ["Extension", "Task"],
    }),
  }),
});

export const {
  useCreateExtensionRequestMutation,
  useGetExtensionsByTaskQuery,
  useDeleteExtensionRequestMutation,
  useAcceptExtensionRequestMutation,
  useRejectExtensionRequestMutation,
} = extensionApi;
