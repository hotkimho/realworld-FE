// Login.tsx
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {SignIn} from "../../services/user";

const Login: React.FC = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const [loginError, setLoginError] = useState(false); // 로그인 에러 상태
    const navigate = useNavigate() ;

    const [emailInvalid, setEmailInvalid] = useState(false);
    const [passwordInvalid, setPasswordInvalid] = useState(false);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoginError(false); // 폼 제출 시 로그인 에러 상태 초기화

        if (formData.email === '') {
            setEmailInvalid(true);
        } else {
            setEmailInvalid(false);
        }

        if (formData.password === '') {
            setPasswordInvalid(true);
        } else {
            setPasswordInvalid(false);
        }

        try {
            // 로그인 API 호출 (예시 URL 및 메소드)
            const response = await SignIn(formData.email, formData.password);
            // 로그인 성공: 토큰 저장, 홈 페이지로 리디렉션 등의 처리
            localStorage.setItem('access_token', response.user.access_token);
            localStorage.setItem('refresh_token', response.user.refresh_token);
            localStorage.setItem('user_id', String(response.user.user_id));
            localStorage.setItem('username', response.user.username);

            window.dispatchEvent(new Event('loginSuccess'));

            navigate('/'); // 홈 페이지로 리디렉션
        } catch (error) {
            console.error('Login error', error);
            setLoginError(true); // 로그인 실패 시 에러 상태 업데이트
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-200">
            <div className="p-6 bg-white rounded shadow-md w-full max-w-md">
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="email" className="text-sm font-medium text-gray-700">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            required
                            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                            value={formData.email}
                            onChange={handleInputChange}
                        />
                        {emailInvalid && <p className="text-red-500 text-xs mt-1">중복된 닉네임입니다.</p>}

                    </div>
                    <div>
                        <label htmlFor="password" className="text-sm font-medium text-gray-700">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            required
                            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                            value={formData.password}
                            onChange={handleInputChange}
                        />
                        {passwordInvalid && <p className="text-red-500 text-xs mt-1">중복된 닉네임입니다.</p>}

                    </div>
                    {loginError && <p className="text-red-500 text-xs mt-2">Email 또는 비밀번호가 올바르지 않습니다.</p>}
                    <div>
                        <button
                            type="submit"
                            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Sign In
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
