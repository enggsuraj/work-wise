import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "WorkWiseTool Blog - Career Management Insights & Tips",
  description: "Expert insights on career management, notice periods, gratuity calculation, and professional transitions. Stay informed with WorkWiseTool's career blog.",
  keywords: "career blog, notice period tips, gratuity calculation guide, career transition advice, professional development",
};

const blogPosts = [
  {
    title: "Understanding Notice Periods: A Complete Guide",
    excerpt: "Learn everything about notice periods, their importance, and how to manage them effectively during job transitions.",
    slug: "understanding-notice-periods",
    date: "2025-04-20",
  },
  {
    title: "How to Calculate Gratuity: A Step-by-Step Guide",
    excerpt: "Master the art of calculating your gratuity with our comprehensive guide. Understand the formula and factors that affect your payout.",
    slug: "calculate-gratuity-guide",
    date: "2025-04-19",
  },
  {
    title: "Career Transition Tips: Making a Smooth Switch",
    excerpt: "Essential tips and strategies for making a successful career transition. Learn how to plan and execute your career change effectively.",
    slug: "career-transition-tips",
    date: "2025-04-18",
  },
];

export default function BlogPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Career Management Blog</h1>
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {blogPosts.map((post) => (
          <article key={post.slug} className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-2">
              <Link href={`/blog/${post.slug}`} className="hover:underline focus:underline">
                {post.title}
              </Link>
            </h2>
            <p className="text-gray-600 mb-4">{post.excerpt}</p>
            <time className="text-sm text-gray-500">{post.date}</time>
          </article>
        ))}
      </div>
    </div>
  );
} 