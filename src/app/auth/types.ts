export type JwtPayload = {
    email: string,
    userId: string
}

export type JwtPayloadwithRefreshtoken = JwtPayload & {
    refreshToken: string
}
