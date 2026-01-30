export default {
  name: 'resource',
  title: 'Resource / Blog Post',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
      rows: 3,
      description: 'Short summary for the list view and SEO.',
    },
    {
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Guides', value: 'Guides' },
          { title: 'Process', value: 'Process' },
          { title: 'Technical', value: 'Technical' },
          { title: 'Company', value: 'Company' },
        ],
      },
    },
    {
      name: 'publishedAt',
      title: 'Published At',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    },
    {
      name: 'body',
      title: 'Body',
      type: 'text',
      rows: 12,
      description: 'Full article content. You can use **bold** and other markdown.',
    },
  ],
  preview: {
    select: {
      title: 'title',
      category: 'category',
      publishedAt: 'publishedAt',
    },
    prepare({ title, category, publishedAt }: { title: string; category?: string; publishedAt?: string }) {
      const date = publishedAt ? new Date(publishedAt).toLocaleDateString() : '';
      return {
        title: title || 'Untitled',
        subtitle: [category, date].filter(Boolean).join(' · '),
      };
    },
  },
};
