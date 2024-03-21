import {BASE_URL} from "../config/config";
import {VerifyEmailResponse} from "../types/auth";
import {ApiErrorResponse} from "../types/error";
import axios from "axios";


// 이메일 중복 검사
export const VerifyEmail = async (email: string): Promise<VerifyEmailResponse | ApiErrorResponse> => {
    try {
        const response = await axios.post<VerifyEmailResponse>(`${BASE_URL}/user/verify-email`, {email});
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}