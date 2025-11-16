import { baseApi } from "../baseApi";

export interface Task {
  "location": {
    "type": "Point",
    "coordinates": [string, string]
  },
  "_id": string,
  "title": string,
  "category": {
    "_id": string,
    "name": string,
    "category_image": string,
    "isDeleted": boolean,
    "createdAt": string,
    "updatedAt": string,
    "__v": number
  },
  "budget": number,
  "status": "OPEN_FOR_BID" | "IN_PROGRESS" | "COMPLETED" | "CANCELLED" | "DISPUTE" | "LATE",
  "isDeleted": boolean,
  "paymentStatus": string,
  "customer": {
    "_id": string,
    "name": string,
    "profile_image": string
  },
  "payOn": string,
  "doneBy": string,
  "address": string,
  "city": string,
  "scheduleType": string,
  "preferredDate": string,
  "preferredTime": string,
  "description": string,
  "task_attachments": string[],
  "totalOffer": number,
  "createdAt": string,
  "updatedAt": string,
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
  data: Task
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
      }
    >({
      query: ({ sortOrder, sortBy, category, status, minPrice, maxPrice, searchTerm, maxDistance }) => ({
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
    getMyTask: builder.query<GetAllTasksResponse, {
      status?: "OPEN_FOR_BID" | "IN_PROGRESS" | "COMPLETED" | "CANCELLED" | "DISPUTE" | "LATE";
    }>({
      query: ({ status }) => ({
        url: "/task/my-task",
        method: "GET",
        params: {
          status,
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
} = taskApi;
