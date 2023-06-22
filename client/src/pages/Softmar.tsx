import React, { useEffect, useState } from 'react'
import { Loading, Poll, PostBlock } from '../components'
import axios from 'axios';

export default function Softmar() {
  const [isLoading, setIsLoading] = useState(true);
  const [posts, setPosts] = useState<Post[]>([]);
  const [poll, setPoll] = useState<Poll | null>(null);

  useEffect(() => {
    getPosts(10);
    getPoll(1);
  }, [])

  if (isLoading) return (
    <Loading />
  )

  async function getPosts(last: number) {
    axios.get(`/api/posts/get?last=${last}`).then(res => {
      const posts = res.data.posts as Post[];
      setPosts(posts);
      console.log(res.data);
      setIsLoading(false)
    }).catch(err => {
      console.log(err);
    })
  }

  async function getPoll(id: number) {
    axios.get(`/api/polls/get?id=${id}`).then(res => {
      const poll = res.data.poll as Poll;
      setPoll(poll);
      console.log(res.data);
    }).catch(err => {
      console.log(err);
    })
  }


  return (
    <div>
      <div className='w-screen min-h-screen lg:px-8 flex flex-col justify-between mt-20 lg:flex-row'>
        <div className='w-full lg:w-2/3 flex flex-col justify-start items-center'>
          {posts.map((post, index) => (
            <PostBlock
              key={index}
              id={post.id}
              title={post.title}
              image={post.image}
              description={post.description}
              author={post.author}
              views={post.views}
              date={post.createdAt}
            />
          ))}
        </div>
        <div className='w-full lg:w-1/3 flex flex-col items-center mt-20'>
          <div className='flex flex-col justify-center items-center mt-4'>
            {
              (poll) ? <Poll
                id={poll.id}
                title={poll.title}
                variants={poll.options}
              /> : 
              <Loading />
            }
          </div>
        </div>
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
  content: string,
  views: number,
  createdAt: string,
  updatedAt?: Date,
}

interface Poll {
  id: number,
  title: string,
  options: Record<string, number>
}