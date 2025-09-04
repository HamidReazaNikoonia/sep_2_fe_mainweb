import BlogListContainer from '@/sections/blog/BlogListContainer';

export async function generateMetadata() {
  return {
    title: 'Blog Posts',
    description: 'Explore our latest blog posts',
  };
}

export default function BlogPage() {
  return (
    <div className=" primary-gradient-bg pt-12 ">
      <div dir="rtl" className="container mx-auto mt-10 px-4 py-8">
        <h1 className="mb-2 text-2xl font-bold">وبلاگ آوانو</h1>
        <h3 className="text-pink-600">اخبار و آخرین رویداد های حوزه هنری</h3>
        <BlogListContainer />
      </div>
    </div>
  );
}

export const dynamic = 'force-dynamic';
