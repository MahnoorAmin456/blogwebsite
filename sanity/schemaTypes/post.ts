import { defineField } from "sanity";

export default {
  name: 'post',
  type: 'document',
  title: 'Post',
  fields: [
  defineField ( {
      name: 'title',
      type: 'string',
      title: 'Title',
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      title: 'Slug',
      options: { source: 'title', maxLength: 96 },
    }),
    {
      name: 'content',
      type: 'array',
      title: 'Content',
      of: [{ type: 'block' }], // Rich text content
    },
    {
      name: 'mainImage',
      type: 'image',
      title: 'Main Image',
      options: { hotspot: true },
    },
    {
      name: 'author',
      type: 'reference',
      to: [{ type: 'author' }],
    },
    {
      name: 'createdAt',
      type: 'datetime',
      title: 'Created At',
      description: 'The date and time when the post was created',
      options: {
        dateFormat: 'YYYY-MM-DD',
        timeFormat: 'HH:mm',
        calendarTodayLabel: 'Today',
      },
    },
  ],
};
