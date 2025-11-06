import { baseApi } from "../baseApi";

interface Category {
  category_image: string
  createdAt: string
  isDeleted: boolean
  name: string
  updatedAt: string
  __v: number
  _id: string
  totalTask: number,
  totalServices: number
}

interface CreateCategoryRequest {
  name: string;
  description?: string;
}

interface CreateCategoryResponse {
  message: string;
  success: boolean;
  data: Category;
}

interface UpdateCategoryRequest {
  id: string;
  name?: string;
  description?: string;
}

interface UpdateCategoryResponse {
  message: string;
  success: boolean;

}

interface DeleteCategoryResponse {
  message: string;
  success: boolean;
}

interface GetAllCategoriesResponse {
  success: boolean;
  data: {
    meta: {
      limit: number,
      page: number,
      totalPage: number,
      total: number,
    },
    result: Category[]
  };
}

export const categoryApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createCategory: builder.mutation<CreateCategoryResponse, CreateCategoryRequest>({
      query: (data) => ({
        url: "/category/create-category",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Category"],
    }),
    updateCategory: builder.mutation<UpdateCategoryResponse, UpdateCategoryRequest>({
      query: ({ id, ...data }) => ({
        url: `/category/update-category/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Category"],
    }),
    deleteCategory: builder.mutation<DeleteCategoryResponse, string>({
      query: (id) => ({
        url: `/category/delete-category/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Category"],
    }),
    getAllCategories: builder.query<GetAllCategoriesResponse, {page?: number, limit?: number}>({
      query: ({page=1, limit=8}) => ({
        url: "/category/all-categories",
        method: "GET",
        params: {
          page,
          limit,
        }
      }),
      providesTags: ["Category"],
    }),
  }),
});

export const {
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
  useGetAllCategoriesQuery,
} = categoryApi;
