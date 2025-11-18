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
  provider: string;
  description: string;
  location: {
    type: "Point";
    coordinates: [number, number];
  };
  address: string;
  city: string;
  availability: string;
  experience: string;
  onSiteSupport: boolean;
  toolsProvided: boolean;
  languages: [string];
  price: number;
  status: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  averageRating: number;
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
  data: Service;
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
interface GetMyServicesResponse {
  success: boolean;
  message: string;
  data: Service[];
}
export const serviceApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllServices: builder.query<
      GetAllServicesResponse,
      { page?: number; limit?: number }
    >({
      query: ({ page = 1, limit = 10 }) => ({
        url: "/service/all-service",
        method: "GET",
        params: {
          page,
          limit,
        },
      }),
      providesTags: ["Service"],
    }),
    getSingleService: builder.query<GetSingleServiceResponse, string>({
      query: (id) => ({
        url: `/service/get-single-service/${id}`,
        method: "GET",
      }),
      providesTags: (_result, _error, id) => [{ type: "Service", id }],
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
      query: ({ id, ...data }) => ({
        url: "/service/update-service",
        method: "PATCH",
        body: { id, ...data },
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
    getMyServices: builder.query<GetMyServicesResponse, void>({
      query: () => ({
        url: "/service/my-service",
        method: "GET",
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
