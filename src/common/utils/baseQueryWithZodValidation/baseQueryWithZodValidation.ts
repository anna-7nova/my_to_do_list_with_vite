import { setAppErrorAC } from '@/app/app-slice'
import { BaseQueryFn, FetchArgs, FetchBaseQueryError, FetchBaseQueryMeta } from '@reduxjs/toolkit/query/react'
import * as z from 'zod'

type TBaseQuery = BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError,
  { dataSchema?: z.ZodType },
  FetchBaseQueryMeta
>

//high order function that wraps a base query function with additional functionality for data validation using Zod

export const baseQueryWithZodValidation: (baseQuery: TBaseQuery) => TBaseQuery =
  (baseQuery: TBaseQuery) => async (args, api, extraOptions) => {
    const resultValue = await baseQuery(args, api, extraOptions)

    const zodSchema = extraOptions?.dataSchema

    const { data } = resultValue

    if (data && zodSchema) {
      try {
        zodSchema.parse(data)
      } catch (error) {
        if (error instanceof z.ZodError) {
          console.table(error.issues)
          api.dispatch(setAppErrorAC({ error: 'Zod error. Смотри консоль' }))
        } else {
          throw error
        }
      }
    }
    return resultValue
  }
