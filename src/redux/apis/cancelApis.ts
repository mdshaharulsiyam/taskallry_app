import { baseApi } from "../baseApi";

export interface CancelRequest {
  _id: string;
  task: string;
  requestedBy: string;
  reason?: string;
  status: "PENDING" | "ACCEPTED" | "REJECTED";
  createdAt: string;
  updatedAt: string;
}

export interface CreateCancelRequest {
  taskId: string;
  reason?: string;
}

interface CreateCancelResponse {
  success: boolean;
  message: string;
  data: CancelRequest;
}

interface GetCancelsByTaskResponse {
  success: boolean;
  data: CancelRequest[];
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
    // POST cancel-request/create
    createCancelRequest: builder.mutation<CreateCancelResponse, CreateCancelRequest>({
      query: (body) => ({
        url: "/cancel-request/create",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Cancel", "Task"],
    }),

    // GET cancel-request/byTask/:taskId
    getCancelsByTask: builder.query<GetCancelsByTaskResponse, string>({
      query: (taskId) => ({
        url: `/cancel-request/byTask/${taskId}`,
        method: "GET",
      }),
      providesTags: ["Cancel"],
    }),

    // DELETE cancel-request/delete/:id
    deleteCancelRequest: builder.mutation<DeleteCancelResponse, string>({
      query: (id) => ({
        url: `/cancel-request/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Cancel", "Task"],
    }),

    // PATCH cancel-request/acceptRequest/:id
    acceptCancelRequest: builder.mutation<UpdateCancelResponse, string>({
      query: (id) => ({
        url: `/cancel-request/acceptRequest/${id}`,
        method: "PATCH",
      }),
      invalidatesTags: ["Cancel", "Task"],
    }),

    // PATCH cancel-request/rejectRequest/:id
    rejectCancelRequest: builder.mutation<UpdateCancelResponse, string>({
      query: (id) => ({
        url: `/cancel-request/rejectRequest/${id}`,
        method: "PATCH",
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


