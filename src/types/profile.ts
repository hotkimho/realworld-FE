

/*
{
  "user": {
    "bio": "string",
    "following": true,
    "profile_image": "string",
    "username": "string"
  }
}
 */
export interface getProfileType {
    user: {
        bio: string;
        following: boolean;
        profile_image: string;
        username: string;
        profile_image_url: string;
    }
}