import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

export interface FilterState {
  category: string;
  to_be_done: string;
  work_location: string;
  distance_range: number | string;
  price_range: number | string;
  sort: string;
  sortBy: string;
  sortOrder: string;
  viewMode: "list" | "map";
}

const initialState: FilterState = {
  category: "",
  to_be_done: "",
  work_location: "",
  distance_range: 20,
  price_range: 5000000,
  sort: "",
  sortBy: "createdAt",
  sortOrder: "desc",
  viewMode: "list",
};

export const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setFilterCategory: (state, action: PayloadAction<string>) => {
      state.category = action.payload;
    },
    setFilterToBeDone: (state, action: PayloadAction<string>) => {
      state.to_be_done = action.payload;
    },
    setFilterWorkLocation: (state, action: PayloadAction<string>) => {
      state.work_location = action.payload;
    },
    setFilterDistanceRange: (state, action: PayloadAction<number | string>) => {
      state.distance_range = action.payload;
    },
    setFilterPriceRange: (state, action: PayloadAction<number | string>) => {
      state.price_range = action.payload;
    },
    setFilterSort: (state, action: PayloadAction<string>) => {
      state.sort = action.payload;
      // Automatically set sortBy and sortOrder based on sort selection
      switch (action.payload) {
        case "Newest First":
          state.sortBy = "createdAt";
          state.sortOrder = "desc";
          break;
        case "Oldest First":
          state.sortBy = "createdAt";
          state.sortOrder = "asc";
          break;
        case "Open for Bid":
          state.sortBy = "status";
          state.sortOrder = "asc";
          break;
        case "Assigned":
          state.sortBy = "status";
          state.sortOrder = "desc";
          break;
        default:
          state.sortBy = "createdAt";
          state.sortOrder = "desc";
      }
    },
    setViewMode: (state, action: PayloadAction<"list" | "map">) => {
      state.viewMode = action.payload;
    },
    setSortByAndOrder: (
      state,
      action: PayloadAction<{ sortBy: string; sortOrder: string }>
    ) => {
      state.sortBy = action.payload.sortBy;
      state.sortOrder = action.payload.sortOrder;
    },
    resetFilters: (state) => {
      return initialState;
    },
    setAllFilters: (state, action: PayloadAction<Partial<FilterState>>) => {
      return { ...state, ...action.payload };
    },
  },
});

export const {
  setFilterCategory,
  setFilterToBeDone,
  setFilterWorkLocation,
  setFilterDistanceRange,
  setFilterPriceRange,
  setFilterSort,
  setSortByAndOrder,
  resetFilters,
  setAllFilters,
  setViewMode,
} = filterSlice.actions;

// Selectors
export const selectFilters = (state: RootState) => state.filter;
export const selectCategory = (state: RootState) => state.filter.category;
export const selectToBeDone = (state: RootState) => state.filter.to_be_done;
export const selectWorkLocation = (state: RootState) =>
  state.filter.work_location;
export const selectDistanceRange = (state: RootState) =>
  state.filter.distance_range;
export const selectPriceRange = (state: RootState) => state.filter.price_range;
export const selectSort = (state: RootState) => state.filter.sort;
export const selectSortBy = (state: RootState) => state.filter.sortBy;
export const selectSortOrder = (state: RootState) => state.filter.sortOrder;
export const selectViewMode = (state: RootState) => state.filter.viewMode;

export default filterSlice.reducer;
