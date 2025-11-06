# Redux Filter Slice

This directory contains Redux slices for global state management.

## Filter Slice

The filter slice manages filter options that can be used across multiple components in the application.

### Features

- ✅ Centralized filter state management
- ✅ Automatic sortBy/sortOrder configuration based on sort selection
- ✅ Type-safe actions and selectors
- ✅ Easy reset functionality
- ✅ Batch update support

### State Structure

```typescript
{
  category: string;
  to_be_done: string;
  work_location: string;
  distance_range: number | string;
  price_range: number | string;
  sort: string;
  sortBy: string;        // Auto-computed from 'sort'
  sortOrder: string;     // Auto-computed from 'sort'
}
```

### Quick Start

#### 1. Import hooks and actions

```typescript
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { 
  setFilterCategory, 
  selectFilters,
  resetFilters 
} from '@/redux/slices/filterSlice';
```

#### 2. Read filter state

```typescript
const filters = useAppSelector(selectFilters);
const sortBy = useAppSelector(selectSortBy);
```

#### 3. Update filters

```typescript
const dispatch = useAppDispatch();

// Update single filter
dispatch(setFilterCategory('Cleaning'));

// Update multiple filters
dispatch(setAllFilters({
  category: 'Plumbing',
  work_location: 'New York',
}));

// Reset all filters
dispatch(resetFilters());
```

#### 4. Use with API queries

```typescript
const sortBy = useAppSelector(selectSortBy);
const sortOrder = useAppSelector(selectSortOrder);

const { data } = useGetAllTasksQuery({ sortBy, sortOrder });
```

### Sort Options

The `setFilterSort` action automatically configures `sortBy` and `sortOrder`:

- **"Newest First"** → `sortBy: "createdAt"`, `sortOrder: "desc"`
- **"Oldest First"** → `sortBy: "createdAt"`, `sortOrder: "asc"`
- **"Open for Bid"** → `sortBy: "status"`, `sortOrder: "asc"`
- **"Assigned"** → `sortBy: "status"`, `sortOrder: "desc"`

### Components Using Filter Slice

1. **FIlterOptions.tsx** - Filter form with Redux integration
2. **FIlteredTask.tsx** - Task list using filter state for API queries
3. Any component that needs access to filter values

### API Integration

The filter state is designed to work seamlessly with your task APIs:

```typescript
const filters = useAppSelector(selectFilters);

// Use in API query
useGetAllTasksQuery({
  sortBy: filters.sortBy,
  sortOrder: filters.sortOrder,
  // You can extend this with other filter parameters
});
```

### Benefits

1. **Single Source of Truth**: Filter values are stored in one place
2. **Persistent State**: Filters persist across component unmounts
3. **Easy Sharing**: Multiple components can read the same filter values
4. **Type Safety**: Full TypeScript support with typed actions and selectors
5. **Automatic Computation**: Sort options automatically set sortBy and sortOrder

### See Also

- `filterSlice.example.tsx` - Comprehensive usage examples
- `../hooks.ts` - Typed Redux hooks
- `../store.ts` - Redux store configuration
