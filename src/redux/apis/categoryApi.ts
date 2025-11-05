import { baseApi } from "../baseApi";

interface Category {
category_image:string
createdAt:string
isDeleted:boolean
name:string
updatedAt:string
__v:number
_id:string
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
  data: Category;
}

interface DeleteCategoryResponse {
  message: string;
  success: boolean;
}

interface GetAllCategoriesResponse {
  success: boolean;
  data: Category[];
}

export const categoryApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createCategory: builder.mutation<CreateCategoryResponse, CreateCategoryRequest>({
      query: (data) => ({
        url: "/category/create-category",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Service"],
    }),
    updateCategory: builder.mutation<UpdateCategoryResponse, UpdateCategoryRequest>({
      query: ({ id, ...data }) => ({
        url: `/category/update-category/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Service"],
    }),
    deleteCategory: builder.mutation<DeleteCategoryResponse, string>({
      query: (id) => ({
        url: `/category/delete-category/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Service"],
    }),
    getAllCategories: builder.query<GetAllCategoriesResponse, void>({
      query: () => ({
        url: "/category/all-categories",
        method: "GET",
      }),
      providesTags: ["Service"],
    }),
  }),
});

export const {
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
  useGetAllCategoriesQuery,
} = categoryApi;
