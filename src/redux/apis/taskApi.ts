import { baseApi } from "../baseApi";

export interface Task {
  _id: string;
  title: string;
  category: {
    _id: string;
    name: string;
  };
  customer: {
    _id: string;
    name: string;
    profile_image: string;
  };
  budget: number;
  status: string;
  isDeleted: boolean;
  paymentStatus: string;
  provider: string;
  payOn: string;
  location: {
    type: "Point",
    coordinates: number[]
  },
  address: string,
  scheduleType: string,
  preferredDate: string,
  preferredTime: string,
  description: string,
  task_attachments: [],
  createdAt: string,
  updatedAt: string,
  __v: number,
  totalOffer: number
}

interface CreateTaskRequest {
  title: string;
  description: string;
}

interface CreateTaskResponse {
  message: string;
  success: boolean;
  data: Task;
}

interface GetAllTasksResponse {
  success: boolean;
  data: {
    result: Task[];
    pagination: {
      total: number;
      limit: number;
      page: number;
      pages: number;
    };
  };
}

interface GetSingleTaskResponse {
  success: boolean;
  data: Task;
}

interface DeleteTaskResponse {
  message: string;
  success: boolean;
}

interface AcceptOfferRequest {
  taskId?: string;
  offerId?: string;
}

interface AcceptOfferResponse {
  message: string;
  success: boolean;
  data?: any;
}

export const taskApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createTask: builder.mutation<CreateTaskResponse, CreateTaskRequest>({
      query: (task) => ({
        url: "/task/create-task",
        method: "POST",
        body: task,
      }),
      invalidatesTags: ["Task"],
    }),
    getAllTasks: builder.query<GetAllTasksResponse, { sortOrder?: string, sortBy?: string, category?: string, status?: string, minPrice?: number, maxPrice?: number }>({
      query: ({ sortOrder, sortBy, category, status, minPrice, maxPrice }) => ({
        url: "/task/all-task",
        method: "GET",
        params: {
          sortOrder,
          sortBy,
          category,
          status,
          minPrice,
          maxPrice
        },
      }),
      providesTags: ["Task"],
    }),
    getSingleTask: builder.query<GetSingleTaskResponse, string>({
      query: (id) => ({
        url: `/task/single-task/${id}`,
        method: "GET",
      }),
      providesTags: (_result, _error, id) => [{ type: "Task", id }],
    }),
    deleteTask: builder.mutation<DeleteTaskResponse, string>({
      query: (id) => ({
        url: `/task/delete-task/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Task"],
    }),
    acceptOffer: builder.mutation<AcceptOfferResponse, AcceptOfferRequest>({
      query: (data) => ({
        url: "/task/acceptOffer",
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Task"],
    }),
  }),
});

export const {
  useCreateTaskMutation,
  useGetAllTasksQuery,
  useGetSingleTaskQuery,
  useDeleteTaskMutation,
  useAcceptOfferMutation,
} = taskApi;
