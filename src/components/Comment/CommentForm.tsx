// CommentForm.tsx
import React, { useState } from 'react';
import axios from 'axios';

interface CommentFormProps {
    articleId: string;
    onCommentPosted: () => void;
}

const BASE_URL = 'http://your-api-base-url.com';

const CommentForm: React.FC<CommentFormProps> = ({ articleId, onCommentPosted }) => {
    const [commentBody, setCommentBody] = useState('');

    const handleCommentSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!commentBody.trim()) return;

        try {
            await axios.post(
                `${BASE_URL}/articles/${articleId}/comments`,
                { body: commentBody },
                { headers: { Authorization: `Bearer ${localStorage.getItem('access_token')}` } }
            );
            setCommentBody('');
            onCommentPosted();
        } catch (error) {
            console.error('Failed to submit comment:', error);
        }
    };

    return (
        <div className="bg-gray-800 p-4 rounded-lg shadow">
            <form onSubmit={handleCommentSubmit} className="flex flex-col gap-2">
                <textarea
                    className="w-full p-2 rounded-lg"
                    value={commentBody}
                    onChange={(e) => setCommentBody(e.target.value)}
                    placeholder="Write a comment..."
                />
                <button type="submit" className="bg-green-500 text-white p-2 rounded-lg">
                    Post Comment
                </button>
            </form>
        </div>
    );
};

export default CommentForm;
