// ArticleList.tsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ArticleItem from './ArticleItem';
import { ArticleListType } from "../../types/article";
import FeedTab from "./FeedTab";
import Pagination from "./Pagination";
import {getArticles, getArticlesByTag, getMyArticles} from "../../services/article";
import PopularTag from "./PopularTag";
import {isApiErrorResponse} from "../../types/error";
import {likeArticle, unlikeArticle} from "../../services/articleLike";
import {checkTokenExpiration, logoutInLocalStorage} from "../../Util/auth";
import {RefreshToken} from "../../services/user";


const ArticleList: React.FC = () => {
    const [articles, setArticles] = useState<ArticleListType['articles']>([]);
    const [activeTab, setActiveTab] = useState<'all' | 'user'>('all');
    const [currentPage, setCurrentPage] = useState(0); // 페이지네이션을 위한 상태

    const fetchArticles = async () => {
        try {
            console.log("activeTab : ", activeTab)
            if (activeTab === 'all') {
                const response = await getArticles(currentPage + 1);
                setArticles(response.articles);
            } else {
                const response = await getMyArticles(currentPage + 1);
                console.log("my articles : ", response.articles)
                setArticles(response.articles);
            }

        } catch (error) {
            if (isApiErrorResponse(error)) {
                if (error.error.code === 400) {
                    console.error('Bad request in fetchArticles ', error)
                } else if (error.error.code === 401 || error.error.code === 403) {
                    logoutInLocalStorage()
                    alert('인증이 유효하지 않습니다. 다시 로그인해주세요 : ' + error.error.message);
                    window.location.href = '/login';
                } else {
                    console.error('Unknown error in handleSelectTag', error)
                }
            }
        }
    };

    const CheckAuthorization = async () => {
        const accessToken = localStorage.getItem('access_token');
        if (accessToken && checkTokenExpiration(accessToken)) {
            // 토큰이 만료되었을 경우 refresh token으로 재발급
            const refreshToken = localStorage.getItem('refresh_token');
            if (refreshToken && checkTokenExpiration(refreshToken)) {
                logoutInLocalStorage()
                // window.location.href = '/login';
                return;
            }

            try {
                const response = await RefreshToken(refreshToken||'');
                localStorage.setItem('access_token', response.token);
                alert("토큰이 재발급되었습니다.")
            } catch (error) {
                if (isApiErrorResponse(error)) {
                    if (error.error.code === 400) {
                        console.error('Bad request in fetchArticles ', error)
                    } else {
                        logoutInLocalStorage()
                        alert('인증이 유효하지 않습니다. 다시 로그인해주세요 : ' + error.error.message);
                        window.location.href = '/login';
                    }
                }
            }
        }
    }
    useEffect(() => {
        fetchArticles();
        CheckAuthorization();

    }, [activeTab, currentPage]);

    // 탭 변경 핸들러
    const handleTabChange = (tab: 'all' | 'user') => {
        console.log("in handleTabChange : ", tab)
        setActiveTab(tab);
        setCurrentPage(0); // 탭을 변경하면 페이지를 처음으로 리셋
    };

    const handleSelectTag = async (tag: string) => {
        try {
            const response = await getArticlesByTag(tag, currentPage); // 이 함수는 구현되어야 합니다.
            setArticles(response.articles);
        } catch (error) {
            if (isApiErrorResponse(error)) {
                if (error.error.code === 400) {
                    console.error('Bad request in handleSelectTag', error)
                } else {
                    console.error('Unknown error in handleSelectTag', error)
                }
            }
        }
    };

    const toggleFavorite = async (authorId:string, articleId: string, isFavorited: boolean) => {
        // access_token이 없을 경우 /login으로 이동
        const accessToken = localStorage.getItem('access_token');
        if (!accessToken) {
            window.location.href = '/login';
            return;
        }

        if (isFavorited) {
            await unlikeArticle(authorId , articleId);
        } else {
            await likeArticle(authorId, articleId);
        }
        // 변경사항 반영을 위한 게시글 다시 불러오기
        fetchArticles();
    };




    return (
        <div className="container mx-auto p-4">
            <div className="flex">
                <div className="flex-grow"> {/* 이 부분이 좌측 컨테이너입니다 */}
                    <FeedTab activeTab={activeTab} onTabChange={handleTabChange} />
                    {articles.map((article) => (
                        <ArticleItem
                            key={article.article_id}
                            article={article}
                            toggleFavorite={toggleFavorite}
                        />
                    ))}

                </div>
                <div className="h-2/4">
                    <PopularTag tags={['tag1', 'tag2', 'tag3', 'tag4', 'tag5', 'tag6', 'tag7']} onSelectTag={handleSelectTag} /> {/* 우측 사이드바 */}

                </div>
            </div>
            <Pagination
                pageCount={10}
                onPageChange={(selectedItem) => setCurrentPage(selectedItem.selected)}
            />
        </div>
    );
};

export default ArticleList;
