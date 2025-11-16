import { baseApi } from "../baseApi";

export interface Feedback {
  _id: string;
  task: string;
  user: string;
  rating: number;
  comment?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateFeedbackRequest {
  taskId: string;
  rating: number;
  comment?: string;
}

interface CreateFeedbackResponse {
  success: boolean;
  message: string;
  data: Feedback;
}

interface GetMyFeedbackResponse {
  success: boolean;
  data: Feedback[];
}

interface GetTaskFeedbackResponse {
  success: boolean;
  data: Feedback[];
}

export const feedbackApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // POST feedback/create-feedback
    createFeedback: builder.mutation<CreateFeedbackResponse, CreateFeedbackRequest>({
      query: (body) => ({
        url: "/feedback/create-feedback",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Feedback", "Task"],
    }),

    // GET feedback/my-feedback
    getMyFeedback: builder.query<GetMyFeedbackResponse, void>({
      query: () => ({
        url: "/feedback/my-feedback",
        method: "GET",
      }),
      providesTags: ["Feedback"],
    }),

    // GET feedback/task-feedback
    getTaskFeedback: builder.query<GetTaskFeedbackResponse, string>({
      query: (taskId) => ({
        url: "/feedback/task-feedback",
        method: "GET",
        params: { taskId },
      }),
      providesTags: ["Feedback"],
    }),
  }),
});

export const {
  useCreateFeedbackMutation,
  useGetMyFeedbackQuery,
  useGetTaskFeedbackQuery,
} = feedbackApi;
