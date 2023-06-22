import React, { useEffect, useState } from 'react'
import { Loading } from '../components';
import axios from 'axios';

export default function Galery() {
  const [isLoading, setIsLoading] = useState(true);
  const [images, setImages] = useState<Image[]>([]);
  const [focused, setFocused] = useState<number | null>(null);

  useEffect(() => {
    getImages(100)
  }, [])

  async function getImages(last: number) {
    const images = await axios.get(`/api/images/get?last=${last}`);
    setImages(images.data.images);
    setIsLoading(false);
  }

  function setFocusedImage(id: number) {
    const index = images.findIndex(image => image.id === id);
    setFocused(index);
  }

  function goRight(i: number) {
    if (i < images.length - 1) setFocused(i + 1);
  }

  function goLeft(i: number) {
    if (i > 0) setFocused(i - 1);
  }

  if (isLoading) return (
    <Loading />
  )

  return (
    <div className='w-full min-h-screen'>
      <div className='w-full h-full bg-gray-900 flex justify-center flex-wrap mt-20'>
        {images.map((image, i) => (
          <div onClick={() => setFocusedImage(image.id)} className='p-4 m-4 bg-primary bg-opacity-0 hover:bg-opacity-20 hover:scale-105 transition ease-in-out cursor-pointer'>
            <img key={i} src={image.url} alt={`id-${image.id}`} className={`w-[35vw] md:w-[28vw] lg:w-[16vw]`} />
          </div>
        ))}
      </div>
      {
        (focused !== null && focused > -1) ?
          <div className='h-screen w-screen bg-black bg-opacity-70 top-0 fixed'>

            <div className='flex justify-end items-center h-20 w-full top-0 mt-16 absolute'>
              <button onClick={() => setFocused(null)} className='mx-4 text-4xl text-white font-bold'>X</button>
            </div>
            <div className='h-full w-full flex justify-between items-center'>
              <button onClick={() => goLeft(focused)} className='mx-4 text-4xl text-white font-bold'>{"<"}</button>

              <div className='flex justify-center items-center h-full w-full mt-4'>
                <img src={images[focused].url} alt={`${images[focused].id}`} className='h-2/4 lg:h-3/4 max-w-3/4 object-cover relative' />
              </div>

              <button onClick={() => goRight(focused)} className='mx-4 text-4xl text-white font-bold'>{">"}</button>
            </div>
          </div>
          : null
      }
    </div>
  )
}

interface Image {
  id: number;
  url: string;
}
