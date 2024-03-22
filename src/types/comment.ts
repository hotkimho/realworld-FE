export interface CommentItemType {
    author : {
        author_id: number;
        bio?: string;
        profile_image?: string;
        username: string;
    }
    body: string;
    comment_id: number;
    created_at: string;
}

export interface CommentListType {
    comments: CommentItemType[];
}

export interface CommentCreateType {
    body: string;
}

export interface CommentUpdateType {
    body: string;
}