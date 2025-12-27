import {defineField, defineType} from 'sanity'

export const aboutType = defineType({
  name: 'about',
  title: 'About Me',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Section Title',
      type: 'string',
      initialValue: 'About Me',
      validation: (rule) => rule.required(),
      description: 'Title for the about section',
    }),
    defineField({
      name: 'currentRole',
      title: 'Current Role',
      type: 'string',
      validation: (rule) => rule.required().max(100),
      description: 'Your current job title or role (e.g., "Full Stack Developer")',
    }),
    defineField({
      name: 'description',
      title: 'About Me Description',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [
            {title: 'Normal', value: 'normal'},
            {title: 'H3', value: 'h3'},
            {title: 'H4', value: 'h4'},
            {title: 'Quote', value: 'blockquote'},
          ],
          marks: {
            decorators: [
              {title: 'Strong', value: 'strong'},
              {title: 'Emphasis', value: 'em'},
              {title: 'Code', value: 'code'},
            ],
            annotations: [
              {
                title: 'URL',
                name: 'link',
                type: 'object',
                fields: [
                  {
                    title: 'URL',
                    name: 'href',
                    type: 'url',
                  },
                ],
              },
            ],
          },
        },
      ],
      validation: (rule) => rule.required(),
      description: 'Rich text description about yourself, your background, skills, and interests',
    }),
    defineField({
      name: 'profileImage',
      title: 'Profile Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      description: 'Your profile photo (optional)',
    }),
    defineField({
      name: 'skills',
      title: 'Key Skills',
      type: 'array',
      of: [
        {
          type: 'string',
        },
      ],
      description: 'List of your main skills and technologies',
    }),
    defineField({
      name: 'experience',
      title: 'Years of Experience',
      type: 'number',
      description: 'Number of years of professional experience (optional)',
    }),
    defineField({
      name: 'location',
      title: 'Location',
      type: 'string',
      description: 'Your current location (optional)',
    }),
    defineField({
      name: 'email',
      title: 'Email',
      type: 'email',
      description: 'Contact email (optional)',
    }),
    defineField({
      name: 'socialLinks',
      title: 'Social Links',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'socialLink',
          title: 'Social Link',
          fields: [
            {
              name: 'platform',
              title: 'Platform',
              type: 'string',
              options: {
                list: [
                  {title: 'LinkedIn', value: 'linkedin'},
                  {title: 'GitHub', value: 'github'},
                  {title: 'Twitter/X', value: 'twitter'},
                  {title: 'Instagram', value: 'instagram'},
                  {title: 'Portfolio Website', value: 'website'},
                  {title: 'Other', value: 'other'},
                ],
              },
              validation: (rule) => rule.required(),
            },
            {
              name: 'url',
              title: 'URL',
              type: 'url',
              validation: (rule) => rule.required(),
            },
            {
              name: 'label',
              title: 'Custom Label',
              type: 'string',
              description: 'Custom label (only needed for "Other" platform)',
            },
          ],
          preview: {
            select: {
              platform: 'platform',
              url: 'url',
              label: 'label',
            },
            prepare({platform, url, label}) {
              return {
                title: label || platform,
                subtitle: url,
              }
            },
          },
        },
      ],
      description: 'Your social media and professional links',
    }),
    defineField({
      name: 'isActive',
      title: 'Active',
      type: 'boolean',
      initialValue: true,
      description: 'Set to false to hide this about section',
    }),
    defineField({
      name: 'updatedAt',
      title: 'Last Updated',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
      description: 'When this about section was last updated',
    }),
  ],
  preview: {
    select: {
      title: 'currentRole',
      subtitle: 'title',
      media: 'profileImage',
    },
    prepare({title, subtitle, media}) {
      return {
        title: title || 'About Me',
        subtitle,
        media,
      }
    },
  },
})
