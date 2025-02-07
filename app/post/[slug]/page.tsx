'use client';

import React, { useEffect, useState } from 'react';
import { Avatar, AvatarFallback } from '@radix-ui/react-avatar';
import { CalendarIcon } from 'lucide-react';
import Image from 'next/image';
import { PortableText } from 'next-sanity';
import { useForm } from 'react-hook-form';
import { client } from '../../../sanity/lib/client';
import { sanityTypes } from '../../../@types';
import { Label } from '../../../components/ui/label';
import { urlFor } from '../../../sanity/lib/image';

async function getPost(slug: string): Promise<any> {
  const query = `
    *[_type == 'post' && slug.current == $slug]{
      _createdAt,
      _id,
      title,
      description,
      content,
      mainImage,
      author->,
    
      comments[]-> 
    }[0]`;

  return await client.fetch(query, { slug });
}


export default function PostPage({ params }: { params: Promise< { slug: string }> }) {
  const [post, setPost] = useState<sanityTypes.Post | null>(null);
  const { register, handleSubmit } = useForm();

  useEffect(() => {
    const fetchPost = async () => {
      if ((await params)?.slug) {
        const fetchedPost = await getPost((await params).slug);
        setPost(fetchedPost);
      }
    };
    fetchPost();
  }, [params]);

  const onSubmit = (data: any) => {
    console.log(data);
  };

  if (!post) return <div>Loading...</div>;

  return (
    <div className="flex flex-col items-center w-full bg-background">
      <div className="h-full w-full flex flex-1 max-w-[1500px] pb-24 md:px-14 pt-32 px-4 flex-col space-y-4">
        <Label className="text-5xl max-w-4xl tracking-tighter font-extrabold">
          {post.title}
        </Label>

        <div className="flex flex-row items-center space-x-3 pb-2">
          <div className="flex flex-row items-center space-x-2">
            <Avatar>
              <AvatarFallback>
                {post.author?.name ? post.author.name.substring(0, 1) : "?"}
              </AvatarFallback>
            </Avatar>
            <p className="font-bold">{post.author?.name || "Unknown Author"}</p>
          </div>

          <div className="flex flex-row items-center gap-x-2">
            <CalendarIcon size={20} className="text-primary" />
            <p>{new Date(post._createdAt).toLocaleDateString("en-US", { timeZone: "UTC" })}</p>
          </div>
        </div>

        <div className="w-full h-96 max-h-96 relative overflow-hidden">
          <Image
            src={urlFor(post.mainImage)?.url() || "/fallback-image.png"}
            alt={post.title || "Post Image"}
            fill
            className="h-full w-full object-cover object-center rounded-lg"
          />
        </div>

        <article className="prose lg:prose-lg dark:prose-invert pt-5">
          {post.content ? (
            <PortableText value={post.content} />
          ) : (
            <p>No content available.</p>
          )}
        </article>
      </div>

      {/* Comment Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="mt-7 w-1/2 flex flex-col gap-6">
        <label className="flex flex-col">
          <span className="font-titleFont font-semibold text-base">Name</span>
          <input
            {...register("name", { required: true })}
            defaultValue=""
            className="text-base placeholder:text-sm border-b-[1px] border-bgColor py-1 px-4 outline-none"
            type="text"
            placeholder="Enter your name"
          />
        </label>
        
        <label className="flex flex-col">
          <span className="font-titleFont font-semibold text-base">Email</span>
          <input
            {...register("email", { required: true })}
            defaultValue=""
            className="text-base placeholder:text-sm border-b-[1px] border-bgColor py-1 px-4 outline-none"
            type="email"
            placeholder="Enter your email"
          />
        </label>
        
        <label className="flex flex-col">
          <span className="font-titleFont font-semibold text-base">Comment</span>
          <textarea
            {...register("comment", { required: true })}
            defaultValue=""
            className="text-base placeholder:text-sm border-b-[1px] border-bgColor py-1 px-4 outline-none"
            rows={6}
            placeholder="Enter your comment"
          />
        </label>
        
        <button
          className="bg-bgColor w-full text-white text-base font-titleFont font-semibold tracking-wider uppercase py-2 rounded-sm hover:bg-primary duration-300"
          type="submit"
        >
          Submit
        </button>
      </form>

      {/* Comments Section */}
      <div className="w-full flex flex-col p-10 my-10 mx-auto shadow-bgColor shadow-lg space-y-2">
        <h3 className="text-3xl font-titleFont font-semibold">Comments</h3>
        <hr />
        {post.comments?.length > 0 ? (
          post.comments.map((comment) => (
            <div key={comment._id}>
              <p>
                <span className="text-primary">{comment.name}</span> {comment.comment}
              </p>
            </div>
          ))
        ) : (
          <p>No comments yet.</p>
        )}
      </div>
    </div>
  );
}
