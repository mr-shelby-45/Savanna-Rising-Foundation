import { defineField, defineType } from 'sanity'

const teamMember = defineType({
  name: 'teamMember',
  title: 'Team & Board',
  type: 'document',
  fields: [
    defineField({ name: 'name', title: 'Full Name', type: 'string', validation: Rule => Rule.required() }),
    defineField({ name: 'role', title: 'Role / Title', type: 'string', validation: Rule => Rule.required() }),
    defineField({ name: 'type', title: 'Type', type: 'string', options: { list: ['Team', 'Board', 'Advisory'] } }),
    defineField({ name: 'bio', title: 'Short Bio', type: 'text', rows: 3 }),
    defineField({ name: 'photo', title: 'Photo', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'order', title: 'Display Order', type: 'number' }),
  ],
  preview: { select: { title: 'name', subtitle: 'role', media: 'photo' } },
})

export default teamMember
