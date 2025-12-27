import {defineField, defineType} from 'sanity'

export const projectType = defineType({
  name: 'project',
  title: 'Project',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Project Name',
      type: 'string',
      validation: (rule) => rule.required().max(100),
      description: 'The name of your project',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
      validation: (rule) => rule.required(),
      description: 'URL-friendly version of the project name',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      validation: (rule) => rule.required().max(500),
      description: 'Brief description of the project (max 500 characters)',
    }),
    defineField({
      name: 'image',
      title: 'Project Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (rule) => rule.required(),
      description: 'Main image for the project',
    }),
    defineField({
      name: 'usedTechs',
      title: 'Technologies Used',
      type: 'array',
      of: [
        {
          type: 'string',
        },
      ],
      validation: (rule) => rule.required().min(1),
      description: 'List of technologies used in this project',
    }),
    defineField({
      name: 'demoUrl',
      title: 'Demo URL',
      type: 'url',
      description: 'Link to live demo (optional)',
    }),
    defineField({
      name: 'liveUrl',
      title: 'Live URL',
      type: 'url',
      description: 'Link to live/production site (optional)',
    }),
    defineField({
      name: 'githubUrl',
      title: 'GitHub URL',
      type: 'url',
      description: 'Link to GitHub repository (optional)',
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          {title: 'Web Development', value: 'web'},
          {title: 'Mobile App', value: 'mobile'},
          {title: 'Desktop Application', value: 'desktop'},
          {title: 'API/Backend', value: 'api'},
          {title: 'Cloud', value: 'cloud'},
          {title: 'DevOps', value: 'devops'},
          {title: 'Other', value: 'other'},
        ],
        layout: 'dropdown',
      },
      validation: (rule) => rule.required(),
      description: 'Project category',
    }),
    defineField({
      name: 'isFeatured',
      title: 'Featured Project',
      type: 'boolean',
      initialValue: false,
      description: 'Mark this project as featured to highlight it',
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Order in which this project should appear (lower numbers first)',
      initialValue: 0,
    }),
    defineField({
      name: 'createdAt',
      title: 'Created At',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
      validation: (rule) => rule.required(),
      description: 'When this project was created',
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'category',
      media: 'image',
      featured: 'isFeatured',
    },
    prepare({title, subtitle, media, featured}) {
      return {
        title: `${title}${featured ? ' ⭐' : ''}`,
        subtitle: subtitle?.toUpperCase(),
        media,
      }
    },
  },
  orderings: [
    {
      title: 'Featured First',
      name: 'featuredFirst',
      by: [
        {field: 'isFeatured', direction: 'desc'},
        {field: 'order', direction: 'asc'},
      ],
    },
    {
      title: 'Name A-Z',
      name: 'nameAsc',
      by: [{field: 'name', direction: 'asc'}],
    },
    {
      title: 'Created Date (Newest First)',
      name: 'createdAtDesc',
      by: [{field: 'createdAt', direction: 'desc'}],
    },
  ],
})
