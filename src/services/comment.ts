import {ArticleDetailType} from "../types/article";
import axios from "axios";
import {BASE_URL} from "../config/config";
import {ApiErrorResponse} from "../types/error";
import {CommentListType} from "../types/comment";


export const getArt2icleById = async (authorId:string, articleId:string): Promise<ArticleDetailType> => {
    try {

        // query param limit=10 추가
        const response = await axios.get<ArticleDetailType>(`${BASE_URL}/user/${authorId}/article/${articleId}`, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `${localStorage.getItem("accessToken")}`,
            },
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

// get CommentList By ArticleId
export const getCommentListByArticleId = async (authorId:string, articleId: string): Promise<CommentListType> => {
    try {
        const response = await axios.get<CommentListType>(`${BASE_URL}/user/${authorId}/article/${articleId}/comments`, {
            headers: {
                "Content-Type": "application/json",
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