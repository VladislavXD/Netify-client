import type { Action, ThunkAction } from "@reduxjs/toolkit"
import { combineSlices, configureStore } from "@reduxjs/toolkit"
import { setupListeners } from "@reduxjs/toolkit/query"
import { api } from "./services/api"
import user from '../features/user/UserSlice'
import { listenerMiddleware } from "../middleware/auth"






  export const store = configureStore({
    reducer: {
      [api.reducerPath] : api.reducer,
      user
    },

    middleware: (getDefauldMiddleWare) => {
      return getDefauldMiddleWare()
      .concat(api.middleware)
      .prepend(listenerMiddleware.middleware)
    }
    
  })




// Infer the type of `store`
export type AppStore = typeof store
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = AppStore["dispatch"]
export type AppThunk<ThunkReturnType = void> = ThunkAction<
  ThunkReturnType,
  RootState,
  unknown,
  Action
>
