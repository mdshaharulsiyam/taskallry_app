import { baseApi } from "../baseApi";

export interface ExtensionRequest {
  _id: string;
  task: string;
  requestedBy: string;
  previousDate: string;
  newDate: string;
  reason?: string;
  status: "PENDING" | "ACCEPTED" | "REJECTED";
  createdAt: string;
  updatedAt: string;
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
    // POST extension-request/create
    createExtensionRequest: builder.mutation<CreateExtensionResponse, CreateExtensionRequest>({
      query: (body) => ({
        url: "/extension-request/create",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Extension", "Task"],
    }),

    // GET extension-request/byTask/:taskId
    getExtensionsByTask: builder.query<GetExtensionsByTaskResponse, string>({
      query: (taskId) => ({
        url: `/extension-request/byTask/${taskId}`,
        method: "GET",
      }),
      providesTags: ["Extension"],
    }),

    // DELETE extension-request/delete/:id
    deleteExtensionRequest: builder.mutation<DeleteExtensionResponse, string>({
      query: (id) => ({
        url: `/extension-request/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Extension", "Task"],
    }),

    // PATCH extension-request/acceptRequest/:id
    acceptExtensionRequest: builder.mutation<UpdateExtensionResponse, string>({
      query: (id) => ({
        url: `/extension-request/acceptRequest/${id}`,
        method: "PATCH",
      }),
      invalidatesTags: ["Extension", "Task"],
    }),

    // PATCH extension-request/rejectRequest/:id
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

