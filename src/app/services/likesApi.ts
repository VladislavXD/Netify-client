import { Like } from "../types"
import { api } from "./api"

export const likesApi = api.injectEndpoints({
  endpoints: builder => ({
    LikePost: builder.mutation<Like, {postId: String}>({
      query: body => ({
        url: "/likes",
        method: "POST",
        body
      }),
    }),

    unLikePost: builder.mutation<void, String>({
      query: postId => ({
        url: `/likes/${postId}`,
        method: "DELETE",
      }),
    }),
  }),
})

export const { useLikePostMutation, useUnLikePostMutation } = likesApi

export const {
  endpoints: { LikePost, unLikePost },
} = likesApi
