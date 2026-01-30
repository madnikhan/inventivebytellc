export interface Resource {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  body?: string;
}

export const staticResources: Resource[] = [
  {
    id: "what-is-saas-and-why-it-matters",
    slug: "what-is-saas-and-why-it-matters",
    title: "What Is SaaS and Why It Matters for Your Business",
    excerpt:
      "A short guide to software-as-a-service: what it is, how it's priced, and why it's a strong fit for scaling products.",
    date: "2025-01-15",
    category: "Guides",
    body: `
Software-as-a-Service (SaaS) is software that runs in the cloud and is accessed over the internet, usually via a subscription. Instead of buying and installing software once, you pay on a recurring basis and get updates and support included.

**Why it matters for your business:** SaaS reduces upfront cost, scales with usage, and lets you focus on your product instead of servers and upgrades. At InventiveByte LLC we build SaaS platforms that are secure, scalable, and ready to grow with you. If you're considering a new product or moving an existing one to a subscription model, we can help you scope and build it.
    `.trim(),
  },
  {
    id: "building-mvp-montana",
    slug: "building-mvp-montana",
    title: "Building an MVP from Montana: Our Approach",
    excerpt:
      "How we scope, design, and build minimum viable products so you can validate ideas and iterate with real users.",
    date: "2025-01-08",
    category: "Process",
    body: `
We treat an MVP as the smallest version of your product that delivers real value and lets you learn from users. Our approach: define the core problem, pick one primary user flow, build it well, then iterate based on feedback.

We scope with you up front so timelines and budget are clear, use modern stacks for fast iteration, and keep design and UX in mind from day one. Whether you're in Montana or anywhere else, we work remotely and collaborate closely so your MVP ships on a solid foundation.
    `.trim(),
  },
  {
    id: "choosing-tech-stack-2025",
    slug: "choosing-tech-stack-2025",
    title: "Choosing a Tech Stack in 2025",
    excerpt:
      "Frameworks, languages, and infrastructure we use for SaaS and web apps — and when we recommend what.",
    date: "2024-12-20",
    category: "Technical",
    body: `
There's no single "best" stack — it depends on your product, team, and goals. For most SaaS and web apps we use React or Next.js on the front end, Node or similar on the backend, and cloud providers (e.g. Vercel, AWS) for hosting and APIs. We choose based on maintainability, performance, and your long-term roadmap.

If you're starting a new project or refactoring an existing one, we can recommend and implement a stack that fits. Get in touch for a technical discussion.
    `.trim(),
  },
];
