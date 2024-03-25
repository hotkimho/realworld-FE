// CommentForm.tsx
import React, { useState } from 'react';
import axios from 'axios';
import {isApiErrorResponse} from "../../types/error";
import {logoutInLocalStorage} from "../../Util/auth";
import {createComment} from "../../services/comment";

interface CommentFormProps {
    authorId: string;
    articleId: string;
    onCommentPosted: () => void;
}

const BASE_URL = 'http://your-api-base-url.com';

const CommentForm: React.FC<CommentFormProps> = (
    {
        authorId,
        articleId,
        onCommentPosted,
    }) => {
    const [commentBody, setCommentBody] = useState('');

    const handleCommentSubmit = async (e: React.FormEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if (!authorId || !articleId) {
            throw new Error('authorId or articleId is missing');
        }
        if (!commentBody.trim()) return;

        try {
            const response = await createComment(authorId, articleId, commentBody);
            setCommentBody('');
            onCommentPosted();
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

    return (
        <div className="max-w-2xl mx-auto my-4">
            <div className="border rounded-lg overflow-hidden">
            <textarea
                className="bg-white w-full p-3 text-gray-700 border-a"
                rows={4}
                value={commentBody}
                onChange={(e) => setCommentBody(e.target.value)}
                placeholder="Write a comment..."
            />
                <div className="bg-gray-100 p-3 flex justify-end items-center">
                    <button
                        type="submit"
                        className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg"
                        onClick={handleCommentSubmit}
                    >
                        Post Comment
                    </button>
                </div>
            </div>
        </div>
        // <div className="p-4 rounded-lg shadow">
        //     <form onSubmit={handleCommentSubmit} className="flex flex-col gap-2">
        //         <textarea
        //             className="bg-white w-full p-2 rounded-lg border-solid"
        //             value={commentBody}
        //             onChange={(e) => setCommentBody(e.target.value)}
        //             placeholder="Write a comment..."
        //         />
        //         <button type="submit" className="bg-green-500 text-white p-2 rounded-lg">
        //             Post Comment
        //         </button>
        //     </form>
        // </div>
    );
};

export default CommentForm;
