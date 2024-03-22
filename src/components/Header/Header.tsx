// Header.tsx

import {Link} from "react-router-dom";
import {useEffect, useState} from "react";

const Header: React.FC = () => {
    const [isLogin, setIsLogin] = useState(false);
    const username = localStorage.getItem('username');
    const profileImage = localStorage.getItem('profile_image');

    useEffect(() => {
        // 로그인 상태 확인
        const checkLoginStatus = () => {
            setIsLogin(!!localStorage.getItem('access_token'));
        };

        // 이벤트 리스너 등록
        window.addEventListener('loginSuccess', checkLoginStatus);

        // 초기 로그인 상태 확인
        checkLoginStatus();

        // 컴포넌트가 언마운트 될 때 이벤트 리스너 해제
        return () => {
            window.removeEventListener('loginSuccess', checkLoginStatus);
        };
    }, []);

    return (
        <nav className="bg-gray-800 text-white p-4">
            <div className="container mx-auto flex justify-between items-center">
                <Link to="/" className="flex items-center">
                    <span className="font-semibold text-xl tracking-tight">Conduit</span>
                </Link>

                <div className="flex items-center gap-4">
                    <Link to="/" className="btn btn-ghost btn-sm rounded-btn">
                        Home
                    </Link>

                    {isLogin ? (
                        <>
                            <Link to="/editor" className="btn btn-ghost btn-sm rounded-btn">
                                New Article
                            </Link>
                            <Link to="/settings" className="btn btn-ghost btn-sm rounded-btn">
                                Settings
                            </Link>
                            <Link to={`/profile/${username}`} className="flex items-center gap-2">
                                {profileImage && (
                                    <img src={profileImage} alt="Profile" className="h-8 w-8 rounded-full" />
                                )}
                                <span>{username}</span>
                            </Link>
                        </>
                    ) : (
                        <>
                            <Link to="/login" className="btn btn-ghost btn-sm rounded-btn">
                                Sign In
                            </Link>
                            <Link to="/register" className="btn btn-ghost btn-sm rounded-btn">
                                Sign Up
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Header;
