/**
 * FILTER SLICE USAGE EXAMPLES
 * 
 * This file demonstrates how to use the Redux filter slice across your application.
 */

import React from 'react';
import { View, Text, Button } from 'react-native';
import { useAppDispatch, useAppSelector } from '../hooks';
import {
  setFilterCategory,
  setFilterToBeDone,
  setFilterWorkLocation,
  setFilterDistanceRange,
  setFilterPriceRange,
  setFilterSort,
  resetFilters,
  setAllFilters,
  selectFilters,
  selectCategory,
  selectSortBy,
  selectSortOrder,
} from './filterSlice';
import { useGetAllTasksQuery } from '../apis';

// ============================================
// EXAMPLE 1: Reading filter state
// ============================================
export const ReadFilterExample = () => {
  // Get all filters at once
  const filters = useAppSelector(selectFilters);
  
  // Or get individual filter values
  const category = useAppSelector(selectCategory);
  const sortBy = useAppSelector(selectSortBy);
  const sortOrder = useAppSelector(selectSortOrder);

  return (
    <View>
      <Text>Category: {filters.category}</Text>
      <Text>Sort By: {sortBy}</Text>
      <Text>Sort Order: {sortOrder}</Text>
    </View>
  );
};

// ============================================
// EXAMPLE 2: Setting individual filter values
// ============================================
export const SetFilterExample = () => {
  const dispatch = useAppDispatch();

  const handleSetCategory = () => {
    dispatch(setFilterCategory('Cleaning'));
  };

  const handleSetSort = () => {
    // This will automatically set sortBy and sortOrder
    dispatch(setFilterSort('Newest First'));
  };

  const handleSetPriceRange = () => {
    dispatch(setFilterPriceRange(50000));
  };

  return (
    <View>
      <Button title="Set Category" onPress={handleSetCategory} />
      <Button title="Set Sort" onPress={handleSetSort} />
      <Button title="Set Price Range" onPress={handleSetPriceRange} />
    </View>
  );
};

// ============================================
// EXAMPLE 3: Resetting filters
// ============================================
export const ResetFilterExample = () => {
  const dispatch = useAppDispatch();

  const handleReset = () => {
    dispatch(resetFilters());
  };

  return (
    <Button title="Reset All Filters" onPress={handleReset} />
  );
};

// ============================================
// EXAMPLE 4: Setting multiple filters at once
// ============================================
export const SetMultipleFiltersExample = () => {
  const dispatch = useAppDispatch();

  const handleSetMultiple = () => {
    dispatch(setAllFilters({
      category: 'Plumbing',
      work_location: 'New York',
      price_range: 100000,
      sortBy: 'createdAt',
      sortOrder: 'desc',
    }));
  };

  return (
    <Button title="Set Multiple Filters" onPress={handleSetMultiple} />
  );
};

// ============================================
// EXAMPLE 5: Using filters with API queries
// ============================================
export const FilteredTaskListExample = () => {
  const sortBy = useAppSelector(selectSortBy);
  const sortOrder = useAppSelector(selectSortOrder);
  const filters = useAppSelector(selectFilters);

  // Use filters in your API query
  const { data, isLoading } = useGetAllTasksQuery({
    sortBy,
    sortOrder,
  });

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  return (
    <View>
      <Text>Active Filters:</Text>
      <Text>Category: {filters.category || 'All'}</Text>
      <Text>Location: {filters.work_location || 'Any'}</Text>
      <Text>Tasks Found: {data?.data?.result?.length || 0}</Text>
    </View>
  );
};

// ============================================
// EXAMPLE 6: Complete filter form component
// ============================================
export const CompleteFilterFormExample = () => {
  const dispatch = useAppDispatch();
  const filters = useAppSelector(selectFilters);

  const handleApplyFilters = (formValues: any) => {
    // Update all filters from form
    dispatch(setAllFilters({
      category: formValues.category,
      to_be_done: formValues.to_be_done,
      work_location: formValues.work_location,
      distance_range: formValues.distance_range,
      price_range: formValues.price_range,
      sort: formValues.sort,
    }));
  };

  const handleResetFilters = () => {
    dispatch(resetFilters());
  };

  return (
    <View>
      <Text>Current Filters: {JSON.stringify(filters, null, 2)}</Text>
      <Button title="Apply Filters" onPress={() => handleApplyFilters({
        category: 'Cleaning',
        work_location: 'Los Angeles',
        price_range: 50000,
        sort: 'Newest First',
      })} />
      <Button title="Reset" onPress={handleResetFilters} />
    </View>
  );
};

// ============================================
// SUMMARY OF AVAILABLE ACTIONS
// ============================================
/*
Available Actions:
- setFilterCategory(value: string)
- setFilterToBeDone(value: string)
- setFilterWorkLocation(value: string)
- setFilterDistanceRange(value: string | number)
- setFilterPriceRange(value: string | number)
- setFilterSort(value: string) // Automatically sets sortBy and sortOrder
- setSortByAndOrder({ sortBy, sortOrder })
- resetFilters()
- setAllFilters(filters: Partial<FilterState>)

Available Selectors:
- selectFilters - Get all filters
- selectCategory - Get category filter
- selectToBeDone - Get to_be_done filter
- selectWorkLocation - Get work_location filter
- selectDistanceRange - Get distance_range filter
- selectPriceRange - Get price_range filter
- selectSort - Get sort filter
- selectSortBy - Get sortBy value
- selectSortOrder - Get sortOrder value
*/
