// CommentList.tsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {CommentListType} from "../../types/comment";


const BASE_URL = 'http://your-api-base-url.com';

interface CommentListProps {
    articleId: string;
}

const CommentList: React.FC<CommentListProps> = ({ articleId }) => {
    const [comments, setComments] = useState<CommentListType['comments']>([]);

    if (articleId === null)
        return null;

    useEffect(() => {
        const fetchComments = async () => {
            try {
                const response = await axios.get<CommentListType>(`${BASE_URL}/articles/${articleId}/comments`);
                setComments(response.data.comments);
            } catch (error) {
                console.error('Failed to fetch comments:', error);
            }
        };

        fetchComments();
    }, [articleId]);

    return (
        <ul>
            {comments.map((comment) => (
                <li key={comment.comment_id} className="border p-4 rounded-lg shadow my-2">
                    <p>{comment.body}</p>
                    <div className="flex items-center justify-between mt-2 text-gray-600">
                        <div className="flex items-center">
                            <img src={comment.author.profile_image} alt={comment.author.username} className="h-8 w-8 rounded-full mr-2" />
                            <span>{comment.author.username}</span>
                        </div>
                        <span>{new Date(comment.created_at).toLocaleDateString()}</span>
                    </div>
                </li>
            ))}
        </ul>
    );
};

export default CommentList;
