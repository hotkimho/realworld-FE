// ArticleCreate.tsx
import React, {useRef, useState} from 'react';
import {ArticleCreateType} from "../../types/article";
import {createArticle, getArticlesByTag} from "../../services/article";
import {isApiErrorResponse} from "../../types/error";
import {logoutInLocalStorage} from "../../Util/auth";
import {uploadImageToS3} from "../../Util/file";
import {getPresignedUrl} from "../../services/s3Service";

import { v4 as uuidv4 } from 'uuid';
import ReactMarkdown from "react-markdown";
import {ARTICLE_BUCKET, REGION} from "../../config/config";



//const ArticleCreate: React.FC = () => {
const ArticleCreate: React.FC = () => {
    const [article, setArticle] = useState<ArticleCreateType>({
        title: '',
        description: '',
        body: '',
        tag_list: [],
    });
    const [tagInput, setTagInput] = useState('');
    const textAreaRef = useRef<HTMLTextAreaElement>(null);



    if (!localStorage.getItem('access_token')) {
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
        console.log("qweqwe")
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



    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        if (file.size > 10 * 1024 * 1024) {
            alert('10MB 이하의 파일만 업로드 가능합니다.');
            return;
        }

        const lastDot = file.name.lastIndexOf('.');
        const ext = file.name.substring(lastDot + 1);
        const filename = uuidv4() + "." + ext;

        // localstorage에 있는 access_token안에 있는 user_id를 가져온다.
        const user_id = localStorage.getItem('user_id')
        const key = `user/${user_id}/article/${filename}`


        try {
            const response = await getPresignedUrl(user_id || "", key)
            console.log("upload url ", response.url)
            await uploadImageToS3(response.url, file);

            const imageUrl = `https://${ARTICLE_BUCKET}.s3.${REGION}.amazonaws.com/${key}`;
            insertTextAtCursor(`![image](${imageUrl})`);
        } catch (error) {
            console.error('Error uploading file:', error);
        }
    };

    const handleCursorPosition = () => {
        if (textAreaRef.current) {
            return textAreaRef.current.selectionStart;  // 커서 위치 가져오기
        }
        return 0;  // 참조가 없는 경우, 0 반환
    };


    const insertTextAtCursor = (text: string) => {
        const cursorPosition = handleCursorPosition();
        const textBeforeCursor = article.body.substring(0, cursorPosition);
        const textAfterCursor = article.body.substring(cursorPosition);
        const newText = `${textBeforeCursor}${text}\n${textAfterCursor}`;
        setArticle({ ...article, body: newText });

        if (textAreaRef.current) {
            setTimeout(() => {
                // @ts-ignore
                textAreaRef.current.selectionStart = cursorPosition + text.length;
                // @ts-ignore
                textAreaRef.current.selectionEnd = cursorPosition + text.length;
            }, 0);
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
                        <input
                            type="file"
                            onChange={handleFileUpload}
                            accept="image/jpg, image/png, image/jpeg"
                            className="cursor-pointer bg-gray-100 border border-gray-300 p-2 rounded hover:bg-gray-200 text-sm"
                        />
                    </label>

                    <div className="flex">
                        <div className="flex-1 p-2">
                        <textarea
                            ref={textAreaRef}
                            value={article.body}
                            name={"body"}
                            onChange={handleChange}
                            rows={10}
                            className="w-full p-2 border rounded"
                            placeholder="Write your article (in markdown)"
                        ></textarea>
                        </div>
                        <div className="flex-1 p-2">
                            <div className="border rounded p-2 overflow-y-auto" style={{ height: '100%' }}>
                                <ReactMarkdown  className="prose">{article.body}</ReactMarkdown>

                            </div>
                        </div>
                    </div>

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
                        {article.tag_list && article.tag_list.map((tag, index) => (
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
