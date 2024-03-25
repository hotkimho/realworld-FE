import React, { useState, useEffect } from 'react';
import { getCommentListByArticleId, updateComment, deleteComment } from "../../services/comment";
import {CommentListType} from "../../types/comment";
import {isApiErrorResponse} from "../../types/error";
import {logoutInLocalStorage} from "../../Util/auth";

interface CommentListProps {
    authorId: string;
    articleId: string;
    comments: CommentListType['comments'];
    setComments: React.Dispatch<React.SetStateAction<CommentListType['comments']>>;
    onFetchComments: (authorId:string, articleId:string) => void;
}

const CommentList: React.FC<CommentListProps> = (
    {
        authorId,
        articleId,
        comments,
        setComments,
        onFetchComments
    }) => {
    // const [comments, setComments] = useState<CommentListType['comments']>([]);
    const [editingCommentId, setEditingCommentId] = useState<string | null>(null);
    const [editingText, setEditingText] = useState("");
    const loggedInUsername = localStorage.getItem('username');

    useEffect(() => {
        onFetchComments(authorId, articleId);
    }, [articleId]);

    const handleEditClick = (commentId: string, currentText: string) => {
        setEditingCommentId(commentId);
        setEditingText(currentText);
    };

    const handleSaveClick = async (commentId: string) => {
        try {
            const response = await updateComment(authorId, articleId, commentId, editingText);
            setEditingCommentId(null); // 수정 모드 종료
            onFetchComments(authorId, articleId); // 댓글 목록 새로고침
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

    const handleDeleteClick = async (commentId: string) => {
        try {
            await deleteComment(authorId, articleId, commentId);
            onFetchComments(authorId, articleId); // 댓글 목록 새로고침
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
            {comments.map((comment) => (
                <div key={comment.comment_id} className="border rounded-lg shadow my-2">
                    <div className="bg-white p-4 flex justify-between">
                        {editingCommentId === String(comment.comment_id) ? (
                            <>
                                <textarea
                                    className="bg-white textarea textarea-bordered flex-grow"
                                    value={editingText}
                                    onChange={(e) => setEditingText(e.target.value)}
                                ></textarea>
                                <button className="btn bg-green-500 text-white btn-success ml-2" onClick={() => handleSaveClick(String(comment.comment_id))}>저장</button>
                            </>
                        ) : (
                            <>
                                <p className="flex-grow">{comment.body}</p>
                                {comment.author.username === loggedInUsername && (
                                    <div className="flex items-center">
                                        <button className="btn bg-green-500 text-white btn-success mr-2" onClick={() => handleEditClick(String(comment.comment_id), comment.body)}>수정</button>
                                        <button className="btn btn-error text-white" onClick={() => handleDeleteClick(String(comment.comment_id))}>삭제</button>
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                    <div className="bg-gray-100 p-3 flex justify-between items-center">
                        <div className="flex items-center">
                            <img src={comment.author.profile_image || 'default-profile.png'} alt={comment.author.username} className="h-8 w-8 rounded-full mr-2" />
                            <span>{comment.author.username}</span>
                            <span className="text-xs ml-4">{new Date(comment.created_at).toLocaleDateString()}</span>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default CommentList;
