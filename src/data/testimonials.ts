export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
  company?: string;
  projectId?: string;
  avatar?: string;
  rating?: number;
  type: 'client' | 'project';
  /** When true, show Google Review badge for authenticity */
  isGoogleReview?: boolean;
}

export const testimonials: Testimonial[] = [
  {
    id: "testimonial-1",
    quote: "InventiveByte delivered an exceptional SaaS platform that transformed our business operations. Their attention to detail and technical expertise is unmatched. The platform has been running flawlessly since launch.",
    author: "Sarah Johnson",
    role: "CEO",
    company: "TechCorp Inc.",
    projectId: "inventix-studio",
    type: "client",
    rating: 5
  },
  {
    id: "testimonial-2",
    quote: "Working with InventiveByte was a game-changer. They understood our vision and brought it to life with a beautiful, functional web application. The team is professional, responsive, and truly cares about the project's success.",
    author: "Michael Chen",
    role: "Founder",
    company: "StartupXYZ",
    projectId: "zaptools",
    type: "client",
    rating: 5
  },
  {
    id: "testimonial-3",
    quote: "The e-commerce platform they built for us exceeded all expectations. Sales increased by 300% in the first quarter, and the user experience is outstanding. Highly recommend their services!",
    author: "Emily Rodriguez",
    role: "E-Commerce Director",
    company: "RetailPlus",
    projectId: "ecommerce-platform",
    type: "project",
    rating: 5
  },
  {
    id: "testimonial-4",
    quote: "InventiveByte's analytics dashboard gave us insights we never had before. The real-time data visualization and customizable reports have been invaluable for our decision-making process.",
    author: "David Kim",
    role: "Data Analyst",
    company: "DataDriven Co.",
    projectId: "dashboard-analytics",
    type: "project",
    rating: 5
  },
  {
    id: "testimonial-5",
    quote: "The mobile app they developed is intuitive, fast, and beautifully designed. Our users love it, and we've seen a significant increase in engagement. The team was great to work with throughout the entire process.",
    author: "Lisa Anderson",
    role: "Product Manager",
    company: "MobileFirst Solutions",
    projectId: "mobile-app",
    type: "project",
    rating: 5
  },
  {
    id: "testimonial-6",
    quote: "Outstanding work on our recruitment platform. The modern interface and powerful features have made hiring so much easier. InventiveByte truly understands how to build platforms that users love.",
    author: "James Wilson",
    role: "HR Director",
    company: "TalentHub UK",
    projectId: "britrecruit",
    type: "client",
    rating: 5
  }
];
