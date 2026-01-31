import type { CollectionConfig } from 'payload'
import { generateBlurDataUrl, isEligibleForBlurDataUrl } from './hooks/generate-blur-data-url'

export const Media: CollectionConfig = {
    slug: 'media',
    access: {
        read: () => true,
    },
    fields: [
        {
            name: 'alt',
            type: 'text',
            required: true,
        },
        {
            name: 'blurDataUrl',
            type: 'text',
            required: true,
            admin: {
                hidden: true,
            },
        },
    ],
    upload: true,
    hooks: {
        beforeChange: [
            async ({ data, req }) => {
                if (data.blurDataUrl) return data

                const file = req.file

                if (file && isEligibleForBlurDataUrl(file.mimetype)) {
                    const base64 = await generateBlurDataUrl(file.data)
                    if (base64) {
                        data.blurDataUrl = base64
                    }
                }

                return data
            },
        ],
    },
}
