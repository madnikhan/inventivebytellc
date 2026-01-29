export default {
  name: 'testimonial',
  title: 'Testimonial',
  type: 'document',
  fields: [
    {
      name: 'quote',
      title: 'Quote',
      type: 'text',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'author',
      title: 'Author Name',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'role',
      title: 'Role/Title',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'company',
      title: 'Company',
      type: 'string',
    },
    {
      name: 'avatar',
      title: 'Avatar',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'rating',
      title: 'Rating',
      type: 'number',
      validation: (Rule: any) => Rule.min(1).max(5).integer(),
      description: 'Rating from 1 to 5 stars',
    },
    {
      name: 'type',
      title: 'Type',
      type: 'string',
      options: {
        list: [
          { title: 'Client', value: 'client' },
          { title: 'Project', value: 'project' },
        ],
        layout: 'radio',
      },
      initialValue: 'client',
    },
    {
      name: 'project',
      title: 'Related Project',
      type: 'reference',
      to: [{ type: 'portfolio' }],
      description: 'Link this testimonial to a portfolio project (optional)',
    },
  ],
  preview: {
    select: {
      author: 'author',
      role: 'role',
      company: 'company',
      type: 'type',
      media: 'avatar',
    },
    prepare({ author, role, company, type, media }: any) {
      return {
        title: author,
        subtitle: `${role}${company ? ` at ${company}` : ''} • ${type || 'client'}`,
        media,
      };
    },
  },
};
