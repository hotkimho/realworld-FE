export interface getProfileType {
    user: {
        bio: string;
        following: boolean;
        profile_image: string;
        username: string;
        email: string;
        user_id: string;
    }
}

export interface updateProfileType {
    bio: string;
    email: string;
    password: string;
    profile_image: string;
    username: string;
}