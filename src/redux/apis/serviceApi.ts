import { baseApi } from "../baseApi";

export interface Service {
  _id: string;
  category: {
    _id: string;
    name: string;
    category_image: string;
    isDeleted: boolean;
  };
  title: string;
  images: [string];
  provider: {
    _id: string;
    name: string;
    profile_image: string;
    email: string;
  };
  address: string;
  description: string;
  isActive: boolean;
  price: number;
  status: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  averageRating: number;
  totalRating: number
}

interface CreateServiceRequest {
  name: string;
  description?: string;
  category?: string;
  price?: number;
  service_image?: string;
}

interface CreateServiceResponse {
  message: string;
  success: boolean;
  data: {
    meta: {
      page: 1,
      limit: 10,
      total: 4,
      totalPage: 1
    },
    result: Service[];
  };
}

interface UpdateServiceRequest {
  id: string;
  name?: string;
  description?: string;
  category?: string;
  price?: number;
  service_image?: string;
}

interface UpdateServiceResponse {
  message: string;
  success: boolean;
  data?: Service;
}

interface GetAllServicesResponse {
  success: boolean;
  data: {
    meta?: {
      limit: number;
      page: number;
      totalPage: number;
      total: number;
    };
    result: Service[];
  };
}

interface GetSingleServiceResponse {
  success: boolean;
  data: Service;
}

interface DeleteServiceResponse {
  message: string;
  success: boolean;
}
interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPage: number;
}

interface PaginatedServices {
  meta: PaginationMeta;
  result: Service[];
}

interface GetMyServicesResponse {
  success: boolean;
  message: string;
  data: PaginatedServices;
}
export const serviceApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllServices: builder.query<
      GetAllServicesResponse,
      { page?: number; limit?: number, popular?: boolean }
    >({
      query: ({ page = 1, limit = 10, popular }) => ({
        url: "/service/all-service",
        method: "GET",
        params: {
          page,
          limit,
          ...(popular && { popular }),
        },
      }),
      providesTags: ["Service"],
    }),
    getSingleService: builder.query<GetSingleServiceResponse, string>({
      query: (id) => ({
        url: `/service/get-single-service/${id}`,
        method: "GET",
      }),
      providesTags: ['Service'],
    }),
    createService: builder.mutation<
      CreateServiceResponse,
      CreateServiceRequest
    >({
      query: (data) => ({
        url: "/service/create-service",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Service"],
    }),
    updateService: builder.mutation<
      UpdateServiceResponse,
      UpdateServiceRequest
    >({
      query: (data) => ({
        url: "/service/update-service",
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Service"],
    }),
    deleteService: builder.mutation<DeleteServiceResponse, string>({
      query: (id) => ({
        url: `/service/delete-service/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Service"],
    }),
    getMyServices: builder.query<
      GetMyServicesResponse,
      { page?: number; limit?: number }
    >({
      query: ({ page = 1, limit = 10 } = {}) => ({
        url: "/service/my-service",
        method: "GET",
        params: { page, limit },
      }),
      providesTags: ["Service"],
    }),
    toggleServiceStatus: builder.mutation<
      UpdateServiceResponse,
      { id: string }
    >({
      query: ({ id }) => ({
        url: `/service/active-inactive/${id}`,
        method: "PATCH",
      }),
      invalidatesTags: ["Service"],
    }),
  }),
});

export const {
  useGetAllServicesQuery,
  useGetSingleServiceQuery,
  useCreateServiceMutation,
  useUpdateServiceMutation,
  useDeleteServiceMutation,
  useGetMyServicesQuery,
  useToggleServiceStatusMutation,
} = serviceApi;
