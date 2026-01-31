import { CollectionConfig } from 'payload'
import { AUTHOR_ROLE_OPTIONS } from './constants'

export const Authors: CollectionConfig = {
    slug: 'authors',
    fields: [
        {
            name: 'name',
            type: 'text',
            required: true,
            unique: true,
        },
        {
            name: 'cover',
            type: 'upload',
            relationTo: 'media',
            required: true,
        },
        {
            name: 'role',
            type: 'select',
            options: Object.values(AUTHOR_ROLE_OPTIONS),
            defaultValue: AUTHOR_ROLE_OPTIONS.STAFF,
            required: true,
        },
    ],
}
