// ArticleCreate.tsx
import React, { useState } from 'react';
import {ArticleCreateType} from "../../types/article";
import {createArticle} from "../../services/article";
import {isApiErrorResponse} from "../../types/error";
import {logoutInLocalStorage} from "../../Util/auth";

//const ArticleCreate: React.FC = () => {
const ArticleCreate: React.FC = () => {
    const [article, setArticle] = useState<ArticleCreateType>({
        title: '',
        description: '',
        body: '',
        tag_list: [],
    });
    const [tagInput, setTagInput] = useState('');

    // 로그인 안 한 경우(localStorage에 token이 없는 경우) 로그인 페이지로 이동
    if (!localStorage.getItem('access_token')) {
        // 로그인이 해주세요 경고창과 함께 로그인 페이지로 이동
        alert('로그인이 필요합니다.');
        window.location.href = '/login';
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setArticle({ ...article, [e.target.name]: e.target.value });
    };

    const handleTagInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && tagInput) {
            e.preventDefault();
            setArticle({ ...article, tag_list: [...article.tag_list, tagInput] });
            setTagInput('');
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
            const response = await createArticle(article);

            // articleview 페이지로 이동
            window.location.href = `/user/${response.article.author.author_id}/article/${response.article.article_id}`;
        } catch (error) {
            if (isApiErrorResponse(error)) {
                if (error.error.code === 400) {
                } else if (error.error.code === 401 || error.error.code === 403) {
                    // 인증이 유효하지 않습니다 다시 로그인해주세요 경고창과 함께 로그인 페이지로 이동
                    logoutInLocalStorage()
                    alert('인증이 유효하지 않습니다. 다시 로그인해주세요 : ' + error.error.message);
                    window.location.href = '/login';
                } else {
                }
            }
        }
    };

    return (
        <div className="container mx-auto p-4">
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Title</span>
                    </label>
                    <input type="text" name="title" placeholder="Article Title" value={article.title} onChange={handleChange} className="input input-bordered w-full bg-white" />
                </div>

                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Description</span>
                    </label>
                    <input type="text" name="description" placeholder="What's this article about?" value={article.description} onChange={handleChange} className="input input-bordered w-full bg-white" />
                </div>

                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Body</span>
                    </label>
                    <textarea name="body" placeholder="Write your article (in markdown)" value={article.body} onChange={handleChange} rows={8} className="textarea textarea-bordered h-24 w-full bg-white"></textarea>
                </div>

                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Tags</span>
                    </label>
                    <input
                        type="text"
                        placeholder="Enter tags"
                        value={tagInput}
                        onChange={(e) => setTagInput(e.target.value)}
                        onKeyPress={handleTagInput}
                        className="input input-bordered w-full bg-white"
                    />
                    <div className="flex flex-wrap mt-2">
                        {article.tag_list.map((tag, index) => (
                            <div key={index} className="badge m-1 flex items-center bg-gray-500 text-white">
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

                <div className="form-control flex justify-end mt-4">
                    <button type="submit" className="btn px-2 py-1 text-sm bg-green-500 text-white rounded hover:bg-green-600">
                        Publish Article
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ArticleCreate;
