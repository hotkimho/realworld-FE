// FeedTabs.tsx
import React from 'react';

interface FeedTabsProps {
    activeTab: 'all' | 'user';
    onTabChange: (tab: 'all' | 'user') => void;
}

const FeedTab: React.FC<FeedTabsProps> = ({ activeTab, onTabChange }) => {
    return (
        <div className="flex mb-4">
            <button
                className={`tab tab-lifted ${activeTab === 'all' ? 'tab-active' : ''}`}
                onClick={() => onTabChange('all')}
            >
                Global Feed
            </button>
            <button
                className={`tab tab-lifted ${activeTab === 'user' ? 'tab-active' : ''}`}
                onClick={() => onTabChange('user')}
            >
                My Feed
            </button>
        </div>
    );
};

export default FeedTab;
