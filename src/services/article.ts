import {SignInResponse} from "../types/auth";
import axios from "axios";
import {BASE_URL} from "../config/config";
import {ApiErrorResponse} from "../types/error";
import {
    ArticleAuthorType,
    ArticleCreateType,
    ArticleDetailType,
    ArticleListType,
    ArticlePopularTagType
} from "../types/article";



export const getArticles = async (offset: number): Promise<ArticleListType> => {
    try {
        // query param limit=10 추가
        const response = await axios.get<ArticleListType>(`${BASE_URL}/articles`, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("access_token")}`,
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


export const getMyArticles = async (offset: number): Promise<ArticleListType> => {
    try {
        // query param limit=10 추가
        const response = await axios.get<ArticleListType>(`${BASE_URL}/my/articles`, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("access_token")}`,
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
    try {// query param limit=10 추가
        const response = await axios.get<ArticleListType>(`${BASE_URL}/articles/tag`, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("access_token")}`,
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

        const response = await axios.get<ArticleDetailType>(`${BASE_URL}/user/${authorId}/article/${articleId}`, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("access_token")}`,
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

// article 수정 api
export const updateArticle = async (articleId:string, request:ArticleCreateType): Promise<ArticleDetailType> => {
    try {
        console.log(request)
        const response = await axios.put<ArticleDetailType>(`${BASE_URL}/article/${articleId}`, {
            "title": request.title,
            "description": request.description,
            "body": request.body,
            "tag_list": request.tag_list,
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

// article 삭제 api
export const deleteArticle = async (articleId:string): Promise<ArticleDetailType> => {
    try {
        const response = await axios.delete<ArticleDetailType>(`${BASE_URL}/article/${articleId}`, {
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

// author가 작성한 글 목록 리스트 조회
export const getArticlesByAuthor = async (authorId:string): Promise<ArticleAuthorType> => {
    try {
        const response = await axios.get<ArticleAuthorType>(`${BASE_URL}/user/${authorId}/articles`, {
            params: {
                limit: 1000, // 작성글 목록은 임시로 모든걸 조회
                page: 1,
            },
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("access_token")}`,
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

// author가 작성한 글에 좋아요누른 글 목록 리스트 조회
export const getFavoritedArticlesByAuthor = async (authorId:string): Promise<ArticleAuthorType> => {
    try {
        const response = await axios.get<ArticleAuthorType>(`${BASE_URL}/user/${authorId}/articles/like`, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("access_token")}`,
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


// author가 작성한 글에 좋아요누른 글 목록 리스트 조회
export const getPopularTags = async (): Promise<ArticlePopularTagType> => {
    try {
        const response = await axios.get<ArticlePopularTagType>(`${BASE_URL}/popular/tags`, {
            headers: {
                "Content-Type": "application/json"
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