import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'story',
  title: 'Impact Stories',
  type: 'document',
  fields: [
    defineField({ name: 'name', title: 'Person\'s Name', type: 'string', validation: Rule => Rule.required() }),
    defineField({ name: 'quote', title: 'Quote', type: 'text', rows: 3, validation: Rule => Rule.required() }),
    defineField({ name: 'location', title: 'Location / County', type: 'string' }),
    defineField({ name: 'photo', title: 'Photo', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'pillar', title: 'Pillar', type: 'string', options: { list: ['Sport', 'Conservation', 'Culture'] } }),
    defineField({ name: 'fullStory', title: 'Full Story', type: 'array', of: [{ type: 'block' }] }),
    defineField({ name: 'featured', title: 'Feature on Homepage', type: 'boolean', initialValue: false }),
  ],
  preview: { select: { title: 'name', subtitle: 'location', media: 'photo' } },
})
