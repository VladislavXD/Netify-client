import { api } from "./api"

export const followApi = api.injectEndpoints({
  endpoints: builder => ({
    followUser: builder.mutation<void, { followingId: String }>({
      query: body => ({
        url: "/follow",
        method: "POST",
        body,
      }),
    }),

    unFollowUser: builder.mutation<void, String>({
      query: userId => ({
        url: `/follow/${userId}`,
        method: "DELETE",
      }),
    }),
  }),
})

export const { useFollowUserMutation, useUnFollowUserMutation } = followApi

export const {
  endpoints: { followUser, unFollowUser },
} = followApi
