import { baseApi } from "../baseApi";

export interface Bid {
  _id: string;
  provider: {
    _id: string;
    name: string;
    profile_image?: string;
    totalRatingCount: number;
    avgRating: number;
  };
  task: string;
  price: number;
  details: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateBidRequest {
  taskId: string;
  price: number;
  description?: string;
}

interface CreateBidResponse {
  success: boolean;
  message: string;
  data: Bid;
}

interface GetAllBidsResponse {
  success: boolean;
  data: Bid[];
}

interface GetBidsByTaskIdResponse {
  success: boolean;
  data: Bid[];
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
  useDeleteBidMutation,
} = bidsApi;

