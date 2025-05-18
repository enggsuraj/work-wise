import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";

const blogPosts = {
  "understanding-notice-periods": {
    title: "Understanding Notice Periods: A Complete Guide",
    content: `
      <h2 class="text-2xl font-semibold mt-8 mb-4 text-gray-800">What is a Notice Period?</h2>
      <p class="text-gray-700 leading-relaxed mb-6">A notice period is the time between when you inform your employer about your intention to leave and your actual last working day. It's a crucial part of the job transition process that helps maintain professional relationships and ensures a smooth handover.</p>

      <h2 class="text-2xl font-semibold mt-8 mb-4 text-gray-800">Why Notice Periods Matter</h2>
      <p class="text-gray-700 leading-relaxed mb-4">Notice periods serve several important purposes:</p>
      <ul class="list-disc pl-6 mb-6 space-y-2 text-gray-700">
        <li>Allows time for knowledge transfer</li>
        <li>Helps in finding and training your replacement</li>
        <li>Maintains professional relationships</li>
        <li>Ensures smooth project transitions</li>
      </ul>

      <h2 class="text-2xl font-semibold mt-8 mb-4 text-gray-800">How to Calculate Your Notice Period</h2>
      <p class="text-gray-700 leading-relaxed mb-4">Your notice period is typically specified in your employment contract. Common durations include:</p>
      <ul class="list-disc pl-6 mb-6 space-y-2 text-gray-700">
        <li>30 days (1 month)</li>
        <li>60 days (2 months)</li>
        <li>90 days (3 months)</li>
      </ul>

      <h2 class="text-2xl font-semibold mt-8 mb-4 text-gray-800">Tips for Managing Your Notice Period</h2>
      <ol class="list-decimal pl-6 mb-6 space-y-2 text-gray-700">
        <li>Plan your transition carefully</li>
        <li>Document your responsibilities</li>
        <li>Train your replacement</li>
        <li>Complete pending tasks</li>
        <li>Maintain professional conduct</li>
      </ol>

      <h2 class="text-2xl font-semibold mt-8 mb-4 text-gray-800">Common Notice Period Challenges</h2>
      <p class="text-gray-700 leading-relaxed mb-4">During your notice period, you might face various challenges:</p>
      <ul class="list-disc pl-6 mb-6 space-y-2 text-gray-700">
        <li>Balancing current and future responsibilities</li>
        <li>Managing team dynamics</li>
        <li>Handling exit interviews</li>
        <li>Completing documentation</li>
      </ul>

      <h2 class="text-2xl font-semibold mt-8 mb-4 text-gray-800">Conclusion</h2>
      <p class="text-gray-700 leading-relaxed mb-6">A well-managed notice period is crucial for maintaining professional relationships and ensuring a smooth transition. Use this time effectively to wrap up your responsibilities and prepare for your next role.</p>
    `,
    date: "2025-04-20",
    author: "WorkWise Team",
    readTime: "8 min read"
  },
  "calculate-gratuity-guide": {
    title: "How to Calculate Gratuity: A Step-by-Step Guide",
    content: `
      <h2 class="text-2xl font-semibold mt-8 mb-4 text-gray-800">What is Gratuity?</h2>
      <p class="text-gray-700 leading-relaxed mb-6">Gratuity is a monetary benefit given by an employer to an employee for services rendered in the company. It's a form of appreciation and financial security provided to employees who have completed at least 5 years of service.</p>

      <h2 class="text-2xl font-semibold mt-8 mb-4 text-gray-800">Gratuity Calculation Formula</h2>
      <p class="text-gray-700 leading-relaxed mb-4">The basic formula for calculating gratuity is:</p>
      <div class="bg-gray-100 p-4 rounded-lg mb-6">
        <p class="text-gray-800 font-mono">Gratuity = (Last drawn salary × Years of service × 15) / 26</p>
      </div>
      <p class="text-gray-700 leading-relaxed mb-6">Where:</p>
      <ul class="list-disc pl-6 mb-6 space-y-2 text-gray-700">
        <li>Last drawn salary = Basic salary + Dearness Allowance</li>
        <li>Years of service = Total number of years worked</li>
        <li>15 = Number of days salary per year</li>
        <li>26 = Number of working days in a month</li>
      </ul>

      <h2 class="text-2xl font-semibold mt-8 mb-4 text-gray-800">Factors Affecting Gratuity</h2>
      <ul class="list-disc pl-6 mb-6 space-y-2 text-gray-700">
        <li>Length of service</li>
        <li>Last drawn salary</li>
        <li>Company policies</li>
        <li>Employment type (permanent/contract)</li>
      </ul>

      <h2 class="text-2xl font-semibold mt-8 mb-4 text-gray-800">Tax Implications</h2>
      <p class="text-gray-700 leading-relaxed mb-4">Understanding the tax aspects of gratuity:</p>
      <ul class="list-disc pl-6 mb-6 space-y-2 text-gray-700">
        <li>Tax exemption up to ₹20 lakhs</li>
        <li>Different rules for government and private sector employees</li>
        <li>Tax implications for early withdrawal</li>
      </ul>

      <h2 class="text-2xl font-semibold mt-8 mb-4 text-gray-800">Tips for Maximizing Gratuity</h2>
      <ol class="list-decimal pl-6 mb-6 space-y-2 text-gray-700">
        <li>Understand your company's gratuity policy</li>
        <li>Keep track of your service duration</li>
        <li>Plan your exit timing</li>
        <li>Consider tax implications</li>
      </ol>

      <h2 class="text-2xl font-semibold mt-8 mb-4 text-gray-800">Conclusion</h2>
      <p class="text-gray-700 leading-relaxed mb-6">Understanding gratuity calculation is essential for financial planning. Use our gratuity calculator to estimate your payout and make informed decisions about your career transitions.</p>
    `,
    date: "2025-04-19",
    author: "WorkWise Team",
    readTime: "10 min read"
  },
  "career-transition-tips": {
    title: "Career Transition Tips: Making a Smooth Switch",
    content: `
      <h2 class="text-2xl font-semibold mt-8 mb-4 text-gray-800">Understanding Career Transitions</h2>
      <p class="text-gray-700 leading-relaxed mb-6">Career transitions are significant life changes that require careful planning and execution. Whether you're switching industries, roles, or companies, a well-planned transition can lead to better opportunities and personal growth.</p>

      <h2 class="text-2xl font-semibold mt-8 mb-4 text-gray-800">Pre-Transition Planning</h2>
      <ol class="list-decimal pl-6 mb-6 space-y-2 text-gray-700">
        <li>Self-assessment and goal setting</li>
        <li>Research new opportunities</li>
        <li>Skill gap analysis</li>
        <li>Financial planning</li>
        <li>Timeline creation</li>
      </ol>

      <h2 class="text-2xl font-semibold mt-8 mb-4 text-gray-800">Essential Skills for Career Transition</h2>
      <ul class="list-disc pl-6 mb-6 space-y-2 text-gray-700">
        <li>Adaptability and flexibility</li>
        <li>Continuous learning</li>
        <li>Networking abilities</li>
        <li>Communication skills</li>
        <li>Problem-solving capabilities</li>
      </ul>

      <h2 class="text-2xl font-semibold mt-8 mb-4 text-gray-800">Managing the Transition Period</h2>
      <p class="text-gray-700 leading-relaxed mb-4">Key aspects to focus on during transition:</p>
      <ul class="list-disc pl-6 mb-6 space-y-2 text-gray-700">
        <li>Maintaining professional relationships</li>
        <li>Documenting your achievements</li>
        <li>Updating your professional profiles</li>
        <li>Preparing for interviews</li>
        <li>Handling notice period effectively</li>
      </ul>

      <h2 class="text-2xl font-semibold mt-8 mb-4 text-gray-800">Common Challenges and Solutions</h2>
      <div class="bg-gray-100 p-4 rounded-lg mb-6">
        <ul class="list-disc pl-6 space-y-2 text-gray-700">
          <li><strong>Challenge:</strong> Skill gaps
            <br/><span class="text-gray-600">Solution: Online courses and certifications</span>
          </li>
          <li><strong>Challenge:</strong> Financial uncertainty
            <br/><span class="text-gray-600">Solution: Emergency fund and budget planning</span>
          </li>
          <li><strong>Challenge:</strong> Emotional stress
            <br/><span class="text-gray-600">Solution: Support network and self-care</span>
          </li>
        </ul>
      </div>

      <h2 class="text-2xl font-semibold mt-8 mb-4 text-gray-800">Tools and Resources</h2>
      <ul class="list-disc pl-6 mb-6 space-y-2 text-gray-700">
        <li>Professional networking platforms</li>
        <li>Online learning platforms</li>
        <li>Career counseling services</li>
        <li>Industry-specific forums</li>
        <li>Resume and cover letter tools</li>
      </ul>

      <h2 class="text-2xl font-semibold mt-8 mb-4 text-gray-800">Conclusion</h2>
      <p class="text-gray-700 leading-relaxed mb-6">A successful career transition requires careful planning, continuous learning, and adaptability. Use these tips and tools to navigate your career change effectively and achieve your professional goals.</p>
    `,
    date: "2025-04-18",
    author: "WorkWise Team",
    readTime: "12 min read"
  }
};

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = blogPosts[params.slug as keyof typeof blogPosts];
  
  return {
    title: post?.title || "Blog Post Not Found",
    description: "A comprehensive guide to understanding notice periods in professional settings.",
    openGraph: {
      title: post?.title,
      description: "A comprehensive guide to understanding notice periods in professional settings.",
      type: "article",
      publishedTime: post?.date,
      authors: [post?.author || "WorkWise Team"],
    }
  };
}

export default function BlogPost({ params }: { params: { slug: string } }) {
  const post = blogPosts[params.slug as keyof typeof blogPosts];

  if (!post) {
    return (
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-6 text-gray-900">Post Not Found</h1>
        <p className="text-gray-700 mb-6">The blog post you're looking for doesn't exist.</p>
        <Link href="/blog" className="text-blue-600 hover:text-blue-800 transition-colors">
          ← Back to Blog
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 max-w-4xl">
        <Link 
          href="/blog"
          className="inline-flex items-center text-gray-700 hover:underline focus:underline mb-8"
        >
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Blog
        </Link>
        
        <article className="bg-white rounded-xl shadow-lg p-8 md:p-12">
          <header className="mb-12 border-b border-gray-200 pb-8">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 leading-tight">
              {post.title}
            </h1>
            <div className="flex flex-wrap items-center text-gray-600 text-sm gap-4">
              <div className="flex items-center">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                {post.author}
              </div>
              <div className="flex items-center">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                {post.date}
              </div>
              <div className="flex items-center">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {post.readTime}
              </div>
            </div>
          </header>

          <div 
            className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-p:text-gray-700 prose-li:text-gray-700"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </article>
      </div>
    </div>
  );
} 