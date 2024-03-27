// ArticleList.tsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ArticleItem from './ArticleItem';
import { ArticleListType } from "../../types/article";
import FeedTab from "./FeedTab";
import Pagination from "./Pagination";
import {getArticles, getArticlesByTag} from "../../services/article";
import PopularTag from "./PopularTag";
import {isApiErrorResponse} from "../../types/error";
import {likeArticle, unlikeArticle} from "../../services/articleLike";


const ArticleList: React.FC = () => {
    const [articles, setArticles] = useState<ArticleListType['articles']>([]);
    const [activeTab, setActiveTab] = useState<'all' | 'user'>('all');
    const [currentPage, setCurrentPage] = useState(0); // 페이지네이션을 위한 상태

    const fetchArticles = async () => {
        try {
            const response = await getArticles(currentPage + 1);
            setArticles(response.articles);
            console.log("in fetchArticles : ", response.articles)
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
    useEffect(() => {
        fetchArticles();
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
