import { baseApi } from "../baseApi";
export interface statusWithDate {
  status: string;
  date: string;
  _id: string;
  createdAt: string;
  updatedAt: string;
}
export interface Task {
  _id: string;
  title: string;
  category: {
    _id: string;
    name: string;
  };
  budget: number;
  status:
  | "OPEN_FOR_BID"
  | "IN_PROGRESS"
  | "COMPLETED"
  | "CANCELLED"
  | "DISPUTE"
  | "LATE";
  isDeleted: boolean;
  paymentStatus: string;
  customer: {
    _id: string;
    name: string;
    profile_image: string;
    email: string;
  };
  payOn: string;
  location: {
    type: "Point";
    coordinates: string[];
  };
  address: string;
  city: string;
  scheduleType: string;
  doneBy?: string;
  preferredDate: string;
  preferredTime: string;
  description: string;
  task_attachments: string[];
  createdAt: string;
  updatedAt: string;
  __v: number;
  provider: {
    _id: string;
    name: string;
    profile_image: string;
    email: string;
  };
  statusWithDate: statusWithDate[];
  totalOffer: 1;
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
interface AcceptByCustomerRequest {
  bidID?: string;
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
    getAllTasks: builder.query<
      GetAllTasksResponse,
      {
        sortOrder?: string;
        sortBy?: string;
        category?: string;
        status?: string;
        minPrice?: number;
        maxPrice?: number;
        doneBy?: string;
        searchTerm?: string;
        maxDistance?: number;
        page?: number;
        limit?: number;
      }
    >({
      query: ({
        sortOrder,
        sortBy,
        category,
        status,
        minPrice,
        maxPrice,
        searchTerm,
        maxDistance,
        page,
        limit,
      }) => ({
        url: "/task/all-task",
        method: "GET",
        params: {
          sortOrder,
          sortBy,
          category,
          status,
          minPrice,
          maxPrice,
          searchTerm,
          maxDistance,
          page,
          limit,
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
    acceptByCustomer: builder.mutation<
      AcceptOfferResponse,
      AcceptByCustomerRequest
    >({
      query: (data) => ({
        url: "/task/accept-TaskBy-Customer",
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Task"],
    }),
    getMyTask: builder.query<
      GetAllTasksResponse,
      {
        status?:
        | "OPEN_FOR_BID"
        | "IN_PROGRESS"
        | "COMPLETED"
        | "CANCELLED"
        | "DISPUTE"
        | "LATE"
        | "bidMade"
        | "bidReceived"
        sortOrder?: string;
        sortBy?: string;
        page?: number;
        limit?: number;
      }
    >({
      query: ({ status, sortOrder, sortBy, page = 1, limit = 10 }) => ({
        url: "/task/my-task",
        method: "GET",
        params: {
          status,
          sortOrder,
          sortBy,
          page,
          limit,
        },
      }),
      providesTags: ["Task"],
    }),
  }),
});

export const {
  useCreateTaskMutation,
  useGetAllTasksQuery,
  useGetSingleTaskQuery,
  useDeleteTaskMutation,
  useAcceptOfferMutation,
  useGetMyTaskQuery,
  useAcceptByCustomerMutation,
} = taskApi;
