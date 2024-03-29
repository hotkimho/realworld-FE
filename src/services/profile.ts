
// get profile
import {getProfileType, updateProfileType} from "../types/profile";
import {BASE_URL} from "../config/config";
import axios from "axios";
import {ApiErrorResponse} from "../types/error";

export const getProfile = async (username: string): Promise<getProfileType> => {
    try {
        const response = await axios.get<getProfileType>(`${BASE_URL}/profile`, {
            params: {
                username: username
            },
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("access_token")}`,
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

// update profile
export const updateProfile = async (request:updateProfileType): Promise<getProfileType> => {
    try {
        const response = await axios.put<getProfileType>(`${BASE_URL}/profile`,
            {
                "bio": request.bio,
                "email": request.email,
                "password": request.password,
                "profile_image": request.profile_image,
                "username": request.username
            }
            , {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("access_token")}`,
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