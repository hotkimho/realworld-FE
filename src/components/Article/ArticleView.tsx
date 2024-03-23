// ArticleView.tsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

import { ArticleDetailType } from "../../types/article";
import CommentForm from "../Comment/CommentForm";
import CommentList from "../Comment/CommentList";

const BASE_URL = 'http://your-api-base-url.com';

const ArticleView: React.FC = () => {

    const [article, setArticle] = useState<ArticleDetailType['article'] | null>(null);
    const { articleId } = useParams<{ articleId: string }>();
    const isLoggedIn = !!localStorage.getItem('access_token');

    const fetchArticle = async () => {
        try {
            const response = await axios.get<ArticleDetailType>(`${BASE_URL}/articles/${articleId}`);
            setArticle(response.data.article);
        } catch (error) {
            console.error('Error fetching article:', error);
        }
    };

    fetchArticle();

    useEffect(() => {
        fetchArticle();
    }, [articleId]);

    const onCommentPosted = () => {
        // 예시: 댓글이 추가된 후 댓글 리스트를 새로고침하기 위해 fetchArticle을 호출
        fetchArticle();
    };

    if (!article) return <div>Loading...</div>;

    return (
        <div>
            <div className="bg-black text-white py-10 px-4">
                <div className="container mx-auto">
                    <h1 className="text-3xl font-bold">{article.title}</h1>
                    <div className="flex items-center mt-4">
                        {article.author.profile_image && (
                            <img src={article.author.profile_image} alt="Profile" className="w-10 h-10 rounded-full mr-4" />
                        )}
                        <div>
                            <span>{article.author.username}</span>
                            <span className="ml-4">{new Date(article.created_at).toLocaleDateString()}</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto py-6">
                <p className="my-4">{article.body}</p>
                <div className="flex flex-wrap my-4">
                    {article.tag_list && article.tag_list.map((tag, index) => (
                        <span key={index} className="bg-gray-200 text-gray-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded">
                            {tag}
                        </span>
                    ))}
                </div>

                <hr className="my-4" />

                {isLoggedIn && <CommentForm articleId={articleId || ''} onCommentPosted={onCommentPosted} />}
                <CommentList articleId={articleId || ''} />
            </div>
        </div>
    );
};

export default ArticleView;
