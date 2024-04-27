// PopularTags.tsx
import React, {useEffect, useState} from 'react';
import {getArticles, getMyArticles, getPopularTags} from "../../services/article";
import {isApiErrorResponse} from "../../types/error";
import {logoutInLocalStorage} from "../../Util/auth";

interface PopularTagsProps {
    onSelectTag: (tag: string) => void;
}

const PopularTag: React.FC<PopularTagsProps> = ({onSelectTag}) => {

    const [tags, setTags] = useState<string[]>([]);

    const fetchPopularTags = async () => {
        try {
            const response = await getPopularTags();
            setTags(response.tags);
        } catch (error) {
            if (isApiErrorResponse(error)) {
                if (error.error.code === 500) {
                    setTags([])
                }
            }
        }
    };

    useEffect(() => {
        fetchPopularTags();

    }, []);
    return (
        <div style={{ width: '250px', marginLeft: '10px', marginTop: '48px' }} className="p-4 bg-white rounded-lg shadow overflow-hidden">
            <h2 className="text-lg font-bold mb-3">Popular Tags</h2>
            <div className="flex flex-wrap">
                {tags.map((tag) => (
                    <button key={tag}
                            className="bg-gray-200 text-gray-700 text-sm font-medium px-3 py-1 rounded hover:bg-gray-300 m-1"
                            onClick={() => onSelectTag(tag)}>
                        {tag}
                    </button>
                ))}
            </div>
        </div>
    );
};
export default PopularTag;
