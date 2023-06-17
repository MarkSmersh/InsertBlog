export interface Post {
    id: number,
    title: string,
    author: string,
    content: Block[],
    views: number,
    createdAt: Date,
    updatedAt?: Date,
}

type Block = TextBlock | ImageBlock;

export interface TextBlock {
    type: "text",
    content: string
}

export interface ImageBlock {
    type: "image",
    content: string,
    url: string
}

export interface Poll {
    id: number,
    title: string,
    options: Record<string, number>[],
    
    createdAt: Date,
    updatedAt?: Date
}