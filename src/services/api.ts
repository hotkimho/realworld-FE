import {BASE_URL} from "../config/config";
import {VerifyEmailResponse} from "../types/auth";
import {ApiErrorResponse} from "../types/error";
import axios from "axios";


// 이메일 중복 검사
export const VerifyEmail = async (email: string): Promise<VerifyEmailResponse> => {
    try {
        const response = await axios.post<VerifyEmailResponse>(`http://localhost:8080/user/verify-email`, {email},{
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