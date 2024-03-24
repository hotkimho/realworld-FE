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

    const handleCommentSubmit = async (e: React.FormEvent<HTMLButtonElement>) => {
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
