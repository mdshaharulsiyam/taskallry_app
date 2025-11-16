import { baseApi } from "../baseApi";

export interface Question {
  _id: string;
  task: string;
  user: {
    _id: string;
    name: string;
    profile_image?: string;
  };
  question: string;
  answer?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateQuestionRequest {
  taskId: string;
  question: string;
}

interface CreateQuestionResponse {
  success: boolean;
  message: string;
  data: Question;
}

interface GetMyQuestionsResponse {
  success: boolean;
  data: Question[];
}

interface GetQuestionsByTaskIdResponse {
  success: boolean;
  data: Question[];
}

interface DeleteQuestionResponse {
  success: boolean;
  message: string;
}

export const questionApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createQuestion: builder.mutation<CreateQuestionResponse, CreateQuestionRequest>({
      query: (body) => ({
        url: "/question/create",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Question", "Task"],
    }),
    getMyQuestions: builder.query<GetMyQuestionsResponse, void>({
      query: () => ({
        url: "/question/my-questions",
        method: "GET",
      }),
      providesTags: ["Question"],
    }),
    getQuestionsByTaskId: builder.query<GetQuestionsByTaskIdResponse, string>({
      query: (taskId) => ({
        url: `/question/by-taskID/${taskId}`,
        method: "GET",
      }),
      providesTags: ["Question"],
    }),
    deleteQuestion: builder.mutation<DeleteQuestionResponse, string>({
      query: (id) => ({
        url: `/question/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Question", "Task"],
    }),
  }),
});

export const {
  useCreateQuestionMutation,
  useGetMyQuestionsQuery,
  useGetQuestionsByTaskIdQuery,
  useDeleteQuestionMutation,
} = questionApi;

