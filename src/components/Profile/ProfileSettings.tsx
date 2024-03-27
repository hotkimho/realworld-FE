import React, { useEffect, useState } from 'react';
import {getProfile, updateProfile} from "../../services/profile";
import {getProfileType, updateProfileType} from "../../types/profile";
import {isApiErrorResponse} from "../../types/error";
import {logoutInLocalStorage} from "../../Util/auth";
import {useNavigate} from "react-router-dom";

const ProfileSettings = () => {
    const [profile, setProfile] = useState<getProfileType | null>(null);
    const [formData, setFormData] = useState<updateProfileType>({
        bio: '',
        email: '',
        password: '',
        profile_image: '',
        username: '',
    });
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch the profile data
        const fetchProfile = async () => {
            // Replace this with the actual username
            try {
                // get username in localStorage
                const username = localStorage.getItem('username');
                const response = await getProfile(username||"");
                console.log("in fetchProfile : ", response.user)
                setProfile(response);
                setFormData({
                    bio: response.user.bio,
                    email: response.user.email,
                    password: '',
                    profile_image: response.user.profile_image,
                    username: response.user.username,
                });
            } catch (error) {
                console.error('Error fetching profile:', error);
            }
        };

        fetchProfile();
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const data = await updateProfile(formData);
            // set new data in localStorage
            localStorage.setItem('username', data.user.username);
            localStorage.setItem('profile_image', data.user.profile_image);
            localStorage.setItem("email", data.user.email);
            alert("수정이 완료되었습니다")
            window.location.href = '/';
            // setTimeout(() => {
            //     navigate('/');
            // }, 1000);
            // Here you can redirect or show a success message
        } catch (error) {
            if (isApiErrorResponse(error)) {
                if (error.error.code === 400) {
                    console.error('Bad request in handleSelectTag', error)
                } else if (error.error.code === 401 || error.error.code === 403) {
                    // 인증이 유효하지 않습니다 다시 로그인해주세요 경고창과 함께 로그인 페이지로 이동
                    logoutInLocalStorage()
                    alert('인증이 유효하지 않습니다. 다시 로그인해주세요 : ' + error.error.message);
                    window.location.href = '/';

                } else {
                    console.error('Unknown error in handleSelectTag', error)
                }
            }
        }
    };

    // button click event
    const handleLogout = () => {
        // logout logic here
        logoutInLocalStorage()
        window.location.href = '/';

    }
    if (!profile) return <div>Loading...</div>;

    return (
        <div className="flex flex-col items-center">
            <h1 className="text-2xl font-bold my-4">Profile Settings</h1>
            <form onSubmit={handleSubmit} className="w-full max-w-md">
                <div className="mb-4">
                    <label htmlFor="profile_image" className="block text-sm font-medium text-gray-700">Profile Image URL</label>
                    <input type="text" id="profile_image" name="profile_image" value={formData.profile_image} onChange={handleChange} className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm bg-white text-black" placeholder="Profile image URL" />
                </div>
                <div className="mb-4">
                    <label htmlFor="bio" className="block text-sm font-medium text-gray-700">Bio</label>
                    <textarea id="bio" name="bio" value={formData.bio} onChange={handleChange} className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm bg-white text-black" rows={3} placeholder="Your bio"></textarea>
                </div>
                <div className="mb-4">
                    <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
                    <input type="text" id="username" name="username" value={formData.username} onChange={handleChange} className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm bg-white text-black" placeholder="Username" />
                </div>
                <div className="mb-4">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                    <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm bg-white text-black" placeholder="Email" />
                </div>
                <div className="mb-4">
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password (비밀번호 변경)</label>
                    <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm bg-white text-black" placeholder="New password" />
                </div>
                <button type="submit" className="w-full bg-green-500 text-white p-2 rounded-md">Update Profile</button>
            </form>
            <hr className="my-4 w-full" />
            <button className="bg-transparent" onClick={handleLogout}>
                Logout
            </button>
        </div>
    );

};

export default ProfileSettings;
