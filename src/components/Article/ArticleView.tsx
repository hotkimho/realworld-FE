import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {Link, useNavigate, useParams} from 'react-router-dom';

import { ArticleDetailType } from "../../types/article";
import CommentForm from "../Comment/CommentForm";
import CommentList from "../Comment/CommentList";
import {deleteArticle, getArticleById} from "../../services/article";
import {isApiErrorResponse} from "../../types/error";
import {logoutInLocalStorage} from "../../Util/auth";
import {getCommentListByArticleId} from "../../services/comment";
import {CommentListType} from "../../types/comment";
import {likeArticle, unlikeArticle} from "../../services/articleLike";

const ArticleView: React.FC = () => {
    const [article, setArticle] = useState<ArticleDetailType['article'] | null>(null);
    const { authorId,articleId } = useParams<{
        authorId: string;
        articleId: string;
    }>();
    const [comments, setComments] = useState<CommentListType['comments']>([]);
    const [isFavorited, setIsFavorited] = useState<boolean>(false);
    const [favoriteCount, setFavoriteCount] = useState<number>(0);

    const isLoggedIn = !!localStorage.getItem('access_token');
    const loggedInUsername = localStorage.getItem('username'); // 로컬 스토리지에서 username 가져오기
    const navigate = useNavigate();

    useEffect(() => {
        fetchArticle();
    }, [articleId, authorId, ]);


    const fetchArticle = async () => {
        if (authorId === undefined || articleId === undefined) {
            return <div>Invalid URL</div>
        }

        try {
            const response = await getArticleById(authorId, articleId);
            console.error('response', response.article)
            setArticle(response.article);
            setIsFavorited(response.article.is_favorited);
            setFavoriteCount(response.article.favorite_count);
        } catch (error) {
            if (isApiErrorResponse(error)) {
                if (error.error.code === 400) {
                    console.error('Bad request in handleSelectTag', error)
                } else {
                    console.error('Unknown error in handleSelectTag', error)
                }
            }
            return <div>Error</div>
        }
    };

    // delete article function
    const onDeleteArticle = async () => {
        if (authorId === undefined || articleId === undefined) {
            return <div>Invalid URL</div>
        }

        try {
            const response = await deleteArticle(articleId);
            navigate('/');
        } catch (error) {
            if (isApiErrorResponse(error)) {
                if (error.error.code === 400) {
                    console.error('Bad request in handleSelectTag', error)
                } else if (error.error.code === 401 || error.error.code === 403) {
                    // 인증이 유효하지 않습니다 다시 로그인해주세요 경고창과 함께 로그인 페이지로 이동
                    logoutInLocalStorage()
                    alert('인증이 유효하지 않습니다. 다시 로그인해주세요 : ' + error.error.message);
                    navigate('/login');
                } else {
                    console.error('Unknown error in handleSelectTag', error)
                }
                navigate('/'); // On error, redirect to home
            } else {
                console.error('Error fetching article:', error);
                navigate('/'); // On error, redirect to home
            }
            return <div>Error</div>
        }
    }

    if (!article) return <div>Loading...</div>;

    const isOwnArticle = article?.author.username === loggedInUsername;

    const fetchComments = async (authorId:string, articleId:string) => {
        try {
            const response = await getCommentListByArticleId(authorId, articleId);
            setComments(response.comments);
        } catch (error) {
            if (isApiErrorResponse(error)) {
                if (error.error.code === 400) {
                    console.error('Bad request in handleSelectTag', error)
                } else {
                    console.error('Unknown error in handleSelectTag', error)
                }
            }
        }
    };
    //
    //
    // const likeArticle = async (authorId: string, articleId:string) => {
    //     try {
    //         const response = await likeArticle(authorId, articleId);
    //
    //     } catch (error) {
    //         if (isApiErrorResponse(error)) {
    //             if (error.error.code === 400) {
    //                 console.error('Bad request in handleSelectTag', error)
    //             } else if (error.error.code === 401 || error.error.code === 403) {
    //                 // 인증이 유효하지 않습니다 다시 로그인해주세요 경고창과 함께 로그인 페이지로 이동
    //                 logoutInLocalStorage()
    //                 alert('인증이 유효하지 않습니다. 다시 로그인해주세요 : ' + error.error.message);
    //                 navigate('/login');
    //             } else {
    //                 console.error('Unknown error in handleSelectTag', error)
    //             }
    //             navigate('/'); // On error, redirect to home
    //         } else {
    //             console.error('Error fetching article:', error);
    //             navigate('/'); // On error, redirect to home
    //         }
    //     }
    // }
    //
    // // unlike
    // const unLikeArticle = async (authorId: string, articleId:string) => {
    //     try {
    //         const response = await likeArticle(authorId, articleId);
    //
    //     } catch (error) {
    //         if (isApiErrorResponse(error)) {
    //             if (error.error.code === 400) {
    //                 console.error('Bad request in handleSelectTag', error)
    //             } else if (error.error.code === 401 || error.error.code === 403) {
    //                 // 인증이 유효하지 않습니다 다시 로그인해주세요 경고창과 함께 로그인 페이지로 이동
    //                 logoutInLocalStorage()
    //                 alert('인증이 유효하지 않습니다. 다시 로그인해주세요 : ' + error.error.message);
    //                 navigate('/login');
    //             } else {
    //                 console.error('Unknown error in handleSelectTag', error)
    //             }
    //             navigate('/'); // On error, redirect to home
    //         } else {
    //             console.error('Error fetching article:', error);
    //             navigate('/'); // On error, redirect to home
    //         }
    //     }
    // }

    const toggleFavorite = async (e: React.FormEvent<HTMLButtonElement>) => {
        e.preventDefault();
        try {
            if(isFavorited) {
                await likeArticle(authorId || "", articleId || "");
                setFavoriteCount(favoriteCount - 1);
            } else {
                await unlikeArticle(authorId|| "", articleId || "");
                setFavoriteCount(favoriteCount + 1);
            }
            setIsFavorited(!isFavorited); // 좋아요 상태 토글
        } catch (error) {
            if (isApiErrorResponse(error)) {
                if (error.error.code === 400) {
                    console.error('Bad request in handleSelectTag', error)
                } else if (error.error.code === 401 || error.error.code === 403) {
                    // 인증이 유효하지 않습니다 다시 로그인해주세요 경고창과 함께 로그인 페이지로 이동
                    logoutInLocalStorage()
                    alert('인증이 유효하지 않습니다. 다시 로그인해주세요 : ' + error.error.message);
                    navigate('/login');
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
    return (
        <div className="overflow-auto">
            <div className="bg-slate-700 text-white py-10 px-4">
                <div className="container mx-auto flex justify-between items-center">
                    <div className="flex items-center"> {/* 작성자 정보 및 버튼을 담는 컨테이너 */}
                        {article.author.profile_image ? (
                            <img src={article.author.profile_image} alt="Profile" className="w-10 h-10 rounded-full mr-4" />
                        ) : (
                            <div className="w-10 h-10 bg-gray-400 rounded-full mr-4"></div>
                        )}
                        <div>
                            <h1 className="text-3xl font-bold mr-4">{article.title}</h1>
                            <span className="font-bold">{article.author.username}</span>
                            <span className="ml-4 text-sm">{new Date(article.created_at).toLocaleDateString()}</span>
                        </div>
                        {isOwnArticle ? (
                            // 현재 로그인한 사용자가 작성한 게시글인 경우
                            <>
                                <Link to={`/user/${article.author.author_id}/article/${article.article_id}/edit`} className="hover:underline">
                                    <button className="ml-3 mt-8 px-3 py-1 text-sm rounded-full bg-blue-500 hover:bg-blue-600 text-white transition-colors duration-300">
                                        Edit Article
                                    </button>
                                </Link>

                                <button
                                    className="ml-2 mt-8 px-3 py-1 text-sm rounded-full bg-red-500 hover:bg-red-600 text-white transition-colors duration-300"
                                    onClick={onDeleteArticle}
                                >
                                    Delete Article
                                </button>
                            </>
                        ) : (
                            // 다른 사용자의 게시글인 경우
                            <>
                                <button className={`ml-3 mt-8 px-3 py-1 text-sm rounded-full border ${
                                    article.author.following ? 'bg-green-500 text-white' : 'text-green-500 border-green-500'
                                } hover:bg-green-500 hover:text-white transition-colors duration-300`}>
                                    Follow
                                </button>
                                {/*<button*/}
                                {/*    className={`ml-2 mt-8 px-3 py-1 text-sm rounded-full border ${*/}
                                {/*    article.is_favorited ? 'bg-green-500 text-white' : 'text-green-500 border-green-500'*/}
                                {/*} hover:bg-green-500 hover:text-white transition-colors duration-300`}*/}
                                {/*    onClick={(e) => likeArticle(authorId || "", articleId || "",)}>*/}
                                {/*    ♥ {article.favorite_count}*/}
                                {/*</button>*/}
                                <button
                                    className={`ml-2 mt-8 px-3 py-1 text-sm rounded-full border ${isFavorited ? 'bg-green-500 text-white' : 'text-green-500 border-green-500'} hover:bg-green-500 hover:text-white transition-colors duration-300`}
                                    onClick={toggleFavorite}>
                                    ♥ {favoriteCount}
                                </button>
                            </>
                        )}

                        {/*/!* Follow Button *!/*/}
                        {/*<button className={`ml-3 mt-7 px-3 py-1 text-sm rounded-full border ${*/}
                        {/*    article.author.following ? 'bg-green-500 text-white' : 'text-green-500 border-green-500'*/}
                        {/*} hover:bg-green-500 hover:text-white transition-colors duration-300`}>*/}
                        {/*    Follow*/}
                        {/*</button>*/}

                        {/*/!* Favorite Button *!/*/}
                        {/*<button className={`ml-4 mt-7 px-3 py-1 text-sm rounded-full border ${*/}
                        {/*    article.is_favorited ? 'bg-green-500 text-white' : 'text-green-500 border-green-500'*/}
                        {/*} hover:bg-green-500 hover:text-white transition-colors duration-300`}>*/}
                        {/*    ♥ {article.favorite_count}*/}
                        {/*</button>*/}
                    </div>
                </div>
            </div>

            {/* 본문 */}
            <div className="container mx-auto py-6 px-4">
                <p className="my-4 whitespace-pre-line">{article.body}</p>
                <div className="flex flex-wrap my-4">
                    {article.tag_list?.map((tag, index) => (
                        <span key={index} className="bg-gray-200 text-gray-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded-full">
                        {tag}
                    </span>
                    ))}
                </div>

            </div>
            <hr className="my-4" />
            {isLoggedIn && <CommentForm authorId={authorId || ""} articleId={articleId || ''} onFetchComments={fetchComments} />}
            <CommentList
                authorId={String(article.author.author_id)}
                articleId={String(article.article_id)}
                comments={comments}
                setComments={setComments}
                onFetchComments={fetchComments}
            />

        </div>
    );
};

export default ArticleView;
