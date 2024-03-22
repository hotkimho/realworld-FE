// Register.tsx
import React, { useState } from 'react';
import axios from "axios";
import {ApiErrorResponse, isApiErrorResponse} from "../../types/error";
import {VerifyEmailResponse} from "../../types/auth";
import {VerifyUsername, VerifyEmail, SignUp} from "../../services/user";
import {useNavigate} from "react-router-dom";
// 필요하다면 react-router-dom에서 useNavigate를 임포트하여 페이지 이동 처리

const Register: React.FC = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
    });
    const navigate = useNavigate()

    // 중복검사 결과 상태
    const [usernameDuplicate, setUsernameDuplicate] = useState(false);
    const [emailDuplicate, setEmailDuplicate] = useState(false);

    // username, email 값 입력 여부 상태
    const [usernameInvalid, setUsernameInvalid] = useState(false);
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

        if (formData.username === '') {
            setUsernameInvalid(true)
        } else {
            setUsernameInvalid(false)
        }

        if (formData.email === '') {
            setEmailInvalid(true)
        } else {
            setEmailInvalid(false)
        }

        if (formData.password === '') {
            setPasswordInvalid(true)
        } else {
            setPasswordInvalid(false)
        }

        // username 중복검사
        try {
            if (!usernameInvalid)  {
                const response =  await VerifyUsername(formData.username);
                setUsernameDuplicate(false)
            }

        } catch (error) {
            if (isApiErrorResponse(error)) {
                if (error.error.code === 400) {
                    console.log("유저네임 유효하지않음")
                }
                if (error.error.code === 409) {
                    setUsernameDuplicate(true)
                }
            }
        }

        // email 중복검사
        try {
            if (!emailInvalid) {
                const response = await VerifyEmail(formData.email);
                setEmailDuplicate(false)
            }

        } catch (error) {
            if (isApiErrorResponse(error)) {
                if (error.error.code === 400) {
                    console.log("이메일 유효하지않음")
                }
                if (error.error.code === 409) {
                    setEmailDuplicate(true)
                }
            }
        }

        // 회원가입
        try {
            // 입력값이 유효하고 중복된 게 없는 경우
            // 이렇게 5개 갑 비교말고 좋은 방법이 있을까?
            if (!usernameInvalid && !emailInvalid && !passwordInvalid && !usernameDuplicate && !emailDuplicate) {
                const response = await SignUp(formData.email, formData.username, formData.password);
                console.log(response.user);

                navigate('/');
            }
        } catch (error) {
            if (isApiErrorResponse(error)) {
                if (error.error.code === 400) {
                    console.log("signup code 400")
                    // 회원가입 실패 로직
                } else if (error.error.code === 422) {
                    console.log("signup code 422")
                    // 중복된 유저네임 또는 이메일 로직

                }
            }
        }
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
                        {usernameDuplicate && <p className="text-red-500 text-xs mt-1">중복된 닉네임입니다.</p>}

                    </div>
                    <div>
                        <label htmlFor="email" className="text-sm font-medium text-gray-700">Email</label>
                        <input type="email" id="email" name="email" required
                               className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                               value={formData.email} onChange={handleInputChange} />
                        {emailDuplicate && <p className="text-red-500 text-xs mt-1">중복된 이메일입니다.</p>}

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
