export interface Post {
    id: number,
    title: string,
    author: string,
    image: string,
    content: string,
    views: number,
    createdAt: Date,
    updatedAt?: Date,
}