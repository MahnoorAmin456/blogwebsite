import React from 'react'
 { client }  '@/sanity/lib/client';
import Image from 'next/image';
import { sanityTypes } from '../@types';
import Link from 'next/link';
 { Card }  '@/components/ui/card';
 { urlFor }  '@/sanity/lib/image';
import { Calendar, CalendarIcon } from 'lucide-react';
import { Card } from '../components/ui/card';
import { urlFor } from '../sanity/lib/image';
import { client } from '../sanity/lib/client';





async function getPosts() {
  const query = `*[_type == "post"]
    | order(_createdAt desc)`
  return await client.fetch(query);
}
export default async function Home() {
  const posts: sanityTypes.Post[] = await getPosts();

  return (
    <div className='flex flex-col items-center w-full  bg-background'>
      <div className='h-full  w-full flex flex-1 max-w-[1500px] md:px-14  pt-24 px-4 flex-col space-y-4'>
    
        <div className='grid md:grid-cols-3  gap-8 grid-cols-1'>
          {
            posts.map((post: sanityTypes.Post, key: number)=>{
              return (
                <Link key={key} href={`/post/${post.slug.current}`} className='space-y-5 group cursor-pointer'>
                <Card className='flex flex-col justify-between  h-full'>
                <div className='space-y-5'>
                 <div className='h-96 w-full overflow-hidden rounded-lg relative '>
                  <div className='h-full w-full bg-black opacity-0 absolute z-29 brightness-75 group-hover:brightness-100 duration-300 group-hover:scale-110'/>
                  <Image
                  src={urlFor(post.mainImage).url()!}
                  fill
                  alt={post.title}
                  className='h-full  object-cover aspect-auto w-full '
                  />

                 </div>
                 <div className='space-y-3 px-4 py-2'>
                  <div className='flex flex-row items-center space-x-2'>
                    <CalendarIcon size={20}  className='text-primary'/>
                    <p className='font-medium'>{new Date(post._createdAt).toDateString()}</p>

                  </div>
                  <h2 className='text-2xl font-semibold'>
                    {post.title}
                  </h2>
                  
                  <p>{post.description}</p>
                 </div>
                 </div>
                 <div className='p-2 text-primary font-serif'>
                  <button className="w-full " >

                    <p> Open </p>
                  </button>

                 </div>
                 
                
                </Card>
                </Link>
                
              )
            })
          }

        </div>

      </div>

    </div>
  )
  
  
 
  
}


