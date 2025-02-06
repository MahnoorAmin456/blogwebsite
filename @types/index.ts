
export namespace sanityTypes {
export interface Post{
    content: any;
    _createdAt: string | number | Date;
    _id: string;
    publishedAt: string;
    title: string;
    author: {
        name: string;
        image: string;
    };
    comments: Comment[];
    description: string;
    mainImage: {
        asset: {
            url: string;
        };
    };
    slug: {
        current: string;
    };
    body: [object];
}

export interface Comment {
    approved: boolean;
    comment: string;
    email: string;
    name: string;
    post: {
        _ref: string;
        _type:string;
    };
    publishedAt: string;
    _id: string;
    _ref: string;
    _type: string;
    updatedAt: string;
}
}