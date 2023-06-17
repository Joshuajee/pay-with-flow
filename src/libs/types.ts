import { User } from "@prisma/client"

export type StatusCode =  200 | 201 | 300 | 301 | 302 | 400| 401 | 404 | 500 | 502

export type ApiResponse = {
    status: "success" | "failed",
    statusCode: StatusCode,
    message: string,
    data: any
}

export type AuthType = Promise<{ user: User | null, nonce: string | null }>