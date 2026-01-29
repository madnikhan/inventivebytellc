export default {
  name: 'portfolio',
  title: 'Portfolio Project',
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
      name: 'description',
      title: 'Short Description',
      type: 'text',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'longDescription',
      title: 'Long Description',
      type: 'text',
    },
    {
      name: 'images',
      title: 'Images',
      type: 'array',
      of: [
        {
          type: 'image',
          options: {
            hotspot: true,
          },
          fields: [
            {
              name: 'alt',
              type: 'string',
              title: 'Alternative Text',
            },
          ],
        },
      ],
    },
    {
      name: 'video',
      title: 'Video URL',
      type: 'url',
      description: 'URL to video demo (YouTube, Vimeo, or direct link)',
    },
    {
      name: 'websiteLink',
      title: 'Website Link',
      type: 'url',
    },
    {
      name: 'githubLink',
      title: 'GitHub Link',
      type: 'url',
    },
    {
      name: 'techStack',
      title: 'Tech Stack',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags',
      },
    },
    {
      name: 'category',
      title: 'Categories',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        list: [
          { title: 'SaaS', value: 'SaaS' },
          { title: 'Web App', value: 'Web App' },
          { title: 'Mobile', value: 'Mobile' },
          { title: 'Full Stack', value: 'Full Stack' },
          { title: 'Frontend', value: 'Frontend' },
          { title: 'E-Commerce', value: 'E-Commerce' },
          { title: 'Platform', value: 'Platform' },
          { title: 'Dashboard', value: 'Dashboard' },
          { title: 'Data Visualization', value: 'Data Visualization' },
          { title: 'Tools', value: 'Tools' },
          { title: 'Cross-Platform', value: 'Cross-Platform' },
          { title: 'App', value: 'App' },
        ],
        layout: 'tags',
      },
    },
    {
      name: 'date',
      title: 'Completion Date',
      type: 'date',
    },
    {
      name: 'featured',
      title: 'Featured',
      type: 'boolean',
      description: 'Show this project in featured sections',
      initialValue: false,
    },
  ],
  preview: {
    select: {
      title: 'title',
      media: 'images.0',
      featured: 'featured',
    },
    prepare({ title, media, featured }: any) {
      return {
        title,
        subtitle: featured ? '⭐ Featured' : 'Portfolio Project',
        media,
      };
    },
  },
};
