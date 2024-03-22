import {BASE_URL} from "../config/config";
import {SignUpResponse, VerifyEmailResponse, VerifyUsernameResponse} from "../types/auth";
import {ApiErrorResponse} from "../types/error";
import axios from "axios";


// 이메일 중복 검사
export const VerifyEmail = async (email: string): Promise<VerifyEmailResponse> => {
    try {
        const response = await axios.post<VerifyEmailResponse>(`${BASE_URL}/user/verify-email`, {email},{
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

// username 중복검사
export const VerifyUsername = async (username: string): Promise<VerifyUsernameResponse> => {
    try {
        const response = await axios.post<VerifyUsernameResponse>(`${BASE_URL}/user/verify-username`, {username},{
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

// 회원가입
export const SignUp = async (email: string, username: string, password: string): Promise<SignUpResponse> => {
    try {
        const response = await axios.post<SignUpResponse>(`${BASE_URL}/user/signup`, {email, username, password},{
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