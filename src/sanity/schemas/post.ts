import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'post',
  title: 'News & Blog',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Title', type: 'string', validation: Rule => Rule.required() }),
    defineField({ name: 'slug', title: 'Slug', type: 'slug', options: { source: 'title' }, validation: Rule => Rule.required() }),
    defineField({ name: 'publishedAt', title: 'Published At', type: 'datetime', validation: Rule => Rule.required() }),
    defineField({ name: 'excerpt', title: 'Excerpt', type: 'text', rows: 3 }),
    defineField({ name: 'coverImage', title: 'Cover Image', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'pillar', title: 'Pillar', type: 'string', options: { list: ['Sport', 'Conservation', 'Culture', 'General'] } }),
    defineField({ name: 'body', title: 'Body', type: 'array', of: [{ type: 'block' }, { type: 'image', options: { hotspot: true } }] }),
  ],
  preview: { select: { title: 'title', subtitle: 'publishedAt', media: 'coverImage' } },
})
