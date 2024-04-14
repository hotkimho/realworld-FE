import {ArticleDetailType} from "../types/article";
import axios from "axios";
import {BASE_URL} from "../config/config";
import {ApiErrorResponse} from "../types/error";
import {CommentCreateType, CommentListType, CommentUpdateType} from "../types/comment";

// create Comment
export const createComment = async (authorId: string, articleId: string, body: string): Promise<CommentCreateType> => {
    try {
        const response = await axios.post<CommentCreateType>(`${BASE_URL}/user/${authorId}/article/${articleId}/comment`, {
            body,
        }, {
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

// update Comment
export const updateComment = async (authorId: string, articleId: string, commentId: string, body: string): Promise<CommentUpdateType> => {
    try {
        const response = await axios.put<CommentUpdateType>(`${BASE_URL}/user/${authorId}/article/${articleId}/comment/${commentId}`, {
            body,
        }, {
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

// delete Comment
export const deleteComment = async (authorId: string, articleId: string, commentId: string): Promise<CommentUpdateType> => {
    try {
        const response = await axios.delete<CommentUpdateType>(`${BASE_URL}/user/${authorId}/article/${articleId}/comment/${commentId}`, {
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