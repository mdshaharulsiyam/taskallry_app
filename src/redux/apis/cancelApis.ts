import { baseApi } from "../baseApi";

export interface CancelRequest {
  cancellationEvidence: string[];
  cancellationReason: string;
  createdAt: string;
  currentDate: string;
  reason: string;
  rejectDetails: string;
  reject_evidence: string[];
  requestFrom: {
    _id: string;
    name: string;
    profile_image: string;
  };
  requestTo: {
    name: string
    profile_image: string
    _id: string
  };
  requestToModel: string;
  requestedFromModel: string;
  reviewedRequestAt: string | null;
  status: string;
  task: string;
  type: string;
  updatedAt: string;
  __v: number;
  _id: string;
}

export interface CreateCancelResponse {
  success: boolean;
  message: string;
  data: CancelRequest;
}

interface GetCancelsByTaskResponse {
  success: boolean;
  data: CancelRequest;
}

interface UpdateCancelResponse {
  success: boolean;
  message: string;
  data?: CancelRequest;
}

interface DeleteCancelResponse {
  success: boolean;
  message: string;
}

export const cancelApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createCancelRequest: builder.mutation<CreateCancelResponse, FormData>({
      query: (formData) => ({
        url: "/cancel-request/create",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Cancel", "Task"],
    }),

    getCancelsByTask: builder.query<GetCancelsByTaskResponse, string>({
      query: (taskId) => ({
        url: `/cancel-request/byTask/${taskId}`,
        method: "GET",
      }),
      providesTags: ["Cancel", "Task"],
    }),

    deleteCancelRequest: builder.mutation<DeleteCancelResponse, string>({
      query: (id) => ({
        url: `/cancel-request/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Cancel", "Task"],
    }),

    acceptCancelRequest: builder.mutation<
      UpdateCancelResponse,
      { id: string; body?: FormData | Record<string, any> }
    >({
      query: ({ id, body }) => ({
        url: `/cancel-request/accept-reject/${id}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["Cancel", "Task"],
    }),

    rejectCancelRequest: builder.mutation<
      UpdateCancelResponse,
      { id: string; body: FormData }
    >({
      query: ({ id, body }) => ({
        url: `/cancel-request/rejectRequest/${id}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["Cancel", "Task"],
    }),
  }),
});

export const {
  useCreateCancelRequestMutation,
  useGetCancelsByTaskQuery,
  useDeleteCancelRequestMutation,
  useAcceptCancelRequestMutation,
  useRejectCancelRequestMutation,
} = cancelApi;
