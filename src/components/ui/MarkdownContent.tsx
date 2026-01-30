"use client";

import ReactMarkdown from "react-markdown";

const markdownClasses = {
  // Headings
  h1: "text-2xl font-bold text-white mt-8 mb-4 first:mt-0",
  h2: "text-xl font-bold text-white mt-6 mb-3",
  h3: "text-lg font-semibold text-white mt-5 mb-2",
  h4: "text-base font-semibold text-white mt-4 mb-2",
  // Paragraphs
  p: "text-gray-300 leading-relaxed mb-4 last:mb-0",
  // Lists: proper indentation and spacing
  ul: "list-disc list-outside pl-6 mb-4 space-y-2 text-gray-300",
  ol: "list-decimal list-outside pl-6 mb-4 space-y-2 text-gray-300",
  li: "leading-relaxed pl-1",
  // Inline
  strong: "font-semibold text-white",
  em: "italic text-gray-200",
  code: "px-1.5 py-0.5 rounded bg-white/10 text-[#00D9FF] text-sm font-mono",
  // Block code
  pre: "p-4 rounded-xl bg-black/40 border border-white/10 overflow-x-auto mb-4",
  // Links
  a: "text-[#00D9FF] hover:underline underline-offset-2",
  // Horizontal rule
  hr: "border-white/10 my-6",
};

interface MarkdownContentProps {
  content: string;
  className?: string;
}

export default function MarkdownContent({ content, className = "" }: MarkdownContentProps) {
  return (
    <div className={`prose prose-invert max-w-none ${className}`}>
      <ReactMarkdown
        components={{
          h1: ({ children }) => <h1 className={markdownClasses.h1}>{children}</h1>,
          h2: ({ children }) => <h2 className={markdownClasses.h2}>{children}</h2>,
          h3: ({ children }) => <h3 className={markdownClasses.h3}>{children}</h3>,
          h4: ({ children }) => <h4 className={markdownClasses.h4}>{children}</h4>,
          p: ({ children }) => <p className={markdownClasses.p}>{children}</p>,
          ul: ({ children }) => <ul className={markdownClasses.ul}>{children}</ul>,
          ol: ({ children }) => <ol className={markdownClasses.ol}>{children}</ol>,
          li: ({ children }) => <li className={markdownClasses.li}>{children}</li>,
          strong: ({ children }) => <strong className={markdownClasses.strong}>{children}</strong>,
          em: ({ children }) => <em className={markdownClasses.em}>{children}</em>,
          code: ({ className: _, ...props }) => (
            <code className={markdownClasses.code} {...props} />
          ),
          pre: ({ children }) => <pre className={markdownClasses.pre}>{children}</pre>,
          a: ({ href, children }) => (
            <a href={href} target="_blank" rel="noopener noreferrer" className={markdownClasses.a}>
              {children}
            </a>
          ),
          hr: () => <hr className={markdownClasses.hr} />,
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
