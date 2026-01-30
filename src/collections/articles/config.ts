import type { CollectionConfig } from 'payload'
import { generateSlugHooks } from './hooks'

export const Articles: CollectionConfig = {
    slug: 'articles',
    fields: [
        {
            name: 'title',
            type: 'text',
            required: true,
            unique: true,
        },
        {
            name: 'slug',
            type: 'text',
            required: true,
            unique: true,
            hooks: {
                beforeValidate: [generateSlugHooks],
            },
        },
        {
            name: 'content',
            type: 'richText',
            required: true,
        },
    ],
}
