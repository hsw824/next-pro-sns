interface Comment {
	commentId: string;
	commentDate: string;
	commentContent: string;
	commentLike: string;
	//대댓글은 일단 생각하지 않음
}
// 글쓴 유저 정보, 댓글정보, 이미지정보를 따로 나누어야 할까

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
