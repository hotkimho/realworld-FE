import {SignInResponse} from "../types/auth";
import axios from "axios";
import {BASE_URL} from "../config/config";
import {ApiErrorResponse} from "../types/error";
import {ArticleListType} from "../types/article";



export const getArticles = async (offset: number): Promise<ArticleListType> => {
    try {
        console.log("offset : ", offset)
        // query param limit=10 추가
        const response = await axios.get<ArticleListType>(`${BASE_URL}/articles`, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `${localStorage.getItem("accessToken")}`,
            },
            params: {
                limit: 10,
                page: offset,
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

// getarticle by tag
export const getArticlesByTag = async (tag: string, offset: number): Promise<ArticleListType> => {
    try {
        console.log("in getArticlesByTag : ", offset)
        // query param limit=10 추가
        const response = await axios.get<ArticleListType>(`${BASE_URL}/articles/tag`, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `${localStorage.getItem("accessToken")}`,
            },
            params: {
                limit: 10,
                page: offset,
                tag: tag,
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