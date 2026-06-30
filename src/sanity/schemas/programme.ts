import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'programme',
  title: 'Programmes',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Programme Title', type: 'string', validation: Rule => Rule.required() }),
    defineField({ name: 'slug', title: 'Slug', type: 'slug', options: { source: 'title' } }),
    defineField({ name: 'pillar', title: 'Primary Pillar', type: 'string', options: { list: ['Sport', 'Conservation', 'Culture'] }, validation: Rule => Rule.required() }),
    defineField({ name: 'tagline', title: 'Tagline', type: 'string' }),
    defineField({ name: 'description', title: 'Description', type: 'text', rows: 5 }),
    defineField({ name: 'image', title: 'Programme Image', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'targetGroup', title: 'Target Group', type: 'string' }),
    defineField({ name: 'active', title: 'Currently Active', type: 'boolean', initialValue: true }),
    defineField({ name: 'order', title: 'Display Order', type: 'number' }),
  ],
  orderings: [{ title: 'Display Order', name: 'orderAsc', by: [{ field: 'order', direction: 'asc' }] }],
  preview: { select: { title: 'title', subtitle: 'pillar', media: 'image' } },
})
