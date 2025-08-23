import { LoginSchema } from "./authSchema"
import * as z from 'zod'

export type LoginInputs = z.infer<typeof LoginSchema>