import { baseApi } from "../baseApi";

export interface Bid {
  _id: string;
  provider: {
    _id: string;
    name: string;
    profile_image?: string;
    totalRatingCount: number;
    avgRating: number;
    email: string;
  };
  task: string;
  price: number;
  details: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateBidRequest {
  task: string;
  price: number;
  details: string;
}

interface CreateBidResponse {
  success: boolean;
  message: string;
  data: Bid;
}

interface GetAllBidsResponse {
  success: boolean;
  data: {
    meta: {
      page: number;
      limit: number;
      total: number;
      totalPage: number;
    };
    result: Bid[];
  };
}

interface GetBidsByTaskIdResponse {
  success: boolean;
  data: {
    meta: {
      page: number;
      limit: number;
      total: number;
      totalPage: number;
    };
    result: Bid[];
  };
}

interface DeleteBidResponse {
  success: boolean;
  message: string;
}

export const bidsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createBid: builder.mutation<CreateBidResponse, CreateBidRequest>({
      query: (body) => ({
        url: "/bid/create-bid",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Bid", "Task"],
    }),
    getAllBids: builder.query<GetAllBidsResponse, void>({
      query: () => ({
        url: "/bid/all-bid",
        method: "GET",
      }),
      providesTags: ["Bid"],
    }),
    getBidsByTaskId: builder.query<GetBidsByTaskIdResponse, string>({
      query: (taskId) => ({
        url: `/bid/bids-by-task-id/${taskId}`,
        method: "GET",
      }),
      providesTags: ["Bid"],
    }),
    updateBid: builder.mutation<
      CreateBidResponse,
      { bidId: string; price: number; details: string }
    >({
      query: ({ bidId, price, details }) => ({
        url: `/bid/update-bid/${bidId}`,
        method: "PATCH",
        body: { price, details },
      }),
      invalidatesTags: ["Bid", "Task"],
    }),
    deleteBid: builder.mutation<DeleteBidResponse, string>({
      query: (bidId) => ({
        url: `/bid/delete-bid/${bidId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Bid", "Task"],
    }),
  }),
});

export const {
  useCreateBidMutation,
  useGetAllBidsQuery,
  useGetBidsByTaskIdQuery,
  useUpdateBidMutation,
  useDeleteBidMutation,
} = bidsApi;
