// ArticleList.tsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ArticleItem from './ArticleItem';
import { ArticleListType } from "../../types/article";
import FeedTab from "./FeedTab";
import Pagination from "./Pagination";
import {getArticles, getArticlesByTag} from "../../services/article";
import PopularTag from "./PopularTag";


const ArticleList: React.FC = () => {
    const [articles, setArticles] = useState<ArticleListType['articles']>([]);
    const [activeTab, setActiveTab] = useState<'all' | 'user'>('all');
    const [currentPage, setCurrentPage] = useState(0); // 페이지네이션을 위한 상태

    useEffect(() => {
        const fetchArticles = async () => {
            console.log("in fetchArticles : ", activeTab, currentPage)
            const response = await getArticles(currentPage + 1);
            console.log("get articles response : ", response.articles)
            setArticles(response.articles);
        };

        console.log("in useEffect : ", activeTab, currentPage)
        fetchArticles();
    }, [activeTab, currentPage]);

    // 탭 변경 핸들러
    const handleTabChange = (tab: 'all' | 'user') => {
        console.log("in handleTabChange : ", tab)
        setActiveTab(tab);
        setCurrentPage(0); // 탭을 변경하면 페이지를 처음으로 리셋
    };

    const handleSelectTag = async (tag: string) => {
        // 태그에 따른 글 목록을 불러오는 API 호출
        const response = await getArticlesByTag(tag, currentPage); // 이 함수는 구현되어야 합니다.
        setArticles(response.articles);
    };

    return (
        <div className="container mx-auto p-4">
            <div className="flex">
                <div className="flex-grow"> {/* 이 부분이 좌측 컨테이너입니다 */}
                    <FeedTab activeTab={activeTab} onTabChange={handleTabChange} />
                    {articles.map((article) => (
                        <ArticleItem key={article.article_id} article={article} />
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
