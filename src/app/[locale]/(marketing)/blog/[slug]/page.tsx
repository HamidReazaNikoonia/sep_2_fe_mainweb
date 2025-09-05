import { Suspense } from 'react';
import BlogDetailsContainer from '@/sections/blog/BlogSpecificContainer';

type BlogPageProps = {
  params: {
    slug: string;
    locale: string;
  };
};

export async function generateMetadata({ params }: BlogPageProps) {
  const { slug } = params;

  return {
    title: `Blog Post - ${slug}`,
    description: 'Read our latest blog post',
  };
}

export default function BlogDetailsPage({ params }: BlogPageProps) {
  const { slug } = params;

  return (
    <div className="primary-gradient-bg min-h-screen pt-8 md:pt-12">
      <div dir="rtl" className="container mx-auto mt-0 md:mt-6 py-8">
        <Suspense fallback={(
          <div className="animate-pulse">
            <div className="mb-4 h-8 rounded bg-gray-300"></div>
            <div className="mb-2 h-4 rounded bg-gray-300"></div>
            <div className="mb-2 h-4 rounded bg-gray-300"></div>
            <div className="h-64 rounded bg-gray-300"></div>
          </div>
        )}
        >
          <BlogDetailsContainer blogId={slug} />
        </Suspense>
      </div>
    </div>
  );
}

export const dynamic = 'force-dynamic';
