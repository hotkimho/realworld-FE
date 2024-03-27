
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


// 아티클 생성 인터페이스
export interface ArticleCreateType {
    body: string;
    description: string;
    tag_list: string[];
    title: string;
}

// 아티클 조회 인터페이스
export interface ArticleDetailType {
    article: ArticleItemType;
}

// 아티클 수정 인터페이스
export interface ArticleUpdateType {
    body: string;
    description: string;
    tag_list?: string[];
    title: string;
}

// 작성자가 작성한 글 목록 조회 인터페이스
export interface ArticleAuthorType {
    articles: ArticleItemType[];
}

// 작성자가 작성한 글 중 좋아요 누른 글 목록 조회 인터페이스
export interface ArticleAuthorFavoriteType {
    articles: ArticleItemType[];
}