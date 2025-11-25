import { baseApi } from "../baseApi";

export interface Question {
  _id: string;
  provider: {
    _id: string;
    name: string;
    profile_image: string;
  };
  task: string;
  details: string;
  question_image: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateQuestionRequest {
  data: {
    task: string;
    details: string;
  };
  question_image?: any;
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
    createQuestion: builder.mutation<
      CreateQuestionResponse,
      CreateQuestionRequest
    >({
      query: (data) => {
        return {
          url: "/question/create",
          method: "POST",
          body: data,
        };
      },
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
