import {ArticleListType} from "../types/article";
import axios from "axios";
import {BASE_URL} from "../config/config";
import {ApiErrorResponse} from "../types/error";
import {PresignedUrlType} from "../types/s3Service";

export const getPresignedUrl = async (authorId: string, key: string): Promise<PresignedUrlType> => {
    try {
        // query param limit=10 추가
        const response = await axios.get<PresignedUrlType>(`${BASE_URL}/user/${authorId}/article/upload`, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            },
            params: {
                filename: key
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