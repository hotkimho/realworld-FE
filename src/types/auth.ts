export interface VerifyEmailResponse {
    email: string;
}

export interface  VerifyUsernameResponse {
    username: string;
}

export interface  SignUpResponse {
    user: {
        email: string;
        user_id: number;
        username: string;
    }
}