// Register.tsx
import React, { useState } from 'react';
import axios from "axios";
import {VerifyEmail} from "../../services/api";
import {ApiErrorResponse, isApiErrorResponse} from "../../types/error";
// 필요하다면 react-router-dom에서 useNavigate를 임포트하여 페이지 이동 처리

const Register: React.FC = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log("gogogo")
        try {
            // email 중복검사
            // 400, 409가 발생한 경우 ApiErrorResponse타입 반환
            // 200이 발생한 경우 VerifyEmailResponse 반환
            const response =  await VerifyEmail(formData.email);


            // 에러가 발생하지 않은 경우(이메일이 중복되지 않음 200)
            // // email 중복검사
            // const rr =  axios.get("http://localhost:8080/heartbeat").then((response) => {
            //     console.log(response.status);
            // })

            // 회원가입
        } catch (error) {

            console.log("qwekopqwekopqwekop : ", error)
            if (isApiErrorResponse(error)) {
                if (error.error.code === 400) {
                    console.log("이메일 유효하지않음")
                }
                if (error.error.code === 409) {
                    console.log("이메일 중복됨")
                }
            } else {
                console.log("걸리지 않음")
            }
            // error message, status 값 출력

        }
        // 성공 시, 홈페이지 또는 로그인 페이지로 리디렉션
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-200">
            <div className="p-6 bg-white rounded shadow-md w-full max-w-md">
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="username" className="text-sm font-medium text-gray-700">Username</label>
                        <input type="text" id="username" name="username" required
                               className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                               value={formData.username} onChange={handleInputChange} />
                    </div>
                    <div>
                        <label htmlFor="email" className="text-sm font-medium text-gray-700">Email</label>
                        <input type="email" id="email" name="email" required
                               className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                               value={formData.email} onChange={handleInputChange} />
                    </div>
                    <div>
                        <label htmlFor="password" className="text-sm font-medium text-gray-700">Password</label>
                        <input type="password" id="password" name="password" required
                               className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                               value={formData.password} onChange={handleInputChange} />
                    </div>
                    <div>
                        <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                            Sign Up
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Register;
