import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'impactStat',
  title: 'Impact Stats',
  type: 'document',
  fields: [
    defineField({ name: 'label', title: 'Label', type: 'string', validation: Rule => Rule.required() }),
    // Store as string so team can write "2,400+" or "12 counties"
    defineField({ name: 'value', title: 'Value', type: 'string', validation: Rule => Rule.required() }),
    defineField({ name: 'pillar', title: 'Related Pillar', type: 'string', options: { list: ['Sport', 'Conservation', 'Culture', 'Overall'] } }),
    defineField({ name: 'order', title: 'Display Order', type: 'number' }),
  ],
  preview: { select: { title: 'label', subtitle: 'value' } },
})
