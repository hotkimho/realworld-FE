// ArticleView.tsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

import { ArticleDetailType } from "../../types/article";
import CommentForm from "../Comment/CommentForm";
import CommentList from "../Comment/CommentList";
import {getArticleById} from "../../services/article";
import {isApiErrorResponse} from "../../types/error";

const BASE_URL = 'http://your-api-base-url.com';

const ArticleView: React.FC = () => {

    const [article, setArticle] = useState<ArticleDetailType['article'] | null>(null);
    const { authorId,articleId } = useParams<{
        authorId: string;
        articleId: string;
    }>();
    const isLoggedIn = !!localStorage.getItem('access_token');


    useEffect(() => {
        fetchArticle();
    }, [articleId, authorId]);



    const fetchArticle = async () => {
        if (authorId === undefined || articleId === undefined) {
            return <div>Invalid URL</div>
        }

        try {
            const response = await getArticleById(authorId, articleId);
            console.error('response', response.article)
            setArticle(response.article);
        } catch (error) {
            if (isApiErrorResponse(error)) {
                if (error.error.code === 400) {
                    console.error('Bad request in handleSelectTag', error)
                } else {
                    console.error('Unknown error in handleSelectTag', error)
                }
            }
            return <div>Error</div>
        }
    };


    // fetchArticle();


    const onCommentPosted = () => {
        // 예시: 댓글이 추가된 후 댓글 리스트를 새로고침하기 위해 fetchArticle을 호출
        fetchArticle();
    };

    if (!article) return <div>Loading...</div>;
    return (
        <div className="overflow-auto">
            {/* 배너 */}
            {/*<div className="bg-slate-700 text-white py-10 px-4">*/}
            {/*    <div className="container mx-auto">*/}
            {/*        <h1 className="text-3xl font-bold">{article.title}</h1>*/}
            {/*        <div className="flex items-center mt-4">*/}
            {/*            {article.author.profile_image ? (*/}
            {/*                <img src={article.author.profile_image} alt="Profile" className="w-10 h-10 rounded-full mr-4" />*/}
            {/*            ) : (*/}
            {/*                <div className="w-10 h-10 bg-gray-400 rounded-full mr-4"></div>*/}
            {/*            )}*/}
            {/*            <div>*/}
            {/*                <span className="font-bold">{article.author.username}</span>*/}
            {/*                <span className="ml-4 text-sm">{new Date(article.created_at).toLocaleDateString()}</span>*/}
            {/*            </div>*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/*</div>*/}

            <div className="bg-slate-700 text-white py-10 px-4">
                <div className="container mx-auto flex justify-between items-center">
                    <div className="flex items-center"> {/* 작성자 정보 및 버튼을 담는 컨테이너 */}
                        {article.author.profile_image ? (
                            <img src={article.author.profile_image} alt="Profile" className="w-10 h-10 rounded-full mr-4" />
                        ) : (
                            <div className="w-10 h-10 bg-gray-400 rounded-full mr-4"></div>
                        )}
                        <div>
                            <h1 className="text-3xl font-bold mr-4">{article.title}</h1>
                            <span className="font-bold">{article.author.username}</span>
                            <span className="ml-4 text-sm">{new Date(article.created_at).toLocaleDateString()}</span>
                        </div>
                        {/* Follow Button */}
                        <button className={`ml-3 mt-7 px-3 py-1 text-sm rounded-full border ${
                            article.author.following ? 'bg-green-500 text-white' : 'text-green-500 border-green-500'
                        } hover:bg-green-500 hover:text-white transition-colors duration-300`}>
                            Follow
                        </button>

                        {/* Favorite Button */}
                        <button className={`ml-4 mt-7 px-3 py-1 text-sm rounded-full border ${
                            article.is_favorited ? 'bg-green-500 text-white' : 'text-green-500 border-green-500'
                        } hover:bg-green-500 hover:text-white transition-colors duration-300`}>
                            ♥ {article.favorite_count}
                        </button>
                    </div>
                </div>
            </div>

            {/* 본문 */}
            <div className="container mx-auto py-6 px-4">
                <p className="my-4 whitespace-pre-line">{article.body}</p>
                <div className="flex flex-wrap my-4">
                    {article.tag_list?.map((tag, index) => (
                        <span key={index} className="bg-gray-200 text-gray-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded-full">
                        {tag}
                    </span>
                    ))}
                </div>

            </div>
            <hr className="my-4" />
            {isLoggedIn && <CommentForm articleId={articleId || ''} onCommentPosted={onCommentPosted} />}
            <CommentList authorId={String(article.author.author_id)}  articleId={String(article.article_id)} />

        </div>
    );
};

export default ArticleView;
