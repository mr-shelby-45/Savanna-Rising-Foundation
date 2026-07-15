// All Sanity GROQ queries in one place.
// Import these into your page components alongside sanityFetch.

export const postsQuery = `
  *[_type == "post"] | order(publishedAt desc) {
    _id, title, slug, publishedAt, excerpt, pillar,
    coverImage { asset->{ url }, alt }
  }
`

export const postBySlugQuery = `
  *[_type == "post" && slug.current == $slug][0] {
    _id, title, publishedAt, pillar, body,
    coverImage { asset->{ url }, alt }
  }
`

export const eventsQuery = `
  *[_type == "event"] | order(date asc) {
    _id, title, slug, date, location, county, description, pillar, registrationLink,
    image { asset->{ url }, alt }
  }
`

export const upcomingEventsQuery = `
  *[_type == "event" && date >= now()] | order(date asc)[0...3] {
    _id, title, date, location, county, pillar
  }
`

export const programmesQuery = `
  *[_type == "programme" && active == true] | order(order asc) {
    _id, title, slug, pillar, tagline, description, targetGroup,
    image { asset->{ url }, alt }
  }
`

export const teamQuery = `
  *[_type == "teamMember"] | order(order asc) {
    _id, name, role, type, bio,
    photo { asset->{ url }, alt }
  }
`

export const impactStatsQuery = `
  *[_type == "impactStat"] | order(order asc) {
    _id, label, value, pillar
  }
`

export const featuredStoriesQuery = `
  *[_type == "story" && featured == true][0...3] {
    _id, name, quote, location, pillar,
    photo { asset->{ url }, alt }
  }
`

export const allStoriesQuery = `
  *[_type == "story"] | order(_createdAt desc) {
    _id, name, quote, location, pillar, featured, fullStory,
    photo { asset->{ url }, alt }
  }
`
