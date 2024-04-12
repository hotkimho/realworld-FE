import React, { useEffect, useState } from 'react';
import {Link, useNavigate, useParams} from 'react-router-dom';
import { getProfile } from "../../services/profile";
import { getProfileType } from "../../types/profile";
import { getArticlesByAuthor } from "../../services/article";
import {ArticleItemType, ArticleListType} from "../../types/article";
import ArticleItem from "../Article/ArticleItem";
import {likeArticle, unlikeArticle} from "../../services/articleLike";
import {followUser, unfollowUser} from "../../services/follow";
import {isApiErrorResponse} from "../../types/error";
import {logoutInLocalStorage} from "../../Util/auth";


const ProfilePage: React.FC = () => {
    const [profile, setProfile] = useState<getProfileType | null>(null);
    const [articles, setArticles] = useState<ArticleListType['articles']>([]);
    const { username, articleId } = useParams<{ username: string; articleId: string }>();
    const [isFollowing, setIsFollowing] = useState<boolean>(false);

    const navigate = useNavigate();
    const isLoggedIn = !!localStorage.getItem('access_token');
    const loggedInUsername = localStorage.getItem('username');
    const isOwnProfile = username === loggedInUsername;

    let authorId:string;

    useEffect(() => {
        fetchProfile();
        fetchArticlesByAuthor();
    }, [username]);

    const fetchArticlesByAuthor = async () => {
        if (!username || !articleId) return;
        try {
            const articlesData = await getArticlesByAuthor(articleId);
            setArticles(articlesData.articles);
        } catch (error) {
            if (isApiErrorResponse(error)) {
                if (error.error.code === 400) {
                    console.error('Bad request in handleSelectTag', error)
                } else if (error.error.code === 401 || error.error.code === 403) {
                    // 인증이 유효하지 않습니다 다시 로그인해주세요 경고창과 함께 로그인 페이지로 이동
                    logoutInLocalStorage()
                    alert('인증이 유효하지 않습니다. 다시 로그인해주세요 : ' + error.error.message);
                    window.location.href = '/login';
                } else {
                    console.error('Unknown error in handleSelectTag', error)
                }
            }
        }
    };

    const fetchProfile = async () => {
        if (!username) return;
        try {
            const profileData = await getProfile(username);
            console.log("profileData2222", profileData)
            setProfile(profileData);
            setIsFollowing(profileData.user.following);
            // authorId = profileData.user.userId;
        } catch (error) {
            if (isApiErrorResponse(error)) {
                if (error.error.code === 400) {
                    console.error('Bad request in handleSelectTag', error)
                } else if (error.error.code === 401 || error.error.code === 403) {
                    // 인증이 유효하지 않습니다 다시 로그인해주세요 경고창과 함께 로그인 페이지로 이동
                    logoutInLocalStorage()
                    alert('인증이 유효하지 않습니다. 다시 로그인해주세요 : ' + error.error.message);
                    window.location.href = '/login';
                } else {
                    console.error('Unknown error in handleSelectTag', error)
                }
            }
        }
    };


    const handleFollowButtonClick = async () => {
        if (!isLoggedIn) {
            navigate("/login");
        } else {
            if (isFollowing) {
                await unfollowUser(profile?.user.user_id || '');
            } else {
                await followUser(profile?.user.user_id || '');
            }
            setIsFollowing(!isFollowing);
            fetchProfile();
        }
    };


    const toggleFavorite = async (authorId:string, articleId: string, isFavorited: boolean) => {
        if (isFavorited) {
            await unlikeArticle(authorId , articleId);
        } else {
            await likeArticle(authorId, articleId);
        }
        // 변경사항 반영을 위한 게시글 다시 불러오기
        fetchArticlesByAuthor();
    };
    if (!profile) return <div>Loading...</div>;
    return (
        <div>
            <div className="bg-gray-200 w-full">
                <div className="flex justify-center">
                    <div className="w-full max-w-4xl p-8 rounded-lg flex flex-col items-center text-center">
                        <img src={profile.user.profile_image || 'https://static.productionready.io/images/smiley-cyrus.jpg'} alt="Profile" className="h-24 w-24 rounded-full object-cover mb-4"/>
                        <h2 className="text-xl font-semibold mb-2">{profile.user.username}</h2>
                        <p className="text-gray-700 mb-4">{profile.user.bio}</p>
                        {
                            isOwnProfile ? (
                                <Link to="/profile" className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 transition duration-150 ease-in-out">Edit Profile</Link>
                            ) : (
                                <button
                                    className={`px-6 py-2 rounded transition duration-150 ease-in-out ${isFollowing ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'} text-white`}
                                    onClick={handleFollowButtonClick}
                                >
                                    {isFollowing ? 'Unfollow' : 'Follow'}
                                </button>
                            )
                        }

                    </div>
                </div>
            </div>
            <div className="container mx-auto p-4">
                {articles.map((article: ArticleItemType) => (
                    <ArticleItem
                        key={article.article_id}
                        article={article}
                        toggleFavorite={toggleFavorite}
                    />
                ))}
            </div>
        </div>
    );
};

export default ProfilePage;
