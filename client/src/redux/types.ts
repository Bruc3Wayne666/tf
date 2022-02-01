interface UserState {
    _id: string,
    username: string,
    fullName: string,
    email: string,
    profileImage: string,
    role: string,
    gender: string,
    number: string,
    location: string,
    about: string,
    socialNetwork: string,
    followers: string[],
    following: string[],
    friends: string[],
    blockedUsers: string[],
    createdAt: string,
    updatedAt: string
}

export type AuthState = {
    msg: string,
    user: UserState,
    accessToken: string
}

export type AuthResponse = {
    data: AuthState
}

interface Login {
    email: string,
    password: string
}

interface Register extends Login{
    gender: string
}

export type SignUser = Login | Register