import { baseApi } from "../baseApi";

export interface ProviderEarningItem {
  _id: string;
  amount: number;
  updatedAt: string;
  taskTitle: string;
}

export interface ProviderEarningsResponse {
  success: boolean;
  message: string;
  data: {
    meta: {
      page: number;
      limit: number;
      total: number;
      totalPage: number;
    };
    data: ProviderEarningItem[];
  };
}

type EarningsType = "daily" | "weekly" | "monthly" | "yearly";

export interface ProviderEarningsQuery {
  page?: number;
  limit?: number;
  type?: EarningsType;
  day?: number;
  week?: number;
  month?: number;
  year?: number;
}

export const paymentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getProviderEarnings: builder.query<
      ProviderEarningsResponse,
      ProviderEarningsQuery | void
    >({
      query: (params) => {
        const {
          page = 1,
          limit = 10,
          type,
          day,
          week,
          month,
          year,
        } = params ?? {};

        const paramsObject: Record<string, number | string> = {
          page,
          limit,
        };

        if (type) {
          paramsObject.type = type;
        }

        if (type === "daily" && day && month && year) {
          paramsObject.day = day;
          paramsObject.month = month;
          paramsObject.year = year;
          const paddedMonth = month.toString().padStart(2, "0");
          const paddedDay = day.toString().padStart(2, "0");
          paramsObject.date = `${year}-${paddedMonth}-${paddedDay}`;
        }

        if (type === "weekly" && week && year) {
          paramsObject.week = week;
          paramsObject.year = year;
        }

        if (type === "monthly" && month && year) {
          paramsObject.month = month;
          paramsObject.year = year;
        }

        if (type === "yearly" && year) {
          paramsObject.year = year;
        }

        return {
          url: "/payment/provider-earnings",
          method: "GET",
          params: paramsObject,
        };
      },
      providesTags: ["Payment"],
    }),
  }),
});

export const { useGetProviderEarningsQuery } = paymentApi;
