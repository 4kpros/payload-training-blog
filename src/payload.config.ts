import { sqliteAdapter } from '@payloadcms/db-sqlite'
import {
    FixedToolbarFeature,
    HeadingFeature,
    InlineToolbarFeature,
    lexicalEditor,
} from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { env } from './libs/env'
import { Users } from './collections/Users'
import { Media } from './collections/media/config'
import { Articles } from './collections/articles/config'
import { Authors } from './collections/authors/config'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
    admin: {
        user: Users.slug,
        importMap: {
            baseDir: path.resolve(dirname),
        },
        autoLogin: {
            email: env.CMS_SEED_ADMIN_EMAIL,
            password: env.CMS_SEED_ADMIN_PASSWORD,
        },
    },
    collections: [Users, Media, Articles, Authors],
    editor: lexicalEditor({
        features: ({ defaultFeatures }) => [
            ...defaultFeatures,
            HeadingFeature({ enabledHeadingSizes: ['h2', 'h3', 'h4'] }),
            FixedToolbarFeature(),
            InlineToolbarFeature(),
        ],
    }),
    secret: process.env.PAYLOAD_SECRET || '',
    typescript: {
        outputFile: path.resolve(dirname, 'payload-types.ts'),
    },
    db: sqliteAdapter({
        client: {
            url: process.env.DATABASE_URL || '',
        },
    }),
    sharp,
    plugins: [],
    email: undefined,
})
