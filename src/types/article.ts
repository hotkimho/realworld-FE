
export interface ArticleItemType {
    article_id: number;
    author: {
        author_id: number;
        bio?: string;
        following: boolean;
        profile_image?: string;
        username: string;
    };
    body: string;
    created_at: string;
    description: string;
    favorite_count: number;
    is_favorited: boolean;
    tag_list?: string[];
    title: string;
    updated_at?: string;
}


export interface ArticleListType {
    articles: ArticleItemType[];
}