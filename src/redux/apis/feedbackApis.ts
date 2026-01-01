import { baseApi } from "../baseApi";

export interface Feedback {
  _id: string;
  task: string;
  provider: string;
  customer: {
    _id: string;
    name: string;
    profile_image: string;
  };
  rating: number;
  details: string;
}

export interface CreateFeedbackRequest {
  task: string;
  rating: number;
  details?: string;
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
    createFeedback: builder.mutation<
      CreateFeedbackResponse,
      CreateFeedbackRequest
    >({
      query: (body) => ({
        url: "/feedback/create-feedback",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Feedback", "Task"],
    }),

    getMyFeedback: builder.query<GetMyFeedbackResponse, void>({
      query: () => ({
        url: "/feedback/my-feedback",
        method: "GET",
      }),
      providesTags: ["Feedback"],
    }),

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
