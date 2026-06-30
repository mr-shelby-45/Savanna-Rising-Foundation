import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'event',
  title: 'Events',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Event Title', type: 'string', validation: Rule => Rule.required() }),
    defineField({ name: 'slug', title: 'Slug', type: 'slug', options: { source: 'title' } }),
    defineField({ name: 'date', title: 'Date', type: 'datetime', validation: Rule => Rule.required() }),
    defineField({ name: 'location', title: 'Location', type: 'string' }),
    defineField({ name: 'county', title: 'County', type: 'string' }),
    defineField({ name: 'description', title: 'Description', type: 'text', rows: 4 }),
    defineField({ name: 'image', title: 'Event Image', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'pillar', title: 'Pillar', type: 'string', options: { list: ['Sport', 'Conservation', 'Culture', 'All Three'] } }),
    defineField({ name: 'registrationLink', title: 'Registration Link', type: 'url' }),
  ],
  orderings: [{ title: 'Date, Newest', name: 'dateDesc', by: [{ field: 'date', direction: 'desc' }] }],
  preview: { select: { title: 'title', subtitle: 'date', media: 'image' } },
})
