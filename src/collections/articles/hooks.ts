import { Article } from '@/payload-types'
import type { FieldHook } from 'payload'
import { slugify } from 'payload/shared'

export const generateSlugHooks: FieldHook<Article, string> = ({ value, data }) => {
    if (value) return slugify(value) || ''

    return slugify(data?.title?.trim() || '') || ''
}
