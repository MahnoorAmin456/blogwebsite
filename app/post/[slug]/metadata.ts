import { Metadata } from 'next';
import { client } from '@/sanity/lib/client';

async function getPost(slug: string): Promise<any> {
  const query = `
    *[_type == 'post' && slug.current == $slug]{
      title,
      description
    }[0]`;
  return await client.fetch(query, { slug });
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = await getPost(params.slug);
  return {
    title: post?.title || 'Default Title',
    description: post?.description || 'Default Description',
  };
}
