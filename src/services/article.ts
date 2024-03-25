import {SignInResponse} from "../types/auth";
import axios from "axios";
import {BASE_URL} from "../config/config";
import {ApiErrorResponse} from "../types/error";
import {ArticleCreateType, ArticleDetailType, ArticleListType} from "../types/article";



export const getArticles = async (offset: number): Promise<ArticleListType> => {
    try {
        console.log("offset : ", offset)
        // query param limit=10 추가
        const response = await axios.get<ArticleListType>(`${BASE_URL}/articles`, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `${localStorage.getItem("access_token")}`,
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
                Authorization: `${localStorage.getItem("access_token")}`,
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


export const getArticleById = async (authorId:string, articleId:string): Promise<ArticleDetailType> => {
    try {

        // query param limit=10 추가
        const response = await axios.get<ArticleDetailType>(`${BASE_URL}/user/${authorId}/article/${articleId}`, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `${localStorage.getItem("access_token")}`,
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


    // article 생성 api

export const createArticle = async (request:ArticleCreateType): Promise<ArticleDetailType> => {
    try {

        const response = await axios.post<ArticleDetailType>(`${BASE_URL}/article`, {
            "title": request.title,
            "description": request.description,
            "body": request.body,
            "tag_list": request.tag_list,
        }, {
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

// article 수정 api
export const updateArticle = async (articleId:string, request:ArticleCreateType): Promise<ArticleDetailType> => {
    try {
        const response = await axios.put<ArticleDetailType>(`${BASE_URL}/article/${articleId}`, {
            "title": request.title,
            "description": request.description,
            "body": request.body,
            "tag_list": request.tag_list,
        }, {
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

// article 삭제 api
export const deleteArticle = async (articleId:string): Promise<ArticleDetailType> => {
    try {
        const response = await axios.delete<ArticleDetailType>(`${BASE_URL}/article/${articleId}`, {
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