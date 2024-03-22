export interface VerifyEmailResponse {
    email: string;
}

export interface VerifyUsernameResponse {
    username: string;
}

export interface SignUpResponse {
    user: {
        email: string;
        user_id: number;
        username: string;
        profile_image?: string;
    }
}

export interface SignInResponse {
    user: {
        access_token: string;
        refresh_token: string;
        user_id: number;
        username: string;
    }
}