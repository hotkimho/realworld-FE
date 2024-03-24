// CommentList.tsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {CommentListType} from "../../types/comment";
import {BASE_URL} from "../../config/config";
import {getCommentListByArticleId} from "../../services/comment";


interface CommentListProps {
    authorId: string;
    articleId: string;
}

const CommentList: React.FC<CommentListProps> = ({ authorId, articleId }) => {
    const [comments, setComments] = useState<CommentListType['comments']>([]);
    const loggedInUsername = localStorage.getItem('username'); // 현재 로그인한 사용자의 이름

    useEffect(() => {

        if (articleId === null)
            return;

        const fetchComments = async () => {
            try {
                console.log("authorId : ", authorId)
                console.log("articleId : ", articleId)
                const response = await getCommentListByArticleId(authorId, articleId);
                setComments(response.comments);
                console.log("comment list : ", response.comments)
            } catch (error) {
                console.error('Failed to fetch comments:', error);
            }
        };

        fetchComments();
    }, [articleId]);

    return (
        <div className="max-w-2xl mx-auto my-4">
            {comments.map((comment) => (
                <div key={comment.comment_id} className="border rounded-lg shadow my-2">
                    <div className="bg-white p-4">
                        <p>{comment.body}</p>
                    </div>
                    <div className="bg-gray-100 p-3 flex justify-between items-center">
                        <div className="flex items-center">
                            <img src={comment.author.profile_image || 'default-profile.png'} alt={comment.author.username} className="h-8 w-8 rounded-full mr-2" />
                            <span>{comment.author.username}</span>
                            <span className="text-xs ml-4">{new Date(comment.created_at).toLocaleDateString()}</span>
                        </div>
                        {comment.author.username === loggedInUsername && (
                            <button className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-2 rounded-lg">
                                Delete
                            </button>
                        )}
                    </div>
                </div>
            ))}
        </div>

    );
};

export default CommentList;
