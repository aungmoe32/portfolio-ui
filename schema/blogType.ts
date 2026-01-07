import {defineField, defineType} from 'sanity'

export const blogType = defineType({
  name: 'blog',
  title: 'Blog Post',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Blog Title',
      type: 'string',
      validation: (rule) => rule.required().max(100),
      description: 'The title of your blog post',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (rule) => rule.required(),
      description: 'URL-friendly version of the blog title',
    }),
    defineField({
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
      validation: (rule) => rule.required().max(300),
      description: 'Brief excerpt or summary of the blog post (max 300 characters)',
    }),
    defineField({
      name: 'content',
      title: 'Content (Markdown)',
      type: 'text',
      rows: 20,
      validation: (rule) => rule.required(),
      description: 'The main content of your blog post in Markdown format',
    }),
    defineField({
      name: 'featuredImage',
      title: 'Featured Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (rule) => rule.required(),
      description: 'Main featured image for the blog post',
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          {title: 'Technology', value: 'technology'},
          {title: 'Web Development', value: 'web-development'},
          {title: 'Mobile Development', value: 'mobile-development'},
          {title: 'Programming', value: 'programming'},
          {title: 'Cloud', value: 'cloud'},
          {title: 'DevOps', value: 'devops'},
          {title: 'Career', value: 'career'},
          {title: 'Tutorial', value: 'tutorial'},
          {title: 'Opinion', value: 'opinion'},
          {title: 'News', value: 'news'},
          {title: 'Personal', value: 'personal'},
          {title: 'Other', value: 'other'},
        ],
        layout: 'dropdown',
      },
      validation: (rule) => rule.required(),
      description: 'Blog post category',
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [
        {
          type: 'string',
        },
      ],
      description: 'Tags related to this blog post',
    }),
    defineField({
      name: 'likeCount',
      title: 'Like Count',
      type: 'number',
      initialValue: 0,
      validation: (rule) => rule.min(0),
      description: 'Number of likes for this blog post',
    }),
    defineField({
      name: 'author',
      title: 'Author',
      type: 'string',
      description: 'Author of the blog post (optional)',
    }),
    defineField({
      name: 'isPublished',
      title: 'Published',
      type: 'boolean',
      initialValue: false,
      description: 'Set to true to publish this blog post',
    }),
    defineField({
      name: 'isFeatured',
      title: 'Featured Post',
      type: 'boolean',
      initialValue: false,
      description: 'Mark this blog post as featured to highlight it',
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published At',
      type: 'datetime',
      description: 'When this blog post was published',
    }),
    defineField({
      name: 'createdAt',
      title: 'Created At',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
      validation: (rule) => rule.required(),
      description: 'When this blog post was created',
    }),
    defineField({
      name: 'updatedAt',
      title: 'Last Updated',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
      description: 'When this blog post was last updated',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'category',
      media: 'featuredImage',
      published: 'isPublished',
      featured: 'isFeatured',
      likeCount: 'likeCount',
    },
    prepare({title, subtitle, media, published, featured, likeCount}) {
      const status = published ? '✅' : '📝'
      const featuredIcon = featured ? ' ⭐' : ''
      const likes = likeCount > 0 ? ` (${likeCount} ❤️)` : ''

      return {
        title: `${status} ${title}${featuredIcon}${likes}`,
        subtitle: subtitle?.replace('-', ' ').toUpperCase(),
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
        {field: 'publishedAt', direction: 'desc'},
      ],
    },
    {
      title: 'Most Liked',
      name: 'mostLiked',
      by: [{field: 'likeCount', direction: 'desc'}],
    },
    {
      title: 'Published Date (Newest First)',
      name: 'publishedAtDesc',
      by: [{field: 'publishedAt', direction: 'desc'}],
    },
    {
      title: 'Title A-Z',
      name: 'titleAsc',
      by: [{field: 'title', direction: 'asc'}],
    },
    {
      title: 'Category',
      name: 'categoryAsc',
      by: [
        {field: 'category', direction: 'asc'},
        {field: 'publishedAt', direction: 'desc'},
      ],
    },
  ],
})
