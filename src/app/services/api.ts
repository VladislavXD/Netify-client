import { createApi, fetchBaseQuery, retry } from "@reduxjs/toolkit/query/react"
import { BASE_URL } from "../../../constants"
import { RootState } from "../store"

const baseQuery = fetchBaseQuery({
  baseUrl: `${BASE_URL}/api`,
  prepareHeaders: (headers, {getState}) => {
      const token = (getState() as RootState).user.token || localStorage.getItem
      ('token')

      if (token){
          headers.set('authorization', `Bearer ${token}`)
      }
      return headers
  }
})

const baseQueryRetry = retry(baseQuery, { maxRetries: 1 })

export const api = createApi({
  reducerPath: "splitApi",
  baseQuery: baseQueryRetry,
  refetchOnMountOrArgChange: true,
  endpoints: () => ({}),
})
