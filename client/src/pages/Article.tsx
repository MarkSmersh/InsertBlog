import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams, useSearchParams } from 'react-router-dom'
import { Loading, PostBlock } from '../components';

export default function Article() {
    const [searchParams] = useSearchParams();
    const id = searchParams.get("id");

    // const { id } = useParams();
    const [isLoading, setIsLoading] = useState(true);
    const [post, setPost] = useState<Post | null>(null);
    const [content, setContent] = useState<Block[]>([]);
    const [newPosts, setNewPosts] = useState<Post[]>([]);


    function getPost(id: number) {
        axios.get(`/api/posts/get?id=${id}`).then(res => {
            const post = res.data.post as Post;
            setPost(post);
            setContent(post.content);
            console.log(res.data);
            setIsLoading(false)
        }).catch(err => {
            console.log(err);
            setIsLoading(false)
        })
    }

    function getNewPosts(last: number) {
        axios.get(`/api/posts/get?last=${last}`).then(res => {
            const posts = res.data.posts as Post[];
            setNewPosts(posts);
            console.log(res.data);
        }).catch(err => {
            console.log(err);
        })

    }

    function addView() {
        axios.get(`/api/posts/view?id=${id}`).then(res => {
            setPost(p => {
                if (p) {
                    p.views++;
                    return p;
                }
                return null;
            })
        }
        ).catch(err => {
            console.log(err);
        })
    }

    useEffect(() => {
        if (id) getPost(parseInt(id))
        addView();
        getNewPosts(3);
    }, [id])

    if (!id) return (
        <div className='w-screen h-screen flex justify-center items-center'>
            <h1 className='text-4xl text-center font-bold'>Id for article is no provided</h1>
        </div>
    )

    if (isLoading) return (
        <Loading />
    )

    if (!post) return (
        <div className='w-screen h-screen flex justify-center items-center'>
            <h1 className='text-4xl text-center font-bold'>Article not found</h1>
        </div>
    )

    return (
        <div className='w-screen min-h-screen flex flex-col justify-start items-center'>
            <div className='mt-20 w-10/12 flex flex-col justify-start items-center lg:w-1/2 '>
                <h1 className='text-4xl text-center font-bold'>{post.title}</h1>
                <h1 className='text-base text-center mt-2'>{`${post.author} | ${new Date(Date.parse(post.createdAt)).toLocaleDateString()} | ${post.views} 👀`}</h1>
                <img src={post.image} alt={post.title} className='w-full h-[50vw] lg:w-[50vw] lg:h-[15vw] my-4 object-cover object-center' />
                <div className='h-[1px] w-full bg-black'></div>
                <div className='flex flex-col mt-10'>
                    {content.map((block, index) => {
                        if (block.type === "text") {
                            return (
                                <div key={index} className='flex flex-col my-8'>
                                    <p className='text-lg text-slate-800'>{`${block.content}`}</p>
                                </div>
                            )
                        }
                        else if (block.type === "image") {
                            return (
                                <div key={index} className='flex flex-col justify-start items-center w-full my-4'>
                                    <img src={block.url} alt={block.content} className='object-cover w-full h-[50vw] md:w-[30vw] md:h-[17vw] hover:scale-125 transition ease-in-out cursor-pointer' />
                                    <p className='w-3/4 text-center text-slate-600 mt-2'><i>{block.content}</i></p>
                                </div>
                            )
                        }
                        else if (block.type === "link") {
                            return (
                                <div key={index} className='flex flex-col'>
                                    <a target='_blank' href={block.url} className='text-lg text-blue-600 hover:underline hover:text-slate-900 transition'>{`${block.content} →`}</a>
                                </div>
                            )
                        }
                        return null;
                    })}
                </div>
                <div className='h-[1px] w-full bg-black'></div>
            </div>
            <div className='flex flex-row justify-center items-center flex-wrap w-full my-10'>
                {newPosts.map((post, index) => {
                    return (
                        <PostBlock
                            key={index}
                            id={post.id}
                            description={post.description}
                            title={post.title}
                            image={post.image}
                            author={post.author}
                            views={post.views}
                            date={post.createdAt}
                            wrap={true}
                            className='basis-[100%] md:basis-[50%] lg:basis-[30%] hover:scale-105 transition ease-in-out'
                        />
                    )
                })}
            </div>
        </div>
    )
}

interface Post {
    id: number,
    title: string,
    image: string,
    description: string,
    author: string,
    content: Block[],
    views: number,
    createdAt: string,
    updatedAt?: Date,
}

type Block = TextBlock | ImageBlock | LinkBlock;

interface TextBlock {
    type: "text",
    content: string
}

interface ImageBlock {
    type: "image",
    content: string,
    url: string
}

interface LinkBlock {
    type: "link",
    content: string,
    url: string
}
