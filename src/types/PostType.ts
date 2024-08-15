interface Comment {
	commentId: string;
	commentDate: string;
	commentContent: string;
	commentLike: string;
}

export interface PostType {
	userId: string;
	postTime: string;
	isLiked: boolean;
	comment: Comment[];
	isSaved: boolean;
	postContent: string;
	totalLike: number;
	postId: string;
}

export interface ImageType {
	postId: string;
	postImgSrc: string;
	postImgTitle: string;
}
