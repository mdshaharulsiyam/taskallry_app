# RTK Query Setup

This folder contains the Redux Toolkit Query configuration for TaskAlley.

## Structure

```
redux/
├── baseApi.ts          # Base API configuration with fetchBaseQuery
├── store.ts            # Redux store configuration
├── hooks.ts            # Typed Redux hooks
└── apis/               # API endpoint slices
    ├── authApi.ts      # Authentication endpoints
    └── taskApi.ts      # Task management endpoints
```

## Usage

### 1. Using Query Hooks in Components

```tsx
import { useGetTasksQuery } from "../redux/apis/taskApi";

function TaskList() {
  const { data: tasks, isLoading, error } = useGetTasksQuery();

  if (isLoading) return <ActivityIndicator />;
  if (error) return <Text>Error loading tasks</Text>;

  return (
    <FlatList
      data={tasks}
      renderItem={({ item }) => <TaskCard task={item} />}
    />
  );
}
```

### 2. Using Mutation Hooks

```tsx
import { useLoginMutation } from "../redux/apis/authApi";

function LoginScreen() {
  const [login, { isLoading, error }] = useLoginMutation();

  const handleLogin = async () => {
    try {
      const result = await login({ email, password }).unwrap();
      // Handle successful login
      console.log("Token:", result.token);
    } catch (err) {
      // Handle error
      console.error("Login failed:", err);
    }
  };

  return <Button onPress={handleLogin} disabled={isLoading} />;
}
```

### 3. Creating New API Endpoints

Add new endpoints to existing API files or create new ones:

```tsx
// src/redux/apis/profileApi.ts
import { baseApi } from "../baseApi";

export const profileApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getProfile: builder.query<Profile, string>({
      query: (userId) => `/profile/${userId}`,
      providesTags: ["Profile"],
    }),
    updateProfile: builder.mutation<Profile, UpdateProfileRequest>({
      query: (data) => ({
        url: "/profile",
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Profile"],
    }),
  }),
});

export const { useGetProfileQuery, useUpdateProfileMutation } = profileApi;
```

## Configuration

### Base URL

Update the `baseUrl` in `baseApi.ts`:

```tsx
baseUrl: "https://your-api-base-url.com/api";
```

### Authentication Headers

Add auth token to requests in `baseApi.ts`:

```tsx
prepareHeaders: (headers, { getState }) => {
  const token = (getState() as RootState).auth?.token;
  if (token) {
    headers.set("authorization", `Bearer ${token}`);
  }
  return headers;
};
```

## Cache Invalidation

RTK Query uses tags for automatic cache invalidation:

- **providesTags**: Defines which cache entries a query provides
- **invalidatesTags**: Defines which cache entries a mutation invalidates

Example:

```tsx
getTasks: builder.query({
  query: () => "/tasks",
  providesTags: ["Task"], // This query provides Task cache
}),
createTask: builder.mutation({
  query: (task) => ({ url: "/tasks", method: "POST", body: task }),
  invalidatesTags: ["Task"], // This mutation invalidates Task cache
}),
```

## Error Handling

```tsx
const { data, error, isError } = useGetTasksQuery();

if (isError) {
  if ("status" in error) {
    // FetchBaseQueryError
    const errMsg = "error" in error ? error.error : JSON.stringify(error.data);
    console.error("API Error:", errMsg);
  } else {
    // SerializedError
    console.error("Error:", error.message);
  }
}
```

## Polling & Refetching

```tsx
// Polling every 5 seconds
const { data } = useGetTasksQuery(undefined, {
  pollingInterval: 5000,
});

// Manual refetch
const { refetch } = useGetTasksQuery();
<Button onPress={refetch} title="Refresh" />;
```

## Optimistic Updates

```tsx
updateTask: builder.mutation({
  query: ({ id, ...patch }) => ({
    url: `/tasks/${id}`,
    method: "PATCH",
    body: patch,
  }),
  async onQueryStarted({ id, ...patch }, { dispatch, queryFulfilled }) {
    const patchResult = dispatch(
      taskApi.util.updateQueryData('getTasks', undefined, (draft) => {
        const task = draft.find((t) => t.id === id);
        if (task) Object.assign(task, patch);
      })
    );
    try {
      await queryFulfilled;
    } catch {
      patchResult.undo();
    }
  },
}),
```
