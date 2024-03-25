// ArticleEdit.tsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArticleCreateType } from '../../types/article';
import { getArticleById, updateArticle } from '../../services/article';
import {isApiErrorResponse} from "../../types/error";
import {logoutInLocalStorage} from "../../Util/auth";

const ArticleEdit: React.FC = () => {
    const { authorId, articleId } = useParams();
    const navigate = useNavigate();
    const [article, setArticle] = useState<ArticleCreateType>({
        title: '',
        description: '',
        body: '',
        tag_list: [],
    });
    const [tagInput, setTagInput] = useState('');

    useEffect(() => {
        const fetchArticle = async () => {
            try {
                if (!articleId || !authorId) throw new Error("입력이 유효하지 않습니다.");

                const response = await getArticleById(authorId,articleId);
                setArticle({
                    title: response.article.title,
                    description: response.article.description,
                    body: response.article.body,
                    tag_list: response.article.tag_list || [],
                });
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
                    navigate('/'); // On error, redirect to home
                } else {
                    console.error('Error fetching article:', error);
                    navigate('/'); // On error, redirect to home
                }

            }
        };

        fetchArticle();
    }, [articleId, navigate]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setArticle({ ...article, [e.target.name]: e.target.value });
    };

    const handleTagInput = (e: React.KeyboardEvent<HTMLInputElement>, tagInput: string) => {
        if (e.key === 'Enter' && tagInput) {
            e.preventDefault();
            setArticle({ ...article, tag_list: [...article.tag_list, tagInput] });
        }
    };

    const removeTag = (index: number) => {
        setArticle({
            ...article,
            tag_list: article.tag_list.filter((_, i) => i !== index),
        });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            if (!articleId) throw new Error("입력이 유효하지 않습니다.");
            await updateArticle(articleId, article);
            navigate(`/user/${authorId}/article/${articleId}`); // Redirect to the updated article page
        } catch (error) {
            console.error('Error updating article:', error);
        }
    };

    return (
        <div className="container mx-auto p-4">
            <form onSubmit={handleSubmit} className="space-y-4">
                {/* Title Input */}
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Title</span>
                    </label>
                    <input
                        type="text"
                        name="title"
                        placeholder="Article Title"
                        value={article.title}
                        onChange={handleChange}
                        className="input input-bordered w-full bg-white"
                    />
                </div>

                {/* Description Input */}
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Description</span>
                    </label>
                    <input
                        type="text"
                        name="description"
                        placeholder="What's this article about?"
                        value={article.description}
                        onChange={handleChange}
                        className="input input-bordered w-full bg-white"
                    />
                </div>

                {/* Body Input */}
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Body</span>
                    </label>
                    <textarea
                        name="body"
                        placeholder="Write your article (in markdown)"
                        value={article.body}
                        onChange={handleChange}
                        rows={8}
                        className="textarea textarea-bordered h-24 w-full bg-white"
                    ></textarea>
                </div>

                {/* Tags Input */}
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Tags</span>
                    </label>
                    <input
                        type="text"
                        placeholder="Enter tags"
                        value={tagInput}
                        onKeyPress={(e) => handleTagInput(e, tagInput)}
                        onChange={(e) => setTagInput(e.target.value)}
                        className="input input-bordered w-full bg-white"
                    />
                    <div className="flex flex-wrap mt-2">
                        {article.tag_list.map((tag, index) => (
                            <div key={index} className="badge m-1 flex items-center bg-gray-200 text-gray-800">
                            <span
                                className="cursor-pointer px-2"
                                onClick={() => removeTag(index)}
                            >
                                x
                            </span>
                                {tag}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Submit Button */}
                <div className="form-control flex justify-end mt-4">
                    <button type="submit" className="btn px-2 py-1 text-sm bg-green-500 text-white rounded hover:bg-green-600">
                        Update Article
                    </button>
                </div>
            </form>
        </div>
    )
};

export default ArticleEdit;
