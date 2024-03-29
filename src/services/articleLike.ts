
// article like
import axios from "axios";
import {ArticleDetailType} from "../types/article";
import {BASE_URL} from "../config/config";
import {ApiErrorResponse} from "../types/error";

export const likeArticle = async (authorId:string, articleId: string): Promise<void> => {
    try {

        const response = await axios.post<void>(`${BASE_URL}/user/${authorId}/article/${articleId}/like`,
            {},{
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

// unlike article
export const unlikeArticle = async (authorId:string, articleId: string): Promise<void> => {
    try {
        const response = await axios.delete<void>(`${BASE_URL}/user/${authorId}/article/${articleId}/like`, {
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