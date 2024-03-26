import axios from "axios";
import {BASE_URL} from "../config/config";
import {ApiErrorResponse} from "../types/error";


export const likeAr2ticle = async (authorId:string, articleId: string): Promise<void> => {
    try {

        const response = await axios.post<void>(`${BASE_URL}/user/${authorId}/article/${articleId}/like`,
            {},{
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `${localStorage.getItem("access_token")}`,
                }
            });

        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            throw {
                error: {
                    code: error.response?.data.error.code,
                    message: error.response?.data.error.message,
                }
            } as ApiErrorResponse;
        }

        throw new Error("알 수 없는 에러가 발생했습니다.")
    }
}

// follow user
// /user/follow/{followed_id}
export const followUser = async (followedId: string): Promise<void> => {
    try {
        const response = await axios.post<void>(`${BASE_URL}/user/follow/${followedId}`, {}, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `${localStorage.getItem("access_token")}`,
            }
        });

        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            throw {
                error: {
                    code: error.response?.data.error.code,
                    message: error.response?.data.error.message,
                }
            } as ApiErrorResponse;
        }

        throw new Error("알 수 없는 에러가 발생했습니다.")
    }
}

// unfollow user
// /user/unfollow/{followed_id}
export const unfollowUser = async (followedId: string): Promise<void> => {
    try {
        const response = await axios.delete<void>(`${BASE_URL}/user/follow/${followedId}`, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `${localStorage.getItem("access_token")}`,
            }
        });

        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            throw {
                error: {
                    code: error.response?.data.error.code,
                    message: error.response?.data.error.message,
                }
            } as ApiErrorResponse;
        }

        throw new Error("알 수 없는 에러가 발생했습니다.")
    }
}