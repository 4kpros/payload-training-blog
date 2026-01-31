import type { CollectionConfig } from 'payload'
import { generateSlugHook } from './hooks/generate-slug'
import { generateContentSummaryHook } from './hooks/generate-content-summary.ts'
import { convertLexicalToPlaintext } from '@payloadcms/richtext-lexical/plaintext'
import { ARTICLE_STATUS_OPTIONS } from './constants'

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
                beforeValidate: [generateSlugHook],
            },
        },
        {
            name: 'content',
            type: 'richText',
            required: true,
        },
        {
            name: 'contentSummary',
            type: 'textarea',
            required: true,
            hooks: {
                beforeValidate: [generateContentSummaryHook],
            },
        },
        {
            name: 'readTimeInMinutes',
            type: 'number',
            defaultValue: 0,
            hooks: {
                beforeValidate: [
                    ({ siblingData }) => {
                        delete siblingData.readTimeInMinutes
                    },
                ],
                afterRead: [
                    ({ data }) => {
                        const text = convertLexicalToPlaintext({ data: data?.content })
                        const wordsPerMinutes = 200
                        const words = text.trim().split(/\s+/).length
                        return Math.max(1, Math.ceil(words / wordsPerMinutes))
                    },
                ],
            },
        },
        {
            name: 'covertImage',
            type: 'upload',
            relationTo: 'media',
            required: true,
        },
        {
            name: 'author',
            type: 'relationship',
            relationTo: 'authors',
            required: true,
        },
        {
            name: 'status',
            type: 'select',
            options: Object.values(ARTICLE_STATUS_OPTIONS),
            defaultValue: ARTICLE_STATUS_OPTIONS.DRAFT,
            required: true,
        },
        {
            name: 'publishedAt',
            type: 'date',
            required: true,
            admin: {
                condition: (data) => data?.status === ARTICLE_STATUS_OPTIONS.PUBLISHED,
                date: { pickerAppearance: 'dayAndTime' },
            },
        },
    ],
}
