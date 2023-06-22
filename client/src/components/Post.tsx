import React from 'react'

export default function Post() {
  // RIP AND TEAR UNTIL IT IS DONE

  const p: Post = {
    id: 0,
    title: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.',
    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.',
    image: 'https://picsum.photos/200/300',
    createdAt: new Date(),
    author: 'Marek Smotkin',
    views: 69,
    content: [
      {
        type: 'text',
        content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.'
      },
      {
        type: 'image',
        content: 'Hello world',
        id: 0
      },
      {
        type: 'text',
        content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.'
      },
      {
        type: 'image',
        content: 'Hello world 2',
        id: 1
      },
    ]
  }

  return (
    <div>Post</div>
  )
}

interface Post {
  id: number,
  title: string,
  description: string,
  image: string,
  author: string,
  content: Block[],
  views: number,
  createdAt: Date,
  updatedAt?: Date,
}

type Block = TextBlock | ImageBlock;

interface TextBlock {
    type: "text",
    content: string
}

interface ImageBlock {
    type: "image",
    content: string,
    id: number
}
