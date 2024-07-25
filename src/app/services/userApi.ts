import { User } from "../types";
import { api } from "./api";

export const userApi = api.injectEndpoints({
    endpoints: (builder)=> ({
        login: builder.mutation<
            {token: string},
            {email: string; password: string}
        >({
            query: (userData) => ({
                url: '/login',
                method: 'POST',
                body: userData
            })
        }),

        register: builder.mutation<
            {email: string; password: string; name: string},
            {email: string; password: string; name: string}
        >({
            query: (userData)=> ({
                url: '/register',
                method: 'POST',
                body: userData,
            })
        }),

        current: builder.query<User, void>({
            query: ()=> ({
                url: '/current',
                method: 'GET'
            })
        }),

        getUserById: builder.query<User, string>({
            query: (id)=> ({
                url: `/user/${id}`,
                method: 'GET'
            })
        }),

        updateUser: builder.mutation<User, {userData: FormData, id: string}>({
            query: ({userData, id})=> ({
                url: `/user/${id}`,
                method: 'PUT',
                body: userData
            })
        })
        



    })
})

export const {
    useRegisterMutation,
    useLoginMutation,
    useCurrentQuery,
    useLazyCurrentQuery,
    useGetUserByIdQuery,
    useUpdateUserMutation,
    useLazyGetUserByIdQuery
} = userApi

export const {
    endpoints: {login, register, current, getUserById, updateUser}
} = userApi