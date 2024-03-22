// PopularTags.tsx
import React from 'react';

interface PopularTagsProps {
    tags: string[];
    onSelectTag: (tag: string) => void;
}

const PopularTag: React.FC<PopularTagsProps> = ({ tags, onSelectTag }) => {
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
