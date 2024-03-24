// ArticleItem.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { ArticleItemType } from "../../types/article";

const ArticleItem: React.FC<{ article: ArticleItemType }> = ({ article }) => {
    const trimmedBody = article.body.length > 100 ? `${article.body.substring(0, 100)}...` : article.body;

    return (
        <div className="bg-white p-4 mb-4 rounded shadow-sm">
            <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3">
                    {article.author.profile_image && (
                        <img src={article.author.profile_image} alt={article.author.username} className="w-12 h-12 rounded-full" />
                    )}
                    <div>
                        <h2 className="font-semibold">{article.author.username}</h2>
                        <p className="text-gray-500 text-xs">{new Date(article.created_at).toLocaleDateString()}</p>
                    </div>
                </div>
                <button
                    className={`flex items-center justify-center w-12 h-8 rounded-full ${
                        article.is_favorited ? 'bg-green-500 text-white' : 'text-green-500 bg-white'
                    } border-2 border-green-500 hover:bg-green-500 hover:text-white`}
                >
                    {/* Here goes the heart icon */}
                    <span className="text-green">♥{article.favorite_count}</span>
                </button>
            </div>

            <div className="mt-4">
                <Link to={`/user/${article.author.author_id}/article/${article.article_id}`} className="hover:underline">
                    <h3 className="text-xl font-bold mb-2">{article.title}</h3>
                    <p className="text-gray-700 mb-4">{trimmedBody}</p>
                </Link>
            </div>

            <div className="flex items-center justify-between mt-4">
                <Link to={`/user/${article.author.author_id}/article/${article.article_id}`} className="text-green-500 hover:text-green-600 hover:underline">
                    Read more...
                </Link>
                <div className="flex gap-2">
                    {article.tag_list && article.tag_list.map((tag, index) => (
                        <span key={index} className="bg-gray-200 text-gray-800 text-xs font-semibold px-2 py-1 rounded">
              {tag}
            </span>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ArticleItem;
